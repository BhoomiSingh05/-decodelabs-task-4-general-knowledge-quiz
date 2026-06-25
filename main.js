// ═══════════════════════════════════════════════════════
// QuizMaster Pro – Main JS  (full i18n, 9 languages)
// ═══════════════════════════════════════════════════════

/* ── THEME ─────────────────────────────────────────────── */
const savedTheme = localStorage.getItem('qm-theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

document.getElementById('themeToggle')?.addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme');
    const next = cur === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('qm-theme', next);
    updateThemeIcon(next);
});
function updateThemeIcon(theme) {
    const icon = document.querySelector('.theme-icon');
    if (icon) icon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

/* ── PARTICLES ──────────────────────────────────────────── */
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    const count = window.innerWidth < 768 ? 20 : 40;
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        const size = Math.random() * 4 + 2;
        const x = Math.random() * 100;
        const delay = Math.random() * 20;
        const duration = 15 + Math.random() * 20;
        const opacity = Math.random() * 0.4 + 0.1;
        p.style.cssText = `position:absolute;width:${size}px;height:${size}px;border-radius:50%;left:${x}%;background:var(--accent);animation:particle-float ${duration}s ${delay}s linear infinite;opacity:${opacity};`;
        container.appendChild(p);
    }
    if (!document.getElementById('particle-keyframes')) {
        const style = document.createElement('style');
        style.id = 'particle-keyframes';
        style.textContent = `@keyframes particle-float{0%{transform:translateY(110vh) translateX(0);opacity:0}10%{opacity:.3}90%{opacity:.3}100%{transform:translateY(-10vh) translateX(${(Math.random()-.5)*80}px);opacity:0}}`;
        document.head.appendChild(style);
    }
}
initParticles();

/* ══════════════════════════════════════════════════════════
   FULL TRANSLATIONS — every string on every page
   ══════════════════════════════════════════════════════════ */
