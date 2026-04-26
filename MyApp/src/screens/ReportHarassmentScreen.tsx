import React, { useState } from 'react';
import {
  SafeAreaView, ScrollView, View, Text,
  TextInput, StyleSheet, Pressable, StatusBar,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import PrimaryButton from '../../../components/src/components/PrimaryButton';
import SectionTitle from '../../../components/src/components/SectionTitle';

const COLORS = {
  blue: '#1565C0', lightBlue: '#EAF2FF',
  red: '#E53935', lightRed: '#FDECEC',
  green: '#16A34A', lightGreen: '#EAFBF0',
  bg: '#F5F7FB', textDark: '#1F2937', textLight: '#6B7280',
  border: '#E5E7EB', white: '#FFFFFF',
};

const crimeTypes = ['Cyberbullying', 'Harassment', 'Fake Profile', 'Threats', 'Blackmail'];
const platforms = ['Facebook', 'Instagram', 'TikTok', 'X (Twitter)', 'Other'];

const ReportHarassmentScreen = ({ navigation }: any) => {
  const [crimeType, setCrimeType] = useState('');
  const [platform, setPlatform] = useState('');
  const [offenderId, setOffenderId] = useState('');
  const [postLink, setPostLink] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [complaintId, setComplaintId] = useState('');

  const handleSubmit = () => {
    const id = `CS-2026-${1000 + Math.floor(Math.random() * 999)}`;
    setComplaintId(id);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.successScreen}>
          <View style={styles.successCircle}>
            <Feather name="check-circle" size={56} color={COLORS.green} />
          </View>
          <Text style={styles.successTitle}>Complaint Submitted!</Text>
          <Text style={styles.successSub}>Your complaint has been filed successfully.</Text>
          <View style={styles.idBox}>
            <Text style={styles.idLabel}>Your Complaint ID</Text>
            <Text style={styles.idValue}>{complaintId}</Text>
            <Text style={styles.idNote}>Save this ID to track your complaint status.</Text>
          </View>
          <PrimaryButton label="Track My Complaint" icon="search" color={COLORS.blue}
            onPress={() => navigation.navigate('TrackComplaint', { complaintId })} />
          <PrimaryButton label="Back to Dashboard" icon="home" color="#6B7280"
            onPress={() => navigation.navigate('Dashboard')} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Feather name="arrow-left" size={22} color={COLORS.blue} />
          </Pressable>
          <View style={styles.headerIcon}>
            <Feather name="alert-triangle" size={22} color={COLORS.red} />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.headerTitle}>Report Harassment</Text>
            <Text style={styles.headerSub}>File a cybercrime complaint</Text>
          </View>
        </View>

        {/* Crime Type */}
        <SectionTitle title="Type of Crime *" />
        <View style={styles.chipRow}>
          {crimeTypes.map(type => (
            <Pressable key={type} onPress={() => setCrimeType(type)}
              style={[styles.chip, crimeType === type && styles.chipActive]}>
              <Text style={[styles.chipText, crimeType === type && styles.chipTextActive]}>{type}</Text>
            </Pressable>
          ))}
        </View>

        {/* Platform */}
        <SectionTitle title="Social Media Platform *" />
        <View style={styles.chipRow}>
          {platforms.map(p => (
            <Pressable key={p} onPress={() => setPlatform(p)}
              style={[styles.chip, platform === p && styles.chipActive]}>
              <Text style={[styles.chipText, platform === p && styles.chipTextActive]}>{p}</Text>
            </Pressable>
          ))}
        </View>

        {/* Form */}
        <View style={styles.formCard}>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Offender Username / ID</Text>
            <View style={styles.inputWrap}>
              <Feather name="user-x" size={16} color={COLORS.textLight} style={styles.inputIcon} />
              <TextInput style={styles.input} placeholder="e.g. @username or user ID"
                placeholderTextColor={COLORS.textLight} value={offenderId} onChangeText={setOffenderId} />
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Post / Profile Link</Text>
            <View style={styles.inputWrap}>
              <Feather name="link" size={16} color={COLORS.textLight} style={styles.inputIcon} />
              <TextInput style={styles.input} placeholder="Paste the URL here"
                placeholderTextColor={COLORS.textLight} value={postLink}
                onChangeText={setPostLink} autoCapitalize="none" />
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Upload Screenshot</Text>
            <Pressable style={({ pressed }) => [styles.uploadBtn, pressed && { opacity: 0.7 }]}>
              <Feather name="upload" size={20} color={COLORS.blue} />
              <Text style={styles.uploadText}>Tap to upload screenshot</Text>
              <Text style={styles.uploadSub}>JPG, PNG up to 5MB</Text>
            </Pressable>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Describe the Incident *</Text>
            <TextInput style={styles.textarea}
              placeholder="Explain what happened in detail..."
              placeholderTextColor={COLORS.textLight}
              value={description} onChangeText={setDescription}
              multiline numberOfLines={5} textAlignVertical="top" />
            <Text style={styles.charCount}>{description.length} characters</Text>
          </View>
        </View>

        <PrimaryButton label="Submit Complaint" icon="send" color={COLORS.red}
          onPress={handleSubmit} disabled={!crimeType || !platform || !description} />
        <Text style={styles.disclaimer}>⚠️ Filing a false complaint is a punishable offense.</Text>

        <View style={{ height: 28 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReportHarassmentScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  scroll: { padding: 16 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  backBtn: { marginRight: 8, padding: 4 },
  headerIcon: { width: 48, height: 48, borderRadius: 14, backgroundColor: COLORS.lightRed, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.textDark },
  headerSub: { fontSize: 13, color: COLORS.textLight },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999, backgroundColor: COLORS.white, borderWidth: 1.5, borderColor: COLORS.border, marginRight: 8, marginBottom: 8 },
  chipActive: { backgroundColor: COLORS.blue, borderColor: COLORS.blue },
  chipText: { fontSize: 13, color: COLORS.textDark, fontWeight: '500' },
  chipTextActive: { color: COLORS.white, fontWeight: '700' },
  formCard: { backgroundColor: COLORS.white, borderRadius: 16, padding: 16, marginTop: 16, borderWidth: 1, borderColor: COLORS.border },
  fieldGroup: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: '600', color: COLORS.textDark, marginBottom: 6 },
  inputWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.bg, borderWidth: 1.5, borderColor: COLORS.border, borderRadius: 10 },
  inputIcon: { marginLeft: 12 },
  input: { flex: 1, paddingHorizontal: 10, paddingVertical: 12, fontSize: 14, color: COLORS.textDark },
  uploadBtn: { backgroundColor: COLORS.lightBlue, borderRadius: 12, padding: 20, alignItems: 'center', borderWidth: 1.5, borderColor: COLORS.blue },
  uploadText: { fontSize: 14, color: COLORS.blue, fontWeight: '600', marginTop: 8 },
  uploadSub: { fontSize: 12, color: COLORS.textLight, marginTop: 4 },
  textarea: { backgroundColor: COLORS.bg, borderWidth: 1.5, borderColor: COLORS.border, borderRadius: 10, padding: 12, fontSize: 14, color: COLORS.textDark, minHeight: 120 },
  charCount: { fontSize: 11, color: COLORS.textLight, textAlign: 'right', marginTop: 4 },
  disclaimer: { textAlign: 'center', fontSize: 12, color: COLORS.textLight, marginTop: 12 },
  successScreen: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  successCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: COLORS.lightGreen, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  successTitle: { fontSize: 26, fontWeight: 'bold', color: COLORS.textDark, marginBottom: 8 },
  successSub: { fontSize: 15, color: COLORS.textLight, textAlign: 'center', marginBottom: 24 },
  idBox: { backgroundColor: COLORS.lightBlue, borderRadius: 16, padding: 20, alignItems: 'center', width: '100%', marginBottom: 8 },
  idLabel: { fontSize: 13, color: COLORS.textLight },
  idValue: { fontSize: 26, fontWeight: 'bold', color: COLORS.blue, marginVertical: 6, letterSpacing: 1 },
  idNote: { fontSize: 12, color: COLORS.textLight, textAlign: 'center' },
});