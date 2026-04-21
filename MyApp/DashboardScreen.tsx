import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Pressable,
  StatusBar,
  Image,
} from 'react-native';
import Feather from '@react-native-vector-icons/feather';

const COLORS = {
  blue: '#1565C0',
  lightBlue: '#EAF2FF',
  red: '#E53935',
  lightRed: '#FDECEC',
  orange: '#FF8C42',
  lightOrange: '#FFF3E8',
  green: '#16A34A',
  lightGreen: '#EAFBF0',
  bg: '#F5F7FB',
  textDark: '#1F2937',
  textLight: '#6B7280',
  border: '#E5E7EB',
  white: '#FFFFFF',
};

type FeatherIconName = React.ComponentProps<typeof Feather>['name'];

interface ActionItem {
  title: string;
  subtitle: string;
  icon: FeatherIconName;
  color: string;
  bg: string;
  pressedColor: string;
  screen?: string;
}

const actions: ActionItem[] = [
  {
    title: 'Report Harassment',
    subtitle: 'Create report',
    icon: 'alert-triangle',
    color: COLORS.red,
    bg: COLORS.lightRed,
    pressedColor: '#F8D7D7',
  },
  {
    title: 'Track Complaint',
    subtitle: 'View status',
    icon: 'file-text',
    color: COLORS.blue,
    bg: COLORS.lightBlue,
    pressedColor: '#DCE9FF',
  },
  {
    title: 'Safety Learning',
    subtitle: 'Quiz and tips',
    icon: 'book-open',
    color: COLORS.orange,
    bg: COLORS.lightOrange,
    pressedColor: '#FFE5CC',
  },
  {
    title: 'Emergency Help',
    subtitle: 'Urgent support',
    icon: 'phone-call',
    color: COLORS.red,
    bg: COLORS.lightRed,
    pressedColor: '#F8D7D7',
  },
  {
    title: 'Contact Us',
    subtitle: 'Get in touch',
    icon: 'mail',
    color: COLORS.green,
    bg: COLORS.lightGreen,
    pressedColor: '#C6F6D5',
    screen: 'ContactUs',
  },
];

const recentComplaints = [
  { id: 'CS-1001', title: 'Instagram harassment', status: 'In Review' },
  { id: 'CS-1002', title: 'Fake profile report', status: 'Submitted' },
  { id: 'CS-1003', title: 'Threat messages', status: 'Resolved' },
];

