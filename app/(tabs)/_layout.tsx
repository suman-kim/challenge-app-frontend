// ========================================
// 📁 app/(tabs)/_layout.tsx - 헤더리스 깔끔한 탭 레이아웃
// ========================================
import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';

export default function TabLayout() {
    const { theme } = useTheme();

    return (
        <Tabs
            screenOptions={{
                headerShown: false, // 🔥 모든 헤더 제거 - 깔끔한 디자인
                tabBarActiveTintColor: theme.accent,
                tabBarInactiveTintColor: theme.textSecondary,
                tabBarStyle: {
                    backgroundColor: theme.cardBackground,
                    borderTopColor: theme.border,
                    paddingBottom: 8,
                    paddingTop: 8,
                    height: 70,
                    elevation: 0,
                    shadowOpacity: 0,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: '홈',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    title: '탐색',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="compass" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="feed"
                options={{
                    title: '피드',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="newspaper" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="ranking"
                options={{
                    title: '랭킹',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="trophy" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="statistics"
                options={{
                    title: '통계',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="bar-chart" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: '프로필',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}