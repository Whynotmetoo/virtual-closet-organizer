import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function AccountScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="person-circle" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Account</ThemedText>
      </ThemedView>
      <ThemedText>Manage your account settings and preferences here.</ThemedText>
      
      <Collapsible title="Personal Information">
        <ThemedText>
          View and edit your personal information such as your name, email, and phone number.
        </ThemedText>
        <ExternalLink href="https://example.com/edit-profile">
          <ThemedText type="link">Edit Profile</ThemedText>
        </ExternalLink>
      </Collapsible>

      <Collapsible title="Security Settings">
        <ThemedText>
          Manage your password, enable two-factor authentication, and adjust other security settings to keep your account safe.
        </ThemedText>
        <ExternalLink href="https://example.com/security">
          <ThemedText type="link">Security Settings</ThemedText>
        </ExternalLink>
      </Collapsible>

      <Collapsible title="Notifications">
        <ThemedText>
          Control your notification preferences, including email, push, and SMS notifications.
        </ThemedText>
        <ExternalLink href="https://example.com/notifications">
          <ThemedText type="link">Notification Settings</ThemedText>
        </ExternalLink>
      </Collapsible>

      <Collapsible title="Payment Methods">
        <ThemedText>
          Add, edit, or remove payment methods linked to your account. You can manage your credit card and PayPal information.
        </ThemedText>
        <ExternalLink href="https://example.com/payment-methods">
          <ThemedText type="link">Manage Payment Methods</ThemedText>
        </ExternalLink>
      </Collapsible>

      <Collapsible title="Privacy Settings">
        <ThemedText>
          Control who can see your profile and adjust other privacy-related settings.
        </ThemedText>
        <ExternalLink href="https://example.com/privacy">
          <ThemedText type="link">Privacy Settings</ThemedText>
        </ExternalLink>
      </Collapsible>

      <Collapsible title="Account Deletion">
        <ThemedText>
          If you want to delete your account, you can start the process here. Note that this action is irreversible.
        </ThemedText>
        <ExternalLink href="https://example.com/delete-account">
          <ThemedText type="link">Delete Account</ThemedText>
        </ExternalLink>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
