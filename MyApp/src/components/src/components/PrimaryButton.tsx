import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';
// import Feather from '@react-native-vector-icons/feather';

interface Props {
  label: string;
  onPress: () => void;
  color?: string;
  icon?: string;
  style?: ViewStyle;
  disabled?: boolean;
}

const PrimaryButton = ({
  label, onPress, color = '#1565C0',
  icon, style, disabled = false,
}: Props) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.btn,
        { backgroundColor: disabled ? '#90A4AE' : color },
        pressed && { opacity: 0.85, transform: [{ scale: 0.98 }] },
        style,
      ]}
    >
      {/* {icon && (
        <Feather
          name={icon as any}
          size={18}
          color="#fff"
          style={{ marginRight: 8 }}
        />
      )} */}
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 10,
  },
  label: { color: '#fff', fontSize: 15, fontWeight: '700' },
});