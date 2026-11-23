import React, { useState } from 'react';
import { View, FlatList, StyleSheet, StatusBar } from 'react-native';
import Header from '../../components/common/Header';
import CustomButton from '../../components/common/CustomButton';
import GroupCard from '../../components/group/GroupCard';
import colors from '../../theme/colors';
import { moderateScale } from '../../utils/responsive';
import { dummyGroups } from '../../data/dummyData';

export const GroupsScreen = ({ navigation }) => {
  const [groups, setGroups] = useState(dummyGroups);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <Header
        title="Your Groups"
        subtitle="Shared expense communities"
        rightAction={
          <CustomButton
            title="+ New Group"
            size="sm"
            variant="primary"
            onPress={() => navigation.navigate('CreateGroup')}
          />
        }
      />
      <FlatList
        data={groups}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <GroupCard
            group={item}
            onPress={() =>
              navigation.navigate('GroupDetail', {
                groupId: item.id,
                groupName: item.name,
              })
            }
          />
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
  list: {
    padding: moderateScale(16),
  },
});

export default GroupsScreen;
