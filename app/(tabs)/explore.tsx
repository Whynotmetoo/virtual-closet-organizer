import React, { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const activities = [
  { label: "Go for a Walk", value: "walk" },
  { label: "Gym Workout", value: "gym" },
  { label: "Casual Hangout", value: "hangout" },
  { label: "Formal Meeting", value: "meeting" },
];

const feelings = [
  { label: "Happy", value: "happy" },
  { label: "Relaxed", value: "relaxed" },
  { label: "Confident", value: "confident" },
  { label: "Sporty", value: "sporty" },
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
