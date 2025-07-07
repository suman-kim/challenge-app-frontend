// ========================================
// 📁 app/(tabs)/ranking.tsx - 랭킹 화면
// ========================================
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, useColorScheme, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const mockRankingData = [
    { id: '1', name: '챌린지마스터', score: 15420, rank: 1, streak: 89, badges: ['👑', '🔥', '💎'] },
    { id: '2', name: '습관의신', score: 12850, rank: 2, streak: 67, badges: ['🥇', '⚡', '🌟'] },
    { id: '3', name: '꾸준이', score: 11320, rank: 3, streak: 56, badges: ['🥈', '🎯', '💪'] },
    // ... 더 많은 데이터
];

export default function RankingScreen() {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    const [selectedPeriod, setSelectedPeriod] = useState('weekly');

    const theme = {
        background: isDark ? '#0F172A' : '#FFFFFF',
        cardBackground: isDark ? '#1E293B' : '#F8FAFC',
        text: isDark ? '#FFFFFF' : '#1E293B',
        textSecondary: isDark ? '#94A3B8' : '#64748B',
    };

    const getRankGradient = (rank: number) => {
        if (rank === 1) return ['#FFD700', '#FFA500'];
        if (rank === 2) return ['#C0C0C0', '#A0A0A0'];
        if (rank === 3) return ['#CD7F32', '#8B4513'];
        return ['#64748B', '#475569'];
    };

    const renderTopThree = () => {
        const topThree = mockRankingData.slice(0, 3);

        return (
            <View style={styles.podiumContainer}>
                <LinearGradient colors={['#667eea', '#764ba2']} style={styles.podiumBackground}>
                    <Text style={styles.podiumTitle}>🏆 명예의 전당</Text>

                    <View style={styles.podium}>
                        {topThree.map((user, index) => (
                            <View key={user.id} style={[styles.podiumPlace, { height: 160 - index * 20 }]}>
                                <LinearGradient colors={getRankGradient(user.rank)} style={styles.podiumCard}>
                                    <View style={styles.podiumRank}>
                                        <Text style={styles.podiumRankText}>{user.rank}</Text>
                                    </View>
                                    <View style={styles.podiumAvatar}>
                                        <Text style={styles.podiumInitial}>{user.name[0]}</Text>
                                    </View>
                                    <Text style={styles.podiumName}>{user.name}</Text>
                                    <Text style={styles.podiumScore}>{user.score.toLocaleString()}</Text>
                                    <View style={styles.podiumBadges}>
                                        {user.badges.slice(0, 3).map((badge, idx) => (
                                            <Text key={idx} style={styles.podiumBadge}>{badge}</Text>
                                        ))}
                                    </View>
                                </LinearGradient>
                            </View>
                        ))}
                    </View>
                </LinearGradient>
            </View>
        );
    };

    return (
        <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
            {/* Header */}
            <LinearGradient colors={['#667eea', '#764ba2']} style={styles.header}>
                <Text style={styles.headerTitle}>🌍 글로벌 랭킹</Text>
                <Text style={styles.headerSubtitle}>전 세계 챌린저들과 경쟁하세요</Text>

                {/* Period Selector */}
                <View style={styles.periodSelector}>
                    {['daily', 'weekly', 'monthly', 'all'].map((period) => (
                        <TouchableOpacity
                            key={period}
                            style={[styles.periodButton, selectedPeriod === period && styles.activePeriodButton]}
                            onPress={() => setSelectedPeriod(period)}
                        >
                            <Text style={[styles.periodButtonText,
                                { color: selectedPeriod === period ? '#667eea' : 'rgba(255,255,255,0.7)' }
                            ]}>
                                {period === 'daily' ? '일간' : period === 'weekly' ? '주간' :
                                    period === 'monthly' ? '월간' : '전체'}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </LinearGradient>

            {/* Top 3 Podium */}
            {renderTopThree()}

            {/* 내 랭킹 */}
            <View style={[styles.myRanking, { backgroundColor: theme.cardBackground }]}>
                <Text style={[styles.myRankingTitle, { color: theme.text }]}>내 순위</Text>
                <View style={styles.myRankingContent}>
                    <View style={styles.myRankLeft}>
                        <LinearGradient colors={['#3B82F6', '#1D4ED8']} style={styles.myRankNumber}>
                            <Text style={styles.myRankNumberText}>#42</Text>
                        </LinearGradient>
                        <Text style={[styles.myRankName, { color: theme.text }]}>챌린저</Text>
                    </View>
                    <Text style={[styles.myRankScore, { color: theme.text }]}>2,850점</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { padding: 20, paddingTop: 60, paddingBottom: 30 },
    headerTitle: { fontSize: 28, fontWeight: 'bold', color: 'white', marginBottom: 8 },
    headerSubtitle: { fontSize: 16, color: 'rgba(255,255,255,0.8)', marginBottom: 24 },
    periodSelector: { flexDirection: 'row', gap: 8 },
    periodButton: { flex: 1, paddingVertical: 12, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center' },
    activePeriodButton: { backgroundColor: 'white' },
    periodButtonText: { fontSize: 14, fontWeight: '600' },
    podiumContainer: { marginHorizontal: 20, marginBottom: 20, borderRadius: 20, overflow: 'hidden' },
    podiumBackground: { padding: 20 },
    podiumTitle: { fontSize: 20, fontWeight: 'bold', color: 'white', textAlign: 'center', marginBottom: 20 },
    podium: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', height: 180 },
    podiumPlace: { flex: 1, marginHorizontal: 4 },
    podiumCard: { flex: 1, borderRadius: 16, padding: 12, alignItems: 'center', justifyContent: 'space-between' },
    podiumRank: { backgroundColor: 'rgba(255,255,255,0.3)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
    podiumRankText: { color: 'white', fontSize: 14, fontWeight: 'bold' },
    podiumAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.3)', alignItems: 'center', justifyContent: 'center' },
    podiumInitial: { color: 'white', fontSize: 16, fontWeight: 'bold' },
    podiumName: { color: 'white', fontSize: 12, fontWeight: 'bold', textAlign: 'center' },
    podiumScore: { color: 'white', fontSize: 14, fontWeight: '600' },
    podiumBadges: { flexDirection: 'row', gap: 2 },
    podiumBadge: { fontSize: 12 },
    myRanking: { marginHorizontal: 20, padding: 20, borderRadius: 16, marginBottom: 20, borderWidth: 2, borderColor: '#3B82F6' },
    myRankingTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
    myRankingContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    myRankLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    myRankNumber: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
    myRankNumberText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
    myRankName: { fontSize: 18, fontWeight: 'bold' },
    myRankScore: { fontSize: 20, fontWeight: 'bold' }
});