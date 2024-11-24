import { useState, useEffect } from 'react';

import { StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import { router, Stack } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AntDesign from '@expo/vector-icons/AntDesign';
import DropDownPicker from 'react-native-dropdown-picker';

const clothTypes = [
  { label: "Shirt", value: "shirt", key: "1" },
  { label: "Pants", value: "pants", key: "2" },
  { label: "Dress", value: "dress", key: "3" },
  { label: "Jacket", value: "jacket", key: "4" },
  { label: "Shoes", value: "shoes", key: "6" },
  { label: "Other", value: "other", key: "7" },

];

export default function UploadClothScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [clothTypeOpen, setClothTypeOpen] = useState(false);
  const [selectedClothType, setSelectedClothType] = useState(clothTypes[0].value);
  const insets = useSafeAreaInsets();


  useEffect(() => {
    (async () => {
      // const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
      
      if (cameraStatus !== 'granted') {
        alert('Sorry, we need camera permissions to make this work!');
      }
    })();
  }, []);

  const takePhoto = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      alert('Failed to take photo. Please check your permissions.');
    }
  };

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <ThemedView style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />

        <ThemedView style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.push("/(tabs)/")}
          >
            <AntDesign name="left" size={24} color="#4A90E2" />
          </TouchableOpacity>
          <ThemedText style={styles.title}>Add New Item</ThemedText>
        </ThemedView>

        <ThemedView style={styles.form}>
          <ThemedView style={styles.formSection}>
            <ThemedText style={styles.label}>Type of Clothing</ThemedText>
            <DropDownPicker
              open={clothTypeOpen}
              value={selectedClothType}
              items={clothTypes}
              setOpen={setClothTypeOpen}
              setValue={setSelectedClothType}
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              textStyle={styles.dropdownText}
            />
          </ThemedView>

          <ThemedView style={styles.formSection}>
            <ThemedText style={styles.label}>Photo</ThemedText>
            <TouchableOpacity style={styles.imageButton} onPress={takePhoto}>
              {image ? (
                <Image source={{ uri: image }} style={styles.previewImage} />
              ) : (
                <ThemedView style={styles.uploadPlaceholder}>
                  <AntDesign name="camera" size={40} color="#4A90E2" />
                  <ThemedText style={styles.uploadText}>Take a photo</ThemedText>
                </ThemedView>
              )}
            </TouchableOpacity>
          </ThemedView>

          <TouchableOpacity 
            style={styles.submitButton}
            onPress={() => router.back()}
          >
            <ThemedText style={styles.submitButtonText}>Save Item</ThemedText>
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
    marginBottom: 30,
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
  dropdown: {
    borderColor: '#E1E8ED',
    borderRadius: 10,
  },
  dropdownContainer: {
    borderColor: '#E1E8ED',
    borderRadius: 10,
  },
  dropdownText: {
    fontSize: 14,
    color: '#2C3E50',
  },
  imageButton: {
    height: 200,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E1E8ED',
    borderStyle: 'dashed',
  },
  uploadPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  uploadText: {
    color: '#4A90E2',
    fontSize: 16,
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
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
});