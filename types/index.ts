// ========================================
// 📁 types/index.ts
// ========================================
export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    totalScore: number;
    totalChallenges: number;
    badges: string[];
    level: string;
    joinDate: string;
    streak: number;
    friends: string[];
    rank: number;
}

export interface Challenge {
    id: number;
    title: string;
    category: string;
    description: string;
    participants: number;
    daysLeft: number;
    progress: number;
    isJoined: boolean;
    dailyScore?: number;
    totalScore?: number;
    streak?: number;
    badges?: string[];
    createdBy?: string;
    difficulty: 'easy' | 'medium' | 'hard';
    tags: string[];
    completionRate: number;
    trending?: boolean;
}

export interface Post {
    id: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    challengeId: number;
    challengeTitle: string;
    content: string;
    image?: string;
    timestamp: string;
    likes: number;
    comments: Comment[];
    isLiked: boolean;
}

export interface Comment {
    id: string;
    userId: string;
    userName: string;
    content: string;
    timestamp: string;
}

export interface RankingUser {
    id: string;
    name: string;
    avatar?: string;
    score: number;
    rank: number;
    streak: number;
    badges: string[];
    isFollowing?: boolean;
}

export interface Achievement {
    id: string;
    title: string;
    description: string;
    emoji: string;
    condition: string;
    isUnlocked: boolean;
    unlockedAt?: string;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
}