// ========================================
// 📁 app/(tabs)/feed.tsx - 차세대 소셜 피드 혁신
// ========================================
import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Modal,
    TextInput,
    Dimensions,
    Animated,
    Image, SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';

const { width, height } = Dimensions.get('window');

interface Post {
    id: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    challengeId: number;
    challengeTitle: string;
    content: string;
    image?: string;
    timestamp: string;
    likes: number;
    comments: Comment[];
    isLiked: boolean;
    reactions: Record<string, number>;
    location?: string;
    isVideo?: boolean;
}

interface Comment {
    id: string;
    userId: string;
    userName: string;
    content: string;
    timestamp: string;
    likes: number;
}

interface Story {
    id: string;
    userId: string;
    userName: string;
    avatar?: string;
    isViewed: boolean;
    gradient: [string, string];
    challengeId?: number;
}

const mockStories: Story[] = [
    { id: '1', userId: '1', userName: '나', isViewed: false, gradient: ['#667eea', '#764ba2'] },
    { id: '2', userId: '2', userName: '챌린지마스터', isViewed: false, gradient: ['#f093fb', '#f5576c'], challengeId: 1 },
    { id: '3', userId: '3', userName: '습관왕', isViewed: true, gradient: ['#4facfe', '#00f2fe'], challengeId: 2 },
    { id: '4', userId: '4', userName: '운동러버', isViewed: false, gradient: ['#43e97b', '#38f9d7'], challengeId: 3 },
    { id: '5', userId: '5', userName: '명상가', isViewed: true, gradient: ['#fa709a', '#fee140'] },
];

const mockPosts: Post[] = [
    {
        id: '1',
        userId: '1',
        userName: '챌린지마스터',
        challengeId: 1,
        challengeTitle: '매일 10분 명상',
        content: '오늘도 아침 명상 완료! 🧘‍♀️ 마음이 한결 평온해지는 걸 느껴요. 명상을 시작한 지 2주가 되었는데, 확실히 스트레스가 줄어들고 집중력이 향상된 것 같아요. 여러분도 함께 도전해보세요!',
        timestamp: '2시간 전',
        likes: 24,
        comments: [
            { id: '1', userId: '2', userName: '습관왕', content: '정말 대단해요! 저도 시작해볼게요 💪', timestamp: '1시간 전', likes: 3 },
            { id: '2', userId: '3', userName: '운동러버', content: '명상 앱 추천해주세요!', timestamp: '30분 전', likes: 1 },
        ],
        isLiked: false,
        reactions: { '❤️': 24, '👏': 8, '🔥': 12, '💪': 5 },
        location: '서울, 한국',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    },
    {
        id: '2',
        userId: '2',
        userName: '습관왕',
        challengeId: 2,
        challengeTitle: '새로운 단어 3개 배우기',
        content: '오늘의 단어 📚\n\n✨ Perseverance (인내)\n✨ Resilience (회복력) \n✨ Dedication (헌신)\n\n이 세 단어가 저의 챌린지 여정을 완벽하게 표현하는 것 같아요. 언어 학습은 정말 꾸준함이 중요하네요!',
        timestamp: '4시간 전',
        likes: 18,
        comments: [],
        isLiked: true,
        reactions: { '❤️': 18, '📚': 15, '🌟': 7 },
        isVideo: false,
    },
    {
        id: '3',
        userId: '3',
        userName: '운동러버',
        challengeId: 3,
        challengeTitle: '홈 트레이닝 30분',
        content: '홈트 30분 완주! 🏋️‍♀️ 오늘은 상체 운동에 집중했어요. 덤벨 컬, 푸시업, 플랭크까지! 땀이 삐질삐질 😅 운동 후의 이 상쾌함이 너무 좋아요. #홈트 #건강한하루',
        timestamp: '6시간 전',
        likes: 31,
        comments: [
            { id: '3', userId: '1', userName: '챌린지마스터', content: '와! 정말 멋져요 🔥', timestamp: '5시간 전', likes: 2 },
        ],
        isLiked: false,
        reactions: { '💪': 31, '🔥': 19, '👏': 12 },
        isVideo: true,
    },
];

const reactionEmojis = ['❤️', '👏', '🔥', '💪', '📚', '🌟', '😍', '🎉'];

