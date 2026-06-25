from flask import Flask, render_template, request, redirect, url_for, session, jsonify, flash
import sqlite3
import hashlib
import os
import json
import random
from datetime import datetime, date
import secrets

app = Flask(__name__)
app.secret_key = secrets.token_hex(32)

DB_PATH = os.path.join(os.path.dirname(__file__), 'instance', 'quizmaster.db')

# ─── DB INIT ────────────────────────────────────────────────────────────────

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    conn = get_db()
    c = conn.cursor()

    c.executescript('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            avatar_color TEXT DEFAULT "#6C63FF",
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            highest_score INTEGER DEFAULT 0,
            total_quizzes INTEGER DEFAULT 0,
            badges TEXT DEFAULT "[]",
            fav_category TEXT DEFAULT "Science"
        );

        CREATE TABLE IF NOT EXISTS questions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            category TEXT NOT NULL,
            difficulty TEXT NOT NULL,
            question TEXT NOT NULL,
            option_a TEXT NOT NULL,
            option_b TEXT NOT NULL,
            option_c TEXT NOT NULL,
            option_d TEXT NOT NULL,
            correct TEXT NOT NULL,
            explanation TEXT DEFAULT "",
            hint TEXT DEFAULT "",
            language TEXT DEFAULT "en"
        );

        CREATE TABLE IF NOT EXISTS quiz_sessions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            category TEXT,
            difficulty TEXT,
            score INTEGER DEFAULT 0,
            total INTEGER DEFAULT 0,
            percentage REAL DEFAULT 0,
            passed INTEGER DEFAULT 0,
            time_taken INTEGER DEFAULT 0,
            played_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(user_id) REFERENCES users(id)
        );

        CREATE TABLE IF NOT EXISTS daily_quiz (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            quiz_date TEXT UNIQUE NOT NULL,
            question_ids TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS achievements (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            badge TEXT,
            earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(user_id) REFERENCES users(id)
        );
    ''')
    conn.commit()
    seed_questions(c, conn)
    conn.close()

def seed_questions(c, conn):
    c.execute("SELECT COUNT(*) FROM questions")
    if c.fetchone()[0] > 0:
        return

    questions = [
        # SCIENCE – Easy
        ("Science","Easy","What planet is closest to the Sun?","Mercury","Venus","Earth","Mars","A","Mercury is the first planet in our solar system.","Think smallest orbit!"),
        ("Science","Easy","Water boils at how many degrees Celsius?","90","100","110","120","B","Water boils at 100°C at standard pressure.","Standard sea level!"),
        ("Science","Easy","What gas do plants absorb from the air?","Oxygen","Nitrogen","Carbon Dioxide","Hydrogen","C","Plants use CO₂ for photosynthesis.","Think green energy!"),
        ("Science","Easy","How many bones are in the adult human body?","196","206","216","226","B","Adults have 206 bones.","Just over 200!"),
        ("Science","Easy","What is the chemical symbol for gold?","Go","Gd","Au","Ag","C","Au comes from the Latin word 'Aurum'.","Latin roots!"),
        # SCIENCE – Medium
        ("Science","Medium","What is the speed of light in km/s?","200,000","300,000","400,000","500,000","B","Light travels ~299,792 km/s.","Almost 300k!"),
        ("Science","Medium","DNA stands for?","Deoxyribonucleic Acid","Diribonucleic Acid","Dinucleic Acid","Deoxyribonicotinic Acid","A","DNA = Deoxyribonucleic Acid.","De-oxy hint!"),
        ("Science","Medium","The powerhouse of the cell is the?","Nucleus","Ribosome","Mitochondria","Golgi","C","Mitochondria produce ATP energy.","Power = energy!"),
        # SCIENCE – Hard
        ("Science","Hard","Schrödinger's cat thought experiment relates to which field?","Relativity","Quantum Mechanics","Thermodynamics","Classical Mechanics","B","It illustrates quantum superposition.","Think paradox!"),
        ("Science","Hard","What is the half-life of Carbon-14?","1,500 years","3,700 years","5,730 years","10,000 years","C","C-14 has a half-life of ~5,730 years.","Radiocarbon dating!"),

        # TECHNOLOGY – Easy
        ("Technology","Easy","What does CPU stand for?","Central Processing Unit","Core Power Unit","Central Power Unit","Computing Process Unit","A","CPU = Central Processing Unit.","It's the 'brain'!"),
        ("Technology","Easy","Which company made the iPhone?","Samsung","Google","Apple","Microsoft","C","Apple released the first iPhone in 2007.","Think bitten apple!"),
        ("Technology","Easy","What does 'www' stand for?","World Wide Web","World Wireless Web","Wide World Web","World Web Wide","A","WWW = World Wide Web.","Tim Berners-Lee!"),
        ("Technology","Easy","HTML stands for?","HyperText Markup Language","HighText Markup Language","HyperText Machine Language","HyperText Marking Language","A","HTML = HyperText Markup Language.","Web pages use this!"),
        # TECHNOLOGY – Medium
        ("Technology","Medium","Python was created by?","Guido van Rossum","James Gosling","Bjarne Stroustrup","Dennis Ritchie","A","Guido van Rossum created Python in 1991.","Dutch developer!"),
        ("Technology","Medium","What does SQL stand for?","Structured Query Language","Simple Query Language","Sequential Query Language","Standard Query Language","A","SQL = Structured Query Language.","Database language!"),
        ("Technology","Medium","Which protocol is used to send emails?","FTP","HTTP","SMTP","SSH","C","SMTP = Simple Mail Transfer Protocol.","Think mail transfer!"),
        # TECHNOLOGY – Hard
        ("Technology","Hard","What is the time complexity of binary search?","O(n)","O(log n)","O(n²)","O(1)","B","Binary search is O(log n).","Divide and conquer!"),
        ("Technology","Hard","Which sorting algorithm has best average-case O(n log n)?","Bubble Sort","Insertion Sort","Merge Sort","Selection Sort","C","Merge sort guarantees O(n log n).","Divide to conquer!"),

        # HISTORY – Easy
        ("History","Easy","Who was the first President of the USA?","Abraham Lincoln","George Washington","Thomas Jefferson","John Adams","B","George Washington served 1789–1797.","First and famous!"),
        ("History","Easy","The Great Wall of China was built primarily to?","Collect taxes","Keep out invaders","Mark borders","Control trade","B","It was mainly built for military defense.","Think protection!"),
        ("History","Easy","In which year did World War II end?","1943","1944","1945","1946","C","WWII ended in 1945 with Axis surrender.","Mid-40s!"),
        # HISTORY – Medium
        ("History","Medium","The Renaissance began in which country?","France","England","Italy","Germany","C","The Renaissance started in Italy around the 14th century.","Think art and Florence!"),
        ("History","Medium","Who wrote the Declaration of Independence?","Benjamin Franklin","George Washington","Thomas Jefferson","John Adams","C","Thomas Jefferson drafted the Declaration.","Third president!"),
        ("History","Hard","The Treaty of Westphalia (1648) ended which war?","The Hundred Years War","The Thirty Years War","The Seven Years War","The Napoleonic Wars","B","It ended the Thirty Years' War in Europe.","Thirty = 30!"),

        # SPORTS – Easy
        ("Sports","Easy","How many players are in a football (soccer) team?","9","10","11","12","C","A soccer team has 11 players on the field.","One more than 10!"),
        ("Sports","Easy","In which sport do you use a shuttlecock?","Tennis","Badminton","Squash","Ping Pong","B","Badminton uses a shuttlecock.","Think feathers!"),
        ("Sports","Easy","How many rings are on the Olympic flag?","4","5","6","7","B","The Olympic flag has 5 rings.","Count the colors!"),
        # SPORTS – Medium
        ("Sports","Medium","Which country has won the most FIFA World Cups?","Germany","Argentina","Brazil","Italy","C","Brazil has won 5 FIFA World Cups.","South America powerhouse!"),
        ("Sports","Medium","In basketball, how many points is a free throw worth?","1","2","3","4","A","A free throw is worth 1 point.","Think penalty shot!"),
        # SPORTS – Hard
        ("Sports","Hard","Who holds the record for most Grand Slam tennis titles (men)?","Roger Federer","Rafael Nadal","Novak Djokovic","Pete Sampras","C","Novak Djokovic holds the most Grand Slam titles.","Serbian champion!"),

        # GEOGRAPHY – Easy
        ("Geography","Easy","What is the capital of France?","Berlin","London","Paris","Rome","C","Paris is the capital of France.","Eiffel Tower city!"),
        ("Geography","Easy","Which is the largest ocean?","Atlantic","Indian","Arctic","Pacific","D","The Pacific Ocean is the largest.","Think Pacific peace!"),
        ("Geography","Easy","Mount Everest is in which mountain range?","Andes","Alps","Rockies","Himalayas","D","Everest is in the Himalayas.","Think Asia!"),
        # GEOGRAPHY – Medium
        ("Geography","Medium","How many continents are there on Earth?","5","6","7","8","C","There are 7 continents on Earth.","Seven wonders, seven continents!"),
        ("Geography","Medium","Which country has the largest land area?","China","USA","Canada","Russia","D","Russia is the largest country by area.","Goes East and West!"),
        # GEOGRAPHY – Hard
        ("Geography","Hard","What percentage of Earth's surface is water?","51%","61%","71%","81%","C","About 71% of Earth's surface is water.","Two-thirds plus!"),

        # MATH – Easy
        ("Math","Easy","What is 12 × 12?","132","144","154","124","B","12 × 12 = 144.","Dozens!"),
        ("Math","Easy","What is the square root of 64?","6","7","8","9","C","√64 = 8.","Think 8×8!"),
        # MATH – Medium
        ("Math","Medium","What is π (Pi) approximately equal to?","3.14","3.41","3.12","3.21","A","π ≈ 3.14159...","Circle ratio!"),
        ("Math","Medium","If a triangle has angles 60°, 60°, and 60°, what type is it?","Isosceles","Scalene","Right-angled","Equilateral","D","All angles equal = equilateral.","Equal sides!"),
        # MATH – Hard
        ("Math","Hard","What is the derivative of sin(x)?","-cos(x)","cos(x)","-sin(x)","tan(x)","B","d/dx [sin(x)] = cos(x).","Basic calculus!"),

        # MUSIC – Easy
        ("Music","Easy","How many strings does a standard guitar have?","4","5","6","7","C","A standard guitar has 6 strings.","EADGBE!"),
        ("Music","Easy","Who is known as the 'King of Pop'?","Elvis","Prince","Michael Jackson","Freddie Mercury","C","Michael Jackson earned that title.","MJ!"),
        # MUSIC – Medium
        ("Music","Medium","Which instrument did Ludwig van Beethoven primarily play?","Violin","Flute","Piano","Cello","C","Beethoven was a master pianist and composer.","88 keys!"),
        ("Music","Medium","How many notes are in a musical octave?","5","7","8","12","C","An octave contains 8 notes (do-re-mi-fa-sol-la-si-do).","Do to Do!"),
        # MUSIC – Hard
        ("Music","Hard","What time signature is a waltz typically in?","2/4","3/4","4/4","6/8","B","Waltzes are in 3/4 time.","Three beats!"),
    ]

    c.executemany('''INSERT INTO questions 
        (category, difficulty, question, option_a, option_b, option_c, option_d, correct, explanation, hint)
        VALUES (?,?,?,?,?,?,?,?,?,?)''', questions)
    conn.commit()

# ─── HELPERS ────────────────────────────────────────────────────────────────

def hash_pw(pw):
    return hashlib.sha256(pw.encode()).hexdigest()

def login_required(f):
    from functools import wraps
    @wraps(f)
    def decorated(*args, **kwargs):
        if 'user_id' not in session:
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return decorated

def get_user(user_id):
    conn = get_db()
    user = conn.execute("SELECT * FROM users WHERE id=?", (user_id,)).fetchone()
    conn.close()
    return user

# ─── AUTH ROUTES ────────────────────────────────────────────────────────────

@app.route('/')
def index():
    user = None
    if 'user_id' in session:
        user = get_user(session['user_id'])
    return render_template('index.html', user=user)

@app.route('/register', methods=['GET','POST'])
def register():
    if request.method == 'POST':
        username = request.form['username'].strip()
        email = request.form['email'].strip()
        password = request.form['password']
        colors = ["#6C63FF","#FF6B6B","#4ECDC4","#45B7D1","#96CEB4","#FFEAA7","#DDA0DD","#98D8C8"]
        color = random.choice(colors)
        try:
            conn = get_db()
            conn.execute("INSERT INTO users (username,email,password_hash,avatar_color) VALUES (?,?,?,?)",
                         (username, email, hash_pw(password), color))
            conn.commit()
            conn.close()
            flash('Account created! Please login.', 'success')
            return redirect(url_for('login'))
        except sqlite3.IntegrityError:
            flash('Username or email already exists.', 'error')
    return render_template('auth.html', mode='register')

@app.route('/login', methods=['GET','POST'])
def login():
    if request.method == 'POST':
        username = request.form['username'].strip()
        password = request.form['password']
        conn = get_db()
        user = conn.execute("SELECT * FROM users WHERE username=? AND password_hash=?",
                            (username, hash_pw(password))).fetchone()
        conn.close()
        if user:
            session['user_id'] = user['id']
            session['username'] = user['username']
            return redirect(url_for('dashboard'))
        flash('Invalid credentials.', 'error')
    return render_template('auth.html', mode='login')

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))

# ─── DASHBOARD ───────────────────────────────────────────────────────────────

@app.route('/dashboard')
@login_required
def dashboard():
    user = get_user(session['user_id'])
    conn = get_db()
    history = conn.execute(
        "SELECT * FROM quiz_sessions WHERE user_id=? ORDER BY played_at DESC LIMIT 10",
        (session['user_id'],)).fetchall()
    leaderboard = conn.execute(
        "SELECT username, highest_score, total_quizzes, avatar_color FROM users ORDER BY highest_score DESC LIMIT 10"
    ).fetchall()
    conn.close()
    return render_template('dashboard.html', user=user, history=history, leaderboard=leaderboard)

# ─── QUIZ ROUTES ─────────────────────────────────────────────────────────────

@app.route('/quiz')
@login_required
def quiz_setup():
    conn = get_db()
    categories = conn.execute("SELECT DISTINCT category FROM questions").fetchall()
    conn.close()
    user = get_user(session['user_id'])
    return render_template('quiz_setup.html', categories=[r['category'] for r in categories], user=user)

@app.route('/quiz/start', methods=['POST'])
@login_required
def start_quiz():
    category = request.form.get('category', 'Science')
    difficulty = request.form.get('difficulty', 'Easy')
    language = request.form.get('language', 'en')
    session['quiz_category'] = category
    session['quiz_difficulty'] = difficulty
    session['quiz_language'] = language
    session['quiz_start'] = datetime.now().isoformat()

    conn = get_db()
    qs = conn.execute(
        "SELECT * FROM questions WHERE category=? AND difficulty=? ORDER BY RANDOM() LIMIT 10",
        (category, difficulty)).fetchall()
    conn.close()

    questions = []
    for q in qs:
        questions.append({
            'id': q['id'],
            'question': q['question'],
            'options': {'A': q['option_a'], 'B': q['option_b'], 'C': q['option_c'], 'D': q['option_d']},
            'correct': q['correct'],
            'explanation': q['explanation'],
            'hint': q['hint']
        })

    session['quiz_questions'] = questions
    session['quiz_score'] = 0
    session['quiz_current'] = 0
    session['quiz_answers'] = []
    return redirect(url_for('quiz_play'))

@app.route('/quiz/play')
@login_required
def quiz_play():
    questions = session.get('quiz_questions', [])
    current = session.get('quiz_current', 0)
    if current >= len(questions):
        return redirect(url_for('quiz_result'))
    q = questions[current]
    total = len(questions)
    score = session.get('quiz_score', 0)
    user = get_user(session['user_id'])
    lang = session.get('quiz_language', 'en')
    return render_template('quiz_play.html',
        question=q, current=current+1, total=total,
        score=score, user=user, language=lang,
        category=session.get('quiz_category'),
        difficulty=session.get('quiz_difficulty'))

@app.route('/quiz/answer', methods=['POST'])
@login_required
def quiz_answer():
    data = request.get_json()
    answer = data.get('answer', '').upper()
    questions = session.get('quiz_questions', [])
    current = session.get('quiz_current', 0)

    if current >= len(questions):
        return jsonify({'error': 'No question'}), 400

    q = questions[current]
    correct = q['correct']
    is_correct = answer == correct

    if is_correct:
        session['quiz_score'] = session.get('quiz_score', 0) + 10

    answers = session.get('quiz_answers', [])
    answers.append({
        'question': q['question'],
        'selected': answer,
        'correct': correct,
        'is_correct': is_correct,
        'explanation': q['explanation'],
        'options': q['options']
    })
    session['quiz_answers'] = answers
    session['quiz_current'] = current + 1
    session.modified = True

    return jsonify({
        'is_correct': is_correct,
        'correct': correct,
        'explanation': q['explanation'],
        'score': session['quiz_score'],
        'next': current + 1 < len(questions)
    })

@app.route('/quiz/result')
@login_required
def quiz_result():
    questions = session.get('quiz_questions', [])
    score = session.get('quiz_score', 0)
    answers = session.get('quiz_answers', [])
    total = len(questions)
    percentage = round((score / (total * 10)) * 100) if total > 0 else 0
    passed = percentage >= 60

    start = datetime.fromisoformat(session.get('quiz_start', datetime.now().isoformat()))
    time_taken = int((datetime.now() - start).total_seconds())

    conn = get_db()
    conn.execute('''INSERT INTO quiz_sessions 
        (user_id, category, difficulty, score, total, percentage, passed, time_taken)
        VALUES (?,?,?,?,?,?,?,?)''',
        (session['user_id'], session.get('quiz_category'), session.get('quiz_difficulty'),
         score, total*10, percentage, int(passed), time_taken))

    user = conn.execute("SELECT * FROM users WHERE id=?", (session['user_id'],)).fetchone()
    new_high = max(user['highest_score'], score)
    new_total = user['total_quizzes'] + 1

    # Badge logic
    badges = json.loads(user['badges'] or '[]')
    if score == total * 10 and '🏆 Perfect Score' not in badges:
        badges.append('🏆 Perfect Score')
    if new_total == 1 and '🎯 First Quiz' not in badges:
        badges.append('🎯 First Quiz')
    if new_total >= 10 and '🔥 Quiz Veteran' not in badges:
        badges.append('🔥 Quiz Veteran')
    if percentage >= 90 and '⭐ Excellence' not in badges:
        badges.append('⭐ Excellence')

    conn.execute("UPDATE users SET highest_score=?, total_quizzes=?, badges=? WHERE id=?",
                 (new_high, new_total, json.dumps(badges), session['user_id']))
    conn.commit()
    conn.close()

    correct_count = sum(1 for a in answers if a['is_correct'])
    wrong_count = len(answers) - correct_count

    if percentage == 100:
        performance = ("Legendary! 🌟", "perfect")
    elif percentage >= 90:
        performance = ("Excellent! ⭐", "excellent")
    elif percentage >= 70:
        performance = ("Good Job! 👍", "good")
    elif percentage >= 60:
        performance = ("You Passed! 🎉", "pass")
    else:
        performance = ("Keep Practicing! 📚", "fail")

    return render_template('quiz_result.html',
        score=score, total=total*10, percentage=percentage,
        passed=passed, answers=answers, performance=performance,
        correct=correct_count, wrong=wrong_count,
        time_taken=time_taken, badges=badges,
        category=session.get('quiz_category'),
        difficulty=session.get('quiz_difficulty'))

# ─── DAILY QUIZ ──────────────────────────────────────────────────────────────

@app.route('/daily')
@login_required
def daily_quiz():
    today = date.today().isoformat()
    conn = get_db()
    daily = conn.execute("SELECT * FROM daily_quiz WHERE quiz_date=?", (today,)).fetchone()
    if not daily:
        qs = conn.execute("SELECT id FROM questions ORDER BY RANDOM() LIMIT 5").fetchall()
        ids = json.dumps([q['id'] for q in qs])
        conn.execute("INSERT INTO daily_quiz (quiz_date, question_ids) VALUES (?,?)", (today, ids))
        conn.commit()
        daily = conn.execute("SELECT * FROM daily_quiz WHERE quiz_date=?", (today,)).fetchone()

    ids = json.loads(daily['question_ids'])
    qs = []
    for qid in ids:
        q = conn.execute("SELECT * FROM questions WHERE id=?", (qid,)).fetchone()
        if q:
            qs.append({'id': q['id'], 'question': q['question'],
                       'options': {'A': q['option_a'], 'B': q['option_b'], 'C': q['option_c'], 'D': q['option_d']},
                       'correct': q['correct'], 'explanation': q['explanation'], 'hint': q['hint']})
    conn.close()

    session['quiz_questions'] = qs
    session['quiz_score'] = 0
    session['quiz_current'] = 0
    session['quiz_answers'] = []
    session['quiz_category'] = 'Daily Challenge'
    session['quiz_difficulty'] = 'Mixed'
    session['quiz_start'] = datetime.now().isoformat()
    session['quiz_language'] = 'en'
    return redirect(url_for('quiz_play'))

# ─── LEADERBOARD ─────────────────────────────────────────────────────────────

@app.route('/leaderboard')
def leaderboard():
    conn = get_db()
    leaders = conn.execute(
        "SELECT username, highest_score, total_quizzes, avatar_color, badges FROM users ORDER BY highest_score DESC LIMIT 20"
    ).fetchall()
    conn.close()
    user = None
    if 'user_id' in session:
        user = get_user(session['user_id'])
    return render_template('leaderboard.html', leaders=leaders, user=user)

# ─── PROFILE ─────────────────────────────────────────────────────────────────

@app.route('/profile')
@login_required
def profile():
    user = get_user(session['user_id'])
    conn = get_db()
    history = conn.execute(
        "SELECT * FROM quiz_sessions WHERE user_id=? ORDER BY played_at DESC",
        (session['user_id'],)).fetchall()
    conn.close()
    badges = json.loads(user['badges'] or '[]')
    return render_template('profile.html', user=user, history=history, badges=badges)

@app.route('/profile/update', methods=['POST'])
@login_required
def update_profile():
    fav_cat = request.form.get('fav_category', 'Science')
    color = request.form.get('avatar_color', '#6C63FF')
    conn = get_db()
    conn.execute("UPDATE users SET fav_category=?, avatar_color=? WHERE id=?",
                 (fav_cat, color, session['user_id']))
    conn.commit()
    conn.close()
    flash('Profile updated!', 'success')
    return redirect(url_for('profile'))

# ─── API ─────────────────────────────────────────────────────────────────────

LANG_NAMES = {
    'hi': 'Hindi', 'mr': 'Marathi', 'es': 'Spanish', 'fr': 'French',
    'de': 'German', 'ar': 'Arabic', 'zh': 'Chinese (Simplified)', 'ja': 'Japanese'
}

@app.route('/api/set-lang', methods=['POST'])
def api_set_lang():
    """Update quiz session language (called when user switches language selector)."""
    lang = request.get_json(force=True).get('lang', 'en')
    session['quiz_language'] = lang
    session.modified = True
    return jsonify({'ok': True})

@app.route('/api/translate', methods=['POST'])
@login_required
def api_translate():
    """Translate quiz question content into the selected language using Claude."""
    import urllib.request
    data = request.get_json()
    lang = data.get('lang', 'en')
    content = data.get('content', {})

    if lang == 'en' or lang not in LANG_NAMES:
        return jsonify(content)

    lang_name = LANG_NAMES[lang]
    prompt = (
        f"Translate the following quiz question fields into {lang_name}. "
        f"Return ONLY raw JSON (no markdown fences) with the exact same keys. "
        f"The keys A, B, C, D are answer options — translate their string values but keep the key letters unchanged. "
        f"Keep all emojis intact. Input:\n{json.dumps(content, ensure_ascii=False)}"
    )

    api_key = os.environ.get('ANTHROPIC_API_KEY', '')
    if not api_key:
        return jsonify(content)  # graceful fallback: return English if no key

    payload = json.dumps({
        "model": "claude-sonnet-4-6",
        "max_tokens": 1000,
        "messages": [{"role": "user", "content": prompt}]
    }).encode()

    req = urllib.request.Request(
        'https://api.anthropic.com/v1/messages',
        data=payload,
        headers={
            'Content-Type': 'application/json',
            'x-api-key': api_key,
            'anthropic-version': '2023-06-01'
        }
    )
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            result = json.loads(resp.read())
        text = result['content'][0]['text'].strip()
        # Strip markdown code fences if present
        if text.startswith('```'):
            text = text.split('```')[1]
            if text.startswith('json'):
                text = text[4:]
        translated = json.loads(text.strip())
        return jsonify(translated)
    except Exception as e:
        app.logger.warning(f"Translation failed: {e}")
        return jsonify(content)  # fallback to English on error

@app.route('/api/leaderboard')
def api_leaderboard():
    conn = get_db()
    leaders = conn.execute(
        "SELECT username, highest_score, total_quizzes FROM users ORDER BY highest_score DESC LIMIT 10"
    ).fetchall()
    conn.close()
    return jsonify([dict(l) for l in leaders])

@app.template_filter('from_json')
def from_json_filter(s):
    try:
        return json.loads(s or '[]')
    except Exception:
        return []

if __name__ == '__main__':
    init_db()
    app.run(debug=True, port=5000)
