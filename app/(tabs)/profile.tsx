// ========================================
// 📁 app/(tabs)/profile.tsx - 설정에 테마 선택 추가
// ========================================
import React from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
    Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { useChallenges } from '../../hooks/useChallenges';
import { RANK_SYSTEM } from '../../constants/data';

export default function ProfileScreen() {
    const { theme, themeMode } = useTheme();
    const { userProfile, calculateRank } = useChallenges();
    const { logout } = useAuth();

    const userRank = calculateRank(userProfile.totalChallenges * 10);

    const handleLogout = () => {
        Alert.alert(
            '로그아웃',
            '정말 로그아웃 하시겠습니까?',
            [
                { text: '취소', style: 'cancel' },
                {
                    text: '로그아웃',
                    style: 'destructive',
                    onPress: () => {
                        logout();
                        router.replace('/auth');
                    }
                }
            ]
        );
    };

    const getThemeDisplayName = (mode: string) => {
        switch (mode) {
            case 'light': return '라이트 모드';
            case 'dark': return '다크 모드';
            case 'system': return '시스템 설정';
            default: return '시스템 설정';
        }
    };

    const renderBadgeItem = ({ item: rank }: { item: any }) => {
        const isUnlocked = userProfile.badges.includes(rank.emoji);

        return (
            <View style={styles.badgeItem}>
                <Text style={[
                    styles.badgeEmoji,
                    { opacity: isUnlocked ? 1 : 0.3 }
                ]}>
                    {rank.emoji}
                </Text>
                <Text style={[
                    styles.badgeLabel,
                    {
                        color: isUnlocked ? rank.color : theme.textSecondary,
                        opacity: isUnlocked ? 1 : 0.5
                    }
                ]}>
                    {rank.name}
                </Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            {/* 커스텀 헤더 */}
            <View style={styles.header}>
                <Text style={[styles.headerTitle, { color: theme.text }]}>프로필</Text>
                <TouchableOpacity style={[styles.editButton, { backgroundColor: theme.surface }]}>
                    <Ionicons name="create" size={20} color={theme.accent} />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* 프로필 헤더 */}
                <View style={[styles.profileHeader, { backgroundColor: theme.cardBackground }]}>
                    <LinearGradient
                        colors={['#8B5CF6', '#7C3AED']}
                        style={styles.profileAvatar}
                    >
                        <Text style={styles.profileInitial}>{userProfile.name[0]}</Text>
                    </LinearGradient>
                    <Text style={[styles.profileName, { color: theme.text }]}>{userProfile.name}</Text>
                    <View style={styles.rankContainer}>
                        <Text style={styles.rankEmoji}>{userRank.emoji}</Text>
                        <Text style={[styles.rankName, { color: userRank.color }]}>{userRank.name}</Text>
                    </View>
                    <Text style={[styles.joinDate, { color: theme.textSecondary }]}>
                        가입일: {userProfile.joinDate}
                    </Text>
                </View>

                {/* 통계 */}
                <View style={styles.profileStats}>
                    <View style={[styles.profileStatItem, { backgroundColor: theme.cardBackground }]}>
                        <Text style={[styles.profileStatNumber, { color: theme.text }]}>
                            {userProfile.totalScore.toLocaleString()}
                        </Text>
                        <Text style={[styles.profileStatLabel, { color: theme.textSecondary }]}>총 점수</Text>
                    </View>
                    <View style={[styles.profileStatItem, { backgroundColor: theme.cardBackground }]}>
                        <Text style={[styles.profileStatNumber, { color: theme.text }]}>
                            {userProfile.totalChallenges}
                        </Text>
                        <Text style={[styles.profileStatLabel, { color: theme.textSecondary }]}>완료한 챌린지</Text>
                    </View>
                    <View style={[styles.profileStatItem, { backgroundColor: theme.cardBackground }]}>
                        <Text style={[styles.profileStatNumber, { color: theme.text }]}>
                            {userProfile.badges.length}
                        </Text>
                        <Text style={[styles.profileStatLabel, { color: theme.textSecondary }]}>획득한 뱃지</Text>
                    </View>
                </View>

                {/* 뱃지 컬렉션 */}
                <View style={[styles.badgeSection, { backgroundColor: theme.cardBackground }]}>
                    <Text style={[styles.badgeSectionTitle, { color: theme.text }]}>🏆 뱃지 컬렉션</Text>
                    <FlatList
                        data={RANK_SYSTEM}
                        renderItem={renderBadgeItem}
                        keyExtractor={(item) => item.name}
                        numColumns={3}
                        scrollEnabled={false}
                        contentContainerStyle={styles.badgeGrid}
                    />
                </View>

                {/* 설정 섹션 */}
                <View style={[styles.settingsSection, { backgroundColor: theme.cardBackground }]}>
                    <Text style={[styles.settingsTitle, { color: theme.text }]}>⚙️ 설정</Text>

                    {/* 테마 설정 - 이제 여기에 위치 */}
                    <TouchableOpacity
                        style={styles.settingItem}
                        onPress={() => router.push('/settings/theme')}
                    >
                        <View style={styles.settingLeft}>
                            <LinearGradient
                                colors={['#8B5CF6', '#7C3AED']}
                                style={styles.settingIconContainer}
                            >
                                <Ionicons name="color-palette" size={20} color="white" />
                            </LinearGradient>
                            <View style={styles.settingContent}>
                                <Text style={[styles.settingText, { color: theme.text }]}>테마 설정</Text>
                                <Text style={[styles.settingSubtext, { color: theme.textSecondary }]}>
                                    {getThemeDisplayName(themeMode)}
                                </Text>
                            </View>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.settingItem}>
                        <View style={styles.settingLeft}>
                            <LinearGradient
                                colors={['#3B82F6', '#1D4ED8']}
                                style={styles.settingIconContainer}
                            >
                                <Ionicons name="notifications" size={20} color="white" />
                            </LinearGradient>
                            <View style={styles.settingContent}>
                                <Text style={[styles.settingText, { color: theme.text }]}>알림 설정</Text>
                                <Text style={[styles.settingSubtext, { color: theme.textSecondary }]}>
                                    푸시 알림 관리
                                </Text>
                            </View>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.settingItem}>
                        <View style={styles.settingLeft}>
                            <LinearGradient
                                colors={['#10B981', '#059669']}
                                style={styles.settingIconContainer}
                            >
                                <Ionicons name="shield-checkmark" size={20} color="white" />
                            </LinearGradient>
                            <View style={styles.settingContent}>
                                <Text style={[styles.settingText, { color: theme.text }]}>개인정보 보호</Text>
                                <Text style={[styles.settingSubtext, { color: theme.textSecondary }]}>
                                    계정 및 보안 설정
                                </Text>
                            </View>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.settingItem}>
                        <View style={styles.settingLeft}>
                            <LinearGradient
                                colors={['#F59E0B', '#D97706']}
                                style={styles.settingIconContainer}
                            >
                                <Ionicons name="help-circle" size={20} color="white" />
                            </LinearGradient>
                            <View style={styles.settingContent}>
                                <Text style={[styles.settingText, { color: theme.text }]}>도움말</Text>
                                <Text style={[styles.settingSubtext, { color: theme.textSecondary }]}>
                                    FAQ 및 고객지원
                                </Text>
                            </View>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.settingItem} onPress={handleLogout}>
                        <View style={styles.settingLeft}>
                            <LinearGradient
                                colors={['#EF4444', '#DC2626']}
                                style={styles.settingIconContainer}
                            >
                                <Ionicons name="log-out" size={20} color="white" />
                            </LinearGradient>
                            <View style={styles.settingContent}>
                                <Text style={[styles.settingText, { color: '#EF4444' }]}>로그아웃</Text>
                                <Text style={[styles.settingSubtext, { color: theme.textSecondary }]}>
                                    계정에서 로그아웃
                                </Text>
                            </View>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />
                    </TouchableOpacity>
                </View>
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
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    editButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileHeader: {
        alignItems: 'center',
        padding: 24,
        borderRadius: 20,
        marginHorizontal: 20,
        marginBottom: 20,
    },
    profileAvatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    profileInitial: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
    },
    profileName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    rankContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    rankEmoji: {
        fontSize: 24,
        marginRight: 8,
    },
    rankName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    joinDate: {
        fontSize: 14,
    },
    profileStats: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        gap: 12,
        marginBottom: 20,
    },
    profileStatItem: {
        flex: 1,
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
    },
    profileStatNumber: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    profileStatLabel: {
        fontSize: 12,
    },
    badgeSection: {
        marginHorizontal: 20,
        padding: 20,
        borderRadius: 20,
        marginBottom: 20,
    },
    badgeSectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    badgeGrid: {
        justifyContent: 'space-between',
    },
    badgeItem: {
        alignItems: 'center',
        width: '30%',
        marginBottom: 16,
    },
    badgeEmoji: {
        fontSize: 32,
        marginBottom: 8,
    },
    badgeLabel: {
        fontSize: 12,
        textAlign: 'center',
        fontWeight: '500',
    },
    settingsSection: {
        marginHorizontal: 20,
        padding: 20,
        borderRadius: 20,
        marginBottom: 20,
    },
    settingsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.05)',
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    settingIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    settingContent: {
        flex: 1,
    },
    settingText: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 2,
    },
    settingSubtext: {
        fontSize: 13,
    },
});
