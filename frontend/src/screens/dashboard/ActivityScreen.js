import React from 'react';
import { View, Text, StyleSheet, FlatList, StatusBar } from 'react-native';
import Header from '../../components/common/Header';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';
import { moderateScale } from '../../utils/responsive';
import { dummyRecentActivities } from '../../data/dummyData';

export const ActivityScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <Header title="Activity Feed" subtitle="Audit trail across all your groups" />

      <FlatList
        data={dummyRecentActivities}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.iconCircle}>
              <Text style={styles.iconEmoji}>{item.icon}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
              <Text style={styles.timeText}>{item.time}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    padding: moderateScale(16),
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: moderateScale(16),
    borderRadius: spacing.borderRadius.lg,
    marginBottom: moderateScale(10),
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...spacing.shadows.subtle,
  },
  iconCircle: {
    width: moderateScale(46),
    height: moderateScale(46),
    borderRadius: spacing.borderRadius.md,
    backgroundColor: colors.secondarySubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: moderateScale(14),
  },
  iconEmoji: {
    fontSize: moderateScale(22),
  },
  textContainer: {
    flex: 1,
  },
  title: {
    ...typography.h4,
    color: colors.text,
    fontSize: moderateScale(14),
  },
  subtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: moderateScale(2),
  },
  timeText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
    marginTop: moderateScale(4),
  },
});

export default ActivityScreen;