export default function FeedScreen() {
    const { theme } = useTheme();
    const [posts, setPosts] = useState(mockPosts);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [showComments, setShowComments] = useState(false);
    const [showReactions, setShowReactions] = useState<string | null>(null);
    const [newComment, setNewComment] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    const commentModalY = useRef(new Animated.Value(height)).current;
    const reactionScale = useRef(new Animated.Value(0)).current;

    /**
     * 댓글 모달 열기 함수
     * @param post
     */
    const openComments = (post: Post) => {
        setSelectedPost(post);
        setShowComments(true);
        Animated.spring(commentModalY, {
            toValue: 0,
            useNativeDriver: true,
            tension: 100,
            friction: 8,
        }).start();
    };

    /**
     * 댓글 모달 닫기 함수
     */
    const closeComments = () => {
        Animated.spring(commentModalY, {
            toValue: height,
            useNativeDriver: true,
            tension: 100,
            friction: 8,
        }).start(() => setShowComments(false));
    };

    const toggleReactions = (postId: string) => {
        if (showReactions === postId) {
            Animated.spring(reactionScale, {
                toValue: 0,
                useNativeDriver: true,
            }).start(() => setShowReactions(null));
        } else {
            setShowReactions(postId);
            Animated.spring(reactionScale, {
                toValue: 1,
                useNativeDriver: true,
                tension: 150,
                friction: 5,
            }).start();
        }
    };

    const handleLike = (postId: string) => {
        setPosts(prev => prev.map(post =>
            post.id === postId
                ? {
                    ...post,
                    isLiked: !post.isLiked,
                    likes: post.isLiked ? post.likes - 1 : post.likes + 1,
                    reactions: {
                        ...post.reactions,
                        '❤️': post.isLiked
                            ? (post.reactions['❤️'] || 1) - 1
                            : (post.reactions['❤️'] || 0) + 1
                    }
                }
                : post
        ));
    };

    const addReaction = (postId: string, emoji: string) => {
        setPosts(prev => prev.map(post =>
            post.id === postId
                ? {
                    ...post,
                    reactions: {
                        ...post.reactions,
                        [emoji]: (post.reactions[emoji] || 0) + 1
                    }
                }
                : post
        ));
        toggleReactions(postId);
    };

    const renderStory = ({ item }: { item: Story }) => (
        <TouchableOpacity style={styles.storyContainer}>
            <LinearGradient
                colors={item.isViewed ? ['#E5E7EB', '#D1D5DB'] : item.gradient}
                style={styles.storyGradient}
            >
                <View style={[styles.storyInner, { backgroundColor: theme.background }]}>
                    <View style={styles.storyAvatar}>
                        <Text style={[styles.storyInitial, { color: item.isViewed ? '#9CA3AF' : '#374151' }]}>
                            {item.userName[0]}
                        </Text>
                    </View>
                </View>
                {item.userId === '1' && (
                    <View style={styles.addStoryIcon}>
                        <Ionicons name="add" size={16} color="white" />
                    </View>
                )}
            </LinearGradient>
            <Text style={[styles.storyText, { color: theme.text }]} numberOfLines={1}>
                {item.userName}
            </Text>
        </TouchableOpacity>
    );

    const renderPost = ({ item }: { item: Post }) => (
        <View style={[styles.postCard, { backgroundColor: theme.cardBackground }]}>
            {/* Post Header */}
            <View style={styles.postHeader}>
                <View style={styles.userInfo}>
                    <LinearGradient
                        colors={['#667eea', '#764ba2']}
                        style={styles.userAvatar}
                    >
                        <Text style={styles.userInitial}>{item.userName[0]}</Text>
                    </LinearGradient>
                    <View style={styles.userDetails}>
                        <View style={styles.userNameRow}>
                            <Text style={[styles.userName, { color: theme.text }]}>{item.userName}</Text>
                            <View style={styles.verifiedBadge}>
                                <Ionicons name="checkmark-circle" size={14} color="#3B82F6" />
                            </View>
                        </View>
                        <TouchableOpacity style={styles.challengeTag}>
                            <Text style={styles.challengeTagText}>{item.challengeTitle}</Text>
                        </TouchableOpacity>
                        {item.location && (
                            <View style={styles.locationRow}>
                                <Ionicons name="location" size={12} color={theme.textSecondary} />
                                <Text style={[styles.locationText, { color: theme.textSecondary }]}>
                                    {item.location}
                                </Text>
                            </View>
                        )}
                    </View>
                </View>
                <View style={styles.postHeaderRight}>
                    <Text style={[styles.timestamp, { color: theme.textSecondary }]}>{item.timestamp}</Text>
                    <TouchableOpacity style={styles.moreButton}>
                        <Ionicons name="ellipsis-horizontal" size={20} color={theme.textSecondary} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Post Content */}
            <Text style={[styles.postContent, { color: theme.text }]}>{item.content}</Text>

            {/* Post Media */}
            {item.image && (
                <View style={styles.mediaContainer}>
                    <View style={styles.imagePlaceholder}>
                        <Ionicons name="image" size={40} color={theme.textSecondary} />
                        <Text style={[styles.mediaLabel, { color: theme.textSecondary }]}>
                            {item.isVideo ? '📹 동영상' : '📷 사진'}
                        </Text>
                    </View>
                    {item.isVideo && (
                        <TouchableOpacity style={styles.playButton}>
                            <LinearGradient colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.3)']} style={styles.playGradient}>
                                <Ionicons name="play" size={24} color="white" />
                            </LinearGradient>
                        </TouchableOpacity>
                    )}
                </View>
            )}

            {/* Reactions Bar */}
            {Object.keys(item.reactions).length > 0 && (
                <View style={styles.reactionsBar}>
                    <View style={styles.reactionsList}>
                        {Object.entries(item.reactions).slice(0, 3).map(([emoji, count]) => (
                            <View key={emoji} style={styles.reactionItem}>
                                <Text style={styles.reactionEmoji}>{emoji}</Text>
                                <Text style={[styles.reactionCount, { color: theme.textSecondary }]}>{count}</Text>
                            </View>
                        ))}
                    </View>
                    <Text style={[styles.totalReactions, { color: theme.textSecondary }]}>
                        {Object.values(item.reactions).reduce((a, b) => a + b, 0)}명이 반응했습니다
                    </Text>
                </View>
            )}

            {/* Post Actions */}
            <View style={[styles.postActions, { borderTopColor: theme.border }]}>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleLike(item.id)}
                >
                    <Ionicons
                        name={item.isLiked ? "heart" : "heart-outline"}
                        size={24}
                        color={item.isLiked ? "#EF4444" : theme.textSecondary}
                    />
                    <Text style={[styles.actionText, { color: theme.textSecondary }]}>
                        {item.likes}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => openComments(item)}
                >
                    <Ionicons name="chatbubble-outline" size={24} color={theme.textSecondary} />
                    <Text style={[styles.actionText, { color: theme.textSecondary }]}>
                        {item.comments.length}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => toggleReactions(item.id)}
                >
                    <Ionicons name="happy-outline" size={24} color={theme.textSecondary} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="share-outline" size={24} color={theme.textSecondary} />
                </TouchableOpacity>
            </View>

            {/* Reactions Popup */}
            {showReactions === item.id && (
                <Animated.View
                    style={[
                        styles.reactionsPopup,
                        { backgroundColor: theme.cardBackground },
                        { transform: [{ scale: reactionScale }] }
                    ]}
                >
                    <View style={[styles.reactionsContainer, { backgroundColor: theme.cardBackground }]}>
                        {reactionEmojis.map(emoji => (
                            <TouchableOpacity
                                key={emoji}
                                style={styles.reactionButton}
                                onPress={() => addReaction(item.id, emoji)}
                            >
                                <Text style={styles.reactionButtonEmoji}>{emoji}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </Animated.View>
            )}
        </View>
    );

    const renderComment = ({ item }: { item: Comment }) => (
        <View style={styles.commentItem}>
            <View style={styles.commentAvatar}>
                <Text style={styles.commentUserInitial}>{item.userName[0]}</Text>
            </View>
            <View style={styles.commentContent}>
                <View style={[styles.commentBubble, { backgroundColor: theme.surface }]}>
                    <Text style={[styles.commentUserName, { color: theme.text }]}>{item.userName}</Text>
                    <Text style={[styles.commentText, { color: theme.text }]}>{item.content}</Text>
                </View>
                <View style={styles.commentActions}>
                    <Text style={[styles.commentTime, { color: theme.textSecondary }]}>{item.timestamp}</Text>
                    <TouchableOpacity style={styles.commentLike}>
                        <Ionicons name="heart-outline" size={14} color={theme.textSecondary} />
                        <Text style={[styles.commentLikeCount, { color: theme.textSecondary }]}>{item.likes}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            {/* 커스텀 헤더 */}
            <View style={styles.header}>
                <Text style={[styles.headerTitle, { color: theme.text }]}>소셜 피드</Text>
                <View style={styles.headerActions}>
                    <TouchableOpacity style={[styles.headerButton, { backgroundColor: theme.surface }]}>
                        <Ionicons name="heart" size={20} color={theme.accent} />
                        <View style={styles.notificationBadge}>
                            <Text style={styles.notificationBadgeText}>5</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.headerButton, { backgroundColor: theme.surface }]}>
                        <Ionicons name="chatbubble" size={20} color={theme.accent} />
                    </TouchableOpacity>
                </View>
            </View>
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            {/* Stories Section */}
            <View style={[styles.storiesSection, { backgroundColor: theme.cardBackground }]}>
                <FlatList
                    data={mockStories}
                    renderItem={renderStory}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.storiesContainer}
                />
            </View>

            {/* Feed */}
            <FlatList
                data={posts}
                renderItem={renderPost}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                refreshing={refreshing}
                onRefresh={() => {
                    setRefreshing(true);
                    setTimeout(() => setRefreshing(false), 1000);
                }}
                ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: theme.border }} />}
            />

            {/* Floating Action Button */}
            <TouchableOpacity style={styles.fab}>
                <LinearGradient
                    colors={['#667eea', '#764ba2']}
                    style={styles.fabGradient}
                >
                    <Ionicons name="add" size={28} color="white" />
                </LinearGradient>
            </TouchableOpacity>

            {/* Comments Modal */}
            {showComments && selectedPost && (
                <Modal visible transparent>
                    <View style={styles.commentsOverlay}>
                        <Animated.View
                            style={[
                                styles.commentsModal,
                                { backgroundColor: theme.background },
                                { transform: [{ translateY: commentModalY }] }
                            ]}
                        >
                            {/* Comments Header */}
                            <View style={[styles.commentsHeader, { borderBottomColor: theme.border }]}>
                                <Text style={[styles.commentsTitle, { color: theme.text }]}>댓글</Text>
                                <TouchableOpacity onPress={closeComments}>
                                    <Ionicons name="close" size={24} color={theme.textSecondary} />
                                </TouchableOpacity>
                            </View>

                            {/* Comments List */}
                            <FlatList
                                data={selectedPost.comments}
                                renderItem={renderComment}
                                keyExtractor={(item) => item.id}
                                style={styles.commentsList}
                                showsVerticalScrollIndicator={false}
                                ListEmptyComponent={() => (
                                    <View style={styles.emptyComments}>
                                        <Ionicons name="chatbubbles-outline" size={48} color={theme.textSecondary} />
                                        <Text style={[styles.emptyCommentsText, { color: theme.textSecondary }]}>
                                            아직 댓글이 없습니다
                                        </Text>
                                    </View>
                                )}
                            />

                            {/* Comment Input */}
                            <View style={[styles.commentInput, { backgroundColor: theme.cardBackground, borderTopColor: theme.border }]}>
                                <View style={styles.commentInputAvatar}>
                                    <Text style={styles.commentInputInitial}>나</Text>
                                </View>
                                <TextInput
                                    style={[styles.commentTextInput, { backgroundColor: theme.surface, color: theme.text }]}
                                    value={newComment}
                                    onChangeText={setNewComment}
                                    placeholder="댓글을 입력하세요..."
                                    placeholderTextColor={theme.textSecondary}
                                    multiline
                                />
                                <TouchableOpacity style={styles.sendButton}>
                                    <LinearGradient colors={['#3B82F6', '#1D4ED8']} style={styles.sendGradient}>
                                        <Ionicons name="send" size={16} color="white" />
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </Animated.View>
                    </View>
                </Modal>
            )}
        </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
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
    headerActions: {
        flexDirection: 'row',
        gap: 12,
    },
    headerButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    notificationBadge: {
        position: 'absolute',
        top: -2,
        right: -2,
        backgroundColor: '#EF4444',
        width: 18,
        height: 18,
        borderRadius: 9,
        alignItems: 'center',
        justifyContent: 'center',
    },
    notificationBadgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
    },
    storiesSection: {
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    storiesContainer: {
        paddingHorizontal: 16,
        gap: 12,
    },
    storyContainer: {
        alignItems: 'center',
        width: 70,
    },
    storyGradient: {
        width: 64,
        height: 64,
        borderRadius: 32,
        padding: 2,
        marginBottom: 8,
    },
    storyInner: {
        flex: 1,
        borderRadius: 30,
        padding: 2,
    },
    storyAvatar: {
        flex: 1,
        borderRadius: 28,
        backgroundColor: '#E5E7EB',
        alignItems: 'center',
        justifyContent: 'center',
    },
    storyInitial: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    addStoryIcon: {
        position: 'absolute',
        bottom: 8,
        right: 0,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#3B82F6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    storyText: {
        fontSize: 12,
        fontWeight: '500',
        textAlign: 'center',
    },
    postCard: {
        padding: 16,
    },
    postHeader: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    userInfo: {
        flexDirection: 'row',
        flex: 1,
    },
    userAvatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    userInitial: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    userDetails: {
        flex: 1,
    },
    userNameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 6,
    },
    verifiedBadge: {
        marginLeft: 4,
    },
    challengeTag: {
        backgroundColor: '#3B82F6',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 10,
        alignSelf: 'flex-start',
        marginBottom: 4,
    },
    challengeTagText: {
        color: 'white',
        fontSize: 11,
        fontWeight: '600',
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    locationText: {
        fontSize: 12,
    },
    postHeaderRight: {
        alignItems: 'flex-end',
    },
    timestamp: {
        fontSize: 12,
        marginBottom: 8,
    },
    moreButton: {
        padding: 4,
    },
    postContent: {
        fontSize: 15,
        lineHeight: 22,
        marginBottom: 12,
    },
    mediaContainer: {
        position: 'relative',
        marginBottom: 12,
    },
    imagePlaceholder: {
        height: 200,
        borderRadius: 12,
        backgroundColor: '#F3F4F6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mediaLabel: {
        fontSize: 14,
        marginTop: 8,
    },
    playButton: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -30 }, { translateY: -30 }],
        width: 60,
        height: 60,
        borderRadius: 30,
        overflow: 'hidden',
    },
    playGradient: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    reactionsBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        paddingHorizontal: 4,
    },
    reactionsList: {
        flexDirection: 'row',
        gap: 8,
    },
    reactionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    reactionEmoji: {
        fontSize: 16,
    },
    reactionCount: {
        fontSize: 12,
        fontWeight: '500',
    },
    totalReactions: {
        fontSize: 12,
    },
    postActions: {
        flexDirection: 'row',
        paddingTop: 12,
        borderTopWidth: 1,
        gap: 20,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    actionText: {
        fontSize: 14,
        fontWeight: '500',
    },
    reactionsPopup: {
        position: 'absolute',
        bottom: 60,
        left: 16,
        borderRadius: 20,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    reactionsContainer: {
        flexDirection: 'row',
        padding: 8,
        borderRadius: 20,
        gap: 4,
    },
    reactionButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    reactionButtonEmoji: {
        fontSize: 20,
    },
    fab: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        borderRadius: 28,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    fabGradient: {
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
    },
    commentsOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    commentsModal: {
        flex: 1,
        marginTop: height * 0.3,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },
    commentsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
    },
    commentsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    commentsList: {
        flex: 1,
        padding: 16,
    },
    commentItem: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    commentAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#E5E7EB',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    commentUserInitial: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#374151',
    },
    commentContent: {
        flex: 1,
    },
    commentBubble: {
        padding: 12,
        borderRadius: 16,
        marginBottom: 4,
    },
    commentUserName: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    commentText: {
        fontSize: 14,
        lineHeight: 18,
    },
    commentActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    commentTime: {
        fontSize: 12,
    },
    commentLike: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    commentLikeCount: {
        fontSize: 12,
    },
    emptyComments: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 40,
    },
    emptyCommentsText: {
        fontSize: 16,
        marginTop: 12,
    },
    commentInput: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        padding: 16,
        borderTopWidth: 1,
        gap: 12,
    },
    commentInputAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#3B82F6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    commentInputInitial: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    commentTextInput: {
        flex: 1,
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 14,
        maxHeight: 100,
    },
    sendButton: {
        borderRadius: 16,
        overflow: 'hidden',
    },
    sendGradient: {
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },

});