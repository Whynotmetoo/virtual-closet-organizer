import React, { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
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
      <ThemedText style={styles.title}>Choose Your Activity and Feeling</ThemedText>

      <ThemedText style={styles.label}>Select Activity:</ThemedText>
      <ThemedView style={activityOpen ? { zIndex: 2 } : {}}>
        <DropDownPicker
          open={activityOpen}
          value={selectedActivity}
          items={activities}
          setOpen={setActivityOpen}
          setValue={setSelectedActivity}
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
        />
      </ThemedView>

      <ThemedText style={styles.label}>Select Feeling:</ThemedText>
      <ThemedView style={feelingOpen ? { zIndex: 1 } : {}}>
        <DropDownPicker
          open={feelingOpen}
          value={selectedFeeling}
          items={feelings}
          setOpen={setFeelingOpen}
          setValue={setSelectedFeeling}
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
        />
      </ThemedView>

      <ThemedView style={styles.buttonContainer}>
        <Button title="Get Outfit Recommendation" onPress={handleRecommendation} />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
  },
  dropdown: {
    width: '100%',
    marginBottom: 20,
  },
  dropdownContainer: {
    width: '100%',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
  },
});
