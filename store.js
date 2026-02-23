// store.js — localStorage read/write layer
const Store = (() => {
  const KEYS = {
    USER: 'vk_user',
    PROGRESS: 'vk_progress',
    STREAK: 'vk_streak',
    DAILY: 'vk_daily',
    PREMIUM: 'vk_premium',
    ONBOARDED: 'vk_onboarded'
  };

  function get(key, defaultValue = null) {
    try {
      const val = localStorage.getItem(key);
      return val !== null ? JSON.parse(val) : defaultValue;
    } catch { return defaultValue; }
  }

  function set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); }
    catch (e) { console.error('Store.set error', e); }
  }

  function getUser() {
    return get(KEYS.USER, { name: '학습자', level: 1, dailyGoal: 10, xp: 0, startedCategory: 'daily-life' });
  }

  function setUser(data) { set(KEYS.USER, data); }

  function getProgress() {
    return get(KEYS.PROGRESS, {});
  }

  function setProgress(data) { set(KEYS.PROGRESS, data); }

  function markSeen(expressionId) {
    const p = getProgress();
    if (!p[expressionId]) p[expressionId] = { seen: 0, correct: 0 };
    p[expressionId].seen++;
    p[expressionId].lastSeen = new Date().toISOString();
    setProgress(p);
  }

  function markCorrect(expressionId) {
    const p = getProgress();
    if (!p[expressionId]) p[expressionId] = { seen: 0, correct: 0 };
    p[expressionId].correct++;
    setProgress(p);
  }

  function getStreak() {
    return get(KEYS.STREAK, { count: 0, lastDate: null });
  }

  function setStreak(data) { set(KEYS.STREAK, data); }

  function getDaily() {
    const today = new Date().toISOString().split('T')[0];
    const d = get(KEYS.DAILY, {});
    if (d.date !== today) return { date: today, xp: 0, cards: 0, goalAwarded: false };
    return d;
  }

  function setDaily(data) { set(KEYS.DAILY, data); }

  function isPremium() { return get(KEYS.PREMIUM, false); }

  function setPremium(val) { set(KEYS.PREMIUM, val); }

  function isOnboarded() { return get(KEYS.ONBOARDED, false); }

  function setOnboarded(val) { set(KEYS.ONBOARDED, val); }

  function reset() {
    Object.values(KEYS).forEach(k => localStorage.removeItem(k));
  }

  function getCategoryProgress(categoryId) {
    const progress = getProgress();
    const items = VocabData ? VocabData.getByCategory(categoryId) : [];
    const seen = items.filter(i => progress[i.id] && progress[i.id].seen > 0).length;
    const correct = items.filter(i => progress[i.id] && progress[i.id].correct > 0).length;
    return { seen, correct, total: items.length };
  }

  return {
    KEYS, get, set,
    getUser, setUser,
    getProgress, setProgress, markSeen, markCorrect,
    getStreak, setStreak,
    getDaily, setDaily,
    isPremium, setPremium,
    isOnboarded, setOnboarded,
    reset, getCategoryProgress
  };
})();
