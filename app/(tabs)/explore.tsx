// ========================================
// 📁 app/(tabs)/explore.tsx - 챌린지 탐색 화면
// ========================================
import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { ChallengeCard } from '../../components/ChallengeCard';
import { useChallenges } from '../../hooks/useChallenges';
import { CATEGORIES } from '../../constants/data';

export default function ExploreScreen() {
    const { theme } = useTheme();
    const { challenges, joinChallenge } = useChallenges();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const filteredChallenges = challenges.filter(challenge => {
        const matchesSearch = challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            challenge.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = !selectedCategory || challenge.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const trendingChallenges = challenges.filter(c => c.trending);
    const popularChallenges = challenges.sort((a, b) => b.participants - a.participants);

    const renderCategoryFilter = (category: string) => {
        const isSelected = selectedCategory === category;
        const categoryData = CATEGORIES[category];

        return (
            <TouchableOpacity
                key={category}
                style={[
                    styles.categoryFilter,
                    isSelected && styles.selectedCategoryFilter,
                    { borderColor: theme.border }
                ]}
                onPress={() => setSelectedCategory(isSelected ? null : category)}
            >
                <LinearGradient
                    colors={isSelected ? categoryData.colors : [theme.surface, theme.surface]}
                    style={styles.categoryFilterIcon}
                >
                    <Ionicons
                        name={categoryData.icon as any}
                        size={16}
                        color={isSelected ? 'white' : theme.textSecondary}
                    />
                </LinearGradient>
                <Text style={[
                    styles.categoryFilterText,
                    { color: isSelected ? theme.accent : theme.textSecondary }
                ]}>
                    {category}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            {/* 커스텀 헤더 */}
            <View style={styles.header}>
                <Text style={[styles.headerTitle, { color: theme.text }]}>챌린지 탐색</Text>
                <TouchableOpacity style={[styles.searchIcon, { backgroundColor: theme.surface }]}>
                    <Ionicons name="search" size={20} color={theme.accent} />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* 검색바 */}
                <View style={styles.searchContainer}>
                    <View style={[styles.searchBar, { backgroundColor: theme.cardBackground }]}>
                        <Ionicons name="search" size={20} color={theme.textSecondary} />
                        <TextInput
                            style={[styles.searchInput, { color: theme.text }]}
                            placeholder="챌린지 검색..."
                            placeholderTextColor={theme.textSecondary}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                        {searchQuery.length > 0 && (
                            <TouchableOpacity onPress={() => setSearchQuery('')}>
                                <Ionicons name="close-circle" size={20} color={theme.textSecondary} />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                {/* 카테고리 필터 */}
                <View style={styles.categoriesSection}>
                    <Text style={[styles.sectionTitle, { color: theme.text }]}>카테고리</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.categoriesContainer}
                    >
                        {Object.keys(CATEGORIES).map(renderCategoryFilter)}
                    </ScrollView>
                </View>

                {/* 트렌딩 챌린지 */}
                {trendingChallenges.length > 0 && (
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={[styles.sectionTitle, { color: theme.text }]}>🔥 트렌딩</Text>
                            <TouchableOpacity>
                                <Text style={[styles.seeAllText, { color: theme.accent }]}>전체보기</Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={styles.horizontalChallenges}>
                                {trendingChallenges.slice(0, 3).map(challenge => (
                                    <View key={challenge.id} style={styles.horizontalChallengeCard}>
                                        <ChallengeCard
                                            challenge={challenge}
                                            onJoin={() => joinChallenge(challenge.id)}
                                        />
                                    </View>
                                ))}
                            </View>
                        </ScrollView>
                    </View>
                )}

                {/* 인기 챌린지 */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={[styles.sectionTitle, { color: theme.text }]}>⭐ 인기</Text>
                        <TouchableOpacity>
                            <Text style={[styles.seeAllText, { color: theme.accent }]}>전체보기</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={styles.horizontalChallenges}>
                            {popularChallenges.slice(0, 3).map(challenge => (
                                <View key={challenge.id} style={styles.horizontalChallengeCard}>
                                    <ChallengeCard
                                        challenge={challenge}
                                        onJoin={() => joinChallenge(challenge.id)}
                                    />
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </View>

                {/* 모든 챌린지 */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.text }]}>
                        {selectedCategory ? `${selectedCategory} 챌린지` : '모든 챌린지'}
                    </Text>
                    {filteredChallenges.map(challenge => (
                        <ChallengeCard
                            key={challenge.id}
                            challenge={challenge}
                            onJoin={() => joinChallenge(challenge.id)}
                        />
                    ))}
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
    searchIcon: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchContainer: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        gap: 12,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
    },
    categoriesSection: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    categoriesContainer: {
        paddingHorizontal: 20,
        gap: 12,
    },
    categoryFilter: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 1,
        gap: 8,
    },
    selectedCategoryFilter: {
        borderColor: '#3B82F6',
    },
    categoryFilterIcon: {
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    categoryFilterText: {
        fontSize: 14,
        fontWeight: '500',
    },
    section: {
        paddingHorizontal: 20,
        marginBottom: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    seeAllText: {
        fontSize: 14,
        fontWeight: '600',
    },
    horizontalChallenges: {
        flexDirection: 'row',
        gap: 16,
    },
    horizontalChallengeCard: {
        width: 280,
    },
});