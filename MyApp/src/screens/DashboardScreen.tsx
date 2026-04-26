import React from 'react';
import {
  SafeAreaView, ScrollView, View, Text,
  StyleSheet, Pressable, StatusBar, Image,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const COLORS = {
  blue: '#1565C0', lightBlue: '#EAF2FF',
  red: '#E53935', lightRed: '#FDECEC',
  orange: '#FF8C42', lightOrange: '#FFF3E8',
  green: '#16A34A', lightGreen: '#EAFBF0',
  teal: '#0D9488', lightTeal: '#CCFBF1',
  bg: '#F5F7FB', textDark: '#1F2937',
  textLight: '#6B7280', border: '#E5E7EB', white: '#FFFFFF',
};

type FeatherIconName = React.ComponentProps<typeof Feather>['name'];

interface ActionItem {
  title: string;
  subtitle: string;
  icon: FeatherIconName;
  color: string;
  bg: string;
  pressedColor: string;
  screen: string;
}

// ── 6 Quick Action cards, each navigates to a screen ──
const actions: ActionItem[] = [
  { title: 'Report Harassment', subtitle: 'File a complaint',   icon: 'alert-triangle', color: COLORS.red,    bg: COLORS.lightRed,    pressedColor: '#F8D7D7', screen: 'ReportHarassment' },
  { title: 'Track Complaint',   subtitle: 'Check status',       icon: 'file-text',      color: COLORS.blue,   bg: COLORS.lightBlue,   pressedColor: '#DCE9FF', screen: 'TrackComplaint'   },
  { title: 'Emergency Help',    subtitle: 'Urgent support',     icon: 'phone-call',     color: COLORS.orange, bg: COLORS.lightOrange, pressedColor: '#FFE5CC', screen: 'EmergencyHelp'    },
  { title: 'Safety Learning',   subtitle: 'Tips and quizzes',   icon: 'book-open',      color: COLORS.teal,   bg: COLORS.lightTeal,   pressedColor: '#99F6E4', screen: 'SafetyLearning'   },
  { title: 'Contact Us',        subtitle: 'Get in touch',       icon: 'mail',           color: COLORS.green,  bg: COLORS.lightGreen,  pressedColor: '#C6F6D5', screen: 'ContactUs'        },
  { title: 'Crime Info',        subtitle: 'Know the law',       icon: 'book',           color: COLORS.blue,   bg: COLORS.lightBlue,   pressedColor: '#DCE9FF', screen: 'CrimeInfo'        },
];

const recentComplaints = [
  { id: 'CS-2026-1001', title: 'Instagram harassment', status: 'In Review'  as const },
  { id: 'CS-2026-1002', title: 'Fake profile report',  status: 'Submitted'  as const },
  { id: 'CS-2026-1003', title: 'Threat messages',      status: 'Resolved'   as const },
];

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  'Submitted':  { bg: '#FDECEC', text: '#E53935' },
  'In Review':  { bg: '#EAF2FF', text: '#1565C0' },
  'Resolved':   { bg: '#EAFBF0', text: '#16A34A' },
};