const TRANSLATIONS = {
    en: {
        // Navbar
        nav_dashboard:'Dashboard', nav_play:'Play', nav_daily:'⚡ Daily',
        nav_leaderboard:'Leaderboard', nav_profile:'Profile',
        nav_logout:'Logout', nav_login:'Login', nav_signup:'Sign Up',
        // Hero / Index
        hero_badge:'🚀 The Ultimate Quiz Platform',
        hero_title:'Challenge Your Mind Daily',
        hero_sub:'Compete in Science, Technology, History, Sports & more. Track your progress, earn badges, and climb the leaderboard.',
        btn_play_now:'🎮 Play Now', btn_daily:'⚡ Daily Challenge',
        btn_get_started:'Get Started Free', btn_start_now:'Start Quiz Now →',
        btn_create_account:'Create Free Account →',
        stat_questions:'QUESTIONS', stat_categories:'CATEGORIES',
        stat_difficulty:'DIFFICULTY LEVELS', stat_languages:'LANGUAGES',
        feat1_title:'Multiple Categories', feat1_desc:'Science, Tech, History, Sports, Geography, Math, Music — pick your passion.',
        feat2_title:'Timed Challenges', feat2_desc:'Race against the clock with 30-second timers. Think fast, score high.',
        feat3_title:'Live Leaderboard', feat3_desc:'Compete globally. See where you rank against top players in real time.',
        feat4_title:'9 Languages', feat4_desc:'Play in English, Hindi, Marathi, Spanish, French, German, Arabic, Chinese, or Japanese.',
        feat5_title:'Daily Quiz', feat5_desc:'Fresh questions every day. Build a streak and earn exclusive badges.',
        feat6_title:'Achievement Badges', feat6_desc:'Earn badges for perfect scores, streaks, and veteran status.',
        feat7_title:'Score Analytics', feat7_desc:'Visual dashboards show your quiz history, improvement trends, and weak spots.',
        feat8_title:'Answer Explanations', feat8_desc:'Learn from every mistake. Detailed explanations after each answer.',
        cta_title:'Ready to test yourself?', cta_sub:'Join thousands of quiz enthusiasts. Free forever.',
        // Dashboard
        dash_best_score:'Your highest score is',
        btn_play_quiz:'🎮 Play Quiz', quick_play:'⚡ Quick Play',
        recent_history:'📋 Recent History', your_badges:'🏅 Your Badges',
        top_players:'🏆 Top Players', view_leaderboard:'View Full Leaderboard →',
        metric_highest:'HIGHEST SCORE', metric_played:'QUIZZES PLAYED', metric_avg:'AVG SCORE %',
        no_quizzes:'No quizzes yet! Play your first quiz.', btn_start_playing:'Start Playing',
        th_category:'Category', th_difficulty:'Difficulty', th_score:'Score',
        th_result:'Result', th_date:'Date',
        result_pass:'✅ Pass', result_fail:'❌ Fail',
        // Quiz Setup
        setup_title:'🎮 Setup Your Quiz', setup_sub:'Choose your category, difficulty, and language',
        label_category:'📚 Category', label_difficulty:'⚡ Difficulty', label_language:'🌍 Language',
        diff_easy:'🟢 Easy', diff_medium:'🟡 Medium', diff_hard:'🔴 Hard',
        lang_note:'* Questions will be translated to your chosen language in real time.',
        quiz_info:'📝 10 Questions · ⏱️ 30s each · 🎯 10 pts per correct · ✅ Pass: 60%',
        btn_start_quiz:'🚀 Start Quiz', btn_daily_instead:'⚡ Play Daily Challenge Instead',
        // Categories
        cat_science:'Science', cat_technology:'Technology', cat_history:'History',
        cat_sports:'Sports', cat_geography:'Geography', cat_math:'Math', cat_music:'Music',
        cat_daily_challenge:'Daily Challenge',
        // Quiz Play
        lbl_question:'Question', lbl_pts:'pts', lbl_hint:'Hint:',
        btn_hint:'💡 Hint', btn_skip:'Skip', btn_next:'Next Question →',
        btn_see_results:'📊 See Results', loading:'⏳ Loading...',
        correct:'✅ Correct!', wrong:'❌ Wrong!', correct_was:'Correct answer:',
        timeup:"⏰ Time's up!",
        // Leaderboard
        lb_title:'🏆 Leaderboard', lb_sub:'Top players competing for quiz supremacy',
        quizzes_played:'quizzes played', no_players:'No players yet. Be the first!',
        btn_join_now:'Join Now', btn_improve_rank:'🎮 Improve Your Rank',
        btn_join_compete:'Join & Compete →',
        // Auth
        auth_welcome_back:'Welcome Back', auth_join:'Join QuizMaster',
        auth_signin_sub:'Sign in to continue your quiz journey.',
        auth_register_sub:'Create your free account and start playing!',
        label_username:'Username', label_email:'Email', label_password:'Password',
        btn_signin:'🚀 Sign In',
        auth_no_account:"Don't have an account?", auth_signup_free:'Sign up free',
        auth_have_account:'Already have an account?',
        // Profile
        prof_edit:'⚙️ Edit Preferences', prof_stats:'📊 Your Stats',
        prof_history:'📋 Quiz History', prof_fav_cat:'Favourite Category',
        prof_avatar:'Avatar Color', btn_save:'Save Changes',
        stat_total:'Total Quizzes', stat_passed:'Passed', stat_avg:'Average Score', stat_fav:'Favourite Category',
    },

    hi: {
        nav_dashboard:'डैशबोर्ड', nav_play:'खेलें', nav_daily:'⚡ दैनिक',
        nav_leaderboard:'लीडरबोर्ड', nav_profile:'प्रोफ़ाइल',
        nav_logout:'लॉगआउट', nav_login:'लॉगिन', nav_signup:'साइन अप',
        hero_badge:'🚀 अल्टीमेट क्विज़ प्लेटफ़ॉर्म',
        hero_title:'रोज़ अपने दिमाग़ को चुनौती दें',
        hero_sub:'विज्ञान, तकनीक, इतिहास, खेल और बहुत कुछ में प्रतिस्पर्धा करें।',
        btn_play_now:'🎮 अभी खेलें', btn_daily:'⚡ दैनिक चुनौती',
        btn_get_started:'मुफ़्त शुरू करें', btn_start_now:'क्विज़ शुरू करें →',
        btn_create_account:'मुफ़्त खाता बनाएं →',
        stat_questions:'प्रश्न', stat_categories:'श्रेणियाँ',
        stat_difficulty:'कठिनाई स्तर', stat_languages:'भाषाएँ',
        feat1_title:'अनेक श्रेणियाँ', feat1_desc:'विज्ञान, तकनीक, इतिहास, खेल, भूगोल, गणित, संगीत।',
        feat2_title:'समयबद्ध चुनौती', feat2_desc:'30 सेकंड के टाइमर के साथ। तेज़ सोचो, ऊँचा स्कोर करो।',
        feat3_title:'लाइव लीडरबोर्ड', feat3_desc:'वैश्विक स्तर पर प्रतिस्पर्धा करें।',
        feat4_title:'9 भाषाएँ', feat4_desc:'हिंदी, मराठी, अंग्रेज़ी और बहुत कुछ।',
        feat5_title:'दैनिक क्विज़', feat5_desc:'हर दिन नए प्रश्न।',
        feat6_title:'उपलब्धि बैज', feat6_desc:'परफेक्ट स्कोर के लिए बैज अर्जित करें।',
        feat7_title:'स्कोर विश्लेषण', feat7_desc:'अपनी प्रगति ट्रैक करें।',
        feat8_title:'उत्तर स्पष्टीकरण', feat8_desc:'हर गलती से सीखें।',
        cta_title:'खुद को परखने के लिए तैयार?', cta_sub:'हज़ारों क्विज़ प्रेमियों से जुड़ें। हमेशा मुफ़्त।',
        dash_best_score:'आपका सर्वश्रेष्ठ स्कोर है',
        btn_play_quiz:'🎮 क्विज़ खेलें', quick_play:'⚡ त्वरित खेल',
        recent_history:'📋 हालिया इतिहास', your_badges:'🏅 आपके बैज',
        top_players:'🏆 शीर्ष खिलाड़ी', view_leaderboard:'पूरा लीडरबोर्ड देखें →',
        metric_highest:'सर्वोच्च स्कोर', metric_played:'खेले गए क्विज़', metric_avg:'औसत स्कोर %',
        no_quizzes:'अभी तक कोई क्विज़ नहीं! पहला क्विज़ खेलें।', btn_start_playing:'खेलना शुरू करें',
        th_category:'श्रेणी', th_difficulty:'कठिनाई', th_score:'स्कोर',
        th_result:'परिणाम', th_date:'तारीख',
        result_pass:'✅ पास', result_fail:'❌ फेल',
        setup_title:'🎮 क्विज़ सेटअप', setup_sub:'श्रेणी, कठिनाई और भाषा चुनें',
        label_category:'📚 श्रेणी', label_difficulty:'⚡ कठिनाई', label_language:'🌍 भाषा',
        diff_easy:'🟢 आसान', diff_medium:'🟡 मध्यम', diff_hard:'🔴 कठिन',
        lang_note:'* प्रश्न आपकी भाषा में अनुवादित होंगे।',
        quiz_info:'📝 10 प्रश्न · ⏱️ 30 सेकंड · 🎯 10 अंक प्रति सही · ✅ पास: 60%',
        btn_start_quiz:'🚀 क्विज़ शुरू करें', btn_daily_instead:'⚡ दैनिक चुनौती खेलें',
        cat_science:'विज्ञान', cat_technology:'तकनीक', cat_history:'इतिहास',
        cat_sports:'खेल', cat_geography:'भूगोल', cat_math:'गणित', cat_music:'संगीत',
        cat_daily_challenge:'दैनिक चुनौती',
        lbl_question:'प्रश्न', lbl_pts:'अंक', lbl_hint:'संकेत:',
        btn_hint:'💡 संकेत', btn_skip:'छोड़ें', btn_next:'अगला प्रश्न →',
        btn_see_results:'📊 परिणाम देखें', loading:'⏳ लोड हो रहा है...',
        correct:'✅ सही!', wrong:'❌ गलत!', correct_was:'सही उत्तर:', timeup:'⏰ समय समाप्त!',
        lb_title:'🏆 लीडरबोर्ड', lb_sub:'शीर्ष खिलाड़ी',
        quizzes_played:'क्विज़ खेले', no_players:'अभी कोई खिलाड़ी नहीं।',
        btn_join_now:'अभी जुड़ें', btn_improve_rank:'🎮 रैंक सुधारें', btn_join_compete:'जुड़ें →',
        auth_welcome_back:'वापस स्वागत है', auth_join:'QuizMaster से जुड़ें',
        auth_signin_sub:'अपनी यात्रा जारी रखने के लिए लॉगिन करें।',
        auth_register_sub:'मुफ़्त खाता बनाएं और खेलना शुरू करें!',
        label_username:'उपयोगकर्ता नाम', label_email:'ईमेल', label_password:'पासवर्ड',
        btn_signin:'🚀 लॉगिन करें',
        auth_no_account:'खाता नहीं है?', auth_signup_free:'मुफ़्त साइन अप करें',
        auth_have_account:'पहले से खाता है?',
        prof_edit:'⚙️ प्राथमिकताएँ', prof_stats:'📊 आपके आँकड़े',
        prof_history:'📋 क्विज़ इतिहास', prof_fav_cat:'पसंदीदा श्रेणी',
        prof_avatar:'अवतार रंग', btn_save:'बदलाव सहेजें',
        stat_total:'कुल क्विज़', stat_passed:'पास', stat_avg:'औसत स्कोर', stat_fav:'पसंदीदा श्रेणी',
    },

    mr: {
        nav_dashboard:'डॅशबोर्ड', nav_play:'खेळा', nav_daily:'⚡ दैनिक',
        nav_leaderboard:'लीडरबोर्ड', nav_profile:'प्रोफाइल',
        nav_logout:'बाहेर पडा', nav_login:'लॉगिन', nav_signup:'साइन अप',
        hero_badge:'🚀 अल्टिमेट क्विझ प्लॅटफॉर्म',
        hero_title:'दररोज आपल्या मनाला आव्हान द्या',
        hero_sub:'विज्ञान, तंत्रज्ञान, इतिहास, खेळ आणि बरेच काही मध्ये स्पर्धा करा।',
        btn_play_now:'🎮 आत्ता खेळा', btn_daily:'⚡ दैनिक आव्हान',
        btn_get_started:'मोफत सुरू करा', btn_start_now:'क्विझ सुरू करा →',
        btn_create_account:'मोफत खाते बनवा →',
        stat_questions:'प्रश्न', stat_categories:'श्रेणी',
        stat_difficulty:'अडचणीचे स्तर', stat_languages:'भाषा',
        feat1_title:'अनेक श्रेणी', feat1_desc:'विज्ञान, तंत्रज्ञान, इतिहास, खेळ, भूगोल, गणित, संगीत।',
        feat2_title:'वेळेची मर्यादा', feat2_desc:'30 सेकंदांच्या टायमरसह. जलद विचार करा, उच्च गुण मिळवा।',
        feat3_title:'लाइव्ह लीडरबोर्ड', feat3_desc:'जागतिक स्तरावर स्पर्धा करा।',
        feat4_title:'9 भाषा', feat4_desc:'मराठी, हिंदी, इंग्रजी आणि बरेच काही।',
        feat5_title:'दैनिक क्विझ', feat5_desc:'दररोज नवीन प्रश्न।',
        feat6_title:'यश बॅज', feat6_desc:'परफेक्ट स्कोरसाठी बॅज मिळवा।',
        feat7_title:'स्कोर विश्लेषण', feat7_desc:'आपली प्रगती ट्रॅक करा।',
        feat8_title:'उत्तराचे स्पष्टीकरण', feat8_desc:'प्रत्येक चुकीतून शिका।',
        cta_title:'स्वतःची परीक्षा घेण्यास तयार आहात?', cta_sub:'हजारो क्विझ प्रेमींमध्ये सामील व्हा। नेहमी मोफत।',
        dash_best_score:'आपला सर्वोच्च स्कोर आहे',
        btn_play_quiz:'🎮 क्विझ खेळा', quick_play:'⚡ त्वरित खेळ',
        recent_history:'📋 अलीकडील इतिहास', your_badges:'🏅 आपले बॅज',
        top_players:'🏆 शीर्ष खेळाडू', view_leaderboard:'संपूर्ण लीडरबोर्ड पहा →',
        metric_highest:'सर्वोच्च स्कोर', metric_played:'खेळलेले क्विझ', metric_avg:'सरासरी स्कोर %',
        no_quizzes:'अद्याप कोणतेही क्विझ नाही! पहिला क्विझ खेळा।', btn_start_playing:'खेळायला सुरुवात करा',
        th_category:'श्रेणी', th_difficulty:'अडचण', th_score:'स्कोर',
        th_result:'निकाल', th_date:'तारीख',
        result_pass:'✅ उत्तीर्ण', result_fail:'❌ अनुत्तीर्ण',
        setup_title:'🎮 क्विझ सेटअप', setup_sub:'श्रेणी, अडचण आणि भाषा निवडा',
        label_category:'📚 श्रेणी', label_difficulty:'⚡ अडचण', label_language:'🌍 भाषा',
        diff_easy:'🟢 सोपे', diff_medium:'🟡 मध्यम', diff_hard:'🔴 कठीण',
        lang_note:'* प्रश्न आपल्या भाषेत अनुवादित केले जातील।',
        quiz_info:'📝 10 प्रश्न · ⏱️ 30 सेकंद · 🎯 प्रत्येक बरोबर 10 गुण · ✅ उत्तीर्ण: 60%',
        btn_start_quiz:'🚀 क्विझ सुरू करा', btn_daily_instead:'⚡ दैनिक आव्हान खेळा',
        cat_science:'विज्ञान', cat_technology:'तंत्रज्ञान', cat_history:'इतिहास',
        cat_sports:'खेळ', cat_geography:'भूगोल', cat_math:'गणित', cat_music:'संगीत',
        cat_daily_challenge:'दैनिक आव्हान',
        lbl_question:'प्रश्न', lbl_pts:'गुण', lbl_hint:'संकेत:',
        btn_hint:'💡 संकेत', btn_skip:'वगळा', btn_next:'पुढील प्रश्न →',
        btn_see_results:'📊 निकाल पहा', loading:'⏳ लोड होत आहे...',
        correct:'✅ बरोबर!', wrong:'❌ चुकीचे!', correct_was:'बरोबर उत्तर:', timeup:'⏰ वेळ संपला!',
        lb_title:'🏆 लीडरबोर्ड', lb_sub:'शीर्ष खेळाडू',
        quizzes_played:'क्विझ खेळले', no_players:'अद्याप कोणतेही खेळाडू नाही।',
        btn_join_now:'आता सामील व्हा', btn_improve_rank:'🎮 रँक सुधारा', btn_join_compete:'सामील व्हा →',
        auth_welcome_back:'पुन्हा स्वागत आहे', auth_join:'QuizMaster मध्ये सामील व्हा',
        auth_signin_sub:'आपला प्रवास सुरू ठेवण्यासाठी लॉगिन करा।',
        auth_register_sub:'मोफत खाते बनवा आणि खेळायला सुरुवात करा!',
        label_username:'वापरकर्तानाव', label_email:'ईमेल', label_password:'पासवर्ड',
        btn_signin:'🚀 लॉगिन करा',
        auth_no_account:'खाते नाही का?', auth_signup_free:'मोफत साइन अप करा',
        auth_have_account:'आधीच खाते आहे का?',
        prof_edit:'⚙️ प्राधान्ये', prof_stats:'📊 आपले आकडे',
        prof_history:'📋 क्विझ इतिहास', prof_fav_cat:'आवडती श्रेणी',
        prof_avatar:'अवतार रंग', btn_save:'बदल जतन करा',
        stat_total:'एकूण क्विझ', stat_passed:'उत्तीर्ण', stat_avg:'सरासरी स्कोर', stat_fav:'आवडती श्रेणी',
    },

    es: {
        nav_dashboard:'Tablero', nav_play:'Jugar', nav_daily:'⚡ Diario',
        nav_leaderboard:'Clasificación', nav_profile:'Perfil',
        nav_logout:'Salir', nav_login:'Iniciar sesión', nav_signup:'Registro',
        hero_badge:'🚀 La Plataforma de Quiz Definitiva',
        hero_title:'Desafía tu mente cada día',
        hero_sub:'Compite en Ciencia, Tecnología, Historia, Deportes y más.',
        btn_play_now:'🎮 Jugar ahora', btn_daily:'⚡ Desafío diario',
        btn_get_started:'Empezar gratis', btn_start_now:'Iniciar Quiz →',
        btn_create_account:'Crear cuenta gratis →',
        stat_questions:'PREGUNTAS', stat_categories:'CATEGORÍAS',
        stat_difficulty:'NIVELES', stat_languages:'IDIOMAS',
        feat1_title:'Múltiples categorías', feat1_desc:'Ciencia, Tecnología, Historia, Deportes, Geografía, Matemáticas, Música.',
        feat2_title:'Desafíos cronometrados', feat2_desc:'30 segundos por pregunta. Piensa rápido, anota alto.',
        feat3_title:'Clasificación en vivo', feat3_desc:'Compite globalmente.',
        feat4_title:'9 idiomas', feat4_desc:'Inglés, Hindi, Marathi, Español, Francés, Alemán, Árabe, Chino, Japonés.',
        feat5_title:'Quiz diario', feat5_desc:'Preguntas nuevas cada día.',
        feat6_title:'Insignias', feat6_desc:'Gana insignias por puntajes perfectos.',
        feat7_title:'Análisis de puntaje', feat7_desc:'Rastrea tu progreso.',
        feat8_title:'Explicaciones', feat8_desc:'Aprende de cada error.',
        cta_title:'¿Listo para ponerte a prueba?', cta_sub:'Únete a miles de entusiastas del quiz. Gratis.',
        dash_best_score:'Tu puntaje más alto es',
        btn_play_quiz:'🎮 Jugar Quiz', quick_play:'⚡ Juego rápido',
        recent_history:'📋 Historial reciente', your_badges:'🏅 Tus insignias',
        top_players:'🏆 Mejores jugadores', view_leaderboard:'Ver clasificación completa →',
        metric_highest:'MAYOR PUNTAJE', metric_played:'QUIZZES JUGADOS', metric_avg:'PROMEDIO %',
        no_quizzes:'¡Sin quizzes! Juega tu primero.', btn_start_playing:'Empezar',
        th_category:'Categoría', th_difficulty:'Dificultad', th_score:'Puntaje',
        th_result:'Resultado', th_date:'Fecha',
        result_pass:'✅ Aprobado', result_fail:'❌ Reprobado',
        setup_title:'🎮 Configurar Quiz', setup_sub:'Elige categoría, dificultad e idioma',
        label_category:'📚 Categoría', label_difficulty:'⚡ Dificultad', label_language:'🌍 Idioma',
        diff_easy:'🟢 Fácil', diff_medium:'🟡 Medio', diff_hard:'🔴 Difícil',
        lang_note:'* Las preguntas se traducirán a tu idioma en tiempo real.',
        quiz_info:'📝 10 preguntas · ⏱️ 30s · 🎯 10 pts · ✅ Aprobar: 60%',
        btn_start_quiz:'🚀 Iniciar Quiz', btn_daily_instead:'⚡ Jugar desafío diario',
        cat_science:'Ciencia', cat_technology:'Tecnología', cat_history:'Historia',
        cat_sports:'Deportes', cat_geography:'Geografía', cat_math:'Matemáticas', cat_music:'Música',
        cat_daily_challenge:'Desafío Diario',
        lbl_question:'Pregunta', lbl_pts:'pts', lbl_hint:'Pista:',
        btn_hint:'💡 Pista', btn_skip:'Omitir', btn_next:'Siguiente →',
        btn_see_results:'📊 Ver resultados', loading:'⏳ Cargando...',
        correct:'✅ ¡Correcto!', wrong:'❌ ¡Incorrecto!', correct_was:'Respuesta correcta:', timeup:'⏰ ¡Tiempo!',
        lb_title:'🏆 Clasificación', lb_sub:'Los mejores jugadores',
        quizzes_played:'quizzes jugados', no_players:'Sin jugadores. ¡Sé el primero!',
        btn_join_now:'Unirse', btn_improve_rank:'🎮 Mejorar rango', btn_join_compete:'Unirse →',
        auth_welcome_back:'Bienvenido de nuevo', auth_join:'Únete a QuizMaster',
        auth_signin_sub:'Inicia sesión para continuar tu viaje.',
        auth_register_sub:'¡Crea tu cuenta gratis y empieza!',
        label_username:'Usuario', label_email:'Correo', label_password:'Contraseña',
        btn_signin:'🚀 Iniciar sesión',
        auth_no_account:'¿No tienes cuenta?', auth_signup_free:'Regístrate gratis',
        auth_have_account:'¿Ya tienes cuenta?',
        prof_edit:'⚙️ Preferencias', prof_stats:'📊 Tus estadísticas',
        prof_history:'📋 Historial', prof_fav_cat:'Categoría favorita',
        prof_avatar:'Color de avatar', btn_save:'Guardar cambios',
        stat_total:'Quizzes totales', stat_passed:'Aprobados', stat_avg:'Promedio', stat_fav:'Favorita',
    },

    fr: {
        nav_dashboard:'Tableau de bord', nav_play:'Jouer', nav_daily:'⚡ Quotidien',
        nav_leaderboard:'Classement', nav_profile:'Profil',
        nav_logout:'Déconnecter', nav_login:'Connexion', nav_signup:"S'inscrire",
        hero_badge:'🚀 La Plateforme de Quiz Ultime',
        hero_title:'Défiez votre esprit chaque jour',
        hero_sub:'Concourez en Sciences, Technologie, Histoire, Sports et plus encore.',
        btn_play_now:'🎮 Jouer maintenant', btn_daily:'⚡ Défi quotidien',
        btn_get_started:'Commencer gratuitement', btn_start_now:'Commencer →',
        btn_create_account:'Créer un compte gratuit →',
        stat_questions:'QUESTIONS', stat_categories:'CATÉGORIES',
        stat_difficulty:'NIVEAUX', stat_languages:'LANGUES',
        feat1_title:'Plusieurs catégories', feat1_desc:'Science, Techno, Histoire, Sport, Géographie, Maths, Musique.',
        feat2_title:'Défis chronométrés', feat2_desc:'30 secondes par question.',
        feat3_title:'Classement en direct', feat3_desc:'Concourez mondialement.',
        feat4_title:'9 langues', feat4_desc:'Anglais, Hindi, Marathi, Espagnol, Français et plus.',
        feat5_title:'Quiz quotidien', feat5_desc:'Nouvelles questions chaque jour.',
        feat6_title:'Badges', feat6_desc:'Gagnez des badges.',
        feat7_title:'Analytique', feat7_desc:'Suivez vos progrès.',
        feat8_title:'Explications', feat8_desc:'Apprenez de chaque erreur.',
        cta_title:'Prêt à vous tester?', cta_sub:'Gratuit pour toujours.',
        dash_best_score:'Votre meilleur score est',
        btn_play_quiz:'🎮 Jouer', quick_play:'⚡ Jeu rapide',
        recent_history:'📋 Historique', your_badges:'🏅 Vos badges',
        top_players:'🏆 Meilleurs joueurs', view_leaderboard:'Voir le classement →',
        metric_highest:'MEILLEUR SCORE', metric_played:'QUIZ JOUÉS', metric_avg:'MOY. %',
        no_quizzes:'Pas encore de quiz!', btn_start_playing:'Commencer',
        th_category:'Catégorie', th_difficulty:'Difficulté', th_score:'Score',
        th_result:'Résultat', th_date:'Date',
        result_pass:'✅ Réussi', result_fail:'❌ Échoué',
        setup_title:'🎮 Configurer le Quiz', setup_sub:'Choisissez catégorie, difficulté et langue',
        label_category:'📚 Catégorie', label_difficulty:'⚡ Difficulté', label_language:'🌍 Langue',
        diff_easy:'🟢 Facile', diff_medium:'🟡 Moyen', diff_hard:'🔴 Difficile',
        lang_note:'* Les questions seront traduites en temps réel.',
        quiz_info:'📝 10 questions · ⏱️ 30s · 🎯 10 pts · ✅ Réussir: 60%',
        btn_start_quiz:'🚀 Démarrer', btn_daily_instead:'⚡ Défi quotidien',
        cat_science:'Sciences', cat_technology:'Technologie', cat_history:'Histoire',
        cat_sports:'Sports', cat_geography:'Géographie', cat_math:'Maths', cat_music:'Musique',
        cat_daily_challenge:'Défi Quotidien',
        lbl_question:'Question', lbl_pts:'pts', lbl_hint:'Indice:',
        btn_hint:'💡 Indice', btn_skip:'Passer', btn_next:'Suivant →',
        btn_see_results:'📊 Voir résultats', loading:'⏳ Chargement...',
        correct:'✅ Correct!', wrong:'❌ Incorrect!', correct_was:'Bonne réponse:', timeup:'⏰ Temps écoulé!',
        lb_title:'🏆 Classement', lb_sub:'Les meilleurs joueurs',
        quizzes_played:'quiz joués', no_players:'Pas encore de joueurs.',
        btn_join_now:'Rejoindre', btn_improve_rank:'🎮 Améliorer le rang', btn_join_compete:'Rejoindre →',
        auth_welcome_back:'Bon retour', auth_join:'Rejoindre QuizMaster',
        auth_signin_sub:'Connectez-vous pour continuer.',
        auth_register_sub:'Créez votre compte gratuit!',
        label_username:'Pseudo', label_email:'Email', label_password:'Mot de passe',
        btn_signin:'🚀 Connexion',
        auth_no_account:'Pas de compte?', auth_signup_free:"S'inscrire",
        auth_have_account:'Déjà un compte?',
        prof_edit:'⚙️ Préférences', prof_stats:'📊 Statistiques',
        prof_history:'📋 Historique', prof_fav_cat:'Catégorie favorite',
        prof_avatar:"Couleur d'avatar", btn_save:'Enregistrer',
        stat_total:'Total quiz', stat_passed:'Réussis', stat_avg:'Moyenne', stat_fav:'Favoris',
    },

    de: {
        nav_dashboard:'Dashboard', nav_play:'Spielen', nav_daily:'⚡ Täglich',
        nav_leaderboard:'Rangliste', nav_profile:'Profil',
        nav_logout:'Abmelden', nav_login:'Anmelden', nav_signup:'Registrieren',
        hero_badge:'🚀 Die ultimative Quiz-Plattform',
        hero_title:'Fordern Sie Ihren Geist täglich heraus',
        hero_sub:'Treten Sie in Wissenschaft, Technologie, Geschichte, Sport und mehr an.',
        btn_play_now:'🎮 Jetzt spielen', btn_daily:'⚡ Tägliche Herausforderung',
        btn_get_started:'Kostenlos starten', btn_start_now:'Quiz starten →',
        btn_create_account:'Kostenloses Konto erstellen →',
        stat_questions:'FRAGEN', stat_categories:'KATEGORIEN',
        stat_difficulty:'SCHWIERIGKEITEN', stat_languages:'SPRACHEN',
        feat1_title:'Mehrere Kategorien', feat1_desc:'Wissenschaft, Technik, Geschichte, Sport, Geografie, Mathe, Musik.',
        feat2_title:'Zeitgesteuerte Herausforderungen', feat2_desc:'30 Sekunden pro Frage.',
        feat3_title:'Live-Rangliste', feat3_desc:'Weltweit konkurrieren.',
        feat4_title:'9 Sprachen', feat4_desc:'Englisch, Hindi, Marathi, Spanisch und mehr.',
        feat5_title:'Tägliches Quiz', feat5_desc:'Jeden Tag neue Fragen.',
        feat6_title:'Abzeichen', feat6_desc:'Abzeichen für perfekte Punktzahlen.',
        feat7_title:'Analyse', feat7_desc:'Fortschritt verfolgen.',
        feat8_title:'Erklärungen', feat8_desc:'Aus jedem Fehler lernen.',
        cta_title:'Bereit, sich zu testen?', cta_sub:'Kostenlos für immer.',
        dash_best_score:'Ihr höchster Punktestand ist',
        btn_play_quiz:'🎮 Quiz spielen', quick_play:'⚡ Schnellspiel',
        recent_history:'📋 Letzte Spiele', your_badges:'🏅 Ihre Abzeichen',
        top_players:'🏆 Top-Spieler', view_leaderboard:'Rangliste anzeigen →',
        metric_highest:'HÖCHSTER SCORE', metric_played:'GESPIELTE QUIZZE', metric_avg:'DURCHSCHNITT %',
        no_quizzes:'Noch keine Quizze!', btn_start_playing:'Spielen',
        th_category:'Kategorie', th_difficulty:'Schwierigkeit', th_score:'Punkte',
        th_result:'Ergebnis', th_date:'Datum',
        result_pass:'✅ Bestanden', result_fail:'❌ Nicht bestanden',
        setup_title:'🎮 Quiz einrichten', setup_sub:'Kategorie, Schwierigkeit und Sprache wählen',
        label_category:'📚 Kategorie', label_difficulty:'⚡ Schwierigkeit', label_language:'🌍 Sprache',
        diff_easy:'🟢 Leicht', diff_medium:'🟡 Mittel', diff_hard:'🔴 Schwer',
        lang_note:'* Fragen werden in Echtzeit übersetzt.',
        quiz_info:'📝 10 Fragen · ⏱️ 30s · 🎯 10 Punkte · ✅ Bestehen: 60%',
        btn_start_quiz:'🚀 Quiz starten', btn_daily_instead:'⚡ Tägliche Herausforderung',
        cat_science:'Wissenschaft', cat_technology:'Technologie', cat_history:'Geschichte',
        cat_sports:'Sport', cat_geography:'Geografie', cat_math:'Mathematik', cat_music:'Musik',
        cat_daily_challenge:'Tägliche Herausforderung',
        lbl_question:'Frage', lbl_pts:'Punkte', lbl_hint:'Hinweis:',
        btn_hint:'💡 Hinweis', btn_skip:'Überspringen', btn_next:'Nächste Frage →',
        btn_see_results:'📊 Ergebnisse', loading:'⏳ Laden...',
        correct:'✅ Richtig!', wrong:'❌ Falsch!', correct_was:'Richtige Antwort:', timeup:'⏰ Zeit abgelaufen!',
        lb_title:'🏆 Rangliste', lb_sub:'Top-Spieler',
        quizzes_played:'Quizze gespielt', no_players:'Noch keine Spieler.',
        btn_join_now:'Beitreten', btn_improve_rank:'🎮 Rang verbessern', btn_join_compete:'Beitreten →',
        auth_welcome_back:'Willkommen zurück', auth_join:'QuizMaster beitreten',
        auth_signin_sub:'Melden Sie sich an.',
        auth_register_sub:'Erstellen Sie Ihr kostenloses Konto!',
        label_username:'Benutzername', label_email:'E-Mail', label_password:'Passwort',
        btn_signin:'🚀 Anmelden',
        auth_no_account:'Kein Konto?', auth_signup_free:'Kostenlos registrieren',
        auth_have_account:'Bereits ein Konto?',
        prof_edit:'⚙️ Einstellungen', prof_stats:'📊 Statistiken',
        prof_history:'📋 Quiz-Verlauf', prof_fav_cat:'Lieblingskategorie',
        prof_avatar:'Avatar-Farbe', btn_save:'Speichern',
        stat_total:'Gesamt-Quizze', stat_passed:'Bestanden', stat_avg:'Durchschnitt', stat_fav:'Favorit',
    },

    ar: {
        nav_dashboard:'لوحة التحكم', nav_play:'العب', nav_daily:'⚡ يومي',
        nav_leaderboard:'المتصدرون', nav_profile:'الملف الشخصي',
        nav_logout:'خروج', nav_login:'دخول', nav_signup:'تسجيل',
        hero_badge:'🚀 منصة الاختبار النهائية',
        hero_title:'تحدى عقلك كل يوم',
        hero_sub:'تنافس في العلوم والتكنولوجيا والتاريخ والرياضة والمزيد.',
        btn_play_now:'🎮 العب الآن', btn_daily:'⚡ التحدي اليومي',
        btn_get_started:'ابدأ مجاناً', btn_start_now:'ابدأ الاختبار →',
        btn_create_account:'إنشاء حساب مجاني →',
        stat_questions:'أسئلة', stat_categories:'فئات',
        stat_difficulty:'مستويات الصعوبة', stat_languages:'لغات',
        feat1_title:'فئات متعددة', feat1_desc:'علوم، تقنية، تاريخ، رياضة، جغرافيا، رياضيات، موسيقى.',
        feat2_title:'تحديات موقوتة', feat2_desc:'30 ثانية لكل سؤال.',
        feat3_title:'لوحة صدارة مباشرة', feat3_desc:'تنافس عالمياً.',
        feat4_title:'9 لغات', feat4_desc:'عربي، إنجليزي، هندي، ماراثي والمزيد.',
        feat5_title:'اختبار يومي', feat5_desc:'أسئلة جديدة كل يوم.',
        feat6_title:'شارات الإنجاز', feat6_desc:'اربح شارات لأعلى الدرجات.',
        feat7_title:'تحليل النتائج', feat7_desc:'تتبع تقدمك.',
        feat8_title:'الشروحات', feat8_desc:'تعلم من كل خطأ.',
        cta_title:'هل أنت مستعد لاختبار نفسك؟', cta_sub:'مجاناً للأبد.',
        dash_best_score:'أعلى نتيجة لك هي',
        btn_play_quiz:'🎮 العب الاختبار', quick_play:'⚡ لعب سريع',
        recent_history:'📋 التاريخ الأخير', your_badges:'🏅 شاراتك',
        top_players:'🏆 أفضل اللاعبين', view_leaderboard:'عرض الترتيب الكامل →',
        metric_highest:'أعلى نتيجة', metric_played:'اختبارات لُعبت', metric_avg:'متوسط %',
        no_quizzes:'لا اختبارات بعد!', btn_start_playing:'ابدأ اللعب',
        th_category:'الفئة', th_difficulty:'الصعوبة', th_score:'النتيجة',
        th_result:'النتيجة', th_date:'التاريخ',
        result_pass:'✅ نجح', result_fail:'❌ رسب',
        setup_title:'🎮 إعداد الاختبار', setup_sub:'اختر الفئة والصعوبة واللغة',
        label_category:'📚 الفئة', label_difficulty:'⚡ الصعوبة', label_language:'🌍 اللغة',
        diff_easy:'🟢 سهل', diff_medium:'🟡 متوسط', diff_hard:'🔴 صعب',
        lang_note:'* سيتم ترجمة الأسئلة إلى لغتك في الوقت الفعلي.',
        quiz_info:'📝 10 أسئلة · ⏱️ 30 ثانية · 🎯 10 نقاط · ✅ النجاح: 60%',
        btn_start_quiz:'🚀 ابدأ الاختبار', btn_daily_instead:'⚡ التحدي اليومي',
        cat_science:'علوم', cat_technology:'تقنية', cat_history:'تاريخ',
        cat_sports:'رياضة', cat_geography:'جغرافيا', cat_math:'رياضيات', cat_music:'موسيقى',
        cat_daily_challenge:'التحدي اليومي',
        lbl_question:'سؤال', lbl_pts:'نقاط', lbl_hint:'تلميح:',
        btn_hint:'💡 تلميح', btn_skip:'تخطي', btn_next:'السؤال التالي →',
        btn_see_results:'📊 عرض النتائج', loading:'⏳ جاري التحميل...',
        correct:'✅ صحيح!', wrong:'❌ خطأ!', correct_was:'الإجابة الصحيحة:', timeup:'⏰ انتهى الوقت!',
        lb_title:'🏆 لوحة المتصدرين', lb_sub:'أفضل اللاعبين',
        quizzes_played:'اختبارات لُعبت', no_players:'لا لاعبين بعد.',
        btn_join_now:'انضم الآن', btn_improve_rank:'🎮 حسّن ترتيبك', btn_join_compete:'انضم →',
        auth_welcome_back:'مرحباً بعودتك', auth_join:'انضم إلى QuizMaster',
        auth_signin_sub:'سجّل دخولك لمتابعة رحلتك.',
        auth_register_sub:'أنشئ حسابك المجاني وابدأ اللعب!',
        label_username:'اسم المستخدم', label_email:'البريد الإلكتروني', label_password:'كلمة المرور',
        btn_signin:'🚀 تسجيل الدخول',
        auth_no_account:'ليس لديك حساب؟', auth_signup_free:'سجّل مجاناً',
        auth_have_account:'لديك حساب بالفعل؟',
        prof_edit:'⚙️ التفضيلات', prof_stats:'📊 إحصاءاتك',
        prof_history:'📋 السجل', prof_fav_cat:'الفئة المفضلة',
        prof_avatar:'لون الصورة الرمزية', btn_save:'حفظ التغييرات',
        stat_total:'إجمالي الاختبارات', stat_passed:'ناجح', stat_avg:'المتوسط', stat_fav:'المفضلة',
    },

    zh: {
        nav_dashboard:'仪表盘', nav_play:'开始', nav_daily:'⚡ 每日',
        nav_leaderboard:'排行榜', nav_profile:'个人资料',
        nav_logout:'退出', nav_login:'登录', nav_signup:'注册',
        hero_badge:'🚀 终极测验平台',
        hero_title:'每天挑战你的思维',
        hero_sub:'在科学、技术、历史、体育等领域竞争。',
        btn_play_now:'🎮 立即开始', btn_daily:'⚡ 每日挑战',
        btn_get_started:'免费开始', btn_start_now:'开始测验 →',
        btn_create_account:'创建免费账户 →',
        stat_questions:'题目', stat_categories:'类别',
        stat_difficulty:'难度等级', stat_languages:'语言',
        feat1_title:'多种类别', feat1_desc:'科学、技术、历史、体育、地理、数学、音乐。',
        feat2_title:'限时挑战', feat2_desc:'每题30秒，快速思考，高分冲击。',
        feat3_title:'实时排行榜', feat3_desc:'全球竞争。',
        feat4_title:'9种语言', feat4_desc:'中文、英语、印地语、马拉地语等。',
        feat5_title:'每日测验', feat5_desc:'每天新题目。',
        feat6_title:'成就徽章', feat6_desc:'获得满分徽章。',
        feat7_title:'成绩分析', feat7_desc:'跟踪你的进步。',
        feat8_title:'答案解析', feat8_desc:'从每个错误中学习。',
        cta_title:'准备好测试自己了吗？', cta_sub:'永远免费。',
        dash_best_score:'你的最高分是',
        btn_play_quiz:'🎮 开始测验', quick_play:'⚡ 快速开始',
        recent_history:'📋 最近记录', your_badges:'🏅 你的徽章',
        top_players:'🏆 顶级玩家', view_leaderboard:'查看完整排行榜 →',
        metric_highest:'最高分', metric_played:'已完成测验', metric_avg:'平均分 %',
        no_quizzes:'还没有测验记录！', btn_start_playing:'开始游戏',
        th_category:'类别', th_difficulty:'难度', th_score:'分数',
        th_result:'结果', th_date:'日期',
        result_pass:'✅ 通过', result_fail:'❌ 未通过',
        setup_title:'🎮 设置测验', setup_sub:'选择类别、难度和语言',
        label_category:'📚 类别', label_difficulty:'⚡ 难度', label_language:'🌍 语言',
        diff_easy:'🟢 简单', diff_medium:'🟡 中等', diff_hard:'🔴 困难',
        lang_note:'* 题目将实时翻译为您选择的语言。',
        quiz_info:'📝 10题 · ⏱️ 30秒 · 🎯 每题10分 · ✅ 通过: 60%',
        btn_start_quiz:'🚀 开始测验', btn_daily_instead:'⚡ 每日挑战',
        cat_science:'科学', cat_technology:'技术', cat_history:'历史',
        cat_sports:'体育', cat_geography:'地理', cat_math:'数学', cat_music:'音乐',
        cat_daily_challenge:'每日挑战',
        lbl_question:'问题', lbl_pts:'分', lbl_hint:'提示:',
        btn_hint:'💡 提示', btn_skip:'跳过', btn_next:'下一题 →',
        btn_see_results:'📊 查看结果', loading:'⏳ 加载中...',
        correct:'✅ 正确！', wrong:'❌ 错误！', correct_was:'正确答案:', timeup:'⏰ 时间到！',
        lb_title:'🏆 排行榜', lb_sub:'顶级玩家',
        quizzes_played:'次测验', no_players:'暂无玩家。',
        btn_join_now:'立即加入', btn_improve_rank:'🎮 提升排名', btn_join_compete:'加入 →',
        auth_welcome_back:'欢迎回来', auth_join:'加入QuizMaster',
        auth_signin_sub:'登录继续您的测验之旅。',
        auth_register_sub:'创建您的免费账户并开始游戏！',
        label_username:'用户名', label_email:'电子邮件', label_password:'密码',
        btn_signin:'🚀 登录',
        auth_no_account:'没有账户？', auth_signup_free:'免费注册',
        auth_have_account:'已有账户？',
        prof_edit:'⚙️ 编辑偏好', prof_stats:'📊 你的统计',
        prof_history:'📋 测验记录', prof_fav_cat:'最喜欢的类别',
        prof_avatar:'头像颜色', btn_save:'保存更改',
        stat_total:'总测验', stat_passed:'通过', stat_avg:'平均分', stat_fav:'最喜欢',
    },

    ja: {
        nav_dashboard:'ダッシュボード', nav_play:'クイズ', nav_daily:'⚡ デイリー',
        nav_leaderboard:'ランキング', nav_profile:'プロフィール',
        nav_logout:'ログアウト', nav_login:'ログイン', nav_signup:'登録',
        hero_badge:'🚀 究極のクイズプラットフォーム',
        hero_title:'毎日自分の頭脳に挑戦しよう',
        hero_sub:'科学、技術、歴史、スポーツなどで競争しましょう。',
        btn_play_now:'🎮 今すぐプレイ', btn_daily:'⚡ デイリーチャレンジ',
        btn_get_started:'無料で始める', btn_start_now:'クイズを始める →',
        btn_create_account:'無料アカウントを作成 →',
        stat_questions:'問題数', stat_categories:'カテゴリ',
        stat_difficulty:'難易度レベル', stat_languages:'言語',
        feat1_title:'複数のカテゴリ', feat1_desc:'科学、技術、歴史、スポーツ、地理、数学、音楽。',
        feat2_title:'タイムチャレンジ', feat2_desc:'1問30秒。速く考えて高得点を。',
        feat3_title:'リアルタイムランキング', feat3_desc:'世界中と競争。',
        feat4_title:'9言語', feat4_desc:'日本語、英語、ヒンディー語、マラーティー語など。',
        feat5_title:'デイリークイズ', feat5_desc:'毎日新しい問題。',
        feat6_title:'バッジ', feat6_desc:'完璧なスコアでバッジを獲得。',
        feat7_title:'スコア分析', feat7_desc:'進捗を追跡。',
        feat8_title:'解説', feat8_desc:'ミスから学ぶ。',
        cta_title:'自分を試す準備はできましたか？', cta_sub:'ずっと無料。',
        dash_best_score:'あなたの最高スコアは',
        btn_play_quiz:'🎮 クイズをプレイ', quick_play:'⚡ クイックプレイ',
        recent_history:'📋 最近の履歴', your_badges:'🏅 あなたのバッジ',
        top_players:'🏆 トッププレイヤー', view_leaderboard:'完全なランキングを見る →',
        metric_highest:'最高スコア', metric_played:'プレイ数', metric_avg:'平均 %',
        no_quizzes:'まだクイズがありません！', btn_start_playing:'プレイを始める',
        th_category:'カテゴリ', th_difficulty:'難易度', th_score:'スコア',
        th_result:'結果', th_date:'日付',
        result_pass:'✅ 合格', result_fail:'❌ 不合格',
        setup_title:'🎮 クイズ設定', setup_sub:'カテゴリ、難易度、言語を選択',
        label_category:'📚 カテゴリ', label_difficulty:'⚡ 難易度', label_language:'🌍 言語',
        diff_easy:'🟢 簡単', diff_medium:'🟡 普通', diff_hard:'🔴 難しい',
        lang_note:'* 問題はリアルタイムで翻訳されます。',
        quiz_info:'📝 10問 · ⏱️ 30秒 · 🎯 10pts · ✅ 合格: 60%',
        btn_start_quiz:'🚀 クイズ開始', btn_daily_instead:'⚡ デイリーチャレンジをプレイ',
        cat_science:'科学', cat_technology:'技術', cat_history:'歴史',
        cat_sports:'スポーツ', cat_geography:'地理', cat_math:'数学', cat_music:'音楽',
        cat_daily_challenge:'デイリーチャレンジ',
        lbl_question:'問題', lbl_pts:'pt', lbl_hint:'ヒント:',
        btn_hint:'💡 ヒント', btn_skip:'スキップ', btn_next:'次の問題 →',
        btn_see_results:'📊 結果を見る', loading:'⏳ 読み込み中...',
        correct:'✅ 正解！', wrong:'❌ 不正解！', correct_was:'正解:', timeup:'⏰ 時間切れ！',
        lb_title:'🏆 ランキング', lb_sub:'トッププレイヤー',
        quizzes_played:'クイズプレイ数', no_players:'まだプレイヤーがいません。',
        btn_join_now:'今すぐ参加', btn_improve_rank:'🎮 ランクを上げる', btn_join_compete:'参加する →',
        auth_welcome_back:'おかえりなさい', auth_join:'QuizMasterに参加',
        auth_signin_sub:'クイズの旅を続けるためにログインしてください。',
        auth_register_sub:'無料アカウントを作成してプレイを始めましょう！',
        label_username:'ユーザー名', label_email:'メール', label_password:'パスワード',
        btn_signin:'🚀 ログイン',
        auth_no_account:'アカウントをお持ちでないですか？', auth_signup_free:'無料登録',
        auth_have_account:'すでにアカウントをお持ちですか？',
        prof_edit:'⚙️ 設定', prof_stats:'📊 統計',
        prof_history:'📋 クイズ履歴', prof_fav_cat:'お気に入りカテゴリ',
        prof_avatar:'アバターカラー', btn_save:'変更を保存',
        stat_total:'合計クイズ', stat_passed:'合格', stat_avg:'平均', stat_fav:'お気に入り',
    }
};

