// main.js - Comprehensive App Logic with Real API Integration

const App = (() => {
  // DOM Elements
  const elements = {
    streakCount: document.getElementById('streakCount'),
    totalXp: document.getElementById('totalXp'),
    userLevelIcon: document.getElementById('userLevelIcon'),
    userLevelTitle: document.getElementById('userLevelTitle'),
    userName: document.getElementById('userName'),
    remainingXp: document.getElementById('remainingXp'),
    dailyProgressBar: document.getElementById('dailyProgressBar'),
    dailyProgressText: document.getElementById('dailyProgressText'),
    navItems: document.querySelectorAll('.nav-item'),
    sections: document.querySelectorAll('.section'),
    startTodayLesson: document.getElementById('startTodayLesson'),
    categoryGrid: document.getElementById('categoryGrid'),
    homeCategories: document.querySelectorAll('.cat-item'),
    appHeader: document.querySelector('.header'),
    bottomNav: document.querySelector('.bottom-nav'),
    
    // Auth Elements
    loginSection: document.getElementById('loginSection'),
    kakaoLogin: document.getElementById('kakaoLogin'),
    googleLogin: document.getElementById('googleLogin'),
    guestLogin: document.getElementById('guestLogin'),

    // Learning Elements
    learningSection: document.getElementById('learningSection'),
    closeLearning: document.getElementById('closeLearning'),
    activeCard: document.getElementById('activeCard'),
    cardWord: document.getElementById('cardWord'),
    cardMeaning: document.getElementById('cardMeaning'),
    cardSentence: document.getElementById('cardSentence'),
    cardTranslation: document.getElementById('cardTranslation'),
    lessonProgressBar: document.getElementById('lessonProgressBar'),
    lessonProgressText: document.getElementById('lessonProgressText'),
    btnNope: document.getElementById('btnNope'),
    btnLike: document.getElementById('btnLike'),
    btnFlip: document.getElementById('btnFlip'),
    feedbackLike: document.querySelector('.swipe-feedback.like'),
    feedbackNope: document.querySelector('.swipe-feedback.nope'),

    // Quiz Elements
    startQuizBtn: document.getElementById('startQuizBtn'),
    quizSection: document.getElementById('quizSection'),
    closeQuiz: document.getElementById('closeQuiz'),
    quizQuestion: document.getElementById('quizQuestion'),
    quizOptions: document.getElementById('quizOptions'),
    quizProgressBar: document.getElementById('quizProgressBar'),
    quizProgressText: document.getElementById('quizProgressText'),
    quizFeedback: document.getElementById('quizFeedback'),
    feedbackStatus: document.getElementById('feedbackStatus'),
    feedbackMeaning: document.getElementById('feedbackMeaning'),
    nextQuizBtn: document.getElementById('nextQuizBtn'),
    fbIcon: document.getElementById('fbIcon'),
    feedbackIconBox: document.getElementById('feedbackIconBox'),

    // Profile Elements
    profileName: document.getElementById('profileName'),
    profileLevelIcon: document.getElementById('profileLevelIcon'),
    profileLevelTitle: document.getElementById('profileLevelTitle'),
    statTotalXp: document.getElementById('statTotalXp'),
    statStreak: document.getElementById('statStreak'),
    statLevel: document.getElementById('statLevel'),
    editNameBtn: document.getElementById('editNameBtn'),
    resetProgressBtn: document.getElementById('resetProgressBtn'),

    // Test Elements
    startTestBtn: document.getElementById('startTestBtn'),
    testSection: document.getElementById('testSection'),
    resultSection: document.getElementById('resultSection'),
    closeTest: document.getElementById('closeTest'),
    testQuestion: document.getElementById('testQuestion'),
    testOptions: document.getElementById('testOptions'),
    testProgressBar: document.getElementById('testProgressBar'),
    testProgressText: document.getElementById('testProgressText'),
    resultRankBadge: document.getElementById('resultRankBadge'),
    resultRankTitle: document.getElementById('resultRankTitle'),
    resultRankDesc: document.getElementById('resultRankDesc'),
    testScore: document.getElementById('testScore'),
    testTime: document.getElementById('testTime'),
    testStatusText: document.getElementById('testStatusText'),
    backToPractice: document.getElementById('backToPractice'),

    // Battle Elements
    startBattleBtn: document.getElementById('startBattleBtn'),
    battleSection: document.getElementById('battleSection'),
    battleLobby: document.getElementById('battleLobby'),
    battleGame: document.getElementById('battleGame'),
    battleResult: document.getElementById('battleResult'),
    myBattleName: document.getElementById('myBattleName'),
    oppBattleName: document.getElementById('oppBattleName'),
    myScore: document.getElementById('myScore'),
    oppScore: document.getElementById('oppScore'),
    battleTimerBar: document.getElementById('battleTimerBar'),
    battleQuestion: document.getElementById('battleQuestion'),
    battleOptions: document.getElementById('battleOptions'),
    battleResultTitle: document.getElementById('battleResultTitle'),
    battleReward: document.getElementById('battleReward'),
    closeBattle: document.getElementById('closeBattle')
  };

  const LESSON_DATA = {
    daily: {
      title: '일상 표현', icon: '🏠', count: 12,
      words: [
        { word: 'Hold your horses', meaning: '서두르지 마세요', sentence: "Hold your horses, we have plenty of time.", translation: "진정해, 시간은 충분해." },
        { word: 'Piece of cake', meaning: '식은 죽 먹기', sentence: "The exam was a piece of cake.", translation: "시험은 식은 죽 먹기였어." },
        { word: 'Keep in touch', meaning: '연락하고 지내다', sentence: "Let's keep in touch!", translation: "계속 연락하자!" }
      ]
    },
    business: {
      title: '업무/오피스', icon: '💼', count: 8,
      words: [
        { word: 'Get the ball rolling', meaning: '시작하다', sentence: "Let's get the ball rolling on this project.", translation: "이 프로젝트를 시작해 봅시다." },
        { word: 'On the same page', meaning: '생각이 같은', sentence: "I want to make sure we're on the same page.", translation: "우리 의견이 일치하는지 확인하고 싶어요." }
      ]
    },
    travel: {
      title: '여행/이동', icon: '✈️', count: 15,
      words: [
        { word: 'Book a flight', meaning: '항공권을 예약하다', sentence: "I need to book a flight to Paris.", translation: "파리행 비행기를 예약해야 해." },
        { word: 'Travel light', meaning: '짐을 가볍게 챙기다', sentence: "I always try to travel light.", translation: "난 항상 짐을 최소한으로 챙기려고 해." }
      ]
    },
    dating: {
      title: '연애/데이트', icon: '❤️', count: 10,
      words: [
        { word: 'Crush on someone', meaning: '누구에게 반하다', sentence: "I have a crush on her since high school.", translation: "고등학생 때부터 그녀에게 반했어." },
        { word: 'Blind date', meaning: '소개팅', sentence: "I have a blind date tonight.", translation: "오늘 밤에 소개팅이 있어." }
      ]
    },
    slang: {
      title: 'MZ 슬랭', icon: '🔥', count: 5,
      words: [
        { word: 'No cap', meaning: '거짓말 안 하고 (진짜로)', sentence: "That movie was the best, no cap.", translation: "그 영화 진짜 최고였어, 구라 안 치고." },
        { word: 'Flex', meaning: '자랑하다', sentence: "He's just trying to flex his new car.", translation: "그는 그냥 새 차를 자랑하려는 거야." }
      ]
    }
  };

  const RANK_DATA = {
    'Unranked': { title: '등급 없음', desc: '테스트를 통해 등급을 확인하세요.' },
    'A1': { title: '입문자 (Beginner)', desc: '기본적인 단어와 아주 간단한 문장을 이해합니다.' },
    'A2': { title: '초보자 (Elementary)', desc: '일상적인 주제에 대해 짧은 대화를 나눌 수 있습니다.' },
    'B1': { title: '중급자 (Intermediate)', desc: '친숙한 주제에 대해 자신의 의견을 표현할 수 있습니다.' },
    'B2': { title: '능숙자 (Upper Intermediate)', desc: '복잡한 문장을 이해하고 자연스럽게 소통합니다.' },
    'C1': { title: '고급자 (Advanced)', desc: '광범위하고 까다로운 주제를 유창하게 다룹니다.' },
    'C2': { title: '전문가 (Master)', desc: '원어민에 가까운 수준으로 언어를 완벽히 구사합니다.' }
  };

  const TEST_QUESTIONS = [
    { q: 'He ____ to school every day.', options: ['go', 'goes', 'going', 'went'], correct: 'goes' },
    { q: 'I haven\'t seen him ____ last year.', options: ['for', 'since', 'during', 'at'], correct: 'since' },
    { q: 'If it ____ tomorrow, we will stay home.', options: ['rain', 'rains', 'will rain', 'rained'], correct: 'rains' },
    { q: 'Choose the synonym of "Tiny":', options: ['Huge', 'Small', 'Fast', 'Heavy'], correct: 'Small' },
    { q: 'She is interested ____ learning art.', options: ['on', 'at', 'in', 'with'], correct: 'in' },
    { q: 'I wish I ____ a billionaire.', options: ['am', 'was', 'were', 'be'], correct: 'were' },
    { q: 'The movie was ____ than I expected.', options: ['good', 'better', 'best', 'more good'], correct: 'better' },
    { q: 'Would you mind ____ the window?', options: ['open', 'to open', 'opening', 'opened'], correct: 'opening' },
    { q: 'He ____ his keys. He is looking for them now.', options: ['lost', 'has lost', 'had lost', 'loses'], correct: 'has lost' },
    { q: 'The term "Piece of cake" means:', options: ['Very difficult', 'Delicious', 'Very easy', 'A small slice'], correct: 'Very easy' }
  ];

  // Battle Opponents
  const OPPONENTS = ['John', 'Emma', 'David', 'Sarah', 'Michael', 'Kate', 'Alex', 'Olivia'];

  let lessonState = { currentIndex: 0, isFlipped: false, currentList: [] };
  let quizState = { currentIndex: 0, questions: [], correctCount: 0 };
  let testState = { currentIndex: 0, score: 0, startTime: null };
  let battleState = { currentIndex: 0, myScore: 0, oppScore: 0, timer: null, timeLeft: 100 };

  function init() {
    initAuthSDKs();
    setupAuthEvents();
    setupNavigation();
    setupLessonEvents();
    setupQuizEvents();
    setupProfileEvents();
    setupTestEvents();
    setupBattleEvents();
    renderLibrary();
    
    const user = Store.getUser();
    if (user.isLoggedIn) completeLogin();
    else showLogin();
  }

  // --- Auth SDK ---
  function initAuthSDKs() {
    if (typeof Kakao !== 'undefined' && !Kakao.isInitialized()) {
      Kakao.init('b576096ad9422df403f0cba82cbd51e7'); 
    }
    window.handleGoogleResponse = (response) => {
      const payload = JSON.parse(atob(response.credential.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
      onLoginSuccess(payload.name, 'google');
    };
    if (typeof google !== 'undefined') {
      google.accounts.id.initialize({
        client_id: "AIzaSyD4T4VDf8NtKXxWXKWy45OqaHfAsR5mODo", 
        callback: window.handleGoogleResponse
      });
    }
  }

  function setupAuthEvents() {
    if (elements.kakaoLogin) elements.kakaoLogin.addEventListener('click', loginWithKakao);
    if (elements.googleLogin) elements.googleLogin.addEventListener('click', () => google.accounts.id.prompt());
    if (elements.guestLogin) elements.guestLogin.addEventListener('click', () => onLoginSuccess('게스트', 'guest'));
  }

  function loginWithKakao() {
    if (typeof Kakao === 'undefined' || !Kakao.isInitialized()) return alert('Kakao SDK 로딩 중...');
    Kakao.Auth.login({
      success: () => Kakao.API.request({ url: '/v2/user/me', success: (res) => onLoginSuccess(res.kakao_account.profile.nickname, 'kakao') }),
      fail: (err) => console.error(err)
    });
  }

  function onLoginSuccess(name, type) {
    const user = Store.getUser();
    user.name = name; user.isLoggedIn = true; user.authType = type;
    Store.setUser(user); completeLogin();
  }

  function showLogin() {
    elements.loginSection.style.display = 'flex';
    if (elements.appHeader) elements.appHeader.style.display = 'none';
    if (elements.bottomNav) elements.bottomNav.style.display = 'none';
    elements.sections.forEach(s => { if (s.id !== 'loginSection') s.style.display = 'none'; });
  }

  function completeLogin() {
    elements.loginSection.style.display = 'none';
    if (elements.appHeader) elements.appHeader.style.display = 'flex';
    if (elements.bottomNav) elements.bottomNav.style.display = 'flex';
    switchSection('home'); updateUI();
  }

  // --- Navigation ---
  function setupNavigation() {
    elements.navItems.forEach(item => {
      item.addEventListener('click', () => switchSection(item.getAttribute('data-target')));
    });
  }

  function switchSection(target) {
    const isSpecial = ['learning', 'quiz', 'test', 'result', 'login', 'battle'].includes(target);
    if (elements.bottomNav) elements.bottomNav.style.display = isSpecial ? 'none' : 'flex';
    if (elements.appHeader) elements.appHeader.style.display = target === 'login' ? 'none' : 'flex';
    elements.navItems.forEach(nav => nav.classList.toggle('active', nav.getAttribute('data-target') === target));
    elements.sections.forEach(section => { if (section) section.style.display = section.id === `${target}Section` ? 'block' : 'none'; });
  }

  // --- UI Update ---
  function updateUI() {
    const user = Store.getUser();
    const streak = Gamification.updateStreak();
    const levelInfo = Gamification.getLevelInfo(user.xp);
    const daily = Gamification.getDailyProgress();
    if (elements.streakCount) elements.streakCount.textContent = streak.count || 0;
    if (elements.totalXp) elements.totalXp.textContent = user.xp || 0;
    if (elements.userLevelIcon) elements.userLevelIcon.textContent = levelInfo.current.icon;
    if (elements.userLevelTitle) elements.userLevelTitle.textContent = levelInfo.current.title;
    if (elements.userName) elements.userName.textContent = user.name;
    if (elements.remainingXp) elements.remainingXp.textContent = Math.max(0, daily.goal - daily.current);
    if (elements.dailyProgressBar) elements.dailyProgressBar.style.width = `${daily.pct}%`;
    if (elements.dailyProgressText) elements.dailyProgressText.textContent = `${daily.cards}/${daily.goalCards}`;
    if (elements.profileName) elements.profileName.textContent = `${user.name}님`;
    if (elements.profileLevelIcon) elements.profileLevelIcon.textContent = levelInfo.current.icon;
    if (elements.profileLevelTitle) elements.profileLevelTitle.textContent = `${levelInfo.current.title} (Level ${levelInfo.current.level})`;
    if (elements.statTotalXp) elements.statTotalXp.textContent = user.xp;
    if (elements.statStreak) elements.statStreak.textContent = streak.count;
    if (elements.statLevel) elements.statLevel.textContent = levelInfo.current.level;
    if (elements.testStatusText) {
      const rank = user.currentRank || 'Unranked';
      elements.testStatusText.textContent = rank === 'Unranked' ? '내 등급을 확인해보세요!' : `현재 등급: ${rank} (${RANK_DATA[rank].title})`;
    }
  }

  // --- Shared Setup ---
  function renderLibrary() {
    if (!elements.categoryGrid) return;
    elements.categoryGrid.innerHTML = '';
    Object.keys(LESSON_DATA).forEach(key => {
      const cat = LESSON_DATA[key];
      const card = document.createElement('div');
      card.className = 'category-card';
      card.innerHTML = `<div class="cat-icon">${cat.icon}</div><div class="cat-info"><h4>${cat.title}</h4><p>${cat.count} Expressions</p></div><div class="cat-badge">NEW</div>`;
      card.addEventListener('click', () => startLesson(key));
      elements.categoryGrid.appendChild(card);
    });
  }

  function startLesson(categoryKey = 'daily') {
    const category = LESSON_DATA[categoryKey] || LESSON_DATA.daily;
    lessonState.currentList = category.words; lessonState.currentIndex = 0; lessonState.isFlipped = false;
    renderCard(); switchSection('learning');
  }

  function renderCard() {
    const data = lessonState.currentList[lessonState.currentIndex];
    if (!data) return;
    elements.cardWord.textContent = data.word; elements.cardMeaning.textContent = data.meaning;
    elements.cardSentence.textContent = data.sentence; elements.cardTranslation.textContent = data.translation;
    elements.activeCard.classList.remove('is-flipped'); lessonState.isFlipped = false;
    const progress = ((lessonState.currentIndex + 1) / lessonState.currentList.length) * 100;
    elements.lessonProgressBar.style.width = `${progress}%`;
    elements.lessonProgressText.textContent = `${lessonState.currentIndex + 1}/${lessonState.currentList.length}`;
  }

  function handleSwipe(direction) {
    const feedback = direction === 'right' ? elements.feedbackLike : elements.feedbackNope;
    if (feedback) feedback.style.opacity = '1';
    const moveX = direction === 'right' ? 500 : -500;
    const rotate = direction === 'right' ? 30 : -30;
    elements.activeCard.style.transform = `translateX(${moveX}px) rotate(${rotate}deg)`;
    elements.activeCard.style.opacity = '0';
    setTimeout(() => {
      if (feedback) feedback.style.opacity = '0';
      Gamification.awardXP('CARD_SEEN');
      lessonState.currentIndex++;
      if (lessonState.currentIndex < lessonState.currentList.length) {
        elements.activeCard.style.transition = 'none'; elements.activeCard.style.transform = 'none';
        elements.activeCard.style.opacity = '1'; renderCard();
        setTimeout(() => { elements.activeCard.style.transition = ''; }, 10);
      } else { finishLesson(); }
      updateUI();
    }, 300);
  }

  function finishLesson() {
    alert('오늘의 학습 완료! XP 보너스를 획득했습니다.');
    Gamification.awardXP('DAILY_GOAL'); switchSection('home');
  }

  function setupLessonEvents() {
    if (elements.btnFlip) elements.btnFlip.addEventListener('click', () => {
      lessonState.isFlipped = !lessonState.isFlipped;
      elements.activeCard.classList.toggle('is-flipped', lessonState.isFlipped);
    });
    if (elements.activeCard) elements.activeCard.addEventListener('click', (e) => {
      if (!e.target.closest('.audio-btn')) elements.btnFlip.click();
    });
    if (elements.btnLike) elements.btnLike.addEventListener('click', () => handleSwipe('right'));
    if (elements.btnNope) elements.btnNope.addEventListener('click', () => handleSwipe('left'));
    if (elements.closeLearning) elements.closeLearning.addEventListener('click', () => switchSection('home'));
    if (elements.startTodayLesson) elements.startTodayLesson.addEventListener('click', () => startLesson('daily'));
    elements.homeCategories.forEach(btn => btn.addEventListener('click', () => startLesson(btn.getAttribute('data-category'))));
  }

  function setupQuizEvents() {
    if (elements.startQuizBtn) elements.startQuizBtn.addEventListener('click', startQuiz);
    if (elements.closeQuiz) elements.closeQuiz.addEventListener('click', () => switchSection('practice'));
    if (elements.nextQuizBtn) elements.nextQuizBtn.addEventListener('click', nextQuestion);
  }

  function startQuiz() {
    quizState.currentIndex = 0; quizState.correctCount = 0;
    const allWords = Object.values(LESSON_DATA).flatMap(cat => cat.words);
    quizState.questions = [...allWords].sort(() => 0.5 - Math.random()).slice(0, 5);
    renderQuizQuestion(); switchSection('quiz');
  }

  function renderQuizQuestion() {
    const q = quizState.questions[quizState.currentIndex];
    elements.quizQuestion.textContent = `"${q.word}"의 뜻은?`;
    elements.quizFeedback.style.display = 'none';
    const allMeanings = Object.values(LESSON_DATA).flatMap(cat => cat.words.map(w => w.meaning));
    const wrongOptions = allMeanings.filter(m => m !== q.meaning).sort(() => 0.5 - Math.random()).slice(0, 3);
    const options = [q.meaning, ...wrongOptions].sort(() => 0.5 - Math.random());
    elements.quizOptions.innerHTML = '';
    options.forEach(opt => {
      const btn = document.createElement('button'); btn.className = 'option-btn'; btn.textContent = opt;
      btn.addEventListener('click', () => checkAnswer(btn, opt, q.meaning));
      elements.quizOptions.appendChild(btn);
    });
    const progress = (quizState.currentIndex / quizState.questions.length) * 100;
    elements.quizProgressBar.style.width = `${progress}%`;
    elements.quizProgressText.textContent = `${quizState.currentIndex + 1}/${quizState.questions.length}`;
  }

  function checkAnswer(btn, selected, correct) {
    if (elements.quizFeedback.style.display === 'block') return;
    const isCorrect = selected === correct;
    btn.classList.add(isCorrect ? 'correct' : 'wrong');
    if (!isCorrect) Array.from(elements.quizOptions.children).forEach(b => { if (b.textContent === correct) b.classList.add('correct'); });
    else { quizState.correctCount++; Gamification.awardXP('QUIZ_CORRECT'); }
    elements.feedbackStatus.textContent = isCorrect ? '정답입니다!' : '아쉬워요!';
    elements.feedbackMeaning.textContent = `${quizState.questions[quizState.currentIndex].word}: ${correct}`;
    elements.quizFeedback.style.display = 'block';
    const fbColor = isCorrect ? '#22c55e' : '#ef4444';
    const fbBg = isCorrect ? '#dcfce7' : '#fee2e2';
    elements.quizFeedback.style.borderTopColor = fbColor;
    elements.feedbackIconBox.style.background = fbBg;
    elements.feedbackIconBox.style.color = fbColor;
    elements.fbIcon.setAttribute('data-lucide', isCorrect ? 'check-circle' : 'alert-circle');
    lucide.createIcons(); updateUI();
  }

  function nextQuestion() {
    quizState.currentIndex++;
    if (quizState.currentIndex < quizState.questions.length) renderQuizQuestion();
    else finishQuiz();
  }

  function finishQuiz() {
    alert(`퀴즈 완료! 성적: ${quizState.correctCount}/${quizState.questions.length}`);
    if (quizState.correctCount === quizState.questions.length) Gamification.awardXP('PERFECT_SESSION');
    switchSection('practice');
  }

  function setupTestEvents() {
    if (elements.startTestBtn) elements.startTestBtn.addEventListener('click', startTest);
    if (elements.closeTest) elements.closeTest.addEventListener('click', () => switchSection('practice'));
    if (elements.backToPractice) elements.backToPractice.addEventListener('click', () => switchSection('practice'));
  }

  function startTest() {
    testState.currentIndex = 0; testState.score = 0; testState.startTime = new Date();
    renderTestQuestion(); switchSection('test');
  }

  function renderTestQuestion() {
    const q = TEST_QUESTIONS[testState.currentIndex];
    elements.testQuestion.textContent = q.q; elements.testOptions.innerHTML = '';
    q.options.forEach(opt => {
      const btn = document.createElement('button'); btn.className = 'option-btn'; btn.textContent = opt;
      btn.addEventListener('click', () => { if (opt === q.correct) testState.score++; nextTestStep(); });
      elements.testOptions.appendChild(btn);
    });
    const progress = (testState.currentIndex / TEST_QUESTIONS.length) * 100;
    elements.testProgressBar.style.width = `${progress}%`;
    elements.testProgressText.textContent = `${testState.currentIndex + 1}/${TEST_QUESTIONS.length}`;
  }

  function nextTestStep() {
    testState.currentIndex++;
    if (testState.currentIndex < TEST_QUESTIONS.length) renderTestQuestion();
    else showTestResult();
  }

  function showTestResult() {
    const score = testState.score;
    let rank = 'A1';
    if (score >= 10) rank = 'C2'; else if (score >= 9) rank = 'C1'; else if (score >= 7) rank = 'B2';
    else if (score >= 5) rank = 'B1'; else if (score >= 3) rank = 'A2';
    const data = RANK_DATA[rank];
    elements.resultRankBadge.textContent = rank; elements.resultRankTitle.textContent = data.title;
    elements.resultRankDesc.textContent = data.desc; elements.testScore.textContent = `${score}/${TEST_QUESTIONS.length}`;
    const timeTaken = Math.floor((new Date() - testState.startTime) / 1000);
    elements.testTime.textContent = `${Math.floor(timeTaken/60)}:${(timeTaken%60).toString().padStart(2,'0')}`;
    const user = Store.getUser(); user.currentRank = rank; user.lastTestDate = new Date().toISOString();
    Store.setUser(user); updateUI(); switchSection('result');
  }

  // --- Battle Logic ---
  function setupBattleEvents() {
    if (elements.startBattleBtn) elements.startBattleBtn.addEventListener('click', tryStartBattle);
    if (elements.closeBattle) elements.closeBattle.addEventListener('click', () => switchSection('practice'));
  }

  function tryStartBattle() {
    const user = Store.getUser();
    if ((user.xp || 0) < 50) {
      alert('XP가 부족합니다! 배틀에 참여하려면 최소 50 XP가 필요합니다.');
      return;
    }
    startMatchmaking();
  }

  function startMatchmaking() {
    switchSection('battle');
    elements.battleLobby.style.display = 'block';
    elements.battleGame.style.display = 'none';
    elements.battleResult.style.display = 'none';
    
    elements.myBattleName.textContent = Store.getUser().name;
    elements.oppBattleName.textContent = '찾는 중...';

    // Simulate Matchmaking (2 seconds)
    setTimeout(() => {
      const randomOpp = OPPONENTS[Math.floor(Math.random() * OPPONENTS.length)];
      elements.oppBattleName.textContent = randomOpp;
      setTimeout(() => startBattleRound(), 1000);
    }, 2000);
  }

  function startBattleRound() {
    elements.battleLobby.style.display = 'none';
    elements.battleGame.style.display = 'block';
    
    battleState = { currentIndex: 0, myScore: 0, oppScore: 0, timeLeft: 100 };
    updateBattleScore();
    nextBattleQuestion();
  }

  function nextBattleQuestion() {
    if (battleState.currentIndex >= 5) {
      endBattle();
      return;
    }

    const q = TEST_QUESTIONS[battleState.currentIndex % TEST_QUESTIONS.length];
    elements.battleQuestion.textContent = q.q;
    elements.battleOptions.innerHTML = '';
    
    battleState.timeLeft = 100;
    runBattleTimer();

    q.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = opt;
      btn.addEventListener('click', () => handleBattleAnswer(opt, q.correct));
      elements.battleOptions.appendChild(btn);
    });
  }

  function runBattleTimer() {
    clearInterval(battleState.timer);
    battleState.timer = setInterval(() => {
      battleState.timeLeft -= 2;
      elements.battleTimerBar.style.width = `${battleState.timeLeft}%`;
      
      // Simulate Opponent Answer
      if (Math.random() > 0.95) {
        const isCorrect = Math.random() > 0.4;
        if (isCorrect) battleState.oppScore++;
        updateBattleScore();
      }

      if (battleState.timeLeft <= 0) {
        clearInterval(battleState.timer);
        battleState.currentIndex++;
        nextBattleQuestion();
      }
    }, 100);
  }

  function handleBattleAnswer(selected, correct) {
    clearInterval(battleState.timer);
    if (selected === correct) battleState.myScore++;
    updateBattleScore();
    setTimeout(() => {
      battleState.currentIndex++;
      nextBattleQuestion();
    }, 500);
  }

  function updateBattleScore() {
    elements.myScore.textContent = battleState.myScore;
    elements.oppScore.textContent = battleState.oppScore;
  }

  function endBattle() {
    elements.battleGame.style.display = 'none';
    elements.battleResult.style.display = 'block';
    
    const isWin = battleState.myScore > battleState.oppScore;
    const isDraw = battleState.myScore === battleState.oppScore;
    
    let xpChange = 0;
    if (isWin) {
      xpChange = 50;
      elements.battleResultTitle.textContent = 'WIN!';
      elements.battleResultTitle.style.color = '#22c55e';
      elements.battleReward.textContent = '+50 XP (상대방 XP 획득!)';
    } else if (isDraw) {
      xpChange = 0;
      elements.battleResultTitle.textContent = 'DRAW';
      elements.battleResultTitle.style.color = '#7e22ce';
      elements.battleReward.textContent = '0 XP (배팅 금액 반환)';
    } else {
      xpChange = -50;
      elements.battleResultTitle.textContent = 'LOSE...';
      elements.battleResultTitle.style.color = '#ef4444';
      elements.battleReward.textContent = '-50 XP (배팅 금액 상실)';
    }

    Gamification.awardXP('BATTLE', xpChange);
    updateUI();
  }

  function setupProfileEvents() {
    if (elements.editNameBtn) elements.editNameBtn.addEventListener('click', () => {
      const newName = prompt('새로운 이름을 입력하세요:', Store.getUser().name);
      if (newName && newName.trim()) { const user = Store.getUser(); user.name = newName.trim(); Store.setUser(user); updateUI(); }
    });
    if (elements.resetProgressBtn) elements.resetProgressBtn.addEventListener('click', () => {
      if (confirm('모든 학습 데이터가 초기화됩니다. 정말 진행하시겠습니까?')) { localStorage.clear(); location.reload(); }
    });
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', App.init);
