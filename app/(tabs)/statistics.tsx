// ========================================
// 📁 app/(tabs)/statistics.tsx - 통계 화면 (추가)
// ========================================
import React from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    useColorScheme,
    Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function StatisticsScreen() {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    const theme = {
        background: isDark ? '#0F172A' : '#FFFFFF',
        cardBackground: isDark ? '#1E293B' : '#F8FAFC',
        text: isDark ? '#FFFFFF' : '#1E293B',
        textSecondary: isDark ? '#94A3B8' : '#64748B',
        border: isDark ? '#334155' : '#E2E8F0',
    };

    const weeklyData = [
        { day: '월', completed: 3, total: 4 },
        { day: '화', completed: 4, total: 4 },
        { day: '수', completed: 2, total: 4 },
        { day: '목', completed: 4, total: 4 },
        { day: '금', completed: 3, total: 4 },
        { day: '토', completed: 1, total: 4 },
        { day: '일', completed: 0, total: 4 },
    ];

    return (
        <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
            {/* Header */}
            <View style={[styles.header, { backgroundColor: theme.cardBackground }]}>
                <Text style={[styles.headerTitle, { color: theme.text }]}>나의 통계</Text>
                <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
                    데이터로 보는 나의 성장
                </Text>
            </View>

            {/* Overview Cards */}
            <View style={styles.overviewGrid}>
                <View style={[styles.overviewCard, { backgroundColor: theme.cardBackground }]}>
                    <LinearGradient colors={['#3B82F6', '#1D4ED8']} style={styles.overviewIcon}>
                        <Ionicons name="calendar" size={24} color="white" />
                    </LinearGradient>
                    <Text style={[styles.overviewNumber, { color: theme.text }]}>87%</Text>
                    <Text style={[styles.overviewLabel, { color: theme.textSecondary }]}>완료율</Text>
                </View>

                <View style={[styles.overviewCard, { backgroundColor: theme.cardBackground }]}>
                    <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.overviewIcon}>
                        <Ionicons name="flame" size={24} color="white" />
                    </LinearGradient>
                    <Text style={[styles.overviewNumber, { color: theme.text }]}>12</Text>
                    <Text style={[styles.overviewLabel, { color: theme.textSecondary }]}>연속 일수</Text>
                </View>

                <View style={[styles.overviewCard, { backgroundColor: theme.cardBackground }]}>
                    <LinearGradient colors={['#10B981', '#059669']} style={styles.overviewIcon}>
                        <Ionicons name="trophy" size={24} color="white" />
                    </LinearGradient>
                    <Text style={[styles.overviewNumber, { color: theme.text }]}>2,850</Text>
                    <Text style={[styles.overviewLabel, { color: theme.textSecondary }]}>총 점수</Text>
                </View>

                <View style={[styles.overviewCard, { backgroundColor: theme.cardBackground }]}>
                    <LinearGradient colors={['#8B5CF6', '#7C3AED']} style={styles.overviewIcon}>
                        <Ionicons name="star" size={24} color="white" />
                    </LinearGradient>
                    <Text style={[styles.overviewNumber, { color: theme.text }]}>6</Text>
                    <Text style={[styles.overviewLabel, { color: theme.textSecondary }]}>획득 뱃지</Text>
                </View>
            </View>

            {/* Weekly Progress */}
            <View style={[styles.chartCard, { backgroundColor: theme.cardBackground }]}>
                <Text style={[styles.chartTitle, { color: theme.text }]}>주간 진행률</Text>
                <View style={styles.weeklyChart}>
                    {weeklyData.map((data, index) => (
                        <View key={index} style={styles.dayColumn}>
                            <View style={styles.barContainer}>
                                <View style={[styles.barBackground, { backgroundColor: theme.border }]}>
                                    <LinearGradient
                                        colors={['#3B82F6', '#1D4ED8']}
                                        style={[
                                            styles.barFill,
                                            { height: `${(data.completed / data.total) * 100}%` }
                                        ]}
                                    />
                                </View>
                            </View>
                            <Text style={[styles.dayLabel, { color: theme.textSecondary }]}>{data.day}</Text>
                            <Text style={[styles.dayCount, { color: theme.text }]}>
                                {data.completed}/{data.total}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    header: {
        padding: 20,
        borderRadius: 16,
        marginTop: 20,
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 14,
    },
    overviewGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 20,
    },
    overviewCard: {
        width: (width - 52) / 2,
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
    },
    overviewIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    overviewNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    overviewLabel: {
        fontSize: 12,
    },
    chartCard: {
        padding: 20,
        borderRadius: 16,
        marginBottom: 20,
    },
    chartTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    weeklyChart: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        height: 120,
    },
    dayColumn: {
        alignItems: 'center',
        flex: 1,
    },
    barContainer: {
        height: 80,
        marginBottom: 8,
        justifyContent: 'flex-end',
    },
    barBackground: {
        width: 24,
        height: 80,
        borderRadius: 12,
        overflow: 'hidden',
        justifyContent: 'flex-end',
    },
    barFill: {
        width: '100%',
        borderRadius: 12,
    },
    dayLabel: {
        fontSize: 12,
        marginBottom: 2,
    },
    dayCount: {
        fontSize: 10,
        fontWeight: '500',
    },
});