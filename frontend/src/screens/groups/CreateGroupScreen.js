import React, { useState } from 'react';
import { View, StyleSheet, Alert, StatusBar, ScrollView } from 'react-native';
import Header from '../../components/common/Header';
import CustomInput from '../../components/common/CustomInput';
import CustomButton from '../../components/common/CustomButton';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import { moderateScale } from '../../utils/responsive';

export const CreateGroupScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Trip');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreate = () => {
    if (!name.trim()) {
      Alert.alert('Validation Error', 'Please enter a group name.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Group Created! 🎉',
        `Group "${name}" has been created. Start inviting members!`,
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    }, 600);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <Header
        title="Create Group"
        subtitle="Shared expense ledger"
        showBack
        onBack={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <CustomInput
            label="Group Name"
            placeholder="e.g. Hawaii Summer Trip, Apartment 402"
            value={name}
            onChangeText={setName}
          />

          <CustomInput
            label="Category"
            placeholder="e.g. Trip, Home, Dining, Couple"
            value={category}
            onChangeText={setCategory}
          />

          <CustomInput
            label="Description (Optional)"
            placeholder="e.g. Shared expenses for hotel, rental car & meals"
            value={description}
            onChangeText={setDescription}
          />

          <CustomButton
            title="Create Group"
            size="lg"
            variant="primary"
            fullWidth
            loading={loading}
            onPress={handleCreate}
            style={styles.btn}
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
  card: {
    backgroundColor: colors.white,
    borderRadius: spacing.borderRadius.xl,
    padding: moderateScale(20),
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...spacing.shadows.subtle,
  },
  btn: {
    marginTop: moderateScale(16),
  },
});

export default CreateGroupScreen;
