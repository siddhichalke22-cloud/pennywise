import React from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, StatusBar } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import Header from '../../components/common/Header';
import Avatar from '../../components/common/Avatar';
import CustomButton from '../../components/common/CustomButton';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';
import { moderateScale } from '../../utils/responsive';
import { currentUser } from '../../data/dummyData';

export const ProfileScreen = () => {
  const { user, logout } = useAuth();
  const profileUser = user || currentUser;

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to log out of Pennywise?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log Out', style: 'destructive', onPress: logout },
    ]);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <Header title="My Account" subtitle="Profile and preferences" />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <Avatar
            name={profileUser?.name || 'User'}
            uri={profileUser?.avatar}
            size={moderateScale(76)}
          />
          <Text style={styles.name}>{profileUser?.name}</Text>
          <Text style={styles.email}>{profileUser?.email}</Text>

          <View style={styles.currencyPill}>
            <Text style={styles.currencyText}>
              Default Currency: {profileUser?.currency || 'USD ($)'}
            </Text>
          </View>
        </View>

        {/* Account Details Box */}
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Payment Method</Text>
            <Text style={styles.infoValue}>
              {profileUser?.defaultPaymentMethod || 'Apple Pay •••• 4291'}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Theme</Text>
            <Text style={styles.infoValue}>Deep Purple (Fintech Light)</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>App Version</Text>
            <Text style={styles.infoValue}>v1.0.0 (Expo 52)</Text>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionSection}>
          <CustomButton
            title="Sign Out"
            variant="danger"
            size="lg"
            fullWidth
            onPress={handleLogout}
            style={styles.logoutButton}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: moderateScale(16),
  },
  profileCard: {
    backgroundColor: colors.white,
    padding: moderateScale(24),
    borderRadius: spacing.borderRadius.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...spacing.shadows.subtle,
  },
  name: {
    ...typography.h2,
    color: colors.text,
    marginTop: moderateScale(12),
  },
  email: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: moderateScale(2),
  },
  currencyPill: {
    backgroundColor: colors.secondarySubtle,
    borderRadius: spacing.borderRadius.full,
    paddingHorizontal: moderateScale(14),
    paddingVertical: moderateScale(5),
    marginTop: moderateScale(12),
  },
  currencyText: {
    ...typography.caption,
    color: colors.primaryDark,
    fontWeight: '700',
  },
  infoCard: {
    backgroundColor: colors.white,
    borderRadius: spacing.borderRadius.lg,
    padding: moderateScale(16),
    marginTop: moderateScale(16),
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...spacing.shadows.subtle,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: moderateScale(8),
  },
  infoLabel: {
    ...typography.body,
    color: colors.textSecondary,
  },
  infoValue: {
    ...typography.bodyBold,
    color: colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginVertical: moderateScale(4),
  },
  actionSection: {
    marginTop: moderateScale(24),
  },
  logoutButton: {
    borderRadius: spacing.borderRadius.md,
  },
});

export default ProfileScreen;
