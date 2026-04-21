import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Feather from '@react-native-vector-icons/feather';
import { db } from './config/firebase';
import { ref, push, serverTimestamp } from 'firebase/database';

const COLORS = {
  blue: '#1565C0',
  lightBlue: '#EAF2FF',
  red: '#E53935',
  lightRed: '#FDECEC',
  green: '#16A34A',
  lightGreen: '#EAFBF0',
  bg: '#F5F7FB',
  textDark: '#1F2937',
  textLight: '#6B7280',
  border: '#E5E7EB',
  borderFocus: '#1565C0',
  white: '#FFFFFF',
  errorRed: '#E53935',
  lightError: '#FDECEC',
};

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

const ContactUsScreen = ({ navigation }: any) => {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [firebaseError, setFirebaseError] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = 'Enter a valid email address';
    if (form.phone && !/^[0-9+\-\s]{7,15}$/.test(form.phone))
      newErrors.phone = 'Enter a valid phone number';
    if (!form.subject.trim()) newErrors.subject = 'Subject is required';
    if (!form.message.trim()) newErrors.message = 'Message is required';
    else if (form.message.trim().length < 10)
      newErrors.message = 'Message must be at least 10 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    setFirebaseError(null);
    try {
      const dbRef = ref(db, 'contactMessages');
      await push(dbRef, {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        subject: form.subject.trim(),
        message: form.message.trim(),
        status: 'unread',
        submittedAt: serverTimestamp(),
      });
      console.log('✅ Firebase write successful');
      setSubmitted(true);
    } catch (error: any) {
      console.error('❌ Firebase error:', error.message);
      setFirebaseError(`Failed to send: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    setErrors({});
    setFirebaseError(null);
    setSubmitted(false);
  };

  const inputStyle = (field: string) => [
    styles.input,
    focusedField === field && styles.inputFocused,
    errors[field as keyof FormErrors] && styles.inputError,
  ];

  // ── Success Screen ──────────────────────────────────────────
  if (submitted) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />
        <View style={styles.successWrapper}>
          <View style={styles.successIconWrap}>
            <Feather name="check-circle" size={56} color={COLORS.green} />
          </View>
          <Text style={styles.successTitle}>Message Sent!</Text>
          <Text style={styles.successText}>
            Thank you for reaching out. Our team will get back to you within 24–48 hours.
          </Text>
          <Pressable
            style={({ pressed }) => [
              styles.submitBtn,
              pressed && styles.submitBtnPressed,
            ]}
            onPress={handleReset}
          >
            <Text style={styles.submitBtnText}>Send Another Message</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.resetBtn,
              pressed && { opacity: 0.6 },
            ]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.resetBtnText}>Back to Dashboard</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  // ── Form Screen ─────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <Pressable
              onPress={() => navigation.goBack()}
              style={({ pressed }) => [
                styles.backBtn,
                pressed && { opacity: 0.6 },
              ]}
            >
              <Feather name="arrow-left" size={22} color={COLORS.blue} />
            </Pressable>
            <View style={styles.headerIcon}>
              <Feather name="mail" size={24} color={COLORS.blue} />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.headerTitle}>Contact Us</Text>
              <Text style={styles.headerSub}>We're here to help you</Text>
            </View>
          </View>

          {/* Info card */}
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Feather name="phone" size={16} color={COLORS.blue} />
              <Text style={styles.infoText}>+977-1-XXXXXXX</Text>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Feather name="mail" size={16} color={COLORS.blue} />
              <Text style={styles.infoText}>support@cybersathi.np</Text>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Feather name="clock" size={16} color={COLORS.blue} />
              <Text style={styles.infoText}>Mon–Fri, 9 AM – 6 PM</Text>
            </View>
          </View>

          {/* Firebase error banner */}
          {firebaseError && (
            <View style={styles.errorBanner}>
              <Feather name="wifi-off" size={16} color={COLORS.errorRed} />
              <Text style={styles.errorBannerText}>{firebaseError}</Text>
            </View>
          )}

          {/* Form card */}
          <View style={styles.formCard}>

            {/* Name */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>
                Full Name <Text style={styles.required}>*</Text>
              </Text>
              <View style={[styles.inputWrapper, focusedField === 'name' && styles.inputWrapperFocused, errors.name && styles.inputWrapperError]}>
                <Feather name="user" size={16} color={focusedField === 'name' ? COLORS.blue : COLORS.textLight} style={styles.inputIcon} />
                <TextInput
                  style={inputStyle('name')}
                  placeholder="Enter your full name"
                  placeholderTextColor={COLORS.textLight}
                  value={form.name}
                  onChangeText={val => { setForm({ ...form, name: val }); setErrors({ ...errors, name: undefined }); }}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  returnKeyType="next"
                />
              </View>
              {errors.name && (
                <View style={styles.errorRow}>
                  <Feather name="alert-circle" size={12} color={COLORS.errorRed} />
                  <Text style={styles.errorText}>{errors.name}</Text>
                </View>
              )}
            </View>

            {/* Email */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>
                Email Address <Text style={styles.required}>*</Text>
              </Text>
              <View style={[styles.inputWrapper, focusedField === 'email' && styles.inputWrapperFocused, errors.email && styles.inputWrapperError]}>
                <Feather name="mail" size={16} color={focusedField === 'email' ? COLORS.blue : COLORS.textLight} style={styles.inputIcon} />
                <TextInput
                  style={inputStyle('email')}
                  placeholder="you@example.com"
                  placeholderTextColor={COLORS.textLight}
                  value={form.email}
                  onChangeText={val => { setForm({ ...form, email: val }); setErrors({ ...errors, email: undefined }); }}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  returnKeyType="next"
                />
              </View>
              {errors.email && (
                <View style={styles.errorRow}>
                  <Feather name="alert-circle" size={12} color={COLORS.errorRed} />
                  <Text style={styles.errorText}>{errors.email}</Text>
                </View>
              )}
            </View>

            {/* Phone */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>
                Phone Number <Text style={styles.optional}>(optional)</Text>
              </Text>
              <View style={[styles.inputWrapper, focusedField === 'phone' && styles.inputWrapperFocused, errors.phone && styles.inputWrapperError]}>
                <Feather name="phone" size={16} color={focusedField === 'phone' ? COLORS.blue : COLORS.textLight} style={styles.inputIcon} />
                <TextInput
                  style={inputStyle('phone')}
                  placeholder="+977 98XXXXXXXX"
                  placeholderTextColor={COLORS.textLight}
                  value={form.phone}
                  onChangeText={val => { setForm({ ...form, phone: val }); setErrors({ ...errors, phone: undefined }); }}
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField(null)}
                  keyboardType="phone-pad"
                  returnKeyType="next"
                />
              </View>
              {errors.phone && (
                <View style={styles.errorRow}>
                  <Feather name="alert-circle" size={12} color={COLORS.errorRed} />
                  <Text style={styles.errorText}>{errors.phone}</Text>
                </View>
              )}
            </View>

            {/* Subject */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>
                Subject <Text style={styles.required}>*</Text>
              </Text>
              <View style={[styles.inputWrapper, focusedField === 'subject' && styles.inputWrapperFocused, errors.subject && styles.inputWrapperError]}>
                <Feather name="tag" size={16} color={focusedField === 'subject' ? COLORS.blue : COLORS.textLight} style={styles.inputIcon} />
                <TextInput
                  style={inputStyle('subject')}
                  placeholder="What is this about?"
                  placeholderTextColor={COLORS.textLight}
                  value={form.subject}
                  onChangeText={val => { setForm({ ...form, subject: val }); setErrors({ ...errors, subject: undefined }); }}
                  onFocus={() => setFocusedField('subject')}
                  onBlur={() => setFocusedField(null)}
                  returnKeyType="next"
                />
              </View>
              {errors.subject && (
                <View style={styles.errorRow}>
                  <Feather name="alert-circle" size={12} color={COLORS.errorRed} />
                  <Text style={styles.errorText}>{errors.subject}</Text>
                </View>
              )}
            </View>

            {/* Message */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>
                Message <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={[
                  styles.textarea,
                  focusedField === 'message' && styles.textareaFocused,
                  errors.message && styles.textareaError,
                ]}
                placeholder="Describe your issue or query in detail..."
                placeholderTextColor={COLORS.textLight}
                value={form.message}
                onChangeText={val => { setForm({ ...form, message: val }); setErrors({ ...errors, message: undefined }); }}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                multiline
                numberOfLines={5}
                textAlignVertical="top"
              />
              <Text style={styles.charCount}>{form.message.length} characters</Text>
              {errors.message && (
                <View style={styles.errorRow}>
                  <Feather name="alert-circle" size={12} color={COLORS.errorRed} />
                  <Text style={styles.errorText}>{errors.message}</Text>
                </View>
              )}
            </View>

            {/* Submit */}
            <Pressable
              style={({ pressed }) => [
                styles.submitBtn,
                pressed && styles.submitBtnPressed,
                loading && styles.submitBtnDisabled,
              ]}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <Text style={styles.submitBtnText}>Sending...</Text>
              ) : (
                <>
                  <Feather name="send" size={18} color={COLORS.white} />
                  <Text style={styles.submitBtnText}>Send Message</Text>
                </>
              )}
            </Pressable>

            {/* Clear */}
            <Pressable
              style={({ pressed }) => [
                styles.resetBtn,
                pressed && { opacity: 0.6 },
              ]}
              onPress={handleReset}
            >
              <Text style={styles.resetBtnText}>Clear Form</Text>
            </Pressable>

          </View>
          <View style={{ height: 28 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ContactUsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  scroll: { padding: 16 },

  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  backBtn: { marginRight: 8, padding: 4 },
  headerIcon: { width: 52, height: 52, borderRadius: 14, backgroundColor: COLORS.lightBlue, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: COLORS.blue },
  headerSub: { fontSize: 13, color: COLORS.textLight, marginTop: 2 },

  infoCard: { backgroundColor: COLORS.white, borderRadius: 14, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: COLORS.border },
  infoRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 6 },
  infoText: { fontSize: 14, color: COLORS.textDark, marginLeft: 10 },
  infoDivider: { height: 1, backgroundColor: COLORS.border },

  errorBanner: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.lightError, borderRadius: 10, padding: 12, marginBottom: 12, borderWidth: 1, borderColor: COLORS.errorRed },
  errorBannerText: { fontSize: 13, color: COLORS.errorRed, marginLeft: 8, flex: 1 },

  formCard: { backgroundColor: COLORS.white, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: COLORS.border },

  fieldGroup: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: '600', color: COLORS.textDark, marginBottom: 6 },
  required: { color: COLORS.red },
  optional: { fontSize: 12, color: COLORS.textLight, fontWeight: '400' },

  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.bg, borderWidth: 1.5, borderColor: COLORS.border, borderRadius: 10 },
  inputWrapperFocused: { borderColor: COLORS.borderFocus, backgroundColor: '#EAF2FF55' },
  inputWrapperError: { borderColor: COLORS.errorRed, backgroundColor: COLORS.lightError },
  inputIcon: { marginLeft: 12 },
  input: { flex: 1, paddingHorizontal: 10, paddingVertical: 12, fontSize: 14, color: COLORS.textDark },
  inputFocused: {},
  inputError: {},

  textarea: { backgroundColor: COLORS.bg, borderWidth: 1.5, borderColor: COLORS.border, borderRadius: 10, padding: 12, fontSize: 14, color: COLORS.textDark, minHeight: 120 },
  textareaFocused: { borderColor: COLORS.borderFocus, backgroundColor: '#EAF2FF55' },
  textareaError: { borderColor: COLORS.errorRed, backgroundColor: COLORS.lightError },
  charCount: { fontSize: 11, color: COLORS.textLight, textAlign: 'right', marginTop: 4 },

  errorRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  errorText: { fontSize: 12, color: COLORS.errorRed, marginLeft: 4 },

  submitBtn: { backgroundColor: COLORS.blue, paddingVertical: 14, borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 8 },
  submitBtnPressed: { backgroundColor: '#0D47A1' },
  submitBtnDisabled: { backgroundColor: '#90A4AE' },
  submitBtnText: { color: COLORS.white, fontSize: 16, fontWeight: '700', marginLeft: 8 },

  resetBtn: { alignItems: 'center', paddingVertical: 12, marginTop: 8 },
  resetBtnText: { fontSize: 14, color: COLORS.textLight },

  successWrapper: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
  successIconWrap: { width: 100, height: 100, borderRadius: 50, backgroundColor: COLORS.lightGreen, justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
  successTitle: { fontSize: 24, fontWeight: 'bold', color: COLORS.textDark, marginBottom: 12 },
  successText: { fontSize: 15, color: COLORS.textLight, textAlign: 'center', lineHeight: 22, marginBottom: 32 },
});