// ========================================
// 📁 components/ChallengeCard.tsx - 챌린지 카드 컴포넌트
// ========================================
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Challenge } from '../types';
import { CATEGORIES } from '../constants/data';

interface ChallengeCardProps {
    challenge: Challenge;
    onCheckIn?: () => void;
    onJoin?: () => void;
    dailyChecked?: boolean;
}

export function ChallengeCard({ challenge, onCheckIn, onJoin, dailyChecked }: ChallengeCardProps) {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    const category = CATEGORIES[challenge.category];
    const progressPercentage = (challenge.progress / 30) * 100;

    const theme = {
        background: isDark ? '#1E293B' : '#F8FAFC',
        text: isDark ? '#FFFFFF' : '#1E293B',
        textSecondary: isDark ? '#94A3B8' : '#64748B',
        border: isDark ? '#334155' : '#E2E8F0',
    };

    const handlePress = () => {
        router.push(`/challenge/${challenge.id}`);
    };

    return (
        <TouchableOpacity
            style={[styles.card, { backgroundColor: theme.background }]}
            onPress={handlePress}
            activeOpacity={0.7}
        >
            <View style={styles.header}>
                <LinearGradient
                    colors={category?.colors || ['#3B82F6', '#1D4ED8']}
                    style={styles.icon}
                >
                    <Ionicons
                        name={category?.icon as any || 'fitness'}
                        size={24}
                        color="white"
                    />
                </LinearGradient>

                <View style={styles.info}>
                    <Text style={[styles.title, { color: theme.text }]}>{challenge.title}</Text>
                    <Text style={[styles.category, { color: theme.textSecondary }]}>{challenge.category}</Text>
                </View>

                {challenge.isJoined ? (
                    <TouchableOpacity
                        style={[styles.actionButton, dailyChecked && styles.checkedButton]}
                        onPress={onCheckIn}
                        disabled={dailyChecked}
                    >
                        <LinearGradient
                            colors={dailyChecked ? ['#10B981', '#059669'] : ['#3B82F6', '#1D4ED8']}
                            style={styles.buttonGradient}
                        >
                            <Ionicons
                                name={dailyChecked ? "checkmark" : "add"}
                                size={20}
                                color="white"
                            />
                        </LinearGradient>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.joinButton} onPress={onJoin}>
                        <Text style={styles.joinText}>참여</Text>
                    </TouchableOpacity>
                )}
            </View>

            {challenge.isJoined && (
                <>
                    <View style={styles.progress}>
                        <Text style={[styles.progressText, { color: theme.textSecondary }]}>
                            {challenge.progress}/30일 완료
                        </Text>
                        <View style={[styles.progressBar, { backgroundColor: theme.border }]}>
                            <LinearGradient
                                colors={category?.colors || ['#3B82F6', '#1D4ED8']}
                                style={[styles.progressFill, { width: `${progressPercentage}%` }]}
                            />
                        </View>
                    </View>

                    <View style={styles.stats}>
                        <View style={styles.stat}>
                            <Ionicons name="flame" size={16} color="#F97316" />
                            <Text style={[styles.statText, { color: theme.textSecondary }]}>
                                {challenge.streak || 0}일 연속
                            </Text>
                        </View>
                        <View style={styles.stat}>
                            <Ionicons name="star" size={16} color="#F59E0B" />
                            <Text style={[styles.statText, { color: theme.textSecondary }]}>
                                {challenge.totalScore || 0}점
                            </Text>
                        </View>
                    </View>
                </>
            )}

            {!challenge.isJoined && (
                <View style={styles.challengeMetadata}>
                    <View style={styles.metadataItem}>
                        <Ionicons name="people" size={16} color={theme.textSecondary} />
                        <Text style={[styles.metadataText, { color: theme.textSecondary }]}>
                            {challenge.participants}명 참여
                        </Text>
                    </View>
                    <View style={styles.metadataItem}>
                        <Ionicons name="calendar" size={16} color={theme.textSecondary} />
                        <Text style={[styles.metadataText, { color: theme.textSecondary }]}>
                            {challenge.daysLeft}일 남음
                        </Text>
                    </View>
                </View>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 20,
        borderRadius: 16,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    icon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    info: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    category: {
        fontSize: 14,
    },
    actionButton: {
        marginLeft: 16,
    },
    checkedButton: {
        opacity: 0.7,
    },
    buttonGradient: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    joinButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#3B82F6',
    },
    joinText: {
        color: '#3B82F6',
        fontSize: 14,
        fontWeight: '600',
    },
    progress: {
        marginBottom: 12,
    },
    progressText: {
        fontSize: 12,
        marginBottom: 8,
    },
    progressBar: {
        height: 6,
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        borderRadius: 3,
    },
    stats: {
        flexDirection: 'row',
        gap: 16,
    },
    stat: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    statText: {
        fontSize: 12,
    },
    challengeMetadata: {
        flexDirection: 'row',
        gap: 16,
    },
    metadataItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    metadataText: {
        fontSize: 12,
    },
});