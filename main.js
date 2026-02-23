// main.js - Comprehensive App Logic with Social Login Stability & Onboarding

const App = (() => {
  // DOM Elements
  const elements = {
    streakCount: document.getElementById('streakCount'),
    totalCoins: document.getElementById('totalCoins'),
    userLevelIcon: document.getElementById('userLevelIcon'),
    userLevelTitle: document.getElementById('userLevelTitle'),
    userName: document.getElementById('userName'),
    remainingCoins: document.getElementById('remainingCoins'),
    dailyProgressBar: document.getElementById('dailyProgressBar'),
    dailyProgressText: document.getElementById('dailyProgressText'),
    navItems: document.querySelectorAll('.nav-item'),
    sections: document.querySelectorAll('.section'),
    startTodayLesson: document.getElementById('startTodayLesson'),
    categoryGrid: document.getElementById('categoryGrid'),
    homeCategories: document.querySelectorAll('.cat-item'),
    appHeader: document.querySelector('.header'),
    bottomNav: document.querySelector('.bottom-nav'),
    headerProfileBtn: document.getElementById('headerProfileBtn'),
    headerUserIcon: document.getElementById('headerUserIcon'),
    
    // Auth Elements
    loginSection: document.getElementById('loginSection'),
    kakaoLogin: document.getElementById('kakaoLogin'),
    googleLogin: document.getElementById('googleLogin'),
    guestLogin: document.getElementById('guestLogin'),
    logoutBtn: document.getElementById('logoutBtn'),

    // Onboarding Elements
    onboardingSection: document.getElementById('onboardingSection'),
    onboardingNickname: document.getElementById('onboardingNickname'),
    genderBtns: document.querySelectorAll('.btn-gender'),
    saveOnboardingBtn: document.getElementById('saveOnboardingBtn'),

    // Avatar Display Elements
    profileAvatarHat: document.getElementById('profileAvatarHat'),
    profileAvatarAura: document.getElementById('profileAvatarAura'),
    profileAvatarBg: document.getElementById('profileAvatarBg'),
    shopPreviewHat: document.getElementById('shopPreviewHat'),
    shopPreviewAura: document.getElementById('shopPreviewAura'),
    shopPreviewBg: document.getElementById('shopPreviewBg'),

    // Shop Elements
    shopGrid: document.getElementById('shopGrid'),
    inventoryList: document.getElementById('inventoryList'),
    shopTabs: document.querySelectorAll('.shop-tab'),

    // Learning & Quiz (Same as before)
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
    statTotalCoins: document.getElementById('statTotalCoins'),
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
    closeBattle: document.getElementById('closeBattle'),
    shareBattleBtn: document.getElementById('shareBattleBtn')
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

  const SHOP_ITEMS = [
    // HATS
    { id: 'hat_crown', category: 'hat', name: '황금 왕관', price: 500, value: '👑' },
    { id: 'hat_cap', category: 'hat', name: '블루 캡', price: 100, value: '🧢' },
    { id: 'hat_headset', category: 'hat', name: '게이밍 헤드셋', price: 250, value: '🎧' },
    { id: 'hat_sunglasses', category: 'hat', name: '힙합 선글라스', price: 150, value: '🕶️' },
    { id: 'hat_devil', category: 'hat', name: '악마 뿔', price: 300, value: '😈' },
    
    // AURAS
    { id: 'aura_fire', category: 'aura', name: '열정의 불꽃', price: 400, value: '🔥' },
    { id: 'aura_sparkle', category: 'aura', name: '반짝이는 별', price: 200, value: '✨' },
    { id: 'aura_wings', category: 'aura', name: '천사의 날개', price: 600, value: '🕊️' },
    { id: 'aura_rainbow', category: 'aura', name: '무지개 오라', price: 350, value: '🌈' },

    // BACKGROUNDS
    { id: 'bg_city', category: 'bg', name: '잠들지 않는 도시', price: 300, value: 'linear-gradient(to bottom, #1e293b, #334155)' },
    { id: 'bg_forest', category: 'bg', name: '고요한 숲', price: 200, value: 'linear-gradient(to bottom, #065f46, #064e3b)' },
    { id: 'bg_space', category: 'bg', name: '신비로운 우주', price: 500, value: 'radial-gradient(circle, #4c1d95, #1e1b4b)' }
  ];

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

  // Battle Opponents (Fallback)
  const OPPONENTS = ['John', 'Emma', 'David', 'Sarah', 'Michael', 'Kate', 'Alex', 'Olivia'];

  let lessonState = { currentIndex: 0, isFlipped: false, currentList: [] };
  let quizState = { currentIndex: 0, questions: [], correctCount: 0 };
  let testState = { currentIndex: 0, score: 0, startTime: null };
  let battleState = { currentIndex: 0, myScore: 0, oppScore: 0, timer: null, timeLeft: 100 };
  let onboardingData = { gender: '' };
  let currentShopCategory = 'hat';

  function init() {
    initAuthSDKs();
    setupAuthEvents();
    setupOnboardingEvents();
    setupNavigation();
    if (elements.headerProfileBtn) {
      elements.headerProfileBtn.addEventListener('click', () => {
        const user = Store.getUser();
        if (user.authType === 'guest' || !user.isLoggedIn) showLogin();
        else switchSection('profile');
      });
    }
    setupLessonEvents();
    setupQuizEvents();
    setupProfileEvents();
    setupTestEvents();
    setupBattleEvents();
    setupShopEvents();
    renderLibrary();
    
    // Check for Deep Link (Challenge)
    const urlParams = new URLSearchParams(window.location.search);
    const challengeId = urlParams.get('challenge');
    
    if (challengeId) {
      handleChallenge(challengeId);
    }

    const user = Store.getUser();
    if (user.isLoggedIn) completeLogin();
    else showLogin();
  }

  // --- Auth SDK ---
  function initAuthSDKs() {
    const KAKAO_KEY = '8330b9a35b2856398ca6679bc44c23ae';
    const GOOGLE_CLIENT_ID = '788651995754-gtaeksuj0ndhmtc76mjsccfg6u2c67sr.apps.googleusercontent.com';

    // Kakao Init (v1)
    const tryInitKakao = (retries = 0) => {
      if (typeof Kakao !== 'undefined') {
        try {
          if (!Kakao.isInitialized()) {
            Kakao.init(KAKAO_KEY);
            console.log('Kakao SDK Initialized: Success');
          }
        } catch (e) {
          console.error('Kakao Init Error:', e);
        }
      } else if (retries < 10) {
        setTimeout(() => tryInitKakao(retries + 1), 500);
      }
    };
    tryInitKakao();

    // Google Init
    window.handleGoogleResponse = (response) => {
      try {
        const payload = JSON.parse(atob(response.credential.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
        onLoginSuccess(payload.name, 'google');
      } catch (e) {
        console.error('Google Auth Error:', e);
      }
    };

    const tryInitGoogle = (retries = 0) => {
      if (typeof google !== 'undefined' && google.accounts) {
        google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: window.handleGoogleResponse
        });
      } else if (retries < 10) {
        setTimeout(() => tryInitGoogle(retries + 1), 500);
      }
    };
    tryInitGoogle();
  }

  function setupAuthEvents() {
    if (elements.kakaoLogin) elements.kakaoLogin.addEventListener('click', loginWithKakao);
    if (elements.googleLogin) elements.googleLogin.addEventListener('click', () => {
      if (typeof google === 'undefined' || !google.accounts) return alert('구글 SDK 로딩 중...');
      google.accounts.id.prompt();
    });
    if (elements.guestLogin) elements.guestLogin.addEventListener('click', () => onLoginSuccess('게스트', 'guest'));
  }

  function setupOnboardingEvents() {
    elements.genderBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        elements.genderBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        onboardingData.gender = btn.getAttribute('data-gender');
      });
    });

    if (elements.saveOnboardingBtn) {
      elements.saveOnboardingBtn.addEventListener('click', () => {
        const name = elements.onboardingNickname.value.trim();
        if (!name) return alert('닉네임을 입력해 주세요.');
        if (!onboardingData.gender) return alert('성별을 선택해 주세요.');

        const user = Store.getUser();
        user.name = name;
        user.gender = onboardingData.gender;
        user.onboarded = true;
        user.equipped = { hat: null, aura: null, bg: null };
        user.inventory = [];
        Store.setUser(user);

        alert('프로필 설정 완료! 실력 진단 테스트를 시작합니다.');
        startTest();
      });
    }
  }

  function loginWithKakao() {
    if (typeof Kakao === 'undefined' || !Kakao.isInitialized()) return alert('카카오 SDK 로딩 중입니다. 잠시 후 다시 시도해 주세요.');
    Kakao.Auth.login({
      success: () => {
        Kakao.API.request({
          url: '/v2/user/me',
          success: (res) => onLoginSuccess(res.kakao_account.profile.nickname, 'kakao'),
          fail: (err) => {
            console.error('Kakao User Info Error:', err);
            alert('사용자 정보를 가져오지 못했습니다.');
          }
        });
      },
      fail: (err) => {
        console.error('Kakao Login Error:', err);
        alert('카카오 로그인에 실패했습니다. 도메인 설정이나 팝업 차단을 확인해 주세요.');
      }
    });
  }

  function onLoginSuccess(name, type) {
    const user = Store.getUser();
    user.name = name; 
    user.isLoggedIn = true; 
    user.authType = type;
    Store.setUser(user); 
    
    if (!user.onboarded) {
      showOnboarding();
    } else {
      completeLogin();
    }
  }

  function showOnboarding() {
    elements.loginSection.style.display = 'none';
    elements.onboardingSection.style.display = 'block';
    if (elements.appHeader) elements.appHeader.style.display = 'none';
    if (elements.bottomNav) elements.bottomNav.style.display = 'none';
    elements.onboardingNickname.value = Store.getUser().name;
  }

  function showLogin() {
    elements.loginSection.style.display = 'flex';
    if (elements.appHeader) elements.appHeader.style.display = 'none';
    if (elements.bottomNav) elements.bottomNav.style.display = 'none';
    elements.sections.forEach(s => { if (s.id !== 'loginSection') s.style.display = 'none'; });
  }

  function completeLogin() {
    elements.loginSection.style.display = 'none';
    elements.onboardingSection.style.display = 'none';
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
    const isSpecial = ['learning', 'quiz', 'test', 'result', 'login', 'battle', 'onboarding'].includes(target);
    if (elements.bottomNav) elements.bottomNav.style.display = isSpecial ? 'none' : 'flex';
    if (elements.appHeader) elements.appHeader.style.display = (target === 'login' || target === 'onboarding') ? 'none' : 'flex';
    elements.navItems.forEach(nav => nav.classList.toggle('active', nav.getAttribute('data-target') === target));
    elements.sections.forEach(section => { if (section) section.style.display = section.id === `${target}Section` ? 'block' : 'none'; });
    
    if (target === 'shop') renderShop();
    if (target === 'profile') updateAvatarDisplay('profile');
  }

  // --- UI Update ---
  function updateUI() {
    const user = Store.getUser();
    const streak = Gamification.updateStreak();
    const levelInfo = Gamification.getLevelInfo(user.coins);
    const daily = Gamification.getDailyProgress();
    if (elements.streakCount) elements.streakCount.textContent = streak.count || 0;
    if (elements.totalCoins) elements.totalCoins.textContent = user.coins || 0;
    if (elements.userLevelIcon) elements.userLevelIcon.textContent = levelInfo.current.icon;
    if (elements.userLevelTitle) elements.userLevelTitle.textContent = levelInfo.current.title;
    if (elements.userName) elements.userName.textContent = user.name;
    
    // Header Profile Button Update
    if (elements.headerProfileBtn && elements.headerUserIcon) {
      const isGuest = user.authType === 'guest' || !user.isLoggedIn;
      elements.headerProfileBtn.classList.toggle('is-guest', isGuest);
      elements.headerUserIcon.textContent = isGuest ? '로그인' : levelInfo.current.icon;
    }

    if (elements.remainingCoins) elements.remainingCoins.textContent = Math.max(0, daily.goal - daily.current);
    if (elements.dailyProgressBar) elements.dailyProgressBar.style.width = `${daily.pct}%`;
    if (elements.dailyProgressText) elements.dailyProgressText.textContent = `${daily.cards}/${daily.goalCards}`;
    if (elements.profileName) elements.profileName.textContent = `${user.name}님`;
    if (elements.profileLevelIcon) elements.profileLevelIcon.textContent = levelInfo.current.icon;
    if (elements.profileLevelTitle) elements.profileLevelTitle.textContent = `${levelInfo.current.title} (Level ${levelInfo.current.level})`;
    if (elements.statTotalCoins) elements.statTotalCoins.textContent = user.coins;
    if (elements.statStreak) elements.statStreak.textContent = streak.count;
    if (elements.statLevel) elements.statLevel.textContent = levelInfo.current.level;
    if (elements.testStatusText) {
      const rank = user.currentRank || 'Unranked';
      elements.testStatusText.textContent = rank === 'Unranked' ? '내 등급을 확인해보세요!' : `현재 등급: ${rank} (${RANK_DATA[rank].title})`;
    }

    updateAvatarDisplay('profile');
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
      Gamification.awardCoins('CARD_SEEN');
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
    alert('오늘의 학습 완료! 코인 보너스를 획득했습니다.');
    Gamification.awardCoins('DAILY_GOAL'); switchSection('home');
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
    else { quizState.correctCount++; Gamification.awardCoins('QUIZ_CORRECT'); }
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
    if (quizState.correctCount === quizState.questions.length) Gamification.awardCoins('PERFECT_SESSION');
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
    if (elements.shareBattleBtn) elements.shareBattleBtn.addEventListener('click', shareBattleToKakao);
  }

  function shareBattleToKakao() {
    if (typeof Kakao === 'undefined' || !Kakao.isInitialized()) return alert('카카오 SDK 로딩 중입니다. 잠시 후 다시 시도해 주세요.');
    
    try {
      const user = Store.getUser();
      const challengeId = `CH-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      
      // Force literal domain string to ensure absolute match with Kakao Console
      const challengeUrl = `https://wordlearning-6ae.pages.dev/?challenge=${challengeId}&inviter=${encodeURIComponent(user.name)}`;

      console.log('Sending Kakao Share URL:', challengeUrl);

      Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: `⚔️ ${user.name}님의 결투 신청!`,
          description: '50 코인을 건 승부가 시작됩니다. 지금 바로 도전하세요!',
          imageUrl: 'https://imhen97.github.io/wordlearning/logo_orange.png', 
          link: {
            mobileWebUrl: challengeUrl,
            webUrl: challengeUrl,
          },
        },
        buttons: [
          {
            title: '도전 수락하기',
            link: {
              mobileWebUrl: challengeUrl,
              webUrl: challengeUrl,
            },
          },
        ],
      });
    } catch (e) {
      console.error('Kakao Share Exception:', e);
      alert('공유 시도 중 오류가 발생했습니다. 브라우저 콘솔을 확인해 주세요.');
    }
  }

  function handleChallenge(challengeId) {
    const urlParams = new URLSearchParams(window.location.search);
    const inviterName = urlParams.get('inviter') || '익명의 도전자';
    
    // Auto-navigate to battle screen if logged in
    const user = Store.getUser();
    if (user.isLoggedIn) {
      if (confirm(`${inviterName}님의 결투 신청이 도착했습니다! 지금 바로 배틀을 시작하시겠습니까?`)) {
        setTimeout(() => {
          switchSection('battle');
          elements.battleLobby.style.display = 'block'; 
          elements.battleGame.style.display = 'none'; 
          elements.battleResult.style.display = 'none';
          elements.myBattleName.textContent = user.name; 
          elements.oppBattleName.textContent = inviterName;
          
          setTimeout(() => startBattleRound(), 2000);
        }, 500);
      }
    }
  }

  function tryStartBattle() {
    const user = Store.getUser();
    if ((user.coins || 0) < 50) return alert('코인이 부족합니다! 배틀에 참여하려면 최소 50 코인이 필요합니다.');
    startMatchmaking();
  }

  function startMatchmaking() {
    switchSection('battle');
    elements.battleLobby.style.display = 'block'; elements.battleGame.style.display = 'none'; elements.battleResult.style.display = 'none';
    elements.myBattleName.textContent = Store.getUser().name; elements.oppBattleName.textContent = '찾는 중...';
    setTimeout(() => {
      const randomOpp = OPPONENTS[Math.floor(Math.random() * OPPONENTS.length)];
      elements.oppBattleName.textContent = randomOpp;
      setTimeout(() => startBattleRound(), 1000);
    }, 2000);
  }

  function startBattleRound() {
    elements.battleLobby.style.display = 'none'; elements.battleGame.style.display = 'block';
    battleState = { currentIndex: 0, myScore: 0, oppScore: 0, timeLeft: 100 };
    updateBattleScore(); nextBattleQuestion();
  }

  function nextBattleQuestion() {
    if (battleState.currentIndex >= 5) return endBattle();
    const q = TEST_QUESTIONS[battleState.currentIndex % TEST_QUESTIONS.length];
    elements.battleQuestion.textContent = q.q; elements.battleOptions.innerHTML = '';
    battleState.timeLeft = 100; runBattleTimer();
    q.options.forEach(opt => {
      const btn = document.createElement('button'); btn.className = 'option-btn'; btn.textContent = opt;
      btn.addEventListener('click', () => handleBattleAnswer(opt, q.correct));
      elements.battleOptions.appendChild(btn);
    });
  }

  function runBattleTimer() {
    clearInterval(battleState.timer);
    battleState.timer = setInterval(() => {
      battleState.timeLeft -= 2; elements.battleTimerBar.style.width = `${battleState.timeLeft}%`;
      if (Math.random() > 0.95) { const isCorrect = Math.random() > 0.4; if (isCorrect) battleState.oppScore++; updateBattleScore(); }
      if (battleState.timeLeft <= 0) { clearInterval(battleState.timer); battleState.currentIndex++; nextBattleQuestion(); }
    }, 100);
  }

  function handleBattleAnswer(selected, correct) {
    clearInterval(battleState.timer);
    if (selected === correct) battleState.myScore++;
    updateBattleScore();
    setTimeout(() => { battleState.currentIndex++; nextBattleQuestion(); }, 500);
  }

  function updateBattleScore() {
    elements.myScore.textContent = battleState.myScore; elements.oppScore.textContent = battleState.oppScore;
  }

  function endBattle() {
    elements.battleGame.style.display = 'none'; elements.battleResult.style.display = 'block';
    const isWin = battleState.myScore > battleState.oppScore; const isDraw = battleState.myScore === battleState.oppScore;
    let coinChange = 0;
    if (isWin) { coinChange = 50; elements.battleResultTitle.textContent = 'WIN!'; elements.battleResultTitle.style.color = '#22c55e'; elements.battleReward.textContent = '+50 코인 (상대방 코인 획득!)'; }
    else if (isDraw) { coinChange = 0; elements.battleResultTitle.textContent = 'DRAW'; elements.battleResultTitle.style.color = '#7e22ce'; elements.battleReward.textContent = '0 코인 (배팅 금액 반환)'; }
    else { coinChange = -50; elements.battleResultTitle.textContent = 'LOSE...'; elements.battleResultTitle.style.color = '#ef4444'; elements.battleReward.textContent = '-50 코인 (배팅 금액 상실)'; }
    const user = Store.getUser(); user.coins = (user.coins || 0) + coinChange; Store.setUser(user); updateUI();
  }

  // --- Shop & Avatar Logic ---
  function setupShopEvents() {
    elements.shopTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        elements.shopTabs.forEach(t => tab.classList.remove('active'));
        tab.classList.add('active');
        currentShopCategory = tab.getAttribute('data-category');
        renderShop();
      });
    });
  }

  function renderShop() {
    if (!elements.shopGrid) return;
    const user = Store.getUser();
    elements.shopGrid.innerHTML = '';
    
    const categoryItems = SHOP_ITEMS.filter(item => item.category === currentShopCategory);
    
    categoryItems.forEach(item => {
      const isOwned = user.inventory?.includes(item.id);
      const card = document.createElement('div');
      card.className = 'shop-item-card';
      
      card.innerHTML = `
        <div class="item-icon-circle">${item.category === 'bg' ? '🖼️' : item.value}</div>
        <h4 style="margin: 0; font-size: 0.9rem;">${item.name}</h4>
        <button class="btn-primary buy-btn" style="height: 36px; font-size: 0.8rem; box-shadow: none; ${isOwned ? 'background:#94a3b8;' : ''}">
          ${isOwned ? '보유중' : `${item.price} 💰`}
        </button>
      `;
      
      if (!isOwned) {
        card.querySelector('.buy-btn').addEventListener('click', (e) => {
          e.stopPropagation();
          buyItem(item);
        });
      }
      
      // Preview on Click
      card.addEventListener('click', () => previewItem(item));
      elements.shopGrid.appendChild(card);
    });

    renderInventory();
    updateAvatarDisplay('shop');
  }

  function previewItem(item) {
    if (item.category === 'hat') elements.shopPreviewHat.textContent = item.value;
    if (item.category === 'aura') elements.shopPreviewAura.textContent = item.value;
    if (item.category === 'bg') elements.shopPreviewBg.style.background = item.value;
  }

  function buyItem(item) {
    const user = Store.getUser();
    if (user.coins < item.price) return alert('코인이 부족합니다!');
    
    if (confirm(`'${item.name}'을(를) 구매하시겠습니까?`)) {
      user.coins -= item.price;
      if (!user.inventory) user.inventory = [];
      user.inventory.push(item.id);
      Store.setUser(user);
      updateUI();
      renderShop();
    }
  }

  function renderInventory() {
    if (!elements.inventoryList) return;
    const user = Store.getUser();
    const inventory = user.inventory || [];
    
    if (inventory.length === 0) {
      elements.inventoryList.innerHTML = '<p class="sub-text">아이템을 구매하고 착용해 보세요!</p>';
      return;
    }
    
    elements.inventoryList.innerHTML = '';
    inventory.forEach(itemId => {
      const item = SHOP_ITEMS.find(i => i.id === itemId);
      if (item) {
        const isEquipped = user.equipped && user.equipped[item.category] === item.id;
        const div = document.createElement('div');
        div.className = `inventory-item ${isEquipped ? 'equipped' : ''}`;
        div.innerHTML = `<span>${item.category === 'bg' ? '🖼️' : item.value}</span> ${item.name}`;
        div.addEventListener('click', () => toggleEquip(item));
        elements.inventoryList.appendChild(div);
      }
    });
  }

  function toggleEquip(item) {
    const user = Store.getUser();
    if (!user.equipped) user.equipped = { hat: null, aura: null, bg: null };
    
    if (user.equipped[item.category] === item.id) {
      user.equipped[item.category] = null; // Unequip
    } else {
      user.equipped[item.category] = item.id; // Equip
    }
    
    Store.setUser(user);
    renderShop();
    updateAvatarDisplay('profile');
  }

  function updateAvatarDisplay(type) {
    const user = Store.getUser();
    const eq = user.equipped || {};
    
    const targets = type === 'profile' ? 
      { hat: elements.profileAvatarHat, aura: elements.profileAvatarAura, bg: elements.profileAvatarBg } :
      { hat: elements.shopPreviewHat, aura: elements.shopPreviewAura, bg: elements.shopPreviewBg };

    if (!targets.hat) return;

    // Apply equipped items to display
    ['hat', 'aura', 'bg'].forEach(cat => {
      const itemId = eq[cat];
      const item = SHOP_ITEMS.find(i => i.id === itemId);
      
      if (cat === 'bg') {
        targets.bg.style.background = item ? item.value : 'transparent';
      } else {
        targets[cat].textContent = item ? item.value : '';
      }
    });
  }

  function setupProfileEvents() {
    if (elements.editNameBtn) elements.editNameBtn.addEventListener('click', () => {
      const newName = prompt('새로운 이름을 입력하세요:', Store.getUser().name);
      if (newName && newName.trim()) { const user = Store.getUser(); user.name = newName.trim(); Store.setUser(user); updateUI(); }
    });
    if (elements.logoutBtn) elements.logoutBtn.addEventListener('click', () => {
      if (confirm('로그아웃 하시겠습니까?')) {
        localStorage.removeItem('vk_user');
        location.reload();
      }
    });
    if (elements.resetProgressBtn) elements.resetProgressBtn.addEventListener('click', () => {
      if (confirm('모든 학습 데이터가 초기화됩니다. 정말 진행하시겠습니까?')) { localStorage.clear(); location.reload(); }
    });
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', App.init);
