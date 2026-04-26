import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Pressable,
  StatusBar,
  Linking,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

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

interface ContactMethod {
  title: string;
  detail: string;
  icon: FeatherIconName;
  color: string;
  bg: string;
  link: string;
}

const contactMethods: ContactMethod[] = [
  {
    title: 'Cyber Bureau Hotline',
    detail: 'Call 01-4412439',
    icon: 'phone-call',
    color: COLORS.red,
    bg: COLORS.lightRed,
    link: 'tel:014412439',
  },
  {
    title: 'Nepal Police Emergency',
    detail: 'Call 100',
    icon: 'phone',
    color: COLORS.blue,
    bg: COLORS.lightBlue,
    link: 'tel:100',
  },
  {
    title: 'Email Support',
    detail: 'support@cybersathi.app',
    icon: 'mail',
    color: COLORS.green,
    bg: COLORS.lightGreen,
    link: 'mailto:support@cybersathi.app',
  },
  {
    title: 'Online Help Center',
    detail: 'www.cybersathi.app/help',
    icon: 'globe',
    color: COLORS.orange,
    bg: COLORS.lightOrange,
    link: 'https://www.cybersathi.app/help',
  },
];

const ContactUsScreen = ({ navigation }: any) => {
  const openLink = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Feather name="arrow-left" size={22} color={COLORS.blue} />
          </Pressable>
          <View style={styles.headerIcon}>
            <Feather name="mail" size={22} color={COLORS.green} />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.headerTitle}>Contact Us</Text>
            <Text style={styles.headerSub}>We are here to help you</Text>
          </View>
        </View>

        <View style={styles.introCard}>
          <Text style={styles.introTitle}>Need assistance?</Text>
          <Text style={styles.introText}>
            If you have any questions, urgent concerns, or need help filing a report, contact us through one of the options below.
          </Text>
        </View>

        {contactMethods.map((method, index) => (
          <Pressable
            key={method.title}
            onPress={() => openLink(method.link)}
            style={({ pressed }) => [
              styles.methodCard,
              { backgroundColor: method.bg, borderColor: method.color },
              pressed && { opacity: 0.85 },
            ]}
          >
            <View style={[styles.methodIcon, { backgroundColor: method.color + '22' }]}>
              <Feather name={method.icon} size={20} color={method.color} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.methodTitle, { color: method.color }]}>{method.title}</Text>
              <Text style={styles.methodDetail}>{method.detail}</Text>
            </View>
            <Feather name="chevron-right" size={20} color={method.color} />
          </Pressable>
        ))}

        <View style={styles.noteCard}>
          <Feather name="info" size={18} color={COLORS.blue} />
          <Text style={styles.noteText}>
            Your safety is our priority. For legal emergencies, always contact local authorities first.
          </Text>
        </View>

        <View style={{ height: 28 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContactUsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  scroll: { padding: 16 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  backBtn: { marginRight: 8, padding: 4 },
  headerIcon: { width: 48, height: 48, borderRadius: 14, backgroundColor: COLORS.lightGreen, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.textDark },
  headerSub: { fontSize: 13, color: COLORS.textLight },
  introCard: { backgroundColor: COLORS.white, borderRadius: 16, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: COLORS.border },
  introTitle: { fontSize: 16, fontWeight: '700', color: COLORS.textDark, marginBottom: 8 },
  introText: { fontSize: 13, color: COLORS.textLight, lineHeight: 19 },
  methodCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 16, borderWidth: 1.5, marginBottom: 12 },
  methodIcon: { width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  methodTitle: { fontSize: 15, fontWeight: '700', marginBottom: 4 },
  methodDetail: { fontSize: 13, color: COLORS.textDark, opacity: 0.75 },
  noteCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.lightBlue, borderRadius: 14, padding: 14, marginTop: 16, borderWidth: 1, borderColor: COLORS.blue + '33' },
  noteText: { flex: 1, marginLeft: 10, fontSize: 13, color: COLORS.textDark, lineHeight: 19 },
});