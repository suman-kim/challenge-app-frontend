// ========================================
// 📁 app/auth.tsx
// ========================================
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';

export default function AuthScreen() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { login, signup } = useAuth();

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async () => {
        if (!formData.email || !formData.password) {
            Alert.alert('오류', '이메일과 비밀번호를 입력해주세요.');
            return;
        }

        if (!validateEmail(formData.email)) {
            Alert.alert('오류', '올바른 이메일 형식을 입력해주세요.');
            return;
        }

        if (!isLogin && formData.password !== formData.confirmPassword) {
            Alert.alert('오류', '비밀번호가 일치하지 않습니다.');
            return;
        }

        setIsLoading(true);
        try {
            if (isLogin) {
                await login(formData.email, formData.password);
            } else {
                await signup(formData.name, formData.email, formData.password);
            }
            router.replace('/(tabs)');
        } catch (error) {
            Alert.alert('오류', '로그인에 실패했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <LinearGradient colors={['#667eea', '#764ba2']} style={styles.background}>
                <View style={styles.content}>
                    {/* Logo */}
                    <View style={styles.logoContainer}>
                        <LinearGradient
                            colors={['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)']}
                            style={styles.logo}
                        >
                            <Ionicons name="trophy" size={50} color="white" />
                        </LinearGradient>
                        <Text style={styles.logoText}>30일 챌린지</Text>
                        <Text style={styles.tagline}>새로운 습관, 새로운 나</Text>
                    </View>

                    {/* Form */}
                    <View style={styles.formContainer}>
                        {/* Auth Toggle */}
                        <View style={styles.authToggle}>
                            <TouchableOpacity
                                style={[styles.toggleButton, isLogin && styles.activeToggle]}
                                onPress={() => setIsLogin(true)}
                            >
                                <Text style={[styles.toggleText, isLogin && styles.activeToggleText]}>로그인</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.toggleButton, !isLogin && styles.activeToggle]}
                                onPress={() => setIsLogin(false)}
                            >
                                <Text style={[styles.toggleText, !isLogin && styles.activeToggleText]}>회원가입</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Form Fields */}
                        {!isLogin && (
                            <View style={styles.inputContainer}>
                                <Ionicons name="person" size={20} color="#667eea" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="이름"
                                    value={formData.name}
                                    onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
                                    autoCapitalize="words"
                                />
                            </View>
                        )}

                        <View style={styles.inputContainer}>
                            <Ionicons name="mail" size={20} color="#667eea" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="이메일"
                                value={formData.email}
                                onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                            {formData.email.length > 0 && (
                                <Ionicons
                                    name={validateEmail(formData.email) ? "checkmark-circle" : "close-circle"}
                                    size={20}
                                    color={validateEmail(formData.email) ? "#10B981" : "#EF4444"}
                                />
                            )}
                        </View>

                        <View style={styles.inputContainer}>
                            <Ionicons name="lock-closed" size={20} color="#667eea" style={styles.inputIcon} />
                            <TextInput
                                style={[styles.input, { flex: 1 }]}
                                placeholder="비밀번호"
                                value={formData.password}
                                onChangeText={(text) => setFormData(prev => ({ ...prev, password: text }))}
                                secureTextEntry={!showPassword}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                <Ionicons name={showPassword ? "eye" : "eye-off"} size={20} color="#667eea" />
                            </TouchableOpacity>
                        </View>

                        {!isLogin && (
                            <View style={styles.inputContainer}>
                                <Ionicons name="lock-closed" size={20} color="#667eea" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="비밀번호 확인"
                                    value={formData.confirmPassword}
                                    onChangeText={(text) => setFormData(prev => ({ ...prev, confirmPassword: text }))}
                                    secureTextEntry
                                />
                            </View>
                        )}

                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={handleSubmit}
                            disabled={isLoading}
                        >
                            <LinearGradient colors={['#667eea', '#764ba2']} style={styles.submitButtonGradient}>
                                <Text style={styles.submitButtonText}>
                                    {isLoading ? '처리 중...' : (isLogin ? '로그인' : '회원가입')}
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        {/* Social Login */}
                        <View style={styles.divider}>
                            <View style={styles.dividerLine} />
                            <Text style={styles.dividerText}>또는</Text>
                            <View style={styles.dividerLine} />
                        </View>

                        <View style={styles.socialContainer}>
                            <TouchableOpacity style={styles.socialButton}>
                                <Ionicons name="logo-google" size={24} color="#667eea" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.socialButton}>
                                <Ionicons name="logo-apple" size={24} color="#667eea" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    background: { flex: 1 },
    content: { flex: 1, justifyContent: 'center', paddingHorizontal: 40 },
    logoContainer: { alignItems: 'center', marginBottom: 50 },
    logo: {
        width: 100, height: 100, borderRadius: 50, alignItems: 'center', justifyContent: 'center',
        marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3, shadowRadius: 20, elevation: 10
    },
    logoText: { fontSize: 32, fontWeight: 'bold', color: 'white', marginBottom: 8 },
    tagline: { fontSize: 16, color: 'rgba(255,255,255,0.8)' },
    formContainer: { backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: 25, padding: 30 },
    authToggle: {
        flexDirection: 'row', backgroundColor: '#F3F4F6', borderRadius: 25, padding: 4, marginBottom: 24
    },
    toggleButton: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 21 },
    activeToggle: {
        backgroundColor: 'white', shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1, shadowRadius: 4, elevation: 2
    },
    toggleText: { fontSize: 16, fontWeight: '500', color: '#6B7280' },
    activeToggleText: { color: '#667eea', fontWeight: '600' },
    inputContainer: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 15,
        paddingHorizontal: 16, paddingVertical: 4, marginBottom: 16, elevation: 2,
        shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4
    },
    inputIcon: { marginRight: 12 },
    input: { flex: 1, paddingVertical: 16, fontSize: 16, color: '#333' },
    submitButton: { borderRadius: 15, overflow: 'hidden', marginBottom: 16 },
    submitButtonGradient: { paddingVertical: 16, alignItems: 'center' },
    submitButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
    divider: { flexDirection: 'row', alignItems: 'center', marginVertical: 20 },
    dividerLine: { flex: 1, height: 1, backgroundColor: '#E5E7EB' },
    dividerText: { marginHorizontal: 16, color: '#6B7280', fontSize: 14 },
    socialContainer: { flexDirection: 'row', justifyContent: 'center', gap: 20 },
    socialButton: {
        width: 50, height: 50, borderRadius: 25, backgroundColor: 'white', alignItems: 'center',
        justifyContent: 'center', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1, shadowRadius: 4
    }
});