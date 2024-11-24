import React, { useState } from 'react';
import { View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const activities = [
  { label: "Go for a Walk", value: "walk", key: "1" },
  { label: "Gym Workout", value: "gym", key: "2" },
  { label: "Casual Hangout", value: "hangout", key: "3" },
  { label: "Formal Meeting", value: "meeting", key: "4" },
  { label: "Party", value: "party", key: "5" },
  { label: "Date", value: "date", key: "6" },
  { label: "Work", value: "work", key: "7" },
  { label: "Shopping", value: "shopping", key: "8" },
  { label: "Travel", value: "travel", key: "9" },
  { label: "Other", value: "other", key: "10" },
];

const feelings = [
  { label: "Happy", value: "happy", key: "1" },
  { label: "Relaxed", value: "relaxed", key: "2" },
  { label: "Confident", value: "confident", key: "3" },
  { label: "Sporty", value: "sporty", key: "4" },
  { label: "Casual", value: "casual", key: "5" },
  { label: "Elegant", value: "elegant", key: "6" },
  { label: "Trendy", value: "trendy", key: "7" },
  { label: "Other", value: "other", key: "8" },
];

export default function OutfitRecommendationScreen() {
  const [activityOpen, setActivityOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(activities[0].value);
  const [feelingOpen, setFeelingOpen] = useState(false);
  const [selectedFeeling, setSelectedFeeling] = useState(feelings[0].value);

  const handleRecommendation = () => {
    alert(`Recommended outfit for a ${selectedFeeling} day with a ${selectedActivity} activity!`);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Outfit Recommendation</ThemedText>
      <ThemedText style={styles.subtitle}>Let's find your perfect outfit</ThemedText>

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
            dropDownContainerStyle={styles.dropdownContainer}
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
            dropDownContainerStyle={styles.dropdownContainer}
            textStyle={styles.dropdownText}
          />
        </ThemedView>

        <TouchableOpacity 
          style={styles.recommendButton}
          onPress={handleRecommendation}
        >
          <ThemedText style={styles.buttonText}>Get Recommendations</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
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
});
