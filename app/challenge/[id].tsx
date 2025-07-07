// ========================================
// 📁 app/challenge/[id].tsx - 챌린지 상세화면
// ========================================
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, useColorScheme, Modal, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';

export default function ChallengeDetailScreen() {
    const { id } = useLocalSearchParams();
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    const [showCheckInModal, setShowCheckInModal] = useState(false);
    const [checkInNote, setCheckInNote] = useState('');
    const [isJoined, setIsJoined] = useState(true);

    const challenge = {
        title: "매일 10분 명상",
        category: "명상",
        description: "스트레스 해소와 마음의 평화를 위한 일일 명상 챌린지입니다.",
        participants: 342,
        daysLeft: 18,
        progress: 12,
        totalScore: 900,
        streak: 5,
        badges: ['🌱', '🔥', '🥉'],
        difficulty: 'medium',
        tags: ['건강', '마음챙김', '스트레스해소'],
        tips: ['조용한 곳에서 진행하세요', '편안한 자세로 앉으세요', '호흡에 집중해보세요']
    };

    const theme = {
        background: isDark ? '#0F172A' : '#FFFFFF',
        cardBackground: isDark ? '#1E293B' : '#F8FAFC',
        text: isDark ? '#FFFFFF' : '#1E293B',
        textSecondary: isDark ? '#94A3B8' : '#64748B',
        border: isDark ? '#334155' : '#E2E8F0',
    };

    const handleCheckIn = () => {
        if (!checkInNote.trim()) {
            Alert.alert('알림', '오늘의 소감을 간단히 적어주세요!');
            return;
        }
        setShowCheckInModal(false);
        setCheckInNote('');
        Alert.alert('🎉 체크인 완료!', '오늘도 챌린지를 완료했습니다!');
    };

    const progressPercentage = (challenge.progress / 30) * 100;

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Hero Section */}
                <LinearGradient colors={['#8B5CF6', '#7C3AED']} style={styles.heroSection}>
                    <View style={styles.heroHeader}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Ionicons name="arrow-back" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Ionicons name="share-outline" size={24} color="white" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.heroContent}>
                        <View style={styles.categoryTag}>
                            <Text style={styles.categoryTagText}>{challenge.category}</Text>
                        </View>
                        <Text style={styles.heroTitle}>{challenge.title}</Text>
                        <Text style={styles.heroSubtitle}>{challenge.description}</Text>

                        <View style={styles.heroStats}>
                            <View style={styles.heroStat}>
                                <Ionicons name="people" size={16} color="rgba(255,255,255,0.8)" />
                                <Text style={styles.heroStatText}>{challenge.participants}명 참여</Text>
                            </View>
                            <View style={styles.heroStat}>
                                <Ionicons name="calendar" size={16} color="rgba(255,255,255,0.8)" />
                                <Text style={styles.heroStatText}>{challenge.daysLeft}일 남음</Text>
                            </View>
                        </View>
                    </View>
                </LinearGradient>

                <View style={styles.content}>
                    {/* Progress Section */}
                    {isJoined && (
                        <View style={[styles.progressCard, { backgroundColor: theme.cardBackground }]}>
                            <Text style={[styles.cardTitle, { color: theme.text }]}>📈 나의 진행률</Text>

                            <View style={styles.progressInfo}>
                                <Text style={[styles.progressText, { color: theme.textSecondary }]}>
                                    {challenge.progress}/30일 완료
                                </Text>
                                <Text style={[styles.progressPercentage, { color: theme.text }]}>
                                    {Math.round(progressPercentage)}%
                                </Text>
                            </View>

                            <View style={[styles.progressBar, { backgroundColor: theme.border }]}>
                                <LinearGradient
                                    colors={['#8B5CF6', '#7C3AED']}
                                    style={[styles.progressFill, { width: `${progressPercentage}%` }]}
                                />
                            </View>

                            <View style={styles.statsGrid}>
                                <View style={styles.statItem}>
                                    <Ionicons name="flame" size={20} color="#F97316" />
                                    <Text style={[styles.statNumber, { color: theme.text }]}>{challenge.streak}</Text>
                                    <Text style={[styles.statLabel, { color: theme.textSecondary }]}>연속 일수</Text>
                                </View>
                                <View style={styles.statItem}>
                                    <Ionicons name="star" size={20} color="#F59E0B" />
                                    <Text style={[styles.statNumber, { color: theme.text }]}>{challenge.totalScore}</Text>
                                    <Text style={[styles.statLabel, { color: theme.textSecondary }]}>총 점수</Text>
                                </View>
                                <View style={styles.statItem}>
                                    <Ionicons name="trophy" size={20} color="#8B5CF6" />
                                    <Text style={[styles.statNumber, { color: theme.text }]}>{challenge.badges.length}</Text>
                                    <Text style={[styles.statLabel, { color: theme.textSecondary }]}>획득 뱃지</Text>
                                </View>
                            </View>

                            <View style={styles.badgeContainer}>
                                {challenge.badges.map((badge, index) => (
                                    <Text key={index} style={styles.badge}>{badge}</Text>
                                ))}
                            </View>
                        </View>
                    )}

                    {/* Tips Section */}
                    <View style={[styles.tipsCard, { backgroundColor: theme.cardBackground }]}>
                        <Text style={[styles.cardTitle, { color: theme.text }]}>💡 성공 팁</Text>
                        <View style={styles.tipsList}>
                            {challenge.tips.map((tip, index) => (
                                <View key={index} style={styles.tipItem}>
                                    <View style={styles.tipBullet}>
                                        <Ionicons name="checkmark" size={14} color="white" />
                                    </View>
                                    <Text style={[styles.tipText, { color: theme.textSecondary }]}>{tip}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Action */}
            <View style={[styles.bottomAction, { backgroundColor: theme.cardBackground, borderTopColor: theme.border }]}>
                {isJoined ? (
                    <TouchableOpacity
                        style={styles.checkInButton}
                        onPress={() => setShowCheckInModal(true)}
                    >
                        <LinearGradient colors={['#10B981', '#059669']} style={styles.actionButtonGradient}>
                            <Ionicons name="checkmark-circle" size={24} color="white" />
                            <Text style={styles.actionButtonText}>오늘 체크인</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.joinButton} onPress={() => setIsJoined(true)}>
                        <LinearGradient colors={['#3B82F6', '#1D4ED8']} style={styles.actionButtonGradient}>
                            <Ionicons name="add-circle" size={24} color="white" />
                            <Text style={styles.actionButtonText}>챌린지 참여하기</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                )}
            </View>

            {/* Check-in Modal */}
            <Modal
                visible={showCheckInModal}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowCheckInModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalContent, { backgroundColor: theme.cardBackground }]}>
                        <View style={styles.modalHeader}>
                            <Text style={[styles.modalTitle, { color: theme.text }]}>오늘의 체크인</Text>
                            <TouchableOpacity onPress={() => setShowCheckInModal(false)}>
                                <Ionicons name="close" size={24} color={theme.textSecondary} />
                            </TouchableOpacity>
                        </View>

                        <Text style={[styles.modalSubtitle, { color: theme.textSecondary }]}>
                            오늘의 명상은 어떠셨나요? 간단한 소감을 적어주세요.
                        </Text>

                        <TextInput
                            style={[styles.noteInput, {
                                backgroundColor: theme.background,
                                color: theme.text,
                                borderColor: theme.border
                            }]}
                            value={checkInNote}
                            onChangeText={setCheckInNote}
                            placeholder="예: 마음이 평온해졌어요!"
                            placeholderTextColor={theme.textSecondary}
                            multiline
                            numberOfLines={4}
                            textAlignVertical="top"
                        />

                        <TouchableOpacity style={styles.checkInSubmitButton} onPress={handleCheckIn}>
                            <LinearGradient colors={['#10B981', '#059669']} style={styles.submitButtonGradient}>
                                <Text style={styles.submitButtonText}>체크인 완료</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    heroSection: { padding: 20, paddingTop: 60, paddingBottom: 30 },
    heroHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    heroContent: { marginBottom: 20 },
    categoryTag: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, alignSelf: 'flex-start', marginBottom: 12 },
    categoryTagText: { color: 'white', fontSize: 12, fontWeight: '600' },
    heroTitle: { fontSize: 28, fontWeight: 'bold', color: 'white', marginBottom: 8 },
    heroSubtitle: { fontSize: 16, color: 'rgba(255,255,255,0.8)', lineHeight: 22, marginBottom: 20 },
    heroStats: { flexDirection: 'row', gap: 16 },
    heroStat: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    heroStatText: { color: 'rgba(255,255,255,0.8)', fontSize: 12, fontWeight: '500' },
    content: { padding: 20 },
    progressCard: { padding: 20, borderRadius: 16, marginBottom: 16 },
    cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
    progressInfo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
    progressText: { fontSize: 14 },
    progressPercentage: { fontSize: 18, fontWeight: 'bold' },
    progressBar: { height: 8, borderRadius: 4, marginBottom: 20, overflow: 'hidden' },
    progressFill: { height: '100%', borderRadius: 4 },
    statsGrid: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 16 },
    statItem: { alignItems: 'center', flex: 1 },
    statNumber: { fontSize: 20, fontWeight: 'bold', marginVertical: 4 },
    statLabel: { fontSize: 12 },
    badgeContainer: { flexDirection: 'row', justifyContent: 'center', gap: 8 },
    badge: { fontSize: 24 },
    tipsCard: { padding: 20, borderRadius: 16, marginBottom: 16 },
    tipsList: { gap: 12 },
    tipItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
    tipBullet: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#10B981', alignItems: 'center', justifyContent: 'center' },
    tipText: { flex: 1, fontSize: 14, lineHeight: 20 },
    bottomAction: { padding: 20, borderTopWidth: 1 },
    checkInButton: { borderRadius: 16, overflow: 'hidden' },
    joinButton: { borderRadius: 16, overflow: 'hidden' },
    actionButtonGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 16, gap: 8 },
    actionButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', paddingHorizontal: 20 },
    modalContent: { borderRadius: 20, padding: 24 },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
    modalTitle: { fontSize: 20, fontWeight: 'bold' },
    modalSubtitle: { fontSize: 14, marginBottom: 20, lineHeight: 20 },
    noteInput: { borderWidth: 1, borderRadius: 12, padding: 16, fontSize: 16, minHeight: 100, marginBottom: 20 },
    checkInSubmitButton: { borderRadius: 12, overflow: 'hidden' },
    submitButtonGradient: { paddingVertical: 16, alignItems: 'center' },
    submitButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' }
});