import React from 'react';
import {
  SafeAreaView, ScrollView, View, Text,
  StyleSheet, Pressable, StatusBar, Image,
} from 'react-native';
import Feather from '@react-native-vector-icons/feather';

const COLORS = {
  blue: '#1565C0', lightBlue: '#EAF2FF',
  red: '#E53935', lightRed: '#FDECEC',
  orange: '#FF8C42', lightOrange: '#FFF3E8',
  green: '#16A34A', lightGreen: '#EAFBF0',
  teal: '#0D9488', lightTeal: '#CCFBF1',
  bg: '#F5F7FB', textDark: '#1F2937',
  textLight: '#6B7280', border: '#E5E7EB', white: '#FFFFFF',
};

const recentComplaints = [
  { id: 'CS-2026-1001', title: 'Instagram harassment', status: 'In Review'  as const, date: 'Jan 10' },
  { id: 'CS-2026-1002', title: 'Fake profile report',  status: 'Submitted'  as const, date: 'Jan 8'  },
  { id: 'CS-2026-1003', title: 'Threat messages',      status: 'Resolved'   as const, date: 'Jan 5'  },
];

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  'Submitted':  { bg: '#FDECEC', text: '#E53935' },
  'In Review':  { bg: '#EAF2FF', text: '#1565C0' },
  'Resolved':   { bg: '#EAFBF0', text: '#16A34A' },
};

const DashboardScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Header */}
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
          <Pressable
            onPress={() => navigation.navigate('ContactUs')}
            style={({ pressed }) => [styles.headerBtn, pressed && { backgroundColor: COLORS.lightBlue }]}
          >
            <Feather name="mail" size={20} color={COLORS.blue} />
          </Pressable>
        </View>

        {/* Hero */}
        <View style={styles.hero}>
          <View style={{ flex: 1, marginRight: 12 }}>
            <Text style={styles.heroTitle}>Welcome to Cyber Sathi 👋</Text>
            <Text style={styles.heroText}>
              Report cybercrime, track complaints, and learn how to stay safe online.
            </Text>
          </View>
          <View style={styles.profileMini}>
            <Feather name="user" size={20} color={COLORS.red} />
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          {[
            { label: 'Submitted', count: 5, color: COLORS.red,   bg: COLORS.lightRed   },
            { label: 'In Review', count: 2, color: COLORS.blue,  bg: COLORS.lightBlue  },
            { label: 'Resolved',  count: 3, color: COLORS.green, bg: COLORS.lightGreen },
          ].map(item => (
            <View key={item.label} style={[styles.statCard, { borderTopColor: item.color }]}>
              <Text style={[styles.statNum, { color: item.color }]}>{item.count}</Text>
              <Text style={styles.statLabel}>{item.label}</Text>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <Text style={styles.section}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {[
            { title: 'Report',    icon: 'alert-triangle', color: COLORS.red,    bg: COLORS.lightRed,    screen: 'Report'    },
            { title: 'Track',     icon: 'file-text',      color: COLORS.blue,   bg: COLORS.lightBlue,   screen: 'Track'     },
            { title: 'Emergency', icon: 'phone-call',     color: COLORS.orange, bg: COLORS.lightOrange, screen: 'Emergency' },
            { title: 'Learn',     icon: 'book-open',      color: COLORS.teal,   bg: COLORS.lightTeal,   screen: 'Learn'     },
          ].map((item, i) => (
            <Pressable
              key={i}
              onPress={() => navigation.navigate(item.screen)}
              style={({ pressed }) => [
                styles.actionCard,
                { borderTopColor: item.color },
                pressed && { transform: [{ scale: 0.96 }] },
              ]}
            >
              <View style={[styles.actionIcon, { backgroundColor: item.bg }]}>
                <Feather name={item.icon as any} size={24} color={item.color} />
              </View>
              <Text style={[styles.actionTitle, { color: item.color }]}>{item.title}</Text>
            </Pressable>
          ))}
        </View>

        {/* Recent Complaints */}
        <View style={styles.sectionHeader}>
          <Text style={styles.section}>Recent Complaints</Text>
          <Pressable onPress={() => navigation.navigate('Track')}>
            <Text style={styles.seeAll}>See all →</Text>
          </Pressable>
        </View>
        <View style={styles.listCard}>
          {recentComplaints.map((item, index) => (
            <Pressable
              key={item.id}
              onPress={() => navigation.navigate('Track', { complaintId: item.id })}
              style={[styles.listRow, index !== recentComplaints.length - 1 && styles.listBorder]}
            >
              <View style={styles.listIconWrap}>
                <Feather name="file-text" size={16} color={COLORS.blue} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.listTitle}>{item.title}</Text>
                <Text style={styles.listMeta}>{item.id} · {item.date}</Text>
              </View>
              <View style={[styles.badge, { backgroundColor: STATUS_COLORS[item.status].bg }]}>
                <Text style={[styles.badgeText, { color: STATUS_COLORS[item.status].text }]}>
                  {item.status}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>

        {/* Safety Tips */}
        <Text style={styles.section}>Safety Tips</Text>
        <View style={styles.tipsCard}>
          {[
            '🔐 Use strong, unique passwords for each account',
            '📵 Never share OTPs or passwords with anyone',
            '📸 Save screenshots before blocking abusers',
            '🚨 Report to Nepal Police Cyber Bureau immediately',
          ].map((tip, i) => (
            <View key={i} style={[styles.tipRow, i < 3 && styles.tipBorder]}>
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>

        {/* Nepal Cyber Bureau Contact */}
        <Text style={styles.section}>Nepal Cyber Bureau</Text>
        <View style={styles.bureauCard}>
          <View style={styles.bureauRow}>
            <View style={styles.bureauIcon}>
              <Feather name="phone" size={18} color={COLORS.blue} />
            </View>
            <View>
              <Text style={styles.bureauLabel}>Helpline</Text>
              <Text style={styles.bureauValue}>01-4412439</Text>
            </View>
          </View>
          <View style={styles.bureauDivider} />
          <View style={styles.bureauRow}>
            <View style={styles.bureauIcon}>
              <Feather name="mail" size={18} color={COLORS.blue} />
            </View>
            <View>
              <Text style={styles.bureauLabel}>Email</Text>
              <Text style={styles.bureauValue}>info@cybercrime.gov.np</Text>
            </View>
          </View>
          <View style={styles.bureauDivider} />
          <View style={styles.bureauRow}>
            <View style={styles.bureauIcon}>
              <Feather name="map-pin" size={18} color={COLORS.blue} />
            </View>
            <View>
              <Text style={styles.bureauLabel}>Location</Text>
              <Text style={styles.bureauValue}>Naxal, Kathmandu, Nepal</Text>
            </View>
          </View>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  scroll: { padding: 16 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  logoBox: { width: 52, height: 52, borderRadius: 14 },
  headerTextWrap: { flex: 1, marginLeft: 10 },
  title: { fontSize: 20, fontWeight: 'bold', color: COLORS.blue },
  subtitle: { fontSize: 12, color: COLORS.textLight },
  headerBtn: { padding: 10, borderRadius: 20, backgroundColor: COLORS.white },
  hero: {
    backgroundColor: COLORS.white, padding: 16, borderRadius: 16, marginTop: 14,
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 0, borderLeftWidth: 4, borderLeftColor: COLORS.red, borderColor: 'transparent',
  },
  heroTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.textDark },
  heroText: { fontSize: 13, color: COLORS.textLight, marginTop: 4, lineHeight: 18 },
  profileMini: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.lightRed, justifyContent: 'center', alignItems: 'center' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 14 },
  statCard: { backgroundColor: COLORS.white, borderRadius: 12, padding: 14, width: '31%', alignItems: 'center', borderTopWidth: 3, borderWidth: 1, borderColor: COLORS.border },
  statNum: { fontSize: 24, fontWeight: 'bold' },
  statLabel: { fontSize: 11, color: COLORS.textLight, marginTop: 2 },
  section: { marginTop: 20, fontSize: 17, fontWeight: 'bold', color: COLORS.textDark },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 },
  seeAll: { fontSize: 13, color: COLORS.blue, fontWeight: '600' },
  actionsGrid: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  actionCard: {
    width: '23%', backgroundColor: COLORS.white, borderRadius: 14, padding: 12,
    alignItems: 'center', borderTopWidth: 3, borderWidth: 1, borderColor: COLORS.border,
  },
  actionIcon: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  actionTitle: { fontSize: 11, fontWeight: '700', textAlign: 'center' },
  listCard: { backgroundColor: COLORS.white, borderRadius: 14, paddingHorizontal: 14, marginTop: 10, borderWidth: 1, borderColor: COLORS.border },
  listRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, gap: 10 },
  listBorder: { borderBottomWidth: 1, borderBottomColor: COLORS.border },
  listIconWrap: { width: 34, height: 34, borderRadius: 17, backgroundColor: COLORS.lightBlue, justifyContent: 'center', alignItems: 'center' },
  listTitle: { fontSize: 13, fontWeight: '600', color: COLORS.textDark },
  listMeta: { fontSize: 11, color: COLORS.textLight, marginTop: 2 },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999 },
  badgeText: { fontSize: 10, fontWeight: '700' },
  tipsCard: { backgroundColor: COLORS.white, borderRadius: 14, marginTop: 10, borderWidth: 1, borderColor: COLORS.border },
  tipRow: { paddingHorizontal: 16, paddingVertical: 12 },
  tipBorder: { borderBottomWidth: 1, borderBottomColor: COLORS.border },
  tipText: { fontSize: 13, color: COLORS.textDark, lineHeight: 18 },
  bureauCard: { backgroundColor: COLORS.white, borderRadius: 14, marginTop: 10, borderWidth: 1, borderColor: COLORS.border },
  bureauRow: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  bureauDivider: { height: 1, backgroundColor: COLORS.border },
  bureauIcon: { width: 38, height: 38, borderRadius: 19, backgroundColor: COLORS.lightBlue, justifyContent: 'center', alignItems: 'center' },
  bureauLabel: { fontSize: 11, color: COLORS.textLight },
  bureauValue: { fontSize: 14, fontWeight: '600', color: COLORS.textDark, marginTop: 2 },
});