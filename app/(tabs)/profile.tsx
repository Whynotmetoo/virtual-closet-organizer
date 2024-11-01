import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function ProfileScreen() {
  const user = {
    name: "Don",
    email: "don@example.com",
    avatar: "https://picsum.photos/500",
  };

  const handleEditProfile = () => {
    alert("Edit Profile");
  };

  const handleLogout = () => {
    alert("Logged out");
  };

  return (
    <ThemedView style={styles.container}>
      <Image source={{ uri: user.avatar }} style={styles.avatar} />
      <ThemedText style={styles.name}>{user.name}</ThemedText>
      <ThemedText style={styles.email}>{user.email}</ThemedText>
      
      <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
        <ThemedText style={styles.buttonText}>Edit Profile</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.favoriteButton]} onPress={handleLogout}>
        <ThemedText style={styles.buttonText}>My Favorite</ThemedText>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
        <ThemedText style={styles.buttonText}>Logout</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  button: {
    width: '80%',
    padding: 15,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  favoriteButton: {
    backgroundColor: '#FF3B30',
  },
  logoutButton: {
    backgroundColor: 'grey',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
