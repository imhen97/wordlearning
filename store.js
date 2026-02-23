// store.js - LocalStorage Wrapper for Data Persistence

const Store = (() => {
  const KEYS = {
    USER: 'vk_user',
    DAILY: 'vk_daily',
    HISTORY: 'vk_history'
  };

  const get = (key, defaultVal) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultVal;
  };

  const set = (key, val) => localStorage.setItem(key, JSON.stringify(val));

  return {
    getUser: () => get(KEYS.USER, {
      name: '학습자',
      isLoggedIn: false,
      onboarded: false,
      coins: 0,
      streak: 0,
      lastLearnDate: null,
      dailyGoal: 10,
      currentRank: 'Unranked',
      authType: 'guest'
    }),
    setUser: (user) => set(KEYS.USER, user),

    getDailyProgress: () => {
      const today = new Date().toDateString();
      const daily = get(KEYS.DAILY, { date: today, coins: 0, cards: 0, goalAwarded: false });
      if (daily.date !== today) {
        return { date: today, coins: 0, cards: 0, goalAwarded: false };
      }
      return daily;
    },
    setDailyProgress: (data) => set(KEYS.DAILY, data),

    saveHistory: (event) => {
      const history = get(KEYS.HISTORY, []);
      history.push({ ...event, timestamp: new Date().toISOString() });
      set(KEYS.HISTORY, history.slice(-50)); // Keep last 50 events
    }
  };
})();
