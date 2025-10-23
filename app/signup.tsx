import React, { useState } from 'react';
import {
    Alert,
    Image // --- 1. Image import 추가 ---
    ,


    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
// --- 2. LinearGradient import 추가 ---
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router'; // 페이지 이동을 위한 훅

export default function SignupScreen() {
  const router = useRouter();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [agreements, setAgreements] = useState({
    all: false,
    terms: false,
    privacy: false,
  });

  // 전체 동의 핸들러
  const handleAllAgree = () => {
    const newState = !agreements.all;
    setAgreements({ all: newState, terms: newState, privacy: newState });
  };

  // 개별 동의 핸들러
  const handleAgree = (type: 'terms' | 'privacy') => {
    setAgreements(prev => {
      const newState = { ...prev, [type]: !prev[type] };
      newState.all = newState.terms && newState.privacy;
      return newState;
    });
  };

  const handleSignup = () => {
    if (!agreements.terms || !agreements.privacy) {
      Alert.alert('회원가입 오류', '필수 약관에 동의해야 합니다.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('회원가입 오류', '비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }
    // TODO: 여기에 실제 회원가입 로직 구현 (API 호출, 데이터 저장 등)
    console.log('Signup attempt with:', { id, email, password, agreements });
    Alert.alert('회원가입 성공', '회원가입이 완료되었습니다. 로그인 해주세요.');
    router.replace('/login'); // 회원가입 성공 후 로그인 페이지로 이동
  };

  const handleIdCheck = () => {
    // TODO: 아이디 중복 확인 로직
    Alert.alert('아이디 확인', '사용 가능한 아이디입니다.');
  };

  const handleEmailVerification = () => {
    // TODO: 이메일 인증번호 전송 로직
    Alert.alert('인증번호 전송', '인증번호가 이메일로 전송되었습니다.');
  };

  const handleVerifyCode = () => {
    // TODO: 인증번호 확인 로직
    Alert.alert('인증번호 확인', '인증번호가 확인되었습니다.');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require('../assets/images/signup_bg.jpg')} // 임시 배경 이미지
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.8)']}
          style={styles.gradientOverlay}
        >
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
          >
            <ScrollView contentContainerStyle={styles.scrollContent}>
              <Text style={styles.title}>회원가입</Text>
              <Text style={styles.subtitle}>간편하게 책바퀴에 가입하세요!</Text>

              {/* 카카오 소설 회원가입 버튼 */}
              <TouchableOpacity style={styles.kakaoButton}>
                <Image 
                  source={require('../assets/images/kakao_login_medium_narrow.png')} // 카카오 버튼 이미지
                  style={styles.kakaoIcon} 
                />
                <Text style={styles.kakaoButtonText}>카카오로 시작하기</Text>
              </TouchableOpacity>
              <View style={styles.dividerContainer}>
                <View style={styles.divider} />
                <Text style={styles.dividerText}>또는</Text>
                <View style={styles.divider} />
              </View>

              {/* 일반 회원가입 폼 */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>아이디</Text>
                <View style={styles.inputWithButton}>
                  <TextInput
                    style={styles.input}
                    value={id}
                    onChangeText={setId}
                    placeholder="아이디를 입력하세요"
                    autoCapitalize="none"
                  />
                  <TouchableOpacity style={styles.checkButton} onPress={handleIdCheck}>
                    <Text style={styles.checkButtonText}>중복확인</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>비밀번호</Text>
                <TextInput
                  style={styles.fullWidthInput}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="비밀번호 (8자 이상)"
                  secureTextEntry
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>비밀번호 확인</Text>
                <TextInput
                  style={styles.fullWidthInput}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="비밀번호를 다시 입력하세요"
                  secureTextEntry
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>이메일</Text>
                <View style={styles.inputWithButton}>
                  <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="이메일을 입력하세요"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  <TouchableOpacity style={styles.sendCodeButton} onPress={handleEmailVerification}>
                    <Text style={styles.sendCodeButtonText}>인증전송</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.inputWithButton}>
                  <TextInput
                    style={styles.input}
                    value={verificationCode}
                    onChangeText={setVerificationCode}
                    placeholder="인증번호를 입력하세요"
                    keyboardType="numeric"
                  />
                  <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyCode}>
                    <Text style={styles.verifyButtonText}>인증확인</Text>
                  </TouchableOpacity>
                </View>
              </View>
              
              {/* 약관 동의 */}
              <View style={styles.agreementContainer}>
                <TouchableOpacity style={styles.checkboxRow} onPress={handleAllAgree}>
                  <Ionicons 
                    name={agreements.all ? "checkmark-circle" : "ellipse-outline"} 
                    size={24} 
                    color={agreements.all ? "#E67E22" : "#888"} 
                  />
                  <Text style={styles.checkboxText}>전체 동의 (필수)</Text>
                </TouchableOpacity>

                <View style={styles.separator} />

                <TouchableOpacity style={styles.checkboxRow} onPress={() => handleAgree('terms')}>
                  <Ionicons 
                    name={agreements.terms ? "checkmark-circle" : "ellipse-outline"} 
                    size={24} 
                    color={agreements.terms ? "#E67E22" : "#888"} 
                  />
                  <Text style={styles.checkboxText}>이용약관 동의 (필수)</Text>
                  <TouchableOpacity style={styles.viewDetailsButton}>
                    <Text style={styles.viewDetailsText}>전문보기</Text>
                  </TouchableOpacity>
                </TouchableOpacity>

                <TouchableOpacity style={styles.checkboxRow} onPress={() => handleAgree('privacy')}>
                  <Ionicons 
                    name={agreements.privacy ? "checkmark-circle" : "ellipse-outline"} 
                    size={24} 
                    color={agreements.privacy ? "#E67E22" : "#888"} 
                  />
                  <Text style={styles.checkboxText}>개인정보 수집 및 동의 (필수)</Text>
                  <TouchableOpacity style={styles.viewDetailsButton}>
                    <Text style={styles.viewDetailsText}>전문보기</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
                <Text style={styles.signupButtonText}>회원가입</Text>
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000', // 배경 이미지 로딩 전 임시 배경
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  gradientOverlay: {
    flex: 1,
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 30,
    textAlign: 'center',
  },
  kakaoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEE500', // 카카오 노란색
    borderRadius: 8,
    width: '90%',
    paddingVertical: 15,
    marginBottom: 20,
  },
  kakaoIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
    resizeMode: 'contain',
  },
  kakaoButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3C1E1E', // 카카오 글씨색
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginBottom: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#888',
    opacity: 0.5,
  },
  dividerText: {
    color: '#ccc',
    marginHorizontal: 10,
    fontSize: 14,
  },
  inputGroup: {
    width: '90%',
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#eee',
    marginBottom: 5,
  },
  inputWithButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#fff',
    marginRight: 10,
  },
  fullWidthInput: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#fff',
  },
  checkButton: {
    backgroundColor: '#E67E22',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  checkButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  sendCodeButton: {
    backgroundColor: '#A0A0A0', // 회색
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  sendCodeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  verifyButton: {
    backgroundColor: '#A0A0A0', // 회색
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  agreementContainer: {
    width: '90%',
    marginTop: 20,
    marginBottom: 30,
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 10,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxText: {
    color: '#fff',
    fontSize: 15,
    marginLeft: 10,
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginVertical: 10,
  },
  viewDetailsButton: {
    marginLeft: 'auto', // 오른쪽으로 밀기
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 5,
  },
  viewDetailsText: {
    color: '#E67E22',
    fontSize: 13,
  },
  signupButton: {
    width: '90%',
    height: 55,
    backgroundColor: '#E67E22',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

