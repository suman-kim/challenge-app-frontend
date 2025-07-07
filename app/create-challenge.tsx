// ========================================
// 📁 app/create-challenge.tsx - 챌린지 생성 화면
// ========================================
import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    useColorScheme,
    Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useChallenges } from '../hooks/useChallenges';
import { CATEGORIES } from '../constants/data';

interface NewChallenge {
    title: string;
    category: string;
    description: string;
    difficulty: 'easy' | 'medium' | 'hard';
    tags: string[];
}

export default function CreateChallengeScreen() {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    const { createChallenge } = useChallenges();

    const [newChallenge, setNewChallenge] = useState<NewChallenge>({
        title: '',
        category: '건강',
        description: '',
        difficulty: 'medium',
        tags: []
    });

    const [customTag, setCustomTag] = useState('');

    const theme = {
        background: isDark ? '#0F172A' : '#FFFFFF',
        cardBackground: isDark ? '#1E293B' : '#F8FAFC',
        text: isDark ? '#FFFFFF' : '#1E293B',
        textSecondary: isDark ? '#94A3B8' : '#64748B',
        border: isDark ? '#334155' : '#E2E8F0',
        accent: isDark ? '#3B82F6' : '#2563EB',
    };

    const difficulties = [
        { key: 'easy', label: '쉬움', color: ['#10B981', '#059669'], icon: 'leaf' },
        { key: 'medium', label: '보통', color: ['#F59E0B', '#D97706'], icon: 'fitness' },
        { key: 'hard', label: '어려움', color: ['#EF4444', '#DC2626'], icon: 'flame' }
    ];

    const popularTags = ['건강', '마음챙김', '운동', '독서', '학습', '창의성', '소통', '취미'];

    const handleCreate = () => {
        if (!newChallenge.title.trim() || !newChallenge.description.trim()) {
            Alert.alert('오류', '제목과 설명을 모두 입력해주세요.');
            return;
        }

        createChallenge({
            ...newChallenge,
            completionRate: 0,
            createdBy: 'user'
        });
        router.back();
    };

    const addTag = (tag: string) => {
        if (tag && !newChallenge.tags.includes(tag)) {
            setNewChallenge(prev => ({
                ...prev,
                tags: [...prev.tags, tag]
            }));
        }
        setCustomTag('');
    };

    const removeTag = (tagToRemove: string) => {
        setNewChallenge(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    return (
        <ScrollView
            style={[styles.container, { backgroundColor: theme.background }]}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color={theme.text} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: theme.text }]}>새 챌린지 만들기</Text>
                <View style={{ width: 24 }} />
            </View>

            <View style={styles.form}>
                {/* 제목 */}
                <View style={styles.inputGroup}>
                    <Text style={[styles.inputLabel, { color: theme.text }]}>📝 챌린지 제목</Text>
                    <TextInput
                        style={[styles.textInput, {
                            backgroundColor: theme.cardBackground,
                            color: theme.text,
                            borderColor: theme.border
                        }]}
                        value={newChallenge.title}
                        onChangeText={(text) => setNewChallenge(prev => ({ ...prev, title: text }))}
                        placeholder="예: 매일 30분 독서하기"
                        placeholderTextColor={theme.textSecondary}
                    />
                </View>

                {/* 카테고리 */}
                <View style={styles.inputGroup}>
                    <Text style={[styles.inputLabel, { color: theme.text }]}>🏷️ 카테고리</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.categoryScroll}
                        contentContainerStyle={styles.categoryScrollContent}
                    >
                        {Object.keys(CATEGORIES).map(category => {
                            const isSelected = newChallenge.category === category;
                            const categoryData = CATEGORIES[category];

                            return (
                                <TouchableOpacity
                                    key={category}
                                    style={[
                                        styles.categoryButton,
                                        isSelected && styles.categoryButtonActive,
                                        { borderColor: theme.border }
                                    ]}
                                    onPress={() => setNewChallenge(prev => ({ ...prev, category }))}
                                >
                                    <LinearGradient
                                        colors={isSelected ? categoryData.colors : [theme.border, theme.border]}
                                        style={styles.categoryIcon}
                                    >
                                        <Ionicons
                                            name={categoryData.icon as any}
                                            size={16}
                                            color={isSelected ? 'white' : theme.textSecondary}
                                        />
                                    </LinearGradient>
                                    <Text style={[
                                        styles.categoryText,
                                        { color: isSelected ? theme.accent : theme.textSecondary }
                                    ]}>
                                        {category}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>

                {/* 난이도 */}
                <View style={styles.inputGroup}>
                    <Text style={[styles.inputLabel, { color: theme.text }]}>⚡ 난이도</Text>
                    <View style={styles.difficultyContainer}>
                        {difficulties.map(diff => {
                            const isSelected = newChallenge.difficulty === diff.key;
                            return (
                                <TouchableOpacity
                                    key={diff.key}
                                    style={[styles.difficultyButton, isSelected && styles.difficultyButtonActive]}
                                    onPress={() => setNewChallenge(prev => ({ ...prev, difficulty: diff.key as any }))}
                                >
                                    <LinearGradient
                                        colors={isSelected ? diff.color : [theme.border, theme.border]}
                                        style={styles.difficultyIcon}
                                    >
                                        <Ionicons
                                            name={diff.icon as any}
                                            size={20}
                                            color={isSelected ? 'white' : theme.textSecondary}
                                        />
                                    </LinearGradient>
                                    <Text style={[
                                        styles.difficultyText,
                                        { color: isSelected ? theme.text : theme.textSecondary }
                                    ]}>
                                        {diff.label}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

                {/* 설명 */}
                <View style={styles.inputGroup}>
                    <Text style={[styles.inputLabel, { color: theme.text }]}>📄 설명</Text>
                    <TextInput
                        style={[styles.textArea, {
                            backgroundColor: theme.cardBackground,
                            color: theme.text,
                            borderColor: theme.border
                        }]}
                        value={newChallenge.description}
                        onChangeText={(text) => setNewChallenge(prev => ({ ...prev, description: text }))}
                        placeholder="챌린지에 대한 자세한 설명을 입력하세요. 목표, 방법, 기대효과 등을 포함해주세요."
                        placeholderTextColor={theme.textSecondary}
                        multiline
                        numberOfLines={6}
                        textAlignVertical="top"
                    />
                </View>

                {/* 태그 */}
                <View style={styles.inputGroup}>
                    <Text style={[styles.inputLabel, { color: theme.text }]}>🏷️ 태그</Text>

                    {/* 선택된 태그들 */}
                    {newChallenge.tags.length > 0 && (
                        <View style={styles.selectedTags}>
                            {newChallenge.tags.map(tag => (
                                <TouchableOpacity
                                    key={tag}
                                    style={styles.selectedTag}
                                    onPress={() => removeTag(tag)}
                                >
                                    <Text style={styles.selectedTagText}>#{tag}</Text>
                                    <Ionicons name="close" size={14} color="white" />
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    {/* 인기 태그들 */}
                    <Text style={[styles.subLabel, { color: theme.textSecondary }]}>인기 태그</Text>
                    <View style={styles.popularTags}>
                        {popularTags.map(tag => (
                            <TouchableOpacity
                                key={tag}
                                style={[styles.popularTag, { borderColor: theme.border }]}
                                onPress={() => addTag(tag)}
                            >
                                <Text style={[styles.popularTagText, { color: theme.text }]}>#{tag}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* 커스텀 태그 입력 */}
                    <View style={styles.customTagContainer}>
                        <TextInput
                            style={[styles.customTagInput, {
                                backgroundColor: theme.cardBackground,
                                color: theme.text,
                                borderColor: theme.border
                            }]}
                            value={customTag}
                            onChangeText={setCustomTag}
                            placeholder="새 태그 추가"
                            placeholderTextColor={theme.textSecondary}
                        />
                        <TouchableOpacity
                            style={styles.addTagButton}
                            onPress={() => addTag(customTag)}
                        >
                            <LinearGradient colors={['#3B82F6', '#1D4ED8']} style={styles.addTagGradient}>
                                <Ionicons name="add" size={20} color="white" />
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* 생성 버튼 */}
                <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
                    <LinearGradient
                        colors={['#3B82F6', '#1D4ED8']}
                        style={styles.createButtonGradient}
                    >
                        <Ionicons name="rocket" size={24} color="white" />
                        <Text style={styles.createButtonText}>챌린지 만들기</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    form: {
        padding: 20,
    },
    inputGroup: {
        marginBottom: 24,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    subLabel: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 8,
        marginTop: 12,
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
    },
    textArea: {
        borderWidth: 1,
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        minHeight: 120,
    },
    categoryScroll: {
        marginTop: 8,
    },
    categoryScrollContent: {
        paddingRight: 20,
    },
    categoryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 1,
        marginRight: 12,
    },
    categoryButtonActive: {},
    categoryIcon: {
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
    },
    categoryText: {
        fontSize: 14,
        fontWeight: '500',
    },
    difficultyContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    difficultyButton: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    difficultyButtonActive: {
        borderColor: 'transparent',
    },
    difficultyIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    difficultyText: {
        fontSize: 14,
        fontWeight: '600',
    },
    selectedTags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 12,
    },
    selectedTag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3B82F6',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        gap: 6,
    },
    selectedTagText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '500',
    },
    popularTags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 12,
    },
    popularTag: {
        borderWidth: 1,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    popularTagText: {
        fontSize: 12,
        fontWeight: '500',
    },
    customTagContainer: {
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center',
    },
    customTagInput: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 12,
        padding: 12,
        fontSize: 14,
    },
    addTagButton: {
        borderRadius: 12,
        overflow: 'hidden',
    },
    addTagGradient: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    createButton: {
        marginTop: 20,
        borderRadius: 16,
        overflow: 'hidden',
    },
    createButtonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        gap: 8,
    },
    createButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
});
