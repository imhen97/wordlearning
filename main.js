const courses = {
  beginner: {
    title: "Beginner Course",
    desc: "Start with essential everyday words.",
    vocab: [
      { word: "apple", meaning: "사과", sentence: "I ate a red apple for breakfast." },
      { word: "book", meaning: "책", sentence: "She is reading an interesting book." },
      { word: "school", meaning: "학교", sentence: "I go to school by bus." },
      { word: "car", meaning: "자동차", sentence: "My father bought a new car." },
      { word: "family", meaning: "가족", sentence: "I love my family very much." }
    ]
  },
  intermediate: {
    title: "Intermediate Course",
    desc: "Expand your vocabulary with academic words.",
    vocab: [
      { word: "accomplish", meaning: "완수하다, 성취하다", sentence: "You can accomplish anything if you believe in yourself." },
      { word: "resilient", meaning: "회복력 있는", sentence: "She is a resilient person who bounces back from challenges." },
      { word: "diligent", meaning: "부지런한", sentence: "He is a diligent student who always finishes his homework." },
      { word: "innovative", meaning: "혁신적인", sentence: "The company is known for its innovative products." },
      { word: "perspective", meaning: "관점, 시각", sentence: "Travel helps you gain a new perspective on life." }
    ]
  },
  advanced: {
    title: "Advanced Course",
    desc: "Master sophisticated and complex expressions.",
    vocab: [
      { word: "serendipity", meaning: "뜻밖의 행운", sentence: "Finding that old photo was a moment of serendipity." },
      { word: "quintessential", meaning: "전형적인, 본질적인", sentence: "It was the quintessential small-town American experience." },
      { word: "ephemeral", meaning: "수명이 짧은, 덧없는", sentence: "The beauty of cherry blossoms is ephemeral." },
      { word: "ubiquitous", meaning: "어디에나 있는", sentence: "Cell phones are now ubiquitous in our daily lives." },
      { word: "enigmatic", meaning: "수수께끼 같은, 난해한", sentence: "She gave him an enigmatic smile." }
    ]
  }
};

const levelTestQuestions = [
  { word: "Apple", meaning: "사과", options: ["사과", "바나나", "포도", "오렌지"], level: "beginner" },
  { word: "School", meaning: "학교", options: ["병원", "학교", "공원", "도서관"], level: "beginner" },
  { word: "Accomplish", meaning: "완수하다", options: ["포기하다", "완수하다", "실패하다", "시작하다"], level: "intermediate" },
  { word: "Resilient", meaning: "회복력 있는", options: ["약한", "화난", "회복력 있는", "슬픈"], level: "intermediate" },
  { word: "Ubiquitous", meaning: "어디에나 있는", options: ["희귀한", "어디에나 있는", "비싼", "작은"], level: "advanced" }
];

let currentVocab = [];
let currentIndex = 0;
let isQuizMode = false;
let showingAnswer = false;

// UI Elements
const levelTestSection = document.getElementById('levelTestSection');
const quizSection = document.getElementById('quizSection');
const recommendationSection = document.getElementById('recommendationSection');
const mainAppSection = document.getElementById('mainAppSection');

const startLevelTestBtn = document.getElementById('startLevelTest');
const quizQuestion = document.getElementById('quizQuestion');
const quizWord = document.getElementById('quizWord');
const quizOptions = document.getElementById('quizOptions');

const recommendedCourseText = document.getElementById('recommendedCourse');
const courseDescText = document.getElementById('courseDesc');
const startCourseBtn = document.getElementById('startCourse');

const wordDisplay = document.getElementById('wordDisplay');
const meaningDisplay = document.getElementById('meaningDisplay');
const sentenceDisplay = document.getElementById('sentenceDisplay');
const nextBtn = document.getElementById('nextWord');
const showAnswerBtn = document.getElementById('showAnswer');
const toggleModeBtn = document.getElementById('toggleMode');
const retakeTestBtn = document.getElementById('retakeTest');
const appTitle = document.getElementById('appTitle');

// State for Level Test
let testIndex = 0;
let testScore = 0;

function showSection(sectionId) {
  [levelTestSection, quizSection, recommendationSection, mainAppSection].forEach(section => {
    section.style.display = section.id === sectionId ? 'block' : 'none';
  });
}

function startLevelTest() {
  testIndex = 0;
  testScore = 0;
  showSection('quizSection');
  loadTestQuestion();
}

function loadTestQuestion() {
  const q = levelTestQuestions[testIndex];
  quizQuestion.textContent = `Question ${testIndex + 1}/${levelTestQuestions.length}`;
  quizWord.textContent = q.word;
  quizOptions.innerHTML = '';
  
  q.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.className = 'btn-secondary';
    btn.onclick = () => handleAnswer(opt === q.meaning);
    quizOptions.appendChild(btn);
  });
}

function handleAnswer(isCorrect) {
  if (isCorrect) testScore++;
  testIndex++;
  
  if (testIndex < levelTestQuestions.length) {
    loadTestQuestion();
  } else {
    showRecommendation();
  }
}

function showRecommendation() {
  let level = "beginner";
  if (testScore >= 5) level = "advanced";
  else if (testScore >= 3) level = "intermediate";
  
  localStorage.setItem('userLevel', level);
  const course = courses[level];
  recommendedCourseText.textContent = course.title;
  courseDescText.textContent = course.desc;
  showSection('recommendationSection');
}

function startCourse() {
  const level = localStorage.getItem('userLevel') || 'beginner';
  currentVocab = courses[level].vocab;
  appTitle.textContent = courses[level].title;
  currentIndex = 0;
  showSection('mainAppSection');
  updateCard();
}

function updateCard() {
  const current = currentVocab[currentIndex];
  showingAnswer = false;

  if (isQuizMode) {
    const blankSentence = current.sentence.replace(new RegExp(current.word, 'gi'), '______');
    wordDisplay.textContent = '???';
    meaningDisplay.style.display = 'none';
    sentenceDisplay.innerHTML = blankSentence;
    showAnswerBtn.style.display = 'inline-block';
  } else {
    wordDisplay.textContent = current.word;
    meaningDisplay.textContent = current.meaning;
    meaningDisplay.style.display = 'block';
    sentenceDisplay.innerHTML = current.sentence.replace(new RegExp(current.word, 'gi'), `<span class="blank">${current.word}</span>`);
    showAnswerBtn.style.display = 'none';
  }
}

function showAnswer() {
  if (!isQuizMode || showingAnswer) return;
  const current = currentVocab[currentIndex];
  wordDisplay.textContent = current.word;
  meaningDisplay.textContent = current.meaning;
  meaningDisplay.style.display = 'block';
  sentenceDisplay.innerHTML = current.sentence.replace(new RegExp(current.word, 'gi'), `<span class="blank">${current.word}</span>`);
  showingAnswer = true;
}

// Event Listeners
startLevelTestBtn.onclick = startLevelTest;
startCourseBtn.onclick = startCourse;
nextBtn.onclick = () => {
  currentIndex = (currentIndex + 1) % currentVocab.length;
  updateCard();
};
showAnswerBtn.onclick = showAnswer;
toggleModeBtn.onclick = () => {
  isQuizMode = !isQuizMode;
  toggleModeBtn.textContent = isQuizMode ? '퀴즈 모드: ON' : '퀴즈 모드: OFF';
  updateCard();
};
retakeTestBtn.onclick = () => {
  localStorage.removeItem('userLevel');
  showSection('levelTestSection');
};

// Initialization
const savedLevel = localStorage.getItem('userLevel');
if (savedLevel) {
  startCourse();
} else {
  showSection('levelTestSection');
}
