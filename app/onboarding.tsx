// ========================================
// 📁 app/onboarding.tsx
// ========================================
import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    useColorScheme,
    FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

const onboardingData = [
    {
        id: '1',
        title: '30일 습관 만들기',
        subtitle: '작은 변화가 큰 성장을 만듭니다',
        icon: 'rocket',
        gradient: ['#667eea', '#764ba2'],
        features: ['개인 맞춤 챌린지', '진행률 추적', '성취 뱃지']
    },
    {
        id: '2',
        title: '함께하는 동기부여',
        subtitle: '친구들과 함께 목표를 달성하세요',
        icon: 'people',
        gradient: ['#f093fb', '#f5576c'],
        features: ['글로벌 랭킹', '친구 챌린지', '실시간 피드']
    },
    {
        id: '3',
        title: '데이터 기반 성장',
        subtitle: '상세한 통계로 자신의 성장을 확인하세요',
        icon: 'analytics',
        gradient: ['#4facfe', '#00f2fe'],
        features: ['진행 통계', '성과 분석', '개선 제안']
    },
    {
        id: '4',
        title: '지금 시작하세요!',
        subtitle: '새로운 습관으로 더 나은 내일을 만들어보세요',
        icon: 'star',
        gradient: ['#43e97b', '#38f9d7'],
        features: ['무료 시작', '언제든 취소', '즉시 사용 가능']
    }
];

export default function OnboardingScreen() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    const handleNext = () => {
        if (currentIndex < onboardingData.length - 1) {
            const nextIndex = currentIndex + 1;
            setCurrentIndex(nextIndex);
            flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
        } else {
            router.replace('/auth');
        }
    };

    const renderOnboardingItem = ({ item }: { item: any; index: number }) => (
        <View style={styles.slide}>
            <LinearGradient colors={item.gradient} style={styles.iconContainer}>
                <Ionicons name={item.icon} size={80} color="white" />
            </LinearGradient>

            <View style={styles.content}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.subtitle}</Text>

                <View style={styles.featuresContainer}>
                    {item.features.map((feature: string, idx: number) => (
                        <View key={idx} style={styles.feature}>
                            <View style={styles.checkIcon}>
                                <Ionicons name="checkmark" size={16} color="white" />
                            </View>
                            <Text style={styles.featureText}>{feature}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#667eea', '#764ba2']} style={styles.background}>
                <TouchableOpacity style={styles.skipButton} onPress={() => router.replace('/auth')}>
                    <Text style={styles.skipText}>건너뛰기</Text>
                </TouchableOpacity>

                <FlatList
                    ref={flatListRef}
                    data={onboardingData}
                    renderItem={renderOnboardingItem}
                    keyExtractor={(item) => item.id}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={(event) => {
                        const index = Math.round(event.nativeEvent.contentOffset.x / width);
                        setCurrentIndex(index);
                    }}
                />

                <View style={styles.bottomContainer}>
                    <View style={styles.pagination}>
                        {onboardingData.map((_, index) => (
                            <View
                                key={index}
                                style={[styles.dot, { opacity: index === currentIndex ? 1 : 0.3 }]}
                            />
                        ))}
                    </View>

                    <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                        <LinearGradient colors={['#667eea', '#764ba2']} style={styles.nextButtonGradient}>
                            <Text style={styles.nextButtonText}>
                                {currentIndex === onboardingData.length - 1 ? '시작하기' : '다음'}
                            </Text>
                            <Ionicons name="arrow-forward" size={20} color="white" />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    background: { flex: 1 },
    skipButton: { position: 'absolute', top: 60, right: 20, zIndex: 1, padding: 12 },
    skipText: { color: 'white', fontSize: 16, fontWeight: '500' },
    slide: { width, flex: 1, alignItems: 'center', paddingHorizontal: 40, paddingTop: 120 },
    iconContainer: {
        width: 160, height: 160, borderRadius: 80, alignItems: 'center', justifyContent: 'center',
        marginBottom: 40, shadowColor: '#000', shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3, shadowRadius: 20, elevation: 10
    },
    content: { alignItems: 'center', flex: 1 },
    title: { fontSize: 28, fontWeight: 'bold', color: 'white', textAlign: 'center', marginBottom: 16 },
    subtitle: { fontSize: 18, color: 'rgba(255,255,255,0.8)', textAlign: 'center', marginBottom: 40, lineHeight: 24 },
    featuresContainer: { alignSelf: 'stretch' },
    feature: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, paddingHorizontal: 20 },
    checkIcon: {
        width: 24, height: 24, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center', justifyContent: 'center', marginRight: 12
    },
    featureText: { color: 'white', fontSize: 16, fontWeight: '500' },
    bottomContainer: { paddingHorizontal: 40, paddingBottom: 50 },
    pagination: { flexDirection: 'row', justifyContent: 'center', marginBottom: 30 },
    dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'white', marginHorizontal: 4 },
    nextButton: { borderRadius: 25, overflow: 'hidden' },
    nextButtonGradient: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        paddingVertical: 16, paddingHorizontal: 32
    },
    nextButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold', marginRight: 8 }
});