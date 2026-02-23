// gamification.js — Coin, levels, streak logic

const Gamification = (() => {
  const COIN_EVENTS = {
    CARD_SEEN: 2,
    QUIZ_CORRECT: 10,
    PERFECT_SESSION: 50,
    DAILY_GOAL: 100
  };

  const LEVELS = [
    { level: 1, title: '입문자', minCoins: 0,    color: '#94A3B8', icon: '🌱' },
    { level: 2, title: '초보자', minCoins: 100,   color: '#10B981', icon: '🌿' },
    { level: 3, title: '학습자', minCoins: 300,   color: '#3B82F6', icon: '📘' },
    { level: 4, title: '중급자', minCoins: 600,   color: '#F59E0B', icon: '⭐' },
    { level: 5, title: '능숙자', minCoins: 1000,  color: '#EF4444', icon: '🔥' },
    { level: 6, title: '고급자', minCoins: 1600,  color: '#EC4899', icon: '💎' },
    { level: 7, title: '전문가', minCoins: 2500,  color: '#8B5CF6', icon: '🏆' },
    { level: 8, title: '마스터', minCoins: 4000,  color: '#A855F7', icon: '👑' }
  ];

  function getLevelInfo(coins) {
    let current = LEVELS[0];
    let next = LEVELS[1];
    for (let i = LEVELS.length - 1; i >= 0; i--) {
      if (coins >= LEVELS[i].minCoins) {
        current = LEVELS[i];
        next = LEVELS[i + 1] || current;
        break;
      }
    }
    return { current, next };
  }

  function getLevelProgress(coins) {
    const { current, next } = getLevelInfo(coins);
    if (current.level === next.level) return 100;
    const range = next.minCoins - current.minCoins;
    const earned = coins - current.minCoins;
    return Math.floor((earned / range) * 100);
  }

  function awardCoins(eventType, customAmount = null) {
    const coinGain = customAmount !== null ? customAmount : (COIN_EVENTS[eventType] || 0);
    if (coinGain === 0) return { coinGain: 0, totalCoins: Store.getUser().coins, leveledUp: false };

    const user = Store.getUser();
    const prevCoins = user.coins || 0;
    const prevLevel = getLevelInfo(prevCoins).current.level;

    user.coins = prevCoins + coinGain;
    Store.setUser(user);

    const daily = Store.getDailyProgress();
    daily.coins = (daily.coins || 0) + coinGain;
    if (eventType === 'CARD_SEEN') daily.cards = (daily.cards || 0) + 1;
    Store.setDailyProgress(daily);

    const newLevel = getLevelInfo(user.coins).current.level;
    const leveledUp = newLevel > prevLevel;

    // Daily Goal Check
    let goalMet = false;
    const goalTarget = (Store.getUser().dailyGoal || 10) * COIN_EVENTS.CARD_SEEN;
    if (!daily.goalAwarded && daily.coins >= goalTarget) {
      daily.goalAwarded = true;
      goalMet = true;
      user.coins += COIN_EVENTS.DAILY_GOAL;
      Store.setDailyProgress(daily);
      Store.setUser(user);
    }

    return { coinGain, totalCoins: user.coins, leveledUp, newLevel, goalMet };
  }

  function updateStreak() {
    const user = Store.getUser();
    const today = new Date().toDateString();
    const lastDate = user.lastLearnDate;

    if (lastDate === today) return { count: user.streak, updated: false };

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (lastDate === yesterday.toDateString()) {
      user.streak = (user.streak || 0) + 1;
    } else {
      user.streak = 1;
    }

    user.lastLearnDate = today;
    Store.setUser(user);
    return { count: user.streak, updated: true };
  }

  function getStreakCount() {
    return Store.getUser().streak || 0;
  }

  function getDailyProgress() {
    const daily = Store.getDailyProgress();
    const goal = Store.getUser().dailyGoal || 10;
    const goalCoins = goal * COIN_EVENTS.CARD_SEEN;
    const pct = Math.min(100, Math.floor(((daily.coins || 0) / goalCoins) * 100));
    return { current: daily.coins || 0, goal: goalCoins, cards: daily.cards || 0, goalCards: goal, pct, met: daily.goalAwarded || false };
  }

  return { COIN_EVENTS, LEVELS, getLevelInfo, getLevelProgress, awardCoins, updateStreak, getStreakCount, getDailyProgress };
})();
