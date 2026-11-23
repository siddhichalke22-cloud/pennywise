import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useGroups } from '../../hooks/useGroups';
import { Header } from '../../components/common/Header';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

export const CreateGroupScreen = ({ navigation }) => {
  const { createNewGroup } = useGroups();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter a group name');
      return;
    }

    try {
      setLoading(true);
      await createNewGroup({ name, description });
      navigation.goBack();
    } catch (err) {
      Alert.alert('Failed to create group', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Create New Group" onBack={() => navigation.goBack()} />
      <View style={styles.content}>
        <Input
          label="Group Name"
          placeholder="e.g. Summer Vacation, Apartment 4B"
          value={name}
          onChangeText={setName}
        />
        <Input
          label="Description (Optional)"
          placeholder="e.g. Shared expenses for road trip"
          value={description}
          onChangeText={setDescription}
        />
        <Button
          title="Create Group"
          onPress={handleCreate}
          loading={loading}
          style={{ marginTop: spacing.md }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    padding: spacing.md,
  },
});

export default CreateGroupScreen;
