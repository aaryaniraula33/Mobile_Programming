import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

interface Props {
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  bg: string;
  onPress: () => void;
}

const ActionCard = ({ title, subtitle, icon, color, bg, onPress }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && { transform: [{ scale: 0.96 }], borderColor: color },
      ]}
    >
      {({ pressed }) => (
        <>
          <View style={[styles.iconWrap, { backgroundColor: pressed ? color + '33' : bg }]}>
            <Feather name={icon as any} size={22} color={color} />
          </View>
          <Text style={[styles.title, pressed && { color }]}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </>
      )}
    </Pressable>
  );
};

export default ActionCard;

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginTop: 10,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
  },
  iconWrap: {
    width: 46, height: 46, borderRadius: 23,
    justifyContent: 'center', alignItems: 'center', marginBottom: 10,
  },
  title: { fontSize: 14, fontWeight: '700', color: '#1F2937' },
  subtitle: { fontSize: 12, color: '#6B7280', marginTop: 3 },
});