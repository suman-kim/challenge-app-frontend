// ========================================
// 📁 contexts/ThemeContext.tsx - 다크/라이트 모드 전역 관리
// ========================================
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
    isDark: boolean;
    themeMode: ThemeMode;
    setThemeMode: (mode: ThemeMode) => void;
    theme: {
        background: string;
        cardBackground: string;
        text: string;
        textSecondary: string;
        border: string;
        accent: string;
        surface: string;
        overlay: string;
    };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const systemColorScheme = useColorScheme();
    const [themeMode, setThemeMode] = useState<ThemeMode>('system');

    const isDark = themeMode === 'system'
        ? systemColorScheme === 'dark'
        : themeMode === 'dark';

    const theme = {
        background: isDark ? '#0F172A' : '#FFFFFF',
        cardBackground: isDark ? '#1E293B' : '#F8FAFC',
        text: isDark ? '#FFFFFF' : '#1E293B',
        textSecondary: isDark ? '#94A3B8' : '#64748B',
        border: isDark ? '#334155' : '#E2E8F0',
        accent: isDark ? '#3B82F6' : '#2563EB',
        surface: isDark ? '#334155' : '#F1F5F9',
        overlay: isDark ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.9)',
    };

    return (
        <ThemeContext.Provider value={{ isDark, themeMode, setThemeMode, theme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
}