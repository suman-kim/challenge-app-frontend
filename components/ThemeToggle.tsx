// ========================================
// 📁 components/ThemeToggle.tsx - 혁신적인 테마 토글
// ========================================
import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';

export function ThemeToggle() {
    const { themeMode, setThemeMode, theme, isDark } = useTheme();
    const [showModal, setShowModal] = useState(false);
    const [animation] = useState(new Animated.Value(0));

    const themes = [
        { key: 'light', label: '라이트', icon: 'sunny', gradient: ['#F59E0B', '#EAB308'] },
        { key: 'dark', label: '다크', icon: 'moon', gradient: ['#6366F1', '#8B5CF6'] },
        { key: 'system', label: '시스템', icon: 'phone-portrait', gradient: ['#10B981', '#059669'] },
    ];

    const openModal = () => {
        setShowModal(true);
        Animated.spring(animation, {
            toValue: 1,
            useNativeDriver: true,
            tension: 100,
            friction: 8,
        }).start();
    };

    const closeModal = () => {
        Animated.spring(animation, {
            toValue: 0,
            useNativeDriver: true,
            tension: 100,
            friction: 8,
        }).start(() => setShowModal(false));
    };

    const selectTheme = (mode: any) => {
        setThemeMode(mode);
        closeModal();
    };

    const getCurrentIcon = () => {
        if (themeMode === 'system') return isDark ? 'moon' : 'sunny';
        return themeMode === 'dark' ? 'moon' : 'sunny';
    };

    return (
        <>
            <TouchableOpacity
                style={[styles.toggleButton, { backgroundColor: theme.surface }]}
                onPress={openModal}
            >
                <LinearGradient
                    colors={isDark ? ['#6366F1', '#8B5CF6'] : ['#F59E0B', '#EAB308']}
                    style={styles.toggleGradient}
                >
                    <Ionicons name={getCurrentIcon()} size={20} color="white" />
                </LinearGradient>
            </TouchableOpacity>

            <Modal
                visible={showModal}
                transparent
                animationType="none"
                onRequestClose={closeModal}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={closeModal}
                >
                    <Animated.View
                        style={[
                            styles.modalContent,
                            { backgroundColor: theme.cardBackground },
                            {
                                transform: [
                                    {
                                        scale: animation.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [0.8, 1],
                                        }),
                                    },
                                ],
                                opacity: animation,
                            },
                        ]}
                    >
                        <Text style={[styles.modalTitle, { color: theme.text }]}>테마 선택</Text>
                        <Text style={[styles.modalSubtitle, { color: theme.textSecondary }]}>
                            원하는 테마를 선택하세요
                        </Text>

                        <View style={styles.themeOptions}>
                            {themes.map((themeOption) => {
                                const isSelected = themeMode === themeOption.key;
                                return (
                                    <TouchableOpacity
                                        key={themeOption.key}
                                        style={[
                                            styles.themeOption,
                                            { borderColor: theme.border },
                                            isSelected && styles.selectedThemeOption,
                                        ]}
                                        onPress={() => selectTheme(themeOption.key)}
                                    >
                                        <LinearGradient
                                            colors={themeOption.gradient}
                                            style={styles.themeIcon}
                                        >
                                            <Ionicons name={themeOption.icon as any} size={24} color="white" />
                                        </LinearGradient>
                                        <Text style={[styles.themeLabel, { color: theme.text }]}>
                                            {themeOption.label}
                                        </Text>
                                        {isSelected && (
                                            <View style={styles.selectedIndicator}>
                                                <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </Animated.View>
                </TouchableOpacity>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    toggleButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        padding: 2,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    toggleGradient: {
        flex: 1,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    modalContent: {
        borderRadius: 24,
        padding: 24,
        width: '100%',
        maxWidth: 300,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
    },
    modalSubtitle: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 24,
    },
    themeOptions: {
        gap: 12,
    },
    themeOption: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        borderWidth: 2,
    },
    selectedThemeOption: {
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
    },
    themeIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    themeLabel: {
        flex: 1,
        fontSize: 16,
        fontWeight: '600',
    },
    selectedIndicator: {
        marginLeft: 8,
    },
});