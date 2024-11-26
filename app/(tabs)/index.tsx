import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useEffect, useState  } from 'react';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useSession } from '@/utils/ctx'
import { get } from '@/utils/request'
import { Cloth } from './type'
import { CLOTH_CATEGORY } from '../constants';

const imageUrls = [
  'https://picsum.photos/200/200?random=1',
  'https://picsum.photos/200/200?random=2',
  'https://picsum.photos/200/200?random=3',
  'https://picsum.photos/200/200?random=4',
  'https://picsum.photos/200/200?random=5',
  'https://picsum.photos/200/200?random=6',
];

export default function HomeScreen() {
  const { session } = useSession()
  const [clothList, setClothList ] = useState<Cloth[]>()
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchList = async () => {
      const response = await get<Cloth[]>('/api/clothes/', {
          headers: {
            'Authorization': 'Bearer ' + session?.access,
          }
        })
      if(response && response.length > 0) {
        setClothList(response)
      }
    }

    fetchList()
}, [])

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#F8F9FA', dark: '#1A1B1E' }}
      headerImage={
        <Image
          source={require('@/assets/images/cloth.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="subtitle" style={styles.welcomeText}>Welcome to your stylish stash!</ThemedText>
      </ThemedView>
      
      <ThemedView style={styles.uploadSection}>
        <ThemedText style={styles.sectionTitle}>Upload a new cloth</ThemedText>
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={() => router.push({pathname: '/upload', params: { title: 'Upload' }})}
        >
          <Entypo name="plus" size={32} color="#4A90E2" />
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText style={styles.sectionTitle}>Your closet</ThemedText>
        <TouchableOpacity 
          style={styles.filterButton} 
          onPress={() => setShowFilter(!showFilter)}
        >
          <ThemedText style={styles.filterText}>Filter</ThemedText>
          <AntDesign name="filter" size={18} color="#4A90E2" />
        </TouchableOpacity>
      </ThemedView>
      <ThemedView>
      {showFilter && (
        <ThemedView style={styles.filterDropdown}>
          {CLOTH_CATEGORY.map((category) => (
            <TouchableOpacity
              key={category.key}
              style={styles.filterItem}
              onPress={() => {
                setSelectedCategory(category.value);
                setShowFilter(false);
              }}
            >
              <ThemedText style={styles.filterText}>{category.label}</ThemedText>
            </TouchableOpacity>
          ))}
        </ThemedView>
      )}
      </ThemedView>

      {/* Image List */}
      <ThemedView style={styles.closetList}>
        {clothList?.map((cloth, index) => (
          <TouchableOpacity key={index} style={styles.imageContainer}>
            <Image source={{ uri: cloth.image }} style={styles.image} />
          </TouchableOpacity>
        ))}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    paddingVertical: 20,
    alignItems: 'center',
    marginBottom: 25,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
  uploadSection: {
    marginBottom: 25,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#2C3E50',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F4F8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  filterText: {
    marginRight: 8,
    fontSize: 14,
    color: '#4A90E2',
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  iconButton: {
    backgroundColor: '#F0F4F8',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#E1E8ED',
    height: 60,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
    opacity: 0.9,
  },
  closetList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
    gap: 12,
  },
  imageContainer: {
    width: '47%',
    aspectRatio: 1,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  filterDropdown: {
    position: 'absolute',
    right: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    width: '45%',
  },
  filterItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E8ED',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