/* ── LANGUAGE ENGINE ─────────────────────────────────────── */
const savedLang = localStorage.getItem('qm-lang') || 'en';
const langSelect = document.getElementById('langSelect');
if (langSelect) {
    langSelect.value = savedLang;
}
// Always apply on load
applyLang(savedLang);

// Expose translations globally so quiz_play.html can access them
window.__T = TRANSLATIONS[savedLang] || TRANSLATIONS.en;

function switchLang(lang) {
    localStorage.setItem('qm-lang', lang);
    window.__T = TRANSLATIONS[lang] || TRANSLATIONS.en;
    applyLang(lang);
    // Sync to server session
    fetch('/api/set-lang', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ lang })
    }).catch(() => {});
}

function applyLang(lang) {
    const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
    // Apply all data-i18n elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key] !== undefined) el.textContent = t[key];
    });
    // RTL support
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);
}

/* ── CONFETTI ───────────────────────────────────────────── */
function launchConfetti(count = 120) {
    const colors = ['#6C63FF','#FF6B6B','#4ECDC4','#FFD166','#FF6B9D','#00C9A7','#B57BFF','#64DCFF'];
    for (let i = 0; i < count; i++) {
        const el = document.createElement('div');
        el.className = 'confetti-piece';
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const size = 6 + Math.random() * 10;
        const duration = 2 + Math.random() * 3;
        const delay = Math.random() * 1.5;
        const shapes = ['50%', '0%', '50% 0'];
        const radius = shapes[Math.floor(Math.random() * shapes.length)];
        el.style.cssText = `left:${left}vw;top:-20px;width:${size}px;height:${size}px;background:${color};border-radius:${radius};animation-duration:${duration}s;animation-delay:${delay}s;`;
        document.body.appendChild(el);
        setTimeout(() => el.remove(), (duration + delay) * 1000 + 500);
    }
}
const pctEl = document.querySelector('[data-pct]');
if (pctEl) {
    const pct = parseInt(pctEl.getAttribute('data-pct'));
    if (pct >= 80) setTimeout(() => launchConfetti(pct >= 100 ? 200 : 120), 600);
}

/* ── FLASH AUTO-REMOVE ──────────────────────────────────── */
document.querySelectorAll('.flash').forEach(el => {
    setTimeout(() => el.style.opacity === '' && el.remove(), 4000);
});

/* ── ANIMATE ON SCROLL ───────────────────────────────────── */
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.style.animationPlayState = 'running'; });
}, { threshold: 0.1 });
document.querySelectorAll('.feature-card, .review-item, .lb-row').forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
});

/* ── COUNTER ANIMATION ──────────────────────────────────── */
function animateCounter(el, target, duration = 1200) {
    const start = performance.now();
    function update(now) {
        const progress = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(target * ease);
        if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}
document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.getAttribute('data-count'));
    const io = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) { animateCounter(el, target); io.disconnect(); }
    });
    io.observe(el);
});
