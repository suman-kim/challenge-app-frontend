// ========================================
// 📁 constants/data.ts
// ========================================
import { Challenge, User, RankingUser } from '../types';

export const CATEGORIES: Record<string, { icon: string; colors: [string, string] }> = {
    '건강': { icon: 'fitness', colors: ['#10B981', '#059669'] },
    '교육': { icon: 'book', colors: ['#3B82F6', '#1D4ED8'] },
    '예술': { icon: 'color-palette', colors: ['#F59E0B', '#D97706'] },
    '음악': { icon: 'musical-notes', colors: ['#8B5CF6', '#7C3AED'] },
    '요리': { icon: 'restaurant', colors: ['#EF4444', '#DC2626'] },
    '독서': { icon: 'library', colors: ['#06B6D4', '#0891B2'] },
    '운동': { icon: 'barbell', colors: ['#84CC16', '#65A30D'] },
    '명상': { icon: 'leaf', colors: ['#A855F7', '#9333EA'] },
    '언어': { icon: 'language', colors: ['#F97316', '#EA580C'] },
    '사진': { icon: 'camera', colors: ['#EC4899', '#DB2777'] },
    '여행': { icon: 'airplane', colors: ['#14B8A6', '#0D9488'] },
    '자기계발': { icon: 'trending-up', colors: ['#6366F1', '#4F46E5'] },
    '환경': { icon: 'earth', colors: ['#22C55E', '#16A34A'] },
    '기술': { icon: 'laptop', colors: ['#64748B', '#475569'] },
    '취미': { icon: 'game-controller', colors: ['#F472B6', '#E879F9'] }
};

export const RANK_SYSTEM = [
    { name: '새싹', emoji: '🌱', minDays: 0, color: '#22C55E' },
    { name: '열정', emoji: '🔥', minDays: 3, color: '#F97316' },
    { name: '브론즈', emoji: '🥉', minDays: 7, color: '#D97706' },
    { name: '실버', emoji: '🥈', minDays: 14, color: '#64748B' },
    { name: '골드', emoji: '🥇', minDays: 21, color: '#F59E0B' },
    { name: '다이아', emoji: '💎', minDays: 28, color: '#06B6D4' },
    { name: '마스터', emoji: '👑', minDays: 30, color: '#8B5CF6' },
    { name: '레전드', emoji: '⚡', minDays: 50, color: '#EF4444' },
    { name: '불멸', emoji: '🌟', minDays: 100, color: '#10B981' }
];

export const INITIAL_CHALLENGES: Challenge[] = [
    {
        id: 1,
        title: "매일 10분 명상",
        category: "명상",
        description: "스트레스 해소와 마음의 평화를 위한 일일 명상",
        participants: 342,
        daysLeft: 18,
        progress: 12,
        isJoined: true,
        dailyScore: 75,
        totalScore: 900,
        streak: 5,
        badges: ['🌱', '🔥', '🥉'],
        createdBy: 'user',
        difficulty: 'medium',
        tags: ['건강', '마음챙김', '스트레스해소'],
        completionRate: 87
    },
    // ... 더 많은 챌린지들
];