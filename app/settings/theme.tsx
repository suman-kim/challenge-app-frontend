// ========================================
// 📁 app/settings/theme.tsx - 테마 설정 전용 화면
// ========================================
import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTheme } from '../../contexts/ThemeContext';

export default function ThemeSettingsScreen() {
    const { theme, themeMode, setThemeMode } = useTheme();

    const themes = [
        {
            key: 'light',
            label: '라이트 모드',
            icon: 'sunny',
            gradient: ['#F59E0B', '#EAB308'],
            description: '밝은 테마로 낮에 사용하기 좋습니다'
        },
        {
            key: 'dark',
            label: '다크 모드',
            icon: 'moon',
            gradient: ['#6366F1', '#8B5CF6'],
            description: '어두운 테마로 밤에 사용하기 좋습니다'
        },
        {
            key: 'system',
            label: '시스템 설정',
            icon: 'phone-portrait',
            gradient: ['#10B981', '#059669'],
            description: '기기 설정을 자동으로 따릅니다'
        },
    ];

    const selectTheme = (mode: any) => {
        setThemeMode(mode);
        setTimeout(() => {
            router.back();
        }, 500);
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            {/* 커스텀 헤더 */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={[styles.backButton, { backgroundColor: theme.surface }]}
                    onPress={() => router.back()}
                >
                    <Ionicons name="arrow-back" size={20} color={theme.text} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: theme.text }]}>테마 설정</Text>
                <View style={{ width: 44 }} />
            </View>

            <View style={styles.content}>
                <Text style={[styles.description, { color: theme.textSecondary }]}>
                    원하는 테마를 선택하세요. 시스템 설정을 선택하면 기기의 다크/라이트 모드 설정을 자동으로 따릅니다.
                </Text>

                <View style={styles.themeOptions}>
                    {themes.map((themeOption) => {
                        const isSelected = themeMode === themeOption.key;
                        return (
                            <TouchableOpacity
                                key={themeOption.key}
                                style={[
                                    styles.themeOption,
                                    {
                                        backgroundColor: theme.cardBackground,
                                        borderColor: isSelected ? '#10B981' : theme.border
                                    },
                                    isSelected && styles.selectedThemeOption,
                                ]}
                                onPress={() => selectTheme(themeOption.key)}
                            >
                                <LinearGradient
                                    colors={themeOption.gradient}
                                    style={styles.themeIcon}
                                >
                                    <Ionicons name={themeOption.icon as any} size={28} color="white" />
                                </LinearGradient>

                                <View style={styles.themeContent}>
                                    <Text style={[styles.themeLabel, { color: theme.text }]}>
                                        {themeOption.label}
                                    </Text>
                                    <Text style={[styles.themeDescription, { color: theme.textSecondary }]}>
                                        {themeOption.description}
                                    </Text>
                                </View>

                                {isSelected && (
                                    <View style={styles.selectedIndicator}>
                                        <LinearGradient
                                            colors={['#10B981', '#059669']}
                                            style={styles.selectedIndicatorGradient}
                                        >
                                            <Ionicons name="checkmark" size={16} color="white" />
                                        </LinearGradient>
                                    </View>
                                )}
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>
        </SafeAreaView>
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
    backButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 32,
    },
    themeOptions: {
        gap: 16,
    },
    themeOption: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderRadius: 20,
        borderWidth: 2,
    },
    selectedThemeOption: {
        backgroundColor: 'rgba(16, 185, 129, 0.05)',
    },
    themeIcon: {
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    themeContent: {
        flex: 1,
    },
    themeLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    themeDescription: {
        fontSize: 14,
        lineHeight: 20,
    },
    selectedIndicator: {
        marginLeft: 16,
    },
    selectedIndicatorGradient: {
        width: 28,
        height: 28,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
});