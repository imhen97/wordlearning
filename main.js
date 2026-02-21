const vocabulary = [
  {
    word: "accomplish",
    meaning: "완수하다, 성취하다",
    sentence: "You can accomplish anything if you believe in yourself."
  },
  {
    word: "resilient",
    meaning: "회복력 있는, 탄력 있는",
    sentence: "She is a resilient person who bounces back from challenges."
  },
  {
    word: "diligent",
    meaning: "부지런한, 성실한",
    sentence: "He is a diligent student who always finishes his homework."
  },
  {
    word: "innovative",
    meaning: "혁신적인",
    sentence: "The company is known for its innovative products."
  },
  {
    word: "perspective",
    meaning: "관점, 시각",
    sentence: "Travel helps you gain a new perspective on life."
  }
];

let currentIndex = 0;
let isQuizMode = false;
let showingAnswer = false;

const wordDisplay = document.getElementById('wordDisplay');
const meaningDisplay = document.getElementById('meaningDisplay');
const sentenceDisplay = document.getElementById('sentenceDisplay');
const nextBtn = document.getElementById('nextWord');
const showAnswerBtn = document.getElementById('showAnswer');
const toggleModeBtn = document.getElementById('toggleMode');

function updateCard() {
  const current = vocabulary[currentIndex];
  showingAnswer = false;

  if (isQuizMode) {
    // Quiz Mode: Hide word in sentence and hide meaning
    const blankSentence = current.sentence.replace(new RegExp(current.word, 'gi'), '______');
    wordDisplay.textContent = '???';
    meaningDisplay.style.display = 'none';
    sentenceDisplay.innerHTML = blankSentence;
    showAnswerBtn.style.display = 'inline-block';
  } else {
    // Study Mode: Show everything
    wordDisplay.textContent = current.word;
    meaningDisplay.textContent = current.meaning;
    meaningDisplay.style.display = 'block';
    sentenceDisplay.innerHTML = current.sentence.replace(new RegExp(current.word, 'gi'), `<span class="blank">${current.word}</span>`);
    showAnswerBtn.style.display = 'none';
  }
}

function showAnswer() {
  if (!isQuizMode || showingAnswer) return;
  
  const current = vocabulary[currentIndex];
  wordDisplay.textContent = current.word;
  meaningDisplay.textContent = current.meaning;
  meaningDisplay.style.display = 'block';
  sentenceDisplay.innerHTML = current.sentence.replace(new RegExp(current.word, 'gi'), `<span class="blank">${current.word}</span>`);
  showingAnswer = true;
}

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % vocabulary.length;
  updateCard();
});

showAnswerBtn.addEventListener('click', showAnswer);

toggleModeBtn.addEventListener('click', () => {
  isQuizMode = !isQuizMode;
  toggleModeBtn.textContent = isQuizMode ? '퀴즈 모드: ON' : '퀴즈 모드: OFF';
  updateCard();
});

// Initial Load
updateCard();