// ✅ navigation prop — allows all buttons to navigate
const DashboardScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* ── Header ── */}
        <View style={styles.header}>
          <Image
            source={require('../../assets/cybersathi-logo.png')}
            style={styles.logoBox}
            resizeMode="contain"
          />
          <View style={styles.headerTextWrap}>
            <Text style={styles.title}>Cyber Sathi</Text>
            <Text style={styles.subtitle}>Stay safe online</Text>
          </View>
          <Pressable style={({ pressed }) => [styles.bell, pressed && { backgroundColor: COLORS.lightBlue }]}>
            {({ pressed }) => (
              <Feather name="bell" size={20} color={pressed ? COLORS.blue : COLORS.textLight} />
            )}
          </Pressable>
        </View>

        {/* ── Hero ── */}
        <View style={styles.hero}>
          <View style={{ flex: 1, marginRight: 12 }}>
            <Text style={styles.heroTitle}>Welcome back 👋</Text>
            <Text style={styles.heroText}>Report, track, and stay informed about cybercrime.</Text>
          </View>
          <View style={styles.profileMini}>
            <Feather name="user" size={20} color={COLORS.red} />
          </View>
        </View>

        {/* ── Quick Actions ── */}
        <Text style={styles.section}>Quick Actions</Text>
        <View style={styles.grid}>
          {actions.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => navigation.navigate(item.screen)}
              style={({ pressed }) => [
                styles.card,
                pressed && { transform: [{ scale: 0.97 }], borderColor: item.color },
              ]}
            >
              {({ pressed }) => (
                <>
                  <View style={[styles.iconWrap, { backgroundColor: pressed ? item.pressedColor : item.bg }]}>
                    <Feather name={item.icon} size={22} color={item.color} />
                  </View>
                  <Text style={[styles.cardTitle, pressed && { color: item.color }]}>{item.title}</Text>
                  <Text style={styles.cardSub}>{item.subtitle}</Text>
                </>
              )}
            </Pressable>
          ))}
        </View>

        {/* ── Overview ── */}
        <Text style={styles.section}>Overview</Text>
        <View style={styles.row}>
          {[
            { label: 'Submitted', count: 5, color: COLORS.red   },
            { label: 'In Review', count: 2, color: COLORS.blue  },
            { label: 'Resolved',  count: 3, color: COLORS.green },
          ].map(item => (
            <View key={item.label} style={styles.smallCard}>
              <Text style={[styles.num, { color: item.color }]}>{item.count}</Text>
              <Text style={styles.label}>{item.label}</Text>
            </View>
          ))}
        </View>

        {/* ── Daily Challenge ── */}
        <Text style={styles.section}>Daily Safety Challenge</Text>
        <View style={styles.challengeCard}>
          <View style={styles.challengeLeft}>
            <View style={styles.challengeIcon}>
              <Feather name="award" size={20} color={COLORS.orange} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.challengeTitle}>Complete today's challenge</Text>
              <Text style={styles.challengeText}>Review your privacy settings and earn 50 points.</Text>
            </View>
          </View>
          <Pressable
            style={({ pressed }) => [styles.challengeBtn, pressed && { backgroundColor: '#D45518' }]}
            onPress={() => navigation.navigate('SafetyLearning')}
          >
            <Text style={styles.challengeBtnText}>Start</Text>
          </Pressable>
        </View>

        {/* ── Recent Complaints ── */}
        <Text style={styles.section}>Recent Complaints</Text>
        <View style={styles.listCard}>
          {recentComplaints.map((item, index) => (
            <Pressable
              key={item.id}
              onPress={() => navigation.navigate('TrackComplaint', { complaintId: item.id })}
              style={[styles.listRow, index !== recentComplaints.length - 1 && styles.listBorder]}
            >
              <View style={styles.listIcon}>
                <Feather name="file-text" size={18} color={COLORS.blue} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.listTitle}>{item.title}</Text>
                <Text style={styles.listId}>{item.id}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: STATUS_COLORS[item.status].bg }]}>
                <Text style={[styles.statusText, { color: STATUS_COLORS[item.status].text }]}>
                  {item.status}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>

        {/* ── Safety Tips ── */}
        <Text style={styles.section}>Safety Tips</Text>
        <View style={styles.tipBox}>
          {[
            'Use strong, unique passwords for each account',
            'Never share OTPs or passwords with anyone',
            'Save screenshots before blocking abusers',
            'Report cybercrime to Nepal Police Cyber Bureau',
          ].map((tip, i) => (
            <View key={i} style={styles.tipRow}>
              <View style={styles.tipDot} />
              <Text style={styles.tip}>{tip}</Text>
            </View>
          ))}
        </View>

        {/* ── Learning Progress ── */}
        <Text style={styles.section}>Learning Progress</Text>
        <Pressable
          onPress={() => navigation.navigate('SafetyLearning')}
          style={({ pressed }) => [styles.progressCard, pressed && { opacity: 0.9 }]}
        >
          <View>
            <Text style={styles.progressLabel}>Current Level</Text>
            <Text style={styles.progressLevel}>Cyber Defender</Text>
            <Text style={styles.progressSub}>Complete 2 quizzes to level up</Text>
          </View>
          <View style={styles.pointsCircle}>
            <Text style={styles.pointsNum}>850</Text>
            <Text style={styles.pointsLabel}>pts</Text>
          </View>
        </Pressable>

        <View style={{ height: 28 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  scroll: { padding: 16 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  logoBox: { width: 60, height: 60, borderRadius: 16 },
  headerTextWrap: { flex: 1, marginLeft: 10 },
  title: { fontSize: 22, fontWeight: 'bold', color: COLORS.blue },
  subtitle: { fontSize: 13, color: COLORS.textLight },
  bell: { backgroundColor: COLORS.white, padding: 10, borderRadius: 20 },
  hero: { backgroundColor: COLORS.white, padding: 16, borderRadius: 16, marginTop: 16, flexDirection: 'row', alignItems: 'center', borderWidth: 0, borderLeftWidth: 4, borderLeftColor: COLORS.red, borderColor: 'transparent' },
  heroTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.textDark },
  heroText: { fontSize: 14, color: COLORS.textLight, marginTop: 6 },
  profileMini: { width: 42, height: 42, borderRadius: 21, backgroundColor: COLORS.lightRed, justifyContent: 'center', alignItems: 'center' },
  section: { marginTop: 20, fontSize: 18, fontWeight: 'bold', color: COLORS.textDark },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { width: '48%', backgroundColor: COLORS.white, padding: 16, borderRadius: 14, marginTop: 10, borderWidth: 1.5, borderColor: COLORS.border },
  iconWrap: { padding: 12, borderRadius: 30, marginBottom: 10, alignSelf: 'flex-start' },
  cardTitle: { fontSize: 14, fontWeight: '700', color: COLORS.textDark },
  cardSub: { fontSize: 12, color: COLORS.textLight, marginTop: 4 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  smallCard: { backgroundColor: COLORS.white, padding: 16, borderRadius: 12, width: '30%', alignItems: 'center', marginTop: 10 },
  num: { fontSize: 22, fontWeight: 'bold' },
  label: { fontSize: 12, color: COLORS.textLight },
  challengeCard: { backgroundColor: COLORS.white, padding: 16, borderRadius: 14, marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  challengeLeft: { flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: 10 },
  challengeIcon: { width: 42, height: 42, borderRadius: 21, backgroundColor: COLORS.lightOrange, justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  challengeTitle: { fontSize: 14, fontWeight: '700', color: COLORS.textDark },
  challengeText: { fontSize: 12, color: COLORS.textLight, marginTop: 2 },
  challengeBtn: { backgroundColor: COLORS.orange, paddingHorizontal: 14, paddingVertical: 9, borderRadius: 10 },
  challengeBtnText: { color: COLORS.white, fontWeight: '700' },
  listCard: { backgroundColor: COLORS.white, borderRadius: 14, paddingHorizontal: 14, marginTop: 10 },
  listRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, gap: 10 },
  listBorder: { borderBottomWidth: 1, borderBottomColor: COLORS.border },
  listIcon: { width: 38, height: 38, borderRadius: 19, backgroundColor: COLORS.lightBlue, justifyContent: 'center', alignItems: 'center' },
  listTitle: { fontSize: 14, fontWeight: '600', color: COLORS.textDark },
  listId: { fontSize: 12, color: COLORS.textLight, marginTop: 2 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999 },
  statusText: { fontSize: 11, fontWeight: '700' },
  tipBox: { backgroundColor: COLORS.white, padding: 16, borderRadius: 12, marginTop: 10 },
  tipRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 8 },
  tipDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: COLORS.blue, marginTop: 6 },
  tip: { flex: 1, fontSize: 14, color: COLORS.textDark, lineHeight: 20 },
  progressCard: { backgroundColor: COLORS.blue, borderRadius: 16, padding: 18, marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  progressLabel: { fontSize: 12, color: 'rgba(255,255,255,0.7)' },
  progressLevel: { fontSize: 20, fontWeight: 'bold', color: COLORS.white, marginTop: 2 },
  progressSub: { fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 4 },
  pointsCircle: { width: 72, height: 72, borderRadius: 36, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  pointsNum: { fontSize: 22, fontWeight: 'bold', color: COLORS.white },
  pointsLabel: { fontSize: 11, color: 'rgba(255,255,255,0.7)' },
});