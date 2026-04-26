import React, { useState } from 'react';
import {
  SafeAreaView, ScrollView, View, Text,
  TextInput, StyleSheet, Pressable, StatusBar,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import SectionTitle from '../../../components/src/components/SectionTitle';
import StatusBadge from '../../../components/src/components/StatusBadge';

const COLORS = {
  blue: '#1565C0', lightBlue: '#EAF2FF',
  red: '#E53935', lightRed: '#FDECEC',
  green: '#16A34A', bg: '#F5F7FB',
  textDark: '#1F2937', textLight: '#6B7280',
  border: '#E5E7EB', white: '#FFFFFF',
};

const allComplaints = [
  { id: 'CS-2026-1001', title: 'Instagram harassment', status: 'In Review' as const, date: 'Jan 10, 2026', type: 'Harassment' },
  { id: 'CS-2026-1002', title: 'Fake profile report', status: 'Submitted' as const, date: 'Jan 8, 2026', type: 'Fake Profile' },
  { id: 'CS-2026-1003', title: 'Threat messages', status: 'Resolved' as const, date: 'Jan 5, 2026', type: 'Threats' },
];

const statusSteps = ['Submitted', 'In Review', 'Resolved'];

const TrackComplaintScreen = ({ navigation, route }: any) => {
  const [searchId, setSearchId] = useState(route?.params?.complaintId || '');
  const [found, setFound] = useState<any>(
    route?.params?.complaintId
      ? allComplaints.find(c => c.id === route.params.complaintId) || null
      : null
  );
  const [notFound, setNotFound] = useState(false);

  const handleSearch = () => {
    const result = allComplaints.find(c => c.id.toLowerCase() === searchId.toLowerCase());
    if (result) { setFound(result); setNotFound(false); }
    else { setFound(null); setNotFound(true); }
  };

  const stepIndex = found ? statusSteps.indexOf(found.status) : -1;

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
            <Feather name="search" size={22} color={COLORS.blue} />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.headerTitle}>Track Complaint</Text>
            <Text style={styles.headerSub}>Check your complaint status</Text>
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchCard}>
          <Text style={styles.searchLabel}>Enter Complaint ID</Text>
          <View style={styles.searchRow}>
            <View style={styles.inputWrap}>
              <Feather name="hash" size={16} color={COLORS.textLight} style={styles.inputIcon} />
              <TextInput style={styles.input} placeholder="e.g. CS-2026-1001"
                placeholderTextColor={COLORS.textLight} value={searchId}
                onChangeText={setSearchId} autoCapitalize="characters" />
            </View>
            <Pressable onPress={handleSearch}
              style={({ pressed }) => [styles.searchBtn, pressed && { opacity: 0.8 }]}>
              <Feather name="search" size={20} color={COLORS.white} />
            </Pressable>
          </View>
          {notFound && (
            <View style={styles.notFoundBox}>
              <Feather name="alert-circle" size={14} color={COLORS.red} style={styles.notFoundIcon} />
              <Text style={styles.notFoundText}>Complaint ID not found.</Text>
            </View>
          )}
        </View>

        {/* Detail */}
        {found && (
          <View style={styles.detailCard}>
            <View style={styles.detailHeader}>
              <View>
                <Text style={styles.detailId}>{found.id}</Text>
                <Text style={styles.detailTitle}>{found.title}</Text>
                <Text style={styles.detailMeta}>{found.type} · {found.date}</Text>
              </View>
              <StatusBadge status={found.status} />
            </View>
            {/* Steps */}
            <View style={styles.stepsRow}>
              {statusSteps.map((step, i) => (
                <React.Fragment key={step}>
                  <View style={styles.stepItem}>
                    <View style={[styles.stepCircle, i <= stepIndex && styles.stepCircleActive]}>
                      {i < stepIndex
                        ? <Feather name="check" size={14} color={COLORS.white} />
                        : <Text style={[styles.stepNum, i <= stepIndex && { color: COLORS.white }]}>{i + 1}</Text>
                      }
                    </View>
                    <Text style={[styles.stepLabel, i <= stepIndex && { color: COLORS.blue }]}>{step}</Text>
                  </View>
                  {i < statusSteps.length - 1 && (
                    <View style={[styles.stepLine, i < stepIndex && { backgroundColor: COLORS.blue }]} />
                  )}
                </React.Fragment>
              ))}
            </View>
          </View>
        )}

        {/* List */}
        <SectionTitle title="All Recent Complaints" />
        <View style={styles.listCard}>
          {allComplaints.map((item, index) => (
            <Pressable key={item.id}
              onPress={() => { setSearchId(item.id); setFound(item); setNotFound(false); }}
              style={[styles.listRow, index !== allComplaints.length - 1 && styles.listBorder]}>
              <View style={styles.listIconWrap}>
                <Feather name="file-text" size={18} color={COLORS.blue} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.listTitle}>{item.title}</Text>
                <Text style={styles.listMeta}>{item.id} · {item.date}</Text>
              </View>
              <StatusBadge status={item.status} />
            </Pressable>
          ))}
        </View>

        <View style={{ height: 28 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default TrackComplaintScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  scroll: { padding: 16 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  backBtn: { marginRight: 8, padding: 4 },
  headerIcon: { width: 48, height: 48, borderRadius: 14, backgroundColor: COLORS.lightBlue, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.textDark },
  headerSub: { fontSize: 13, color: COLORS.textLight },
  searchCard: { backgroundColor: COLORS.white, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: COLORS.border },
  searchLabel: { fontSize: 13, fontWeight: '600', color: COLORS.textDark, marginBottom: 10 },
  searchRow: { flexDirection: 'row' },
  searchBtn: { width: 48, height: 48, backgroundColor: COLORS.blue, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginLeft: 10 },
  inputWrap: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.bg, borderWidth: 1.5, borderColor: COLORS.border, borderRadius: 10 },
  inputIcon: { marginLeft: 12 },
  input: { flex: 1, paddingHorizontal: 10, paddingVertical: 12, fontSize: 14, color: COLORS.textDark },
  notFoundBox: { flexDirection: 'row', alignItems: 'center', marginTop: 10, backgroundColor: COLORS.lightRed, padding: 10, borderRadius: 8 },
  notFoundIcon: { marginRight: 6 },
  notFoundText: { fontSize: 13, color: COLORS.red },
  detailCard: { backgroundColor: COLORS.white, borderRadius: 16, padding: 16, marginTop: 16, borderWidth: 1, borderColor: COLORS.border },
  detailHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  detailId: { fontSize: 13, color: COLORS.textLight },
  detailTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.textDark, marginTop: 2 },
  detailMeta: { fontSize: 12, color: COLORS.textLight, marginTop: 4 },
  stepsRow: { flexDirection: 'row', alignItems: 'center' },
  stepItem: { alignItems: 'center', flex: 1 },
  stepCircle: { width: 32, height: 32, borderRadius: 16, backgroundColor: COLORS.border, justifyContent: 'center', alignItems: 'center', marginBottom: 6 },
  stepCircleActive: { backgroundColor: COLORS.blue },
  stepNum: { fontSize: 13, fontWeight: '700', color: COLORS.textLight },
  stepLabel: { fontSize: 11, color: COLORS.textLight, textAlign: 'center' },
  stepLine: { flex: 1, height: 2, backgroundColor: COLORS.border, marginBottom: 20 },
  listCard: { backgroundColor: COLORS.white, borderRadius: 14, paddingHorizontal: 14, borderWidth: 1, borderColor: COLORS.border },
  listRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
  listIconWrap: { width: 36, height: 36, borderRadius: 18, backgroundColor: COLORS.lightBlue, justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  listBorder: { borderBottomWidth: 1, borderBottomColor: COLORS.border },
  listTitle: { fontSize: 14, fontWeight: '600', color: COLORS.textDark },
  listMeta: { fontSize: 12, color: COLORS.textLight, marginTop: 2 },
});