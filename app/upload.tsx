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
        <Stack.Screen 
          options={{
            title: "New Cloth",
            headerShown: false,
          }} 
        />

        <ThemedView style={styles.header}>
          <TouchableOpacity onPress={() => router.push("/(tabs)/")}>
            <AntDesign name="left" size={24} color="black" />
          </TouchableOpacity>
          <ThemedText style={styles.title}>Add New Cloth</ThemedText>
        </ThemedView>

        <ThemedView style={styles.form}>
          <ThemedText style={styles.label}>Cloth Type</ThemedText>
          <DropDownPicker
            open={clothTypeOpen}
            value={selectedClothType}
            items={clothTypes}
            setOpen={setClothTypeOpen}
            setValue={setSelectedClothType}
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
          />
          <ThemedText style={styles.label}>Photo</ThemedText>
          <TouchableOpacity style={styles.imageButton} onPress={takePhoto}>
            {image ? (
              <Image source={{ uri: image }} style={styles.previewImage} />
            ) : (
              <AntDesign name="camera" size={40} color="black" />
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.submitButton}
            onPress={() => {
              // Handle submission here
              router.back();
            }}
          >
            <ThemedText style={styles.submitButtonText}>Save</ThemedText>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  dropdown: {
    width: '100%',
    marginBottom: 20,
  },
  dropdownContainer: {
    width: '100%',
  },
  form: {
    gap: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  picker: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  imageButton: {
    height: 200,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  submitButton: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});