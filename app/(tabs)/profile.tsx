import { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, TouchableOpacity } from 'react-native';
import { Link, type Href } from 'expo-router';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

function SettingItem({ title, href }: { title: string; href: string }) {
  return (
    <Link href={href as Href<string>} asChild>
      <TouchableOpacity style={styles.settingItemContainer}>
        <ThemedView style={styles.settingItem}>
          <ThemedText style={styles.settingText}>{title}</ThemedText>
          <Ionicons name="chevron-forward" size={24} color="#4A90E2" />
        </ThemedView>
      </TouchableOpacity>
    </Link>
  );
}

export default function AccountScreen() {
  const [headerImageUri, setHeaderImageUri] = useState('');
  const [headerBackgroundImageUri, setHeaderBackgroundImageUri] = useState('');

  useEffect(() => {
    const randomSeed = Math.random().toString(36).substring(7); 
    setHeaderImageUri(`https://api.dicebear.com/9.x/fun-emoji/png?seed=${randomSeed}&radius=50&backgroundType=gradientLinear&size=300&scale=80`);
    setHeaderBackgroundImageUri('https://picsum.photos/600');
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        headerImageUri ? <Image
          source={{ uri: headerImageUri }}
          style={styles.headerImage}
        /> : <Ionicons size={310} name="person-circle" style={styles.headerImage} />
      }>
        
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Account</ThemedText>
      </ThemedView>
      
      <ThemedView style={styles.settingsContainer}>
        <SettingItem title="Personal Information" href="/settings/personal" />
        <SettingItem title="Security Settings" href="/settings/security" />
        <SettingItem title="Notifications" href="/settings/notifications" />
        <SettingItem title="Payment Methods" href="/settings/payment" />
        <SettingItem title="Privacy Settings" href="/settings/privacy" />
        <SettingItem title="Account Deletion" href="/settings/delete-account" />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    position: 'absolute',
    bottom: -18,
    left: -6,
    width: 150,
    height: 150,
    overflow: 'hidden',
    borderRadius: 75,
  },
  titleContainer: {
    padding: 20,
    marginBottom: 10,
  },
  settingsContainer: {
    backgroundColor: '#F8FAFC',
    borderRadius: 15,
    overflow: 'hidden',
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  settingItemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#E1E8ED',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  settingText: {
    fontSize: 16,
    color: '#2C3E50',
  },
});
