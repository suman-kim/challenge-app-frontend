// ========================================
// 📁 app/(tabs)/index.tsx - 헤더리스 홈 화면
// ========================================
import React from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTheme } from '../../contexts/ThemeContext';
import { ChallengeCard } from '../../components/ChallengeCard';
import { useChallenges } from '../../hooks/useChallenges';

export default function HomeScreen() {
    const { theme } = useTheme();
    const { challenges, userProfile, dailyChecked, checkIn, joinChallenge } = useChallenges();

    const joinedChallenges = challenges.filter(c => c.isJoined);
    const totalScore = joinedChallenges.reduce((sum, c) => sum + (c.totalScore || 0), 0);
    const totalStreak = joinedChallenges.reduce((sum, c) => sum + (c.streak || 0), 0);

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            {/* 커스텀 헤더 */}
            <View style={styles.header}>
                <View>
                    <Text style={[styles.greeting, { color: theme.textSecondary }]}>안녕하세요!</Text>
                    <Text style={[styles.userName, { color: theme.text }]}>{userProfile.name}님</Text>
                </View>
                <TouchableOpacity
                    style={[styles.notificationButton, { backgroundColor: theme.surface }]}
                    onPress={() => {}}
                >
                    <Ionicons name="notifications" size={20} color={theme.accent} />
                    <View style={styles.notificationBadge}>
                        <Text style={styles.notificationBadgeText}>3</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* 통계 카드들 */}
                <View style={styles.statsContainer}>
                    <View style={[styles.statCard, { backgroundColor: theme.cardBackground }]}>
                        <LinearGradient colors={['#3B82F6', '#1D4ED8']} style={styles.statIcon}>
                            <Ionicons name="trophy" size={24} color="white" />
                        </LinearGradient>
                        <View style={styles.statContent}>
                            <Text style={[styles.statNumber, { color: theme.text }]}>{joinedChallenges.length}</Text>
                            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>참여 중</Text>
                        </View>
                    </View>

                    <View style={[styles.statCard, { backgroundColor: theme.cardBackground }]}>
                        <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.statIcon}>
                            <Ionicons name="flame" size={24} color="white" />
                        </LinearGradient>
                        <View style={styles.statContent}>
                            <Text style={[styles.statNumber, { color: theme.text }]}>{totalStreak}</Text>
                            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>연속 달성</Text>
                        </View>
                    </View>

                    <View style={[styles.statCard, { backgroundColor: theme.cardBackground }]}>
                        <LinearGradient colors={['#10B981', '#059669']} style={styles.statIcon}>
                            <Ionicons name="star" size={24} color="white" />
                        </LinearGradient>
                        <View style={styles.statContent}>
                            <Text style={[styles.statNumber, { color: theme.text }]}>{totalScore}</Text>
                            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>총 점수</Text>
                        </View>
                    </View>
                </View>

                {/* 빠른 액션들 */}
                <View style={styles.quickActions}>
                    <TouchableOpacity
                        style={styles.quickActionPrimary}
                        onPress={() => router.push('/create-challenge')}
                    >
                        <LinearGradient colors={['#8B5CF6', '#7C3AED']} style={styles.quickActionGradient}>
                            <Ionicons name="add-circle" size={24} color="white" />
                            <Text style={styles.quickActionText}>새 챌린지 만들기</Text>
                            <Ionicons name="arrow-forward" size={20} color="white" />
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.quickActionSecondary, { backgroundColor: theme.cardBackground }]}
                        onPress={() => router.push('/(tabs)/explore')}
                    >
                        <Ionicons name="compass" size={20} color={theme.accent} />
                        <Text style={[styles.quickActionSecondaryText, { color: theme.text }]}>챌린지 탐색</Text>
                    </TouchableOpacity>
                </View>

                {/* 오늘의 챌린지 */}
                {joinedChallenges.length > 0 && (
                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: theme.text }]}>오늘의 챌린지</Text>
                        {joinedChallenges.map(challenge => (
                            <ChallengeCard
                                key={challenge.id}
                                challenge={challenge}
                                onCheckIn={() => checkIn(challenge.id)}
                                dailyChecked={dailyChecked[challenge.id]}
                            />
                        ))}
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    greeting: {
        fontSize: 14,
        marginBottom: 4,
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    notificationButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    notificationBadge: {
        position: 'absolute',
        top: -2,
        right: -2,
        backgroundColor: '#EF4444',
        width: 18,
        height: 18,
        borderRadius: 9,
        alignItems: 'center',
        justifyContent: 'center',
    },
    notificationBadgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
    statsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginBottom: 20,
        gap: 12,
    },
    statCard: {
        flex: 1,
        padding: 16,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    statIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    statContent: {
        flex: 1,
    },
    statNumber: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    statLabel: {
        fontSize: 11,
        marginTop: 2,
    },
    quickActions: {
        paddingHorizontal: 20,
        marginBottom: 24,
        gap: 12,
    },
    quickActionPrimary: {
        borderRadius: 16,
        overflow: 'hidden',
    },
    quickActionGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
    },
    quickActionText: {
        flex: 1,
        marginLeft: 12,
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
    },
    quickActionSecondary: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        gap: 12,
    },
    quickActionSecondaryText: {
        fontSize: 16,
        fontWeight: '600',
    },
    section: {
        paddingHorizontal: 20,
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
});