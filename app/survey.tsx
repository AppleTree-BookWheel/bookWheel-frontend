import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const SURVEY_STEPS = 5; // 총 5단계

// --- 2단계: 장르 데이터 ---
const genres = [
  { key: 'novel', text: '소설', icon: 'book' },
  { key: 'poem', text: '시 / 에세이', icon: 'color-palette' },
  { key: 'sf', text: 'SF / 판타지', icon: 'planet' },
  { key: 'romance', text: '로맨스', icon: 'heart' },
  { key: 'mystery', text: '추리 / 공포', icon: 'search' },
  { key: 'history', text: '인문 / 역사', icon: 'school' },
  { key: 'self-dev', text: '자기계발', icon: 'trending-up' },
  { key: 'science', text: '경제 / 과학', icon: 'cash' },
  { key: 'web', text: '웹소설 / 만화', icon: 'image' },
  { key: 'kids', text: '아동', icon: 'happy' },
];

// --- 3단계: 감정 데이터 ---
const vibes = [
  { key: 'healing', text: '#힐링되는', icon: 'leaf' },
  { key: 'joyful', text: '#기분전환되는', icon: 'sunny' },
  { key: 'touching', text: '#감동적인', icon: 'heart-circle' },
  { key: 'insightful', text: '#똑똑해지는', icon: 'bulb' },
  { key: 'thrilling', text: '#긴장감넘치는', icon: 'flash' },
  { key: 'deep', text: '#생각하게되는', icon: 'chatbubbles' },
  { key: 'immersing', text: '#몰입하게되는', icon: 'hourglass' },
  { key: 'inspiring', text: '#동기부여되는', icon: 'rocket' },
  { key: 'funny', text: '#웃긴', icon: 'happy-outline' },
];

// --- 4단계: 책 데이터 (임시) ---
const sampleBooks = [
  { id: '1', title: '홍길동전', image: require('../assets/images/test_image.jpg') },
  { id: '2', title: '홍길동전', image: require('../assets/images/test_image.jpg') },
  { id: '3', title: '홍길동전', image: require('../assets/images/test_image.jpg') },
  { id: '4', title: '홍길동전', image: require('../assets/images/test_image.jpg') },
  { id: '5', title: '홍길동전', image: require('../assets/images/test_image.jpg') },
  { id: '6', title: '홍길동전', image: require('../assets/images/test_image.jpg') },
];

// --- 5단계: 목표 데이터 ---
const goals = [
  { key: 'new-book', text: '새로운 키워드로 교양 쌓기', icon: 'bulb' },
  { key: 'find-self', text: '나 자신을 성찰하고 발전하기', icon: 'trending-up' },
  { key: 'de-stress', text: '스트레스/복잡한 생각 비우기', icon: 'leaf' },
  { key: 'deep-insight', text: '짜임새와 깊이 있는 감상 남기기', icon: 'book' },
  { key: 'discover', text: '성향 기반 탐색 및 키워드 조합', icon: 'search' },
  { key: 'short-form', text: '숏폼 시청하는 편안한 독서 습관', icon: 'phone-portrait' },
  { key: 'new-hobby', text: '새로운 취미로 아이디어 얻기', icon: 'color-palette' },
];

// --- 1. 답변 상태를 위한 타입 정의 ---
interface SurveyAnswers {
  age: string;
  gender: string;
  genres: string[];
  vibes: string[];
  books: string[];
  goals: string[];
}

export default function SurveyScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  
  // --- 2. useState에 타입 적용 ---
  const [answers, setAnswers] = useState<SurveyAnswers>({
    age: '',
    gender: '',
    genres: [],
    vibes: [],
    books: [],
    goals: [],
  });

  // --- 답변 저장 함수들 ---
  const handleAnswer = (key: string, value: string | number) => {
    // string | number 대신 'age' | 'gender' 등으로 타입을 더 좁힐 수 있지만,
    // 현재 구조에서는 any로 두거나 key 타입을 명확히 분리해야 함.
    // 여기서는 간단하게 key as any로 처리하여 타입 에러를 회피합니다.
    setAnswers(prev => ({ ...prev, [key as any]: value }));
  };

  const toggleMultiSelect = (key: 'genres' | 'vibes' | 'books' | 'goals', value: string) => {
    setAnswers(prev => {
      // 이제 prev[key]는 string[] 타입으로 올바르게 추론됩니다.
      const currentSelection = prev[key] || []; 
      const newSelection = currentSelection.includes(value)
        ? currentSelection.filter(item => item !== value)
        : [...currentSelection, value];
      return { ...prev, [key]: newSelection };
    });
  };

  // --- 네비게이션 함수들 ---
  const handleNext = () => {
    if (currentStep < SURVEY_STEPS - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // 마지막 단계: 완료
      handleSubmit();
    }
  };

  const handleSkip = () => {
    Alert.alert(
      "설문 건너뛰기",
      "취향 설정을 건너뛰시겠어요? 나중에 마이페이지에서 다시 설정할 수 있습니다.",
      [
        { text: "취소", style: "cancel" },
        { text: "건너뛰기", onPress: () => router.replace('/') } // 홈으로 이동
      ]
    );
  };

  const handleSubmit = () => {
    console.log("최종 설문 답변:", answers);
    Alert.alert("설문 완료!", "취향 설정을 완료했습니다. 책바퀴에 오신 것을 환영합니다!");
    router.replace('/'); // 홈으로 이동
  };

  // --- 각 단계를 렌더링하는 함수 ---
  const renderStepContent = () => {
    switch (currentStep) {
      // --- 1단계: 나이/성별 ---
      case 0:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.questionTitle}>나이와 성별을 알려주세요.</Text>
            <Text style={styles.inputLabel}>나이</Text>
            <TextInput
              style={styles.ageInput}
              placeholder="만 나이를 입력 (예: 25)"
              keyboardType="number-pad"
              value={answers.age}
              onChangeText={value => handleAnswer('age', value)}
            />
            <Text style={styles.inputLabel}>성별</Text>
            <View style={styles.genderContainer}>
              {['남', '여'].map(gender => (
                <TouchableOpacity
                  key={gender}
                  style={[
                    styles.genderButton,
                    answers.gender === gender && styles.genderButtonActive
                  ]}
                  onPress={() => handleAnswer('gender', gender)}
                >
                  <Text style={[
                    styles.genderButtonText,
                    answers.gender === gender && styles.genderButtonTextActive
                  ]}>{gender}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      // --- 2단계: 장르 ---
      case 1:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.questionTitle}>주로 어떤 내용의 책에{"\n"}손이 가시나요?</Text>
            <View style={styles.chipContainer}>
              {genres.map(item => (
                <TouchableOpacity
                  key={item.key}
                  style={[styles.chip, answers.genres.includes(item.key) && styles.chipActive]}
                  onPress={() => toggleMultiSelect('genres', item.key)}
                >
                  <Ionicons name={item.icon as any} size={16} color={answers.genres.includes(item.key) ? '#fff' : '#E67E22'} />
                  <Text style={[styles.chipText, answers.genres.includes(item.key) && styles.chipTextActive]}>{item.text}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );
      
      // --- 3단계: 감정/기분 ---
      case 2:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.questionTitle}>책을 통해 어떤 기분을{"\n"}느끼고 싶으신가요?</Text>
            <View style={styles.chipContainer}>
              {vibes.map(item => (
                <TouchableOpacity
                  key={item.key}
                  style={[styles.chip, answers.vibes.includes(item.key) && styles.chipActive]}
                  onPress={() => toggleMultiSelect('vibes', item.key)}
                >
                  <Text style={[styles.chipText, answers.vibes.includes(item.key) && styles.chipTextActive]}>{item.text}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );
        
      // --- 4단계: 책 선택 ---
      case 3:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.questionTitle}>가장 최근에 감명 깊게 읽은{"\n"}책은 무엇인가요?</Text>
            <View style={styles.bookGridContainer}>
              {sampleBooks.map(book => (
                <TouchableOpacity 
                  key={book.id} 
                  style={styles.bookItem}
                  onPress={() => toggleMultiSelect('books', book.id)}
                >
                  <Image source={book.image} style={styles.bookImage} />
                  <Text style={styles.bookTitle}>{book.title}</Text>
                  {answers.books.includes(book.id) && (
                    <View style={styles.bookOverlay}>
                      <Ionicons name="checkmark-circle" size={40} color="#E67E22" />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      // --- 5단계: 목표 ---
      case 4:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.questionTitle}>책을 통해 주로 무엇을{"\n"}얻고 싶으신가요?</Text>
            <View style={styles.goalContainer}>
              {goals.map(item => (
                <TouchableOpacity
                  key={item.key}
                  style={[styles.goalChip, answers.goals.includes(item.key) && styles.goalChipActive]}
                  onPress={() => toggleMultiSelect('goals', item.key)}
                >
                  <Ionicons name={item.icon as any} size={20} color={answers.goals.includes(item.key) ? '#fff' : '#E67E22'} style={styles.goalIcon} />
                  <Text style={[styles.goalChipText, answers.goals.includes(item.key) && styles.goalChipTextActive]}>{item.text}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* --- 헤더: 로고, 건너뛰기 --- */}
      <View style={styles.header}>
        <Text style={styles.logo}>책바퀴</Text>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipButton}>건너뛰기</Text>
        </TouchableOpacity>
      </View>

      {/* --- 메인 콘텐츠 스크롤 --- */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {renderStepContent()}
      </ScrollView>

      {/* --- 하단: 진행 상태, 다음 버튼 --- */}
      <View style={styles.footer}>
        <View style={styles.progressContainer}>
          {[...Array(SURVEY_STEPS)].map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === currentStep && styles.dotActive]}
            />
          ))}
        </View>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>
            {currentStep === SURVEY_STEPS - 1 ? '시작하기' : '다음'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// --- 스타일시트 ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E67E22',
  },
  skipButton: {
    fontSize: 16,
    color: '#888',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  stepContainer: {
    flex: 1,
  },
  questionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    lineHeight: 32,
  },
  // --- Footer ---
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  dotActive: {
    backgroundColor: '#E67E22',
  },
  nextButton: {
    backgroundColor: '#E67E22',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // --- 1단계: 나이/성별 ---
  inputLabel: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
    marginTop: 10,
  },
  ageInput: {
    width: '100%',
    height: 50,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  genderContainer: {
    flexDirection: 'row',
  },
  genderButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 5,
  },
  genderButtonActive: {
    backgroundColor: '#E67E22',
    borderColor: '#E67E22',
  },
  genderButtonText: {
    fontSize: 16,
    color: '#333',
  },
  genderButtonTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  // --- 2/3단계: 칩 (장르, 기분) ---
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E67E22',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 5,
  },
  chipActive: {
    backgroundColor: '#E67E22',
  },
  chipText: {
    fontSize: 15,
    color: '#E67E22',
    marginLeft: 5,
  },
  chipTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  // --- 4단계: 책 선택 ---
  bookGridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  bookItem: {
    width: '48%', // 2열
    marginBottom: 15,
    position: 'relative',
  },
  bookImage: {
    width: '100%',
    height: 220,
    borderRadius: 8,
    backgroundColor: 'lightgrey',
  },
  bookTitle: {
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 5,
  },
  bookOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  // --- 5단계: 목표 ---
  goalContainer: {
    flex: 1,
  },
  goalChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  goalChipActive: {
    backgroundColor: '#fff',
    borderColor: '#E67E22',
  },
  goalIcon: {
    marginRight: 15,
  },
  goalChipText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  goalChipTextActive: {
    fontWeight: 'bold',
  },
});

