import { useState, useEffect } from 'react';

import { StyleSheet, TouchableOpacity, Image, View, TextInput } from 'react-native';
import { router, Stack, Redirect, useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as FileSystem from 'expo-file-system';
import { CATEGORY } from './constants'

const getFileInfo = async (uri: string) => {
  try {
    const fileInfo = await FileSystem.getInfoAsync(uri);
    console.log('File Info:', fileInfo);

    if (!fileInfo.exists) {
      throw new Error('File does not exist at the given URI');
    }
    return fileInfo;
  } catch (error) {
    console.error('Error fetching file info:', error);
  }
};

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AntDesign from '@expo/vector-icons/AntDesign';
import DropDownPicker from 'react-native-dropdown-picker';
import { useSession } from '@/utils/ctx'
import { post, get, patch } from '@/utils/request'
import { Cloth } from './(tabs)/type'

const clothTypes = [
  { label: "top", value: CATEGORY.TOP, key: "1" },
  { label: "dress", value: CATEGORY.DRESS, key: "2" },
  { label: "bottom", value: CATEGORY.BOTTOM, key: "3" },
  { label: "shoes", value: CATEGORY.SHOES, key: "4" },
  { label: "outerwear", value: CATEGORY.OUTERWEAR, key: "5" },
  { label: "accessories", value: CATEGORY.ACCESSORIES, key: "6" },
];


export default function UploadClothScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [clothTypeOpen, setClothTypeOpen] = useState(false);
  const [selectedClothType, setSelectedClothType] = useState(clothTypes[0].value);
  const [clothData, setClothData] = useState<Cloth>()
  const insets = useSafeAreaInsets();
  const { session, isLoading } = useSession();
  const { id } = useLocalSearchParams()
  const [name, setName] = useState<string>('');

  if(!session) {
    return <Redirect href="/login" />
  }

  const getClothes = async (id: number) => {
    const response = await get<Cloth>(`/api/clothes/${id}/`, {
        headers: {
          'Authorization': 'Bearer ' + session?.access,
        }
      })
    console.log(response)
    if(response) {
      // setClothData(response)
      setImage(response.image)
      setName(response.name)
      setSelectedClothType(response.category)
    }
  }

  useEffect(() => {
    if(id) {
      getClothes(Number(id))
    }
  }, [])

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

  const handleSave = async() => {
    if (!image) return;
    const formData = new FormData();
    
    const fileName = image.split('/').pop() || 'upload.jpg';
    
    formData.append('image', {
      uri: image,
      type: 'image/jpeg',
      name: fileName,
    } as any);

    formData.append('category', selectedClothType);
    formData.append('name', name);
    // formData.append('color', 'red');
    // formData.append('season', 'winter');
    // formData.append('occasion', 'work');
    if(id) {
      const response = await patch(`/api/clothes/${id}/`, 
        formData,
        {
          headers: {
          'Authorization': 'Bearer ' + session.access,
          'Content-Type': 'multipart/form-data',
          }
        },
      );
      if(response) alert('clothes updated')
    }else {
      const response = await post('/api/clothes/', 
        formData,
        {
          headers: {
          'Authorization': 'Bearer ' + session.access,
          'Content-Type': 'multipart/form-data',
          }
        },
      );
      if(response) alert('clothes saved')
    }
    
  }

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

        <ThemedView style={[styles.formSection, { zIndex: 1 }]}>
          <ThemedText style={styles.label}>Name</ThemedText>
          <TextInput 
            style={[styles.input, { backgroundColor: '#F0F4F8' }]}
            placeholder="Enter name" 
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </ThemedView>

        <ThemedView style={styles.form}>
          <ThemedView style={[styles.formSection, { zIndex: 2 }]}>
            <ThemedText style={styles.label}>Type of Clothing</ThemedText>
            <ThemedView style={clothTypeOpen ? { zIndex: 2 } : {}}>
              <DropDownPicker
                open={clothTypeOpen}
                value={selectedClothType}
                items={clothTypes}
                setOpen={setClothTypeOpen}
                setValue={setSelectedClothType}
                style={styles.dropdown}
                dropDownContainerStyle={[styles.dropdownContainer, { zIndex: 2000 }]}
                textStyle={styles.dropdownText}
              />
            </ThemedView>
          </ThemedView>

          

          <ThemedView style={[styles.formSection, { zIndex: 1 }]}>
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
            onPress={handleSave}
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
  input: {
    borderColor: '#E1E0ED',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#F0F4F8',
  },
});