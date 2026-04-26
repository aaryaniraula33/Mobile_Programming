import React from 'react';
import {
  SafeAreaView, ScrollView, View, Text,
  StyleSheet, Pressable, StatusBar,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const COLORS = {
  blue: '#1565C0', lightBlue: '#EAF2FF',
  red: '#E53935', lightRed: '#FDECEC',
  orange: '#FF8C42', lightOrange: '#FFF3E8',
  teal: '#0D9488', lightTeal: '#CCFBF1',
  purple: '#7C3AED', lightPurple: '#EDE9FE',
  bg: '#F5F7FB', textDark: '#1F2937', textLight: '#6B7280',
  border: '#E5E7EB', white: '#FFFFFF',
};

const crimeData = [
  {
    type: 'Cyberbullying', icon: 'message-circle', color: COLORS.red, bg: COLORS.lightRed,
    description: 'Using digital technology to repeatedly harass, threaten, or humiliate another person.',
    examples: ['Sending threatening messages', 'Spreading rumors online', 'Posting embarrassing content without consent'],
    awareness: 'Nepal\'s Electronic Transactions Act addresses online harassment. Report to Cyber Bureau.',
  },
  {
    type: 'Fake Profile', icon: 'user-x', color: COLORS.orange, bg: COLORS.lightOrange,
    description: 'Creating a fake social media profile pretending to be someone else to deceive or damage reputation.',
    examples: ['Impersonating someone on Facebook', 'Using stolen photos', 'Pretending to be an official'],
    awareness: 'Identity fraud online is punishable under Nepal\'s cyber laws.',
  },
  {
    type: 'Online Threats', icon: 'alert-triangle', color: COLORS.red, bg: COLORS.lightRed,
    description: 'Using online platforms to threaten physical harm, death, or violence.',
    examples: ['Death threats via social media', 'Threatening family members', 'Repeated threatening messages'],
    awareness: 'Document all threats before blocking. Report to Nepal Police Cyber Bureau.',
  },
  {
    type: 'Blackmail', icon: 'lock', color: COLORS.purple, bg: COLORS.lightPurple,
    description: 'Threatening to reveal private information unless demands are met.',
    examples: ['Threatening to share private photos', 'Demanding money not to post videos', 'Sextortion'],
    awareness: 'Never pay ransom. Report immediately to Cyber Bureau: 01-4412439.',
  },
  {
    type: 'Phishing', icon: 'mail', color: COLORS.teal, bg: COLORS.lightTeal,
    description: 'Fraudulent attempts to obtain sensitive information by disguising as a trustworthy entity.',
    examples: ['Fake bank emails asking for passwords', 'SMS claiming you won a prize', 'Fake login pages'],
    awareness: 'Never share OTPs or passwords. Banks never ask for your PIN via message.',
  },
];

const CrimeInfoScreen = ({ navigation, route }: any) => {
  const topic = route?.params?.topic;
  const data = topic
    ? crimeData.filter(c =>
        c.type.toLowerCase().includes(topic.toLowerCase()) ||
        topic.toLowerCase().includes(c.type.toLowerCase()))
    : crimeData;
  const displayData = data.length > 0 ? data : crimeData;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Feather name="arrow-left" size={22} color={COLORS.blue} />
          </Pressable>
          <View style={styles.headerIcon}>
            <Feather name="book-open" size={22} color={COLORS.blue} />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.headerTitle}>{topic || 'Cybercrime Info'}</Text>
            <Text style={styles.headerSub}>Know your rights and stay safe</Text>
          </View>
        </View>

        {/* Intro */}
        <View style={styles.introBanner}>
          <Feather name="info" size={18} color={COLORS.blue} style={styles.introIcon} />
          <Text style={styles.introText}>
            Educational purposes only. For legal advice, contact official authorities.
          </Text>
        </View>

        {/* Crime Cards */}
        {displayData.map((crime, i) => (
          <View key={i} style={styles.crimeCard}>
            <View style={styles.crimeHeader}>
              <View style={[styles.crimeIconWrap, { backgroundColor: crime.bg }]}>
                <Feather name={crime.icon as any} size={22} color={crime.color} />
              </View>
              <Text style={[styles.crimeType, { color: crime.color }]}>{crime.type}</Text>
            </View>
            <Text style={styles.crimeDesc}>{crime.description}</Text>
            <Text style={styles.subLabel}>Common Examples:</Text>
            {crime.examples.map((ex, j) => (
              <View key={j} style={styles.exRow}>
                <View style={[styles.dot, { backgroundColor: crime.color }]} />
                <Text style={styles.exText}>{ex}</Text>
              </View>
            ))}
            <View style={[styles.awareBox, { backgroundColor: crime.bg }]}>
              <Feather name="shield" size={14} color={crime.color} style={styles.awareIcon} />
              <Text style={[styles.awareText, { color: crime.color }]}>{crime.awareness}</Text>
            </View>
          </View>
        ))}

        {/* Disclaimer */}
        <View style={styles.disclaimerCard}>
          <Feather name="alert-circle" size={20} color={COLORS.orange} />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.disclaimerTitle}>Important Notice</Text>
            <Text style={styles.disclaimerText}>
              This app provides general educational information only and does not constitute legal advice.
              For legal matters, please contact official authorities or a qualified legal professional.
            </Text>
            <Text style={styles.authLink}>Contact Official Authorities →</Text>
          </View>
        </View>

        <View style={{ height: 28 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CrimeInfoScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  scroll: { padding: 16 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  backBtn: { marginRight: 8, padding: 4 },
  headerIcon: { width: 48, height: 48, borderRadius: 14, backgroundColor: COLORS.lightBlue, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.textDark },
  headerSub: { fontSize: 13, color: COLORS.textLight },
  introBanner: { flexDirection: 'row', alignItems: 'flex-start', backgroundColor: COLORS.lightBlue, borderRadius: 12, padding: 14, marginBottom: 8, borderWidth: 1, borderColor: COLORS.blue + '33' },
  introIcon: { marginRight: 10, marginTop: 2 },
  introText: { flex: 1, fontSize: 13, color: COLORS.textDark, lineHeight: 18 },
  crimeCard: { backgroundColor: COLORS.white, borderRadius: 16, padding: 16, marginBottom: 14, borderWidth: 1, borderColor: COLORS.border },
  crimeHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  crimeIconWrap: { width: 46, height: 46, borderRadius: 23, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  crimeType: { fontSize: 18, fontWeight: 'bold' },
  crimeDesc: { fontSize: 14, color: COLORS.textDark, lineHeight: 21, marginBottom: 14 },
  subLabel: { fontSize: 13, fontWeight: '700', color: COLORS.textDark, marginBottom: 8 },
  exRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 6 },
  dot: { width: 6, height: 6, borderRadius: 3, marginTop: 7, flexShrink: 0, marginRight: 8 },
  exText: { flex: 1, fontSize: 13, color: COLORS.textLight, lineHeight: 19 },
  awareBox: { flexDirection: 'row', alignItems: 'flex-start', borderRadius: 10, padding: 12, marginTop: 12 },
  awareIcon: { marginRight: 8 },
  awareText: { flex: 1, fontSize: 13, fontWeight: '500', lineHeight: 18 },
  disclaimerCard: { backgroundColor: COLORS.lightOrange, borderRadius: 14, padding: 16, flexDirection: 'row', alignItems: 'flex-start', borderWidth: 1, borderColor: COLORS.orange + '44' },
  disclaimerTitle: { fontSize: 15, fontWeight: '700', color: COLORS.textDark, marginBottom: 6 },
  disclaimerText: { fontSize: 13, color: COLORS.textLight, lineHeight: 18 },
  authLink: { fontSize: 13, color: COLORS.blue, fontWeight: '700', marginTop: 10 },
});