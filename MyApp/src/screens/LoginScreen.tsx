import React, { useState } from 'react';
import {
  SafeAreaView, ScrollView, View, Text,
  TextInput, StyleSheet, Pressable, StatusBar,
} from 'react-native';
// import Feather from '@react-native-vector-icons/feather';
import PrimaryButton from '../../../components/src/components/PrimaryButton';

const COLORS = {
  blue: '#1565C0', lightBlue: '#EAF2FF',
  red: '#E53935', bg: '#F5F7FB',
  textDark: '#1F2937', textLight: '#6B7280',
  border: '#E5E7EB', white: '#FFFFFF',
};

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

        {/* Logo */}
        <View style={styles.logoSection}>
          <View style={styles.logoCircle}>
            <Text style={{ fontSize: 48, color: COLORS.blue }}>🛡️</Text>
          </View>
          <Text style={styles.appName}>Cyber Sathi</Text>
          <Text style={styles.tagline}>Nepal's Cybercrime Reporting App</Text>
        </View>

        {/* Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Welcome Back</Text>
          <Text style={styles.cardSub}>Sign in to continue</Text>

          {/* Email */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Email or Phone</Text>
            <View style={[styles.inputWrap, focused === 'email' && styles.inputFocused]}>
              <Text style={[styles.inputIcon, { color: COLORS.textLight }]}>👤</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter email or phone"
                placeholderTextColor={COLORS.textLight}
                value={email}
                onChangeText={setEmail}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Password */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={[styles.inputWrap, focused === 'password' && styles.inputFocused]}>
              <Text style={[styles.inputIcon, { color: COLORS.textLight }]}>🔒</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter password"
                placeholderTextColor={COLORS.textLight}
                value={password}
                onChangeText={setPassword}
                onFocus={() => setFocused('password')}
                onBlur={() => setFocused(null)}
                secureTextEntry={!showPass}
              />
              <Pressable onPress={() => setShowPass(!showPass)} style={styles.eyeBtn}>
                <Text style={{ color: COLORS.textLight, fontSize: 16 }}>{showPass ? '👁️' : '🙈'}</Text>
              </Pressable>
            </View>
          </View>

          {/* Sign In */}
          <PrimaryButton
            label="Sign In"
            color={COLORS.blue}
            onPress={() => navigation.navigate('Dashboard')}
            style={{ marginTop: 16 }}
          />

          {/* Anonymous */}
          <PrimaryButton
            label="Continue Anonymously"
            color="#6B7280"
            onPress={() => navigation.navigate('Dashboard')}
          />

          {/* Sign Up */}
          <View style={styles.signupRow}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <Pressable>
              <Text style={styles.signupLink}>Sign Up</Text>
            </Pressable>
          </View>
        </View>

        <Text style={styles.footerNote}>🔒 Your data is safe and confidential</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  scroll: { padding: 24, flexGrow: 1, justifyContent: 'center' },
  logoSection: { alignItems: 'center', marginBottom: 32 },
  logoCircle: {
    width: 90, height: 90, borderRadius: 45,
    backgroundColor: COLORS.lightBlue,
    justifyContent: 'center', alignItems: 'center', marginBottom: 14,
  },
  appName: { fontSize: 28, fontWeight: 'bold', color: COLORS.blue },
  tagline: { fontSize: 14, color: COLORS.textLight, marginTop: 4 },
  card: {
    backgroundColor: COLORS.white, borderRadius: 20,
    padding: 24, borderWidth: 1, borderColor: COLORS.border,
  },
  cardTitle: { fontSize: 22, fontWeight: 'bold', color: COLORS.textDark },
  cardSub: { fontSize: 14, color: COLORS.textLight, marginTop: 4, marginBottom: 20 },
  fieldGroup: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: '600', color: COLORS.textDark, marginBottom: 6 },
  inputWrap: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.bg, borderWidth: 1.5,
    borderColor: COLORS.border, borderRadius: 10,
  },
  inputFocused: { borderColor: COLORS.blue, backgroundColor: '#EAF2FF44' },
  inputIcon: { marginLeft: 12 },
  input: { flex: 1, paddingHorizontal: 10, paddingVertical: 12, fontSize: 14, color: COLORS.textDark },
  eyeBtn: { padding: 12 },
  signupRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 16 },
  signupText: { fontSize: 14, color: COLORS.textLight },
  signupLink: { fontSize: 14, color: COLORS.blue, fontWeight: '700' },
  footerNote: { textAlign: 'center', color: COLORS.textLight, fontSize: 13, marginTop: 24 },
});