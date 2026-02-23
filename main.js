// main.js - Final Combined Logic

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
    resetProgressBtn: document.getElementById('resetProgressBtn')
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

  let lessonState = {
    currentIndex: 0,
    isFlipped: false,
    currentList: []
  };

  let quizState = {
    currentIndex: 0,
    questions: [],
    correctCount: 0
  };

  function init() {
    setupNavigation();
    setupLessonEvents();
    setupQuizEvents();
    setupProfileEvents();
    renderLibrary();
    
    const user = Store.getUser();
    if (!user.name) {
      Store.setUser({ name: '학습자', xp: 0, dailyGoal: 10 });
    }

    updateUI();

    if (elements.startTodayLesson) {
      elements.startTodayLesson.addEventListener('click', () => startLesson('daily'));
    }
    
    if (elements.closeLearning) {
      elements.closeLearning.addEventListener('click', () => switchSection('home'));
    }

    // Home category buttons
    elements.homeCategories.forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-category');
        startLesson(cat);
      });
    });
  }

  function renderLibrary() {
    if (!elements.categoryGrid) return;
    elements.categoryGrid.innerHTML = '';

    Object.keys(LESSON_DATA).forEach(key => {
      const cat = LESSON_DATA[key];
      const card = document.createElement('div');
      card.className = 'category-card';
      card.innerHTML = `
        <div class="cat-icon">${cat.icon}</div>
        <div class="cat-info">
          <h4>${cat.title}</h4>
          <p>${cat.count} Expressions</p>
        </div>
        <div class="cat-badge">NEW</div>
      `;
      card.addEventListener('click', () => startLesson(key));
      elements.categoryGrid.appendChild(card);
    });
  }

  // --- Lesson Logic ---
  function startLesson(categoryKey = 'daily') {
    const category = LESSON_DATA[categoryKey] || LESSON_DATA.daily;
    lessonState.currentList = category.words;
    lessonState.currentIndex = 0;
    lessonState.isFlipped = false;
    renderCard();
    switchSection('learning');
  }

  function renderCard() {
    const data = lessonState.currentList[lessonState.currentIndex];
    if (!data) return;

    elements.cardWord.textContent = data.word;
    elements.cardMeaning.textContent = data.meaning;
    elements.cardSentence.textContent = data.sentence;
    elements.cardTranslation.textContent = data.translation;
    
    elements.activeCard.classList.remove('is-flipped');
    lessonState.isFlipped = false;

    // Progress
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
        elements.activeCard.style.transition = 'none';
        elements.activeCard.style.transform = 'none';
        elements.activeCard.style.opacity = '1';
        renderCard();
        setTimeout(() => { elements.activeCard.style.transition = ''; }, 10);
      } else {
        finishLesson();
      }
      updateUI();
    }, 300);
  }

  function finishLesson() {
    alert('오늘의 학습 완료! XP 보너스를 획득했습니다.');
    Gamification.awardXP('DAILY_GOAL');
    switchSection('home');
  }

  function setupLessonEvents() {
    if (elements.btnFlip) {
      elements.btnFlip.addEventListener('click', () => {
        lessonState.isFlipped = !lessonState.isFlipped;
        elements.activeCard.classList.toggle('is-flipped', lessonState.isFlipped);
      });
    }

    if (elements.activeCard) {
      elements.activeCard.addEventListener('click', (e) => {
        if (!e.target.closest('.audio-btn')) {
          elements.btnFlip.click();
        }
      });
    }

    if (elements.btnLike) elements.btnLike.addEventListener('click', () => handleSwipe('right'));
    if (elements.btnNope) elements.btnNope.addEventListener('click', () => handleSwipe('left'));
  }

  // --- Quiz Logic ---
  function setupQuizEvents() {
    if (elements.startQuizBtn) elements.startQuizBtn.addEventListener('click', startQuiz);
    if (elements.closeQuiz) elements.closeQuiz.addEventListener('click', () => switchSection('practice'));
    if (elements.nextQuizBtn) elements.nextQuizBtn.addEventListener('click', nextQuestion);
  }

  function startQuiz() {
    quizState.currentIndex = 0;
    quizState.correctCount = 0;
    
    const allWords = Object.values(LESSON_DATA).flatMap(cat => cat.words);
    quizState.questions = [...allWords].sort(() => 0.5 - Math.random()).slice(0, 5);
    
    renderQuizQuestion();
    switchSection('quiz');
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
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = opt;
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

    if (!isCorrect) {
      Array.from(elements.quizOptions.children).forEach(b => {
        if (b.textContent === correct) b.classList.add('correct');
      });
    } else {
      quizState.correctCount++;
      Gamification.awardXP('QUIZ_CORRECT');
    }

    elements.feedbackStatus.textContent = isCorrect ? '정답입니다!' : '아쉬워요!';
    elements.feedbackMeaning.textContent = `${quizState.questions[quizState.currentIndex].word}: ${correct}`;
    elements.quizFeedback.style.display = 'block';
    
    const fbColor = isCorrect ? '#22c55e' : '#ef4444';
    const fbBg = isCorrect ? '#dcfce7' : '#fee2e2';
    elements.quizFeedback.style.borderTopColor = fbColor;
    elements.feedbackIconBox.style.background = fbBg;
    elements.feedbackIconBox.style.color = fbColor;
    elements.fbIcon.setAttribute('data-lucide', isCorrect ? 'check-circle' : 'alert-circle');
    lucide.createIcons();
    
    updateUI();
  }

  function nextQuestion() {
    quizState.currentIndex++;
    if (quizState.currentIndex < quizState.questions.length) {
      renderQuizQuestion();
    } else {
      finishQuiz();
    }
  }

  function finishQuiz() {
    alert(`퀴즈 완료! 성적: ${quizState.correctCount}/${quizState.questions.length}`);
    if (quizState.correctCount === quizState.questions.length) {
      Gamification.awardXP('PERFECT_SESSION');
    }
    switchSection('practice');
  }

  // --- Profile Logic ---
  function setupProfileEvents() {
    if (elements.editNameBtn) {
      elements.editNameBtn.addEventListener('click', () => {
        const newName = prompt('새로운 이름을 입력하세요:', Store.getUser().name);
        if (newName && newName.trim()) {
          const user = Store.getUser();
          user.name = newName.trim();
          Store.setUser(user);
          updateUI();
        }
      });
    }

    if (elements.resetProgressBtn) {
      elements.resetProgressBtn.addEventListener('click', () => {
        if (confirm('모든 학습 데이터가 초기화됩니다. 정말 진행하시겠습니까?')) {
          localStorage.clear();
          location.reload();
        }
      });
    }
  }

  // --- Core Navigation ---
  function setupNavigation() {
    elements.navItems.forEach(item => {
      item.addEventListener('click', () => {
        const target = item.getAttribute('data-target');
        switchSection(target);
      });
    });
  }

  function switchSection(target) {
    const bottomNav = document.querySelector('.bottom-nav');
    if (bottomNav) {
      bottomNav.style.display = (target === 'learning' || target === 'quiz') ? 'none' : 'flex';
    }

    elements.navItems.forEach(nav => {
      nav.classList.toggle('active', nav.getAttribute('data-target') === target);
    });

    elements.sections.forEach(section => {
      if (section) {
        section.style.display = section.id === `${target}Section` ? 'block' : 'none';
      }
    });
  }

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

    // Profile Section
    if (elements.profileName) elements.profileName.textContent = `${user.name}님`;
    if (elements.profileLevelIcon) elements.profileLevelIcon.textContent = levelInfo.current.icon;
    if (elements.profileLevelTitle) elements.profileLevelTitle.textContent = `${levelInfo.current.title} (Level ${levelInfo.current.level})`;
    if (elements.statTotalXp) elements.statTotalXp.textContent = user.xp;
    if (elements.statStreak) elements.statStreak.textContent = streak.count;
    if (elements.statLevel) elements.statLevel.textContent = levelInfo.current.level;
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', App.init);