// ✅ navigation prop correctly received here
const DashboardScreen = ({ navigation }: any) => {

  const handleActionPress = (item: ActionItem) => {
    if (item.screen) {
      navigation.navigate(item.screen);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >

        {/* Header */}
        <View style={styles.header}>
          <Image
            source={require('./assets/cybersathi-logo.png')}
            style={styles.logoBox}
            resizeMode="contain"
          />
          <View style={styles.headerTextWrap}>
            <Text style={styles.title}>Cyber Sathi</Text>
            <Text style={styles.subtitle}>Stay safe online</Text>
          </View>
          <Pressable
            style={({ pressed }) => [
              styles.bell,
              pressed && { backgroundColor: COLORS.blue },
            ]}
          >
            {({ pressed }) => (
              <Feather
                name="bell"
                size={20}
                color={pressed ? COLORS.white : COLORS.blue}
              />
            )}
          </Pressable>
        </View>

        {/* Hero card */}
        <View style={styles.hero}>
          <View style={styles.heroTopRow}>
            <View style={{ flex: 1, marginRight: 12 }}>
              <Text style={styles.heroTitle}>Welcome back</Text>
              <Text style={styles.heroText}>
                Report abuse, track complaints, and learn cyber safety.
              </Text>
            </View>
            <View style={styles.profileMini}>
              <Feather name="user" size={20} color={COLORS.red} />
            </View>
          </View>
          <View style={styles.heroButtonsRow}>
            <Pressable
              style={({ pressed }) => [
                styles.primaryBtn,
                pressed && styles.primaryBtnPressed,
              ]}
            >
              <Feather name="plus-circle" size={18} color={COLORS.white} />
              <Text style={styles.primaryText}>New Report</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                styles.secondaryBtn,
                pressed && styles.secondaryBtnPressed,
              ]}
            >
              <Feather name="search" size={18} color={COLORS.blue} />
              <Text style={styles.secondaryText}>Track</Text>
            </Pressable>
          </View>
        </View>

        {/* Quick Actions */}
        <Text style={styles.section}>Quick Actions</Text>
        <View style={styles.grid}>
          {actions.map((item, index) => (
            <Pressable
              key={index}
              style={({ pressed }) => [
                styles.card,
                pressed && {
                  transform: [{ scale: 0.97 }],
                  borderColor: item.color,
                },
              ]}
              // ✅ navigation.navigate called here
              onPress={() => handleActionPress(item)}
            >
              {({ pressed }) => (
                <>
                  <View
                    style={[
                      styles.iconWrap,
                      {
                        backgroundColor: pressed
                          ? item.pressedColor
                          : item.bg,
                      },
                    ]}
                  >
                    <Feather name={item.icon} size={22} color={item.color} />
                  </View>
                  <Text
                    style={[
                      styles.cardTitle,
                      pressed && { color: item.color },
                    ]}
                  >
                    {item.title}
                  </Text>
                  <Text style={styles.cardSub}>{item.subtitle}</Text>
                </>
              )}
            </Pressable>
          ))}
        </View>

        {/* Overview */}
        <Text style={styles.section}>Overview</Text>
        <View style={styles.row}>
          <View style={styles.smallCard}>
            <Text style={[styles.num, { color: COLORS.red }]}>5</Text>
            <Text style={styles.label}>Submitted</Text>
          </View>
          <View style={styles.smallCard}>
            <Text style={[styles.num, { color: COLORS.blue }]}>2</Text>
            <Text style={styles.label}>In Review</Text>
          </View>
          <View style={styles.smallCard}>
            <Text style={[styles.num, { color: COLORS.orange }]}>3</Text>
            <Text style={styles.label}>Resolved</Text>
          </View>
        </View>

        {/* Daily Challenge */}
        <Text style={styles.section}>Daily Safety Challenge</Text>
        <View style={styles.challengeCard}>
          <View style={styles.challengeLeft}>
            <View style={styles.challengeIcon}>
              <Feather name="award" size={20} color={COLORS.orange} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.challengeTitle}>Complete today's challenge</Text>
              <Text style={styles.challengeText}>
                Review your privacy settings and earn 50 points.
              </Text>
            </View>
          </View>
          <Pressable
            style={({ pressed }) => [
              styles.challengeBtn,
              pressed && { backgroundColor: '#D45518' },
            ]}
          >
            <Text style={styles.challengeBtnText}>Start</Text>
          </Pressable>
        </View>

        {/* Recent Complaints */}
        <Text style={styles.section}>Recent Complaints</Text>
        <View style={styles.listCard}>
          {recentComplaints.map((item, index) => (
            <View
              key={item.id}
              style={[
                styles.listRow,
                index !== recentComplaints.length - 1 && styles.listBorder,
              ]}
            >
              <View style={styles.listLeft}>
                <View style={styles.listIcon}>
                  <Feather name="file-text" size={18} color={COLORS.blue} />
                </View>
                <View>
                  <Text style={styles.listTitle}>{item.title}</Text>
                  <Text style={styles.listId}>{item.id}</Text>
                </View>
              </View>
              <View
                style={[
                  styles.statusBadge,
                  item.status === 'Resolved'
                    ? { backgroundColor: COLORS.lightGreen }
                    : item.status === 'In Review'
                    ? { backgroundColor: COLORS.lightBlue }
                    : { backgroundColor: COLORS.lightRed },
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    item.status === 'Resolved'
                      ? { color: COLORS.green }
                      : item.status === 'In Review'
                      ? { color: COLORS.blue }
                      : { color: COLORS.red },
                  ]}
                >
                  {item.status}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Safety Tips */}
        <Text style={styles.section}>Safety Tips</Text>
        <View style={styles.tipBox}>
          <Text style={styles.tip}>• Use strong passwords</Text>
          <Text style={styles.tip}>• Avoid fake profiles</Text>
          <Text style={styles.tip}>• Don't share personal info</Text>
          <Text style={styles.tip}>• Save proof before blocking</Text>
        </View>

        {/* Learning Progress */}
        <Text style={styles.section}>Learning Progress</Text>
        <View style={styles.progressCard}>
          <View>
            <Text style={styles.progressLabel}>Current Level</Text>
            <Text style={styles.progressLevel}>Cyber Defender</Text>
            <Text style={styles.progressSub}>Complete 2 quizzes to level up</Text>
          </View>
          <View style={styles.pointsCircle}>
            <Text style={styles.pointsNum}>850</Text>
            <Text style={styles.pointsLabel}>pts</Text>
          </View>
        </View>

        <View style={{ height: 28 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  scroll: { padding: 16 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoBox: { width: 60, height: 60, borderRadius: 16 },
  headerTextWrap: { flex: 1, marginLeft: 10 },
  title: { fontSize: 22, fontWeight: 'bold', color: COLORS.blue },
  subtitle: { fontSize: 13, color: COLORS.textLight },
  bell: {
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 20,
  },

  hero: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 16,
    marginTop: 16,
    borderWidth: 0,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.red,
    borderColor: 'transparent',
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  profileMini: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.lightRed,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.textDark },
  heroText: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 6,
  },
  heroButtonsRow: { flexDirection: 'row', marginTop: 14 },
  primaryBtn: {
    backgroundColor: COLORS.red,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  primaryBtnPressed: { backgroundColor: '#C62828' },
  primaryText: { color: COLORS.white, marginLeft: 6, fontWeight: '600' },
  secondaryBtn: {
    backgroundColor: COLORS.lightBlue,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  secondaryBtnPressed: { backgroundColor: '#DCE9FF' },
  secondaryText: { color: COLORS.blue, marginLeft: 6, fontWeight: '600' },

  section: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 14,
    marginTop: 10,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  iconWrap: {
    padding: 12,
    borderRadius: 30,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  cardSub: { fontSize: 12, color: COLORS.textLight, marginTop: 4 },

  row: { flexDirection: 'row', justifyContent: 'space-between' },
  smallCard: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    width: '30%',
    alignItems: 'center',
    marginTop: 10,
  },
  num: { fontSize: 22, fontWeight: 'bold' },
  label: { fontSize: 12, color: COLORS.textLight },

  challengeCard: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 14,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  challengeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  challengeIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.lightOrange,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  challengeTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  challengeText: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 2,
  },
  challengeBtn: {
    backgroundColor: COLORS.orange,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 10,
  },
  challengeBtnText: { color: COLORS.white, fontWeight: '700' },

  listCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    paddingHorizontal: 14,
    marginTop: 10,
  },
  listRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 64,
    paddingVertical: 10,
  },
  listBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  listLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  listIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.lightBlue,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  listTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  listId: { fontSize: 12, color: COLORS.textLight, marginTop: 2 },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  statusText: { fontSize: 11, fontWeight: '700' },

  tipBox: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
  },
  tip: { marginBottom: 6, fontSize: 14, color: COLORS.textDark },

  progressCard: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 14,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressLabel: { fontSize: 12, color: COLORS.textLight },
  progressLevel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.blue,
    marginTop: 2,
  },
  progressSub: { fontSize: 12, color: COLORS.textLight, marginTop: 4 },
  pointsCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: COLORS.lightRed,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointsNum: { fontSize: 22, fontWeight: 'bold', color: COLORS.red },
  pointsLabel: { fontSize: 12, color: COLORS.red },
});