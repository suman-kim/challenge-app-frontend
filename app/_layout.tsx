// ========================================
// 📁 app/_layout.tsx - ThemeProvider 추가
// ========================================
import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import { View, ActivityIndicator } from 'react-native';

function RootLayoutContent() {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#3B82F6" />
            </View>
        );
    }

    return (
        <Stack>
            {!isAuthenticated ? (
                <>
                    <Stack.Screen name="onboarding" options={{ headerShown: false }} />
                    <Stack.Screen name="auth" options={{ headerShown: false }} />
                </>
            ) : (
                <>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    <Stack.Screen name="challenge/[id]" options={{ title: '챌린지 상세' }} />
                    <Stack.Screen
                        name="create-challenge"
                        options={{
                            title: '새 챌린지 만들기',
                            presentation: 'modal'
                        }}
                    />
                </>
            )}
        </Stack>
    );
}

export default function RootLayout() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <StatusBar style="auto" />
                <RootLayoutContent />
            </AuthProvider>
        </ThemeProvider>
    );
}