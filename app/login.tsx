import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { router, Stack, Href } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { TextInput } from 'react-native';

export default function LoginScreen() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const insets = useSafeAreaInsets();

  const handleLogin = () => {
    // TODO: Implement login logic
    router.push('/(tabs)/');
  };

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <ThemedView style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />

        <ThemedView style={styles.header}>
          <ThemedText style={styles.title}>Login</ThemedText>
        </ThemedView>

        <ThemedView style={styles.form}>
          <ThemedView style={styles.formSection}>
            <ThemedText style={styles.label}>Name</ThemedText>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your account name"
              autoCapitalize="none"
            />
          </ThemedView>

          <ThemedView style={styles.formSection}>
            <ThemedText style={styles.label}>Password</ThemedText>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry
            />
          </ThemedView>

          <TouchableOpacity 
            style={styles.submitButton}
            onPress={handleLogin}
          >
            <ThemedText style={styles.submitButtonText}>Login</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.registerButton}
            onPress={() => router.push('/register' as Href<string>)}
          >
            <ThemedText style={styles.registerButtonText}>
              Don't have an account? Register
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    marginTop: 80
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F0F4F8',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginLeft: 15,
    color: '#2C3E50',
  },
  form: {
    gap: 25,
  },
  formSection: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#34495E',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E1E8ED',
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    color: '#2C3E50',
  },
  submitButton: {
    backgroundColor: '#4A90E2',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  registerButton: {
    padding: 16,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#4A90E2',
    fontSize: 14,
  },
});  