// ========================================
// 📁 contexts/AuthContext.tsx
// ========================================
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // 저장된 인증 정보 확인
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));

        const mockUser: User = {
            id: '1',
            name: '챌린저',
            email,
            totalScore: 2850,
            totalChallenges: 8,
            badges: ['🌱', '🔥', '🥉', '🥈', '🥇', '💎'],
            level: 'Gold',
            joinDate: '2024.12.01',
            streak: 12,
            friends: [],
            rank: 42
        };

        setUser(mockUser);
        setIsLoading(false);
    };

    const signup = async (name: string, email: string, password: string) => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));

        const newUser: User = {
            id: Date.now().toString(),
            name,
            email,
            totalScore: 0,
            totalChallenges: 0,
            badges: ['🌱'],
            level: 'Beginner',
            joinDate: new Date().toISOString().split('T')[0],
            streak: 0,
            friends: [],
            rank: 999
        };

        setUser(newUser);
        setIsLoading(false);
    };

    const logout = () => {
        setUser(null);
    };

    const updateUser = (updates: Partial<User>) => {
        if (user) {
            setUser({ ...user, ...updates });
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: !!user,
            isLoading,
            login,
            signup,
            logout,
            updateUser
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}