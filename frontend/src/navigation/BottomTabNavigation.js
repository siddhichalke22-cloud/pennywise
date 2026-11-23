import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/dashboard/HomeScreen';
import ActivityScreen from '../screens/dashboard/ActivityScreen';
import ProfileScreen from '../screens/dashboard/ProfileScreen';
import GroupStackNavigator from './GroupStackNavigator';
import colors from '../theme/colors';
import spacing from '../theme/spacing';
import typography from '../theme/typography';
import { moderateScale } from '../utils/responsive';

const Tab = createBottomTabNavigator();

/**
 * Custom Fintech TabBar with Deep Purple & Soft Lavender Active Pills
 */
export const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabContainer}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const getIcon = () => {
            switch (route.name) {
              case 'Home':
                return '📊';
              case 'GroupsTab':
                return '👥';
              case 'Activity':
                return '⚡';
              case 'Profile':
                return '👤';
              default:
                return '●';
            }
          };

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              activeOpacity={0.8}
              onPress={onPress}
              style={styles.tabButton}
            >
              <View
                style={[
                  styles.tabIconWrapper,
                  isFocused && styles.activeTabPill,
                ]}
              >
                <Text
                  style={[
                    styles.tabIcon,
                    isFocused ? styles.activeTabIcon : styles.inactiveTabIcon,
                  ]}
                >
                  {getIcon()}
                </Text>
                {isFocused && (
                  <Text style={styles.activeLabel}>{label}</Text>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="GroupsTab"
        component={GroupStackNavigator}
        options={{
          tabBarLabel: 'Groups',
        }}
      />
      <Tab.Screen
        name="Activity"
        component={ActivityScreen}
        options={{
          tabBarLabel: 'Activity',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingBottom: Platform.OS === 'ios' ? moderateScale(20) : moderateScale(8),
    paddingTop: moderateScale(8),
    ...spacing.shadows.card,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10),
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: moderateScale(8),
    paddingHorizontal: moderateScale(12),
    borderRadius: spacing.borderRadius.full,
  },
  activeTabPill: {
    backgroundColor: colors.secondarySubtle,
  },
  tabIcon: {
    fontSize: moderateScale(18),
  },
  activeTabIcon: {
    transform: [{ scale: 1.05 }],
  },
  inactiveTabIcon: {
    opacity: 0.6,
  },
  activeLabel: {
    ...typography.caption,
    color: colors.primaryDark,
    fontWeight: '700',
    marginLeft: moderateScale(6),
  },
});

export default BottomTabNavigation;
