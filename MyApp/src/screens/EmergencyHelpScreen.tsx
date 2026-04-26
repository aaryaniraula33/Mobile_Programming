import React from 'react';
import {
  SafeAreaView, ScrollView, View, Text,
  StyleSheet, Pressable, StatusBar, Linking,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import SectionTitle from '../../../components/src/components/SectionTitle';

const COLORS = {
  blue: '#1565C0', lightBlue: '#EAF2FF',
  red: '#E53935', lightRed: '#FDECEC',
  orange: '#FF8C42', lightOrange: '#FFF3E8',
  bg: '#F5F7FB', textDark: '#1F2937', textLight: '#6B7280',
  border: '#E5E7EB', white: '#FFFFFF',
};

const EmergencyHelpScreen = ({ navigation }: any) => {
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
            <Feather name="phone-call" size={22} color={COLORS.red} />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.headerTitle}>Emergency Help</Text>
            <Text style={styles.headerSub}>Immediate assistance</Text>
          </View>
        </View>

        {/* Warning */}
        <View style={styles.warningBanner}>
          <View style={styles.warningIcon}>
            <Feather name="alert-triangle" size={24} color={COLORS.orange} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.warningTitle}>For serious threats only</Text>
            <Text style={styles.warningText}>
              Use this if you face blackmail, death threats, sexual violence threats, or are in immediate danger.
            </Text>
          </View>
        </View>

        {/* Buttons */}
        <SectionTitle title="Emergency Contacts" />
        <View style={styles.btnsCol}>
          <Pressable onPress={() => Linking.openURL('tel:014412439')}
            style={({ pressed }) => [styles.callBtn, styles.btnBlue, pressed && { opacity: 0.85 }]}>
            <View style={styles.callIcon}><Feather name="shield" size={22} color={COLORS.white} /></View>
            <View style={{ flex: 1 }}>
              <Text style={styles.callTitle}>Call Cyber Bureau</Text>
              <Text style={styles.callSub}>Nepal Police Cyber Bureau</Text>
            </View>
            <Feather name="phone" size={20} color={COLORS.white} />
          </Pressable>

          <Pressable onPress={() => Linking.openURL('tel:100')}
            style={({ pressed }) => [styles.callBtn, styles.btnRed, pressed && { opacity: 0.85 }]}>
            <View style={styles.callIcon}><Feather name="alert-circle" size={22} color={COLORS.white} /></View>
            <View style={{ flex: 1 }}>
              <Text style={styles.callTitle}>Call Nepal Police</Text>
              <Text style={styles.callSub}>Emergency: 100</Text>
            </View>
            <Feather name="phone" size={20} color={COLORS.white} />
          </Pressable>

          <Pressable onPress={() => navigation.navigate('ReportHarassment')}
            style={({ pressed }) => [styles.callBtn, styles.btnOrange, pressed && { opacity: 0.85 }]}>
            <View style={styles.callIcon}><Feather name="send" size={22} color={COLORS.white} /></View>
            <View style={{ flex: 1 }}>
              <Text style={styles.callTitle}>Report Urgent Threat</Text>
              <Text style={styles.callSub}>File an emergency complaint</Text>
            </View>
            <Feather name="chevron-right" size={20} color={COLORS.white} />
          </Pressable>
        </View>

        {/* What counts */}
        <SectionTitle title="What is a Serious Threat?" />
        <View style={styles.infoCard}>
          {[
            { icon: 'alert-octagon', text: 'Blackmail with private photos or videos', color: COLORS.red },
            { icon: 'alert-triangle', text: 'Death threats via online messages', color: COLORS.orange },
            { icon: 'shield-off', text: 'Sexual violence or abuse threats', color: COLORS.red },
            { icon: 'zap', text: 'Immediate danger to your safety', color: COLORS.orange },
            { icon: 'user-x', text: 'Stalking with threats of physical harm', color: COLORS.red },
          ].map((item, i) => (
            <View key={i} style={styles.infoRow}>
              <View style={[styles.infoIconWrap, { backgroundColor: item.color + '22' }]}>
                <Feather name={item.icon as any} size={18} color={item.color} />
              </View>
              <Text style={styles.infoText}>{item.text}</Text>
            </View>
          ))}
        </View>

        {/* Steps */}
        <SectionTitle title="Immediate Safety Steps" />
        <View style={styles.stepsCard}>
          {[
            'Do not respond to the threat or aggressor',
            'Screenshot and save all evidence immediately',
            'Tell a trusted adult, parent, or friend',
            'Call Nepal Police (100) if in physical danger',
            'Contact Cyber Bureau for online threats',
            'Do not pay any ransom or comply with demands',
          ].map((step, i) => (
            <View key={i} style={styles.stepRow}>
              <View style={styles.stepNum}>
                <Text style={styles.stepNumText}>{i + 1}</Text>
              </View>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>

        <View style={{ height: 28 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default EmergencyHelpScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  scroll: { padding: 16 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  backBtn: { marginRight: 8, padding: 4 },
  headerIcon: { width: 48, height: 48, borderRadius: 14, backgroundColor: COLORS.lightRed, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.textDark },
  headerSub: { fontSize: 13, color: COLORS.textLight },
  warningBanner: { backgroundColor: COLORS.lightOrange, borderRadius: 14, padding: 16, flexDirection: 'row', borderWidth: 1, borderColor: COLORS.orange + '44' },
  warningIcon: { width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.orange + '22', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  warningTitle: { fontSize: 15, fontWeight: '700', color: COLORS.textDark, marginBottom: 4 },
  warningText: { fontSize: 13, color: COLORS.textLight, lineHeight: 18 },
  btnsCol: { },
  callBtn: { flexDirection: 'row', alignItems: 'center', borderRadius: 14, padding: 16, marginBottom: 10 },
  btnBlue: { backgroundColor: COLORS.blue },
  btnRed: { backgroundColor: COLORS.red },
  btnOrange: { backgroundColor: COLORS.orange },
  callIcon: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  callTitle: { fontSize: 15, fontWeight: '700', color: COLORS.white },
  callSub: { fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  infoCard: { backgroundColor: COLORS.white, borderRadius: 14, padding: 16, borderWidth: 1, borderColor: COLORS.border },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  infoIconWrap: { width: 38, height: 38, borderRadius: 19, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  infoText: { flex: 1, fontSize: 14, color: COLORS.textDark, lineHeight: 20 },
  stepsCard: { backgroundColor: COLORS.white, borderRadius: 14, padding: 16, borderWidth: 1, borderColor: COLORS.border },
  stepRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 },
  stepNum: { width: 26, height: 26, borderRadius: 13, backgroundColor: COLORS.lightBlue, justifyContent: 'center', alignItems: 'center', flexShrink: 0, marginRight: 12 },
  stepNumText: { fontSize: 12, fontWeight: '700', color: COLORS.blue },
  stepText: { flex: 1, fontSize: 14, color: COLORS.textDark, lineHeight: 20 },
});