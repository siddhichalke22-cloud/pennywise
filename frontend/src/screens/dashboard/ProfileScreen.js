import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { Header } from '../../components/common/Header';
import { Avatar } from '../../components/common/Avatar';
import { Button } from '../../components/common/Button';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

export const ProfileScreen = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log Out', style: 'destructive', onPress: logout },
    ]);
  };

  return (
    <View style={styles.container}>
      <Header title="My Account" />
      <View style={styles.content}>
        <View style={styles.profileCard}>
          <Avatar name={user?.name || 'User'} size={70} />
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.email}>{user?.email}</Text>
          <Text style={styles.currency}>Default Currency: {user?.defaultCurrency || 'USD'}</Text>
        </View>

        <View style={styles.actionSection}>
          <Button
            title="Sign Out"
            variant="danger"
            onPress={handleLogout}
            style={styles.logoutButton}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
  },
  profileCard: {
    backgroundColor: colors.white,
    padding: spacing.xl,
    borderRadius: spacing.borderRadius.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginTop: spacing.sm,
  },
  email: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  currency: {
    fontSize: 13,
    color: colors.primaryDark,
    marginTop: spacing.sm,
    fontWeight: '500',
  },
  actionSection: {
    marginTop: spacing.xl,
  },
  logoutButton: {
    width: '100%',
  },
});

export default ProfileScreen;
