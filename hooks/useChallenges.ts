// ========================================
// 📁 hooks/useChallenges.ts - 커스텀 훅
// ========================================
import { useState } from 'react';
import { Alert } from 'react-native';
import { Challenge, User } from '../types';
import { INITIAL_CHALLENGES, RANK_SYSTEM } from '../constants/data';

const INITIAL_USER_PROFILE: User = {
    id: '1',
    name: '챌린저',
    email: 'challenger@example.com',
    totalScore: 2850,
    totalChallenges: 8,
    badges: ['🌱', '🔥', '🥉', '🥈', '🥇', '💎'],
    level: 'Gold',
    joinDate: '2024.12.01',
    streak: 12,
    friends: [],
    rank: 42
};

export function useChallenges() {
    const [challenges, setChallenges] = useState<Challenge[]>(INITIAL_CHALLENGES);
    const [userProfile, setUserProfile] = useState<User>(INITIAL_USER_PROFILE);
    const [dailyChecked, setDailyChecked] = useState<Record<number, boolean>>({});

    const calculateRank = (totalDays: number) => {
        return RANK_SYSTEM.slice().reverse().find(rank => totalDays >= rank.minDays) || RANK_SYSTEM[0];
    };

    const createChallenge = (newChallenge: Omit<Challenge, 'id' | 'participants' | 'daysLeft' | 'progress' | 'isJoined'>) => {
        const challenge: Challenge = {
            id: Date.now(),
            ...newChallenge,
            participants: 1,
            daysLeft: 30,
            progress: 0,
            isJoined: true,
            dailyScore: 50,
            totalScore: 0,
            streak: 0,
            badges: [],
            createdBy: 'user'
        };

        setChallenges(prev => [...prev, challenge]);
        Alert.alert('성공', '새로운 챌린지가 생성되었습니다!');
    };

    const joinChallenge = (challengeId: number) => {
        setChallenges(prev =>
            prev.map(challenge =>
                challenge.id === challengeId
                    ? {
                        ...challenge,
                        isJoined: true,
                        participants: challenge.participants + 1,
                        totalScore: 0,
                        streak: 0
                    }
                    : challenge
            )
        );
    };

    const checkIn = (challengeId: number) => {
        if (dailyChecked[challengeId]) return;

        setChallenges(prev =>
            prev.map(challenge => {
                if (challenge.id === challengeId) {
                    const newProgress = challenge.progress + 1;
                    const newStreak = (challenge.streak || 0) + 1;
                    const newTotalScore = (challenge.totalScore || 0) + (challenge.dailyScore || 50);

                    const currentRank = calculateRank(newProgress);
                    const newBadges = [...(challenge.badges || [])];
                    if (!newBadges.includes(currentRank.emoji)) {
                        newBadges.push(currentRank.emoji);
                        Alert.alert('🎉 새 뱃지 획득!', `${currentRank.emoji} ${currentRank.name} 뱃지를 획득했습니다!`);
                    }

                    return {
                        ...challenge,
                        progress: newProgress,
                        streak: newStreak,
                        totalScore: newTotalScore,
                        badges: newBadges
                    };
                }
                return challenge;
            })
        );

        setDailyChecked(prev => ({ ...prev, [challengeId]: true }));
        setUserProfile(prev => ({
            ...prev,
            totalScore: prev.totalScore + 50
        }));
    };

    return {
        challenges,
        userProfile,
        dailyChecked,
        createChallenge,
        joinChallenge,
        checkIn,
        calculateRank
    };
}