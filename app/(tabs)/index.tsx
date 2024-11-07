import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';


export default function HomeScreen() {

  const imageUrls = [
    'https://picsum.photos/200/200?random=1',
    'https://picsum.photos/200/200?random=2',
    'https://picsum.photos/200/200?random=3',
    'https://picsum.photos/200/200?random=4',
    'https://picsum.photos/200/200?random=5',
    'https://picsum.photos/200/200?random=6',
  ];

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#613D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/cloth.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="subtitle">Welcome to your stylish stash!</ThemedText>
      </ThemedView>
      <ThemedView>
        <ThemedText style={styles.boldText}>Upload a new cloth</ThemedText>
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={() => router.push({pathname: '/upload', params: { title: 'Upload' }})}
        >
          <Entypo name="plus" size={40} color="black" />
        </TouchableOpacity>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText style={styles.boldText}>Your closet</ThemedText>
        <ThemedView style={styles.filterContainer}>
          <ThemedText style={styles.filterText}>Filter</ThemedText>
            <TouchableOpacity onPress={() => alert('Filter Pressed')}>
            <AntDesign name="filter" size={20} color="black" />
            </TouchableOpacity>
        </ThemedView>
      </ThemedView>
       {/* Image List */}
       <ThemedView style={styles.closetList}>
        {imageUrls.map((url, index) => (
          <TouchableOpacity key={index} style={styles.imageContainer}>
            <Image source={{ uri: url }} style={styles.image} />
          </TouchableOpacity>
        ))}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginBottom: 30,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10, // Space between "Your closet" and filter section
  },
  filterText: {
    marginRight: 5, // Space between text and icon
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconButton: {
    flex: 1, // Allow the button to take up the remaining space
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    marginVertical: 10,
    borderWidth: 1, // Add border width
    borderColor: 'black', // Border color
    height: 60,
  },
  boldText: {
    fontWeight: 'bold', // Makes the text bold
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  closetList: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Allow wrapping to the next line
    justifyContent: 'space-between', // Space out items evenly
  },
  imageContainer: {
    width: '48%', // Each image takes up nearly half of the row
    aspectRatio: 1, // Maintain a square aspect ratio
    marginBottom: 10, // Space between rows
  },
  image: {
    width: '100%', // Fill the container
    height: '100%', // Fill the container
    borderRadius: 5, // Optional: add rounded corners
  },
});
