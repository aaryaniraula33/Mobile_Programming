import React from 'react';
import {
  SafeAreaView, ScrollView, View, Text,
  StyleSheet, Pressable, StatusBar,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import SectionTitle from '../../../components/src/components/SectionTitle';

const COLORS = {
  blue: '#1565C0', lightBlue: '#EAF2FF',
  red: '#E53935', lightRed: '#FDECEC',
  orange: '#FF8C42', lightOrange: '#FFF3E8',
  green: '#16A34A', lightGreen: '#EAFBF0',
  teal: '#0D9488', lightTeal: '#CCFBF1',
  purple: '#7C3AED', lightPurple: '#EDE9FE',
  bg: '#F5F7FB', textDark: '#1F2937', textLight: '#6B7280',
  border: '#E5E7EB', white: '#FFFFFF',
};

const learningCards = [
  { title: 'Strong Passwords', desc: 'Create unbreakable passwords', icon: 'lock', color: COLORS.blue, bg: COLORS.lightBlue, points: 50, topic: 'Passwords' },
  { title: 'Fake Profile Detection', desc: 'Spot fake accounts', icon: 'user-x', color: COLORS.red, bg: COLORS.lightRed, points: 60, topic: 'Fake Profiles' },
  { title: 'Phishing Awareness', desc: 'Avoid phishing scams', icon: 'mail', color: COLORS.orange, bg: COLORS.lightOrange, points: 70, topic: 'Phishing' },
  { title: 'Privacy Settings', desc: 'Secure your accounts', icon: 'settings', color: COLORS.teal, bg: COLORS.lightTeal, points: 40, topic: 'Privacy' },
  { title: 'Cybercrime & Law', desc: 'Know your rights', icon: 'book-open', color: COLORS.purple, bg: COLORS.lightPurple, points: 80, topic: 'Cybercrime' },
];

const games = [
  { title: 'Phishing Quiz', desc: 'Can you spot the fake email?', icon: 'target', color: COLORS.orange, bg: COLORS.lightOrange, difficulty: 'Medium' },
  { title: 'Password Strength', desc: 'Test your password game', icon: 'shield', color: COLORS.blue, bg: COLORS.lightBlue, difficulty: 'Easy' },
  { title: 'Cyberbullying Response', desc: 'Learn how to respond', icon: 'message-circle', color: COLORS.teal, bg: COLORS.lightTeal, difficulty: 'Hard' },
];

const SafetyLearningScreen = ({ navigation }: any) => {
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
            <Feather name="book-open" size={22} color={COLORS.teal} />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.headerTitle}>Safety Learning</Text>
            <Text style={styles.headerSub}>Earn points while staying safe</Text>
          </View>
        </View>

        {/* Level Card */}
        <View style={styles.levelCard}>
          <View>
            <Text style={styles.levelLabel}>Your Level</Text>
            <Text style={styles.levelName}>Cyber Defender 🛡️</Text>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: '65%' }]} />
            </View>
            <Text style={styles.progressText}>650 / 1000 pts to next level</Text>
          </View>
          <View style={styles.badgeCircle}>
            <Text style={styles.badgeNum}>850</Text>
            <Text style={styles.badgePts}>pts</Text>
          </View>
        </View>

        {/* Learning Modules */}
        <SectionTitle title="Learning Modules" />
        <View style={styles.learnGrid}>
          {learningCards.map((card, i) => (
            <Pressable key={i}
              onPress={() => navigation.navigate('CrimeInfo', { topic: card.topic })}
              style={({ pressed }) => [styles.learnCard, pressed && { transform: [{ scale: 0.97 }], borderColor: card.color }]}>
              <View style={[styles.learnIcon, { backgroundColor: card.bg }]}>
                <Feather name={card.icon as any} size={22} color={card.color} />
              </View>
              <Text style={styles.learnTitle}>{card.title}</Text>
              <Text style={styles.learnDesc}>{card.desc}</Text>
              <View style={styles.pointsBadge}>
                <Feather name="star" size={11} color={COLORS.orange} style={styles.pointsIcon} />
                <Text style={styles.pointsText}>+{card.points} pts</Text>
              </View>
            </Pressable>
          ))}
        </View>

        {/* Games */}
        <SectionTitle title="Safety Games" />
        <View style={styles.gamesCol}>
          {games.map((game, i) => (
            <Pressable key={i}
              style={({ pressed }) => [styles.gameCard, pressed && { opacity: 0.9 }]}>
              <View style={[styles.gameIcon, { backgroundColor: game.bg }]}>
                <Feather name={game.icon as any} size={22} color={game.color} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.gameTitle}>{game.title}</Text>
                <Text style={styles.gameDesc}>{game.desc}</Text>
              </View>
              <View style={[styles.diffBadge,
                game.difficulty === 'Easy' ? { backgroundColor: '#EAFBF0' } :
                game.difficulty === 'Hard' ? { backgroundColor: '#FDECEC' } :
                { backgroundColor: '#FFF3E8' }]}>
                <Text style={[styles.diffText,
                  game.difficulty === 'Easy' ? { color: COLORS.green } :
                  game.difficulty === 'Hard' ? { color: COLORS.red } :
                  { color: COLORS.orange }]}>{game.difficulty}</Text>
              </View>
            </Pressable>
          ))}
        </View>

        <View style={{ height: 28 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SafetyLearningScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  scroll: { padding: 16 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  backBtn: { marginRight: 8, padding: 4 },
  headerIcon: { width: 48, height: 48, borderRadius: 14, backgroundColor: COLORS.lightTeal, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.textDark },
  headerSub: { fontSize: 13, color: COLORS.textLight },
  levelCard: { backgroundColor: COLORS.blue, borderRadius: 18, padding: 18, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  levelLabel: { fontSize: 12, color: 'rgba(255,255,255,0.7)' },
  levelName: { fontSize: 20, fontWeight: 'bold', color: COLORS.white, marginVertical: 6 },
  progressBarBg: { width: 160, height: 8, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 4, marginBottom: 6 },
  progressBarFill: { height: 8, backgroundColor: COLORS.white, borderRadius: 4 },
  progressText: { fontSize: 11, color: 'rgba(255,255,255,0.7)' },
  badgeCircle: { width: 72, height: 72, borderRadius: 36, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  badgeNum: { fontSize: 22, fontWeight: 'bold', color: COLORS.white },
  badgePts: { fontSize: 11, color: 'rgba(255,255,255,0.7)' },
  learnGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  learnCard: { width: '48%', backgroundColor: COLORS.white, borderRadius: 14, padding: 14, borderWidth: 1.5, borderColor: COLORS.border, marginBottom: 10 },
  learnIcon: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  learnTitle: { fontSize: 13, fontWeight: '700', color: COLORS.textDark },
  learnDesc: { fontSize: 11, color: COLORS.textLight, marginTop: 3, lineHeight: 16 },
  pointsBadge: { flexDirection: 'row', alignItems: 'center', marginTop: 8, backgroundColor: '#FFF3E8', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999, alignSelf: 'flex-start' },
  pointsText: { fontSize: 11, color: COLORS.orange, fontWeight: '700' },
  pointsIcon: { marginRight: 3 },
  gamesCol: { },
  gameCard: { backgroundColor: COLORS.white, borderRadius: 14, padding: 14, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: COLORS.border, marginBottom: 10 },
  gameIcon: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  gameTitle: { fontSize: 15, fontWeight: '700', color: COLORS.textDark },
  gameDesc: { fontSize: 12, color: COLORS.textLight, marginTop: 2 },
  diffBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  diffText: { fontSize: 11, fontWeight: '700' },
});