// gamification.js — XP, levels, streak logic
const Gamification = (() => {
  const XP_EVENTS = {
    CARD_SEEN: 2,
    QUIZ_CORRECT: 10,
    SPEAKING: 8,
    DAILY_GOAL: 25,
    PERFECT_SESSION: 20
  };

  const LEVELS = [
    { level: 1, title: '입문자', minXp: 0,    color: '#94A3B8', icon: '🌱' },
    { level: 2, title: '초보자', minXp: 100,   color: '#10B981', icon: '🌿' },
    { level: 3, title: '학습자', minXp: 300,   color: '#3B82F6', icon: '📘' },
    { level: 4, title: '중급자', minXp: 600,   color: '#F59E0B', icon: '⭐' },
    { level: 5, title: '능숙자', minXp: 1000,  color: '#EF4444', icon: '🔥' },
    { level: 6, title: '고급자', minXp: 1600,  color: '#EC4899', icon: '💎' },
    { level: 7, title: '전문가', minXp: 2500,  color: '#8B5CF6', icon: '🏆' },
    { level: 8, title: '마스터', minXp: 4000,  color: '#A855F7', icon: '👑' }
  ];

  function getLevelInfo(xp) {
    let current = LEVELS[0];
    let next = LEVELS[1];
    for (let i = 0; i < LEVELS.length; i++) {
      if (xp >= LEVELS[i].minXp) {
        current = LEVELS[i];
        next = LEVELS[i + 1] || null;
      }
    }
    return { current, next };
  }

  function getLevelProgress(xp) {
    const { current, next } = getLevelInfo(xp);
    if (!next) return 100;
    const range = next.minXp - current.minXp;
    const earned = xp - current.minXp;
    return Math.min(100, Math.floor((earned / range) * 100));
  }

  function awardXP(eventType, customAmount = null) {
    const xpGain = customAmount !== null ? customAmount : (XP_EVENTS[eventType] || 0);
    if (xpGain === 0) return { xpGain: 0, totalXp: Store.getUser().xp, leveledUp: false };

    const user = Store.getUser();
    const prevXp = user.xp || 0;
    const prevLevel = getLevelInfo(prevXp).current.level;

    user.xp = prevXp + xpGain;
    Store.setUser(user);

    const daily = Store.getDaily();
    daily.xp = (daily.xp || 0) + xpGain;
    if (eventType === 'CARD_SEEN') daily.cards = (daily.cards || 0) + 1;
    Store.setDaily(daily);

    const newLevel = getLevelInfo(user.xp).current.level;
    const leveledUp = newLevel > prevLevel;

    // Award daily goal bonus (once per day)
    let goalMet = false;
    const goalTarget = (Store.getUser().dailyGoal || 10) * XP_EVENTS.CARD_SEEN;
    if (!daily.goalAwarded && daily.xp >= goalTarget) {
      daily.goalAwarded = true;
      Store.setDaily(daily);
      user.xp += XP_EVENTS.DAILY_GOAL;
      Store.setUser(user);
      goalMet = true;
    }

    return { xpGain, totalXp: user.xp, leveledUp, newLevel, goalMet };
  }

  function updateStreak() {
    const today = new Date().toISOString().split('T')[0];
    const streak = Store.getStreak();

    if (streak.lastDate === today) return streak;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (streak.lastDate === yesterdayStr) {
      streak.count = (streak.count || 0) + 1;
    } else {
      streak.count = 1;
    }
    streak.lastDate = today;
    Store.setStreak(streak);
    return streak;
  }

  function getStreakCount() {
    return Store.getStreak().count || 0;
  }

  function getDailyProgress() {
    const daily = Store.getDaily();
    const user = Store.getUser();
    const goal = user.dailyGoal || 10;
    const goalXp = goal * XP_EVENTS.CARD_SEEN;
    const pct = Math.min(100, Math.floor(((daily.xp || 0) / goalXp) * 100));
    return { current: daily.xp || 0, goal: goalXp, cards: daily.cards || 0, goalCards: goal, pct, met: daily.goalAwarded || false };
  }

  return { XP_EVENTS, LEVELS, getLevelInfo, getLevelProgress, awardXP, updateStreak, getStreakCount, getDailyProgress };
})();
