import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { post } from '@/utils/request'
import { useSession } from '@/utils/ctx'
import {  SuggestionResponse } from './type'
// import Image from 'react-native-image-resizer';


const activities = [
  { label: "Go for a Walk", value: "Go for a Walk", key: "1" },
  { label: "Gym Workout", value: "Gym Workout", key: "2" },
  { label: "Casual Day Out", value: "Casual Day Out", key: "3" },
  { label: "Work/Business Meeting", value: "Work/Business Meeting", key: "4" },
  { label: "Party", value: "party", key: "5" },
  { label: "Date", value: "date", key: "6" },
  { label: "Shopping", value: "shopping", key: "8" },
  { label: "Travel", value: "travel", key: "9" },
  { label: "Outdoor Adventure", value: "Outdoor Adventure", key: "10" },
  { label: 'Beach Day', value: 'Beach Day', key: '11' },
  { label: 'Yoga/Meditation', value: 'Yoga/Meditation', key: '12' },
  { label: 'Relaxing at Home', value: 'Relaxing at Home', key: '13' },
  { label: 'Any', value: 'Any', key: '14' },
];

const feelings = [
  { label: "Stylish", value: "stylish", key: "9"},
  { label: "Comfortable", value: "comfortable", key: "1" },
  { label: "Relaxed", value: "relaxed", key: "2" },
  { label: "Confident", value: "confident", key: "3" },
  { label: "Sporty", value: "sporty", key: "4" },
  { label: "Casual", value: "casual", key: "5" },
  { label: "Elegant", value: "elegant", key: "6" },
  { label: "Trendy", value: "trendy", key: "7" },
  { label: "Energetic", value: "energetic", key: "8" },
  { label: "Romantic", value: "romantic", key: "11" },
  { label: "Chill", value: "chill", key: "12" },
  { label: "Any", value: "any", key: "10" },
];

export default function OutfitRecommendationScreen() {
  const { session } = useSession()
  const [activityOpen, setActivityOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(activities[0].value);
  const [feelingOpen, setFeelingOpen] = useState(false);
  const [selectedFeeling, setSelectedFeeling] = useState(feelings[0].value);
  const [recommendations, setRecommendations] = useState<SuggestionResponse | null>(null);

  const handleRecommendation = async() => {
    const response = await post<SuggestionResponse>('/api/outfits/suggest/', { activity: selectedActivity, feeling: selectedFeeling},
      {
        headers: {
        'Authorization': 'Bearer ' + session?.access,
      }}
    )
    console.log(response)
    setRecommendations(response);
  };

  return (
    <ThemedView style={[styles.container, { paddingTop: 80 }]}>
      <FlatList
        data={[{}]}
        renderItem={() => (
          <ThemedView>
            <ThemedText style={styles.title}>Outfit Recommendation</ThemedText>
            <ThemedText style={styles.subtitle}>Let's find your perfect outfit for today</ThemedText>

            <ThemedView style={styles.formContainer}>
              <ThemedText style={styles.label}>Activity</ThemedText>
              <ThemedView style={activityOpen ? { zIndex: 2 } : {}}>
                <DropDownPicker
                  open={activityOpen}
                  value={selectedActivity}
                  items={activities}
                  setOpen={setActivityOpen}
                  setValue={setSelectedActivity}
                  style={styles.dropdown}
                  listMode="SCROLLVIEW"
                  dropDownContainerStyle={{ ...styles.dropdownContainer, maxHeight: 300 }}
                  textStyle={styles.dropdownText}
                />
              </ThemedView>

              <ThemedText style={styles.label}>Mood</ThemedText>
              <ThemedView style={feelingOpen ? { zIndex: 1 } : {}}>
                <DropDownPicker
                  open={feelingOpen}
                  value={selectedFeeling}
                  items={feelings}
                  setOpen={setFeelingOpen}
                  setValue={setSelectedFeeling}
                  style={styles.dropdown}
                  listMode="SCROLLVIEW"
                  dropDownContainerStyle={{ ...styles.dropdownContainer, maxHeight: 300 }}
                  textStyle={styles.dropdownText}
                />
              </ThemedView>

              <TouchableOpacity 
                style={styles.recommendButton}
                onPress={handleRecommendation}
              >
                <ThemedText style={styles.buttonText}>Get Recommendations</ThemedText>
              </TouchableOpacity>
              
              {recommendations && <ThemedText style={styles.reasoningText}>{recommendations.reasoning}</ThemedText>}
              {recommendations && recommendations.outfit.map((item, index) => (
                <View key={index} style={styles.recommendationItem}>
                  <ThemedText style={styles.categoryText}>{item.category}</ThemedText>
                  <Image source={{ uri: item.image }} style={styles.recommendationImage} />
                </View>
              ))}
            </ThemedView>
          </ThemedView>
        )}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled={!activityOpen}
      /> 
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    paddingTop: 10,
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
    color: '#2C3E50',
  },
  subtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    marginBottom: 30,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
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
    marginBottom: 8,
    color: '#34495E',
  },
  dropdown: {
    borderColor: '#E1E8ED',
    borderRadius: 10,
    marginBottom: 20,
  },
  dropdownContainer: {
    borderColor: '#E1E8ED',
    borderRadius: 10,
    maxHeight: 200,
  },
  dropdownText: {
    fontSize: 14,
    color: '#2C3E50',
  },
  recommendButton: {
    backgroundColor: '#4A90E2',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  recommendationItem: {
    marginVertical: 10,
  },
  reasoningText: {
    marginTop: 20,
    fontSize: 14,
    fontWeight: '500',
    color: '#34495E',
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 5,
  },
  recommendationImage: {
    width: '100%',
    height: 200,
    borderRadius: 5,
  },
});
