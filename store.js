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

  const get = (key, defaultVal = {}) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultVal;
  };

  const set = (key, val) => {
    localStorage.setItem(key, JSON.stringify(val));
  };

  return {
    getUser: () => get(KEYS.USER, { 
      name: '학습자', 
      xp: 0, 
      dailyGoal: 10,
      currentRank: 'Unranked',
      lastTestDate: null,
      isLoggedIn: false,
      authType: null
    }),
    setUser: (data) => set(KEYS.USER, data),
    
    getDaily: () => {
      const today = new Date().toISOString().split('T')[0];
      const daily = get(KEYS.DAILY, { date: today, xp: 0, cards: 0, goalAwarded: false });
      if (daily.date !== today) {
        return { date: today, xp: 0, cards: 0, goalAwarded: false };
      }
      return daily;
    },
    setDaily: (data) => set(KEYS.DAILY, data),

    getStreak: () => get(KEYS.STREAK, { count: 0, lastDate: null }),
    setStreak: (data) => set(KEYS.STREAK, data)
  };
})();
