//seventh.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { getAuth } from 'firebase/auth';
import db from '../firebaseConfig';
import { collection, getDocs, updateDoc } from 'firebase/firestore';

const ProgressBar = ({ progress }) => {
  return (
    <View style={styles.progressBar}>
      <View style={{ width: `${progress}%`, backgroundColor: '#8080ff', height: '100%', borderRadius: 5 }} />
    </View>
  );
};

const Seventh = ({ navigation }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [progress, setProgress] = useState(60); // Adjust the progress value as per your requirement
  const auth=getAuth();

  const toggleOption = (option) => {
    // Check if the option is already selected
    if (selectedOptions.includes(option)) {
      // If selected, remove it from the array
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      // If not selected, add it to the array
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleNext = async () => {
    if (selectedOptions.length > 0) {
      try {
        const uid = auth.currentUser.uid;
        const querySnapshot = await getDocs(collection(db, "users"));
        let userDoc;
  
        querySnapshot.forEach((doc) => {
          if (doc.data().uid === uid) {
            userDoc = doc;
          }
        });
  
        if (userDoc) {
          const optionsArray = [...selectedOptions]; // Copy the selectedOptions array
  
          await updateDoc(userDoc.ref, { '4': optionsArray }); // Update the selected options field
  
          console.log("Data saved successfully!"); // Verify update
          navigation.navigate('Eighth'); // Proceed only if update succeeded
        } else {
          console.error("User document not found!"); // Handle document not found
        }
      } catch (error) {
        console.error("Error updating document:", error); // Log detailed error
        Alert.alert('Error', 'Failed to update data. Please try again.');
      }
    } else {
      alert('Please select at least one option');
    }
  };
  
  return (
    <View style={styles.container}>
      {/* Background Image */}
      <ImageBackground
        source={require('../assets/storyimages/imgs2.jpg')}
        style={styles.backgroundImage}
      >
        {/* Transparent Overlay */}
        <View style={styles.overlay}>
          {/* Progress Bar */}
          <ProgressBar progress={progress} />
          {/* Question */}
          <Text style={styles.question}>What do you view as your biggest problem?</Text>
          {/* Options */}
          <TouchableOpacity
            style={[styles.optionButton, selectedOptions.includes('Lack of motivation') && styles.selectedOption]}
            onPress={() => toggleOption('Lack of motivation')}
          >
            <Text style={styles.optionText}>Lack of motivation</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, selectedOptions.includes('Suicidal thoughts') && styles.selectedOption]}
            onPress={() => toggleOption('Suicidal thoughts')}
          >
            <Text style={styles.optionText}>Suicidal thoughts</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, selectedOptions.includes('Overthinking') && styles.selectedOption]}
            onPress={() => toggleOption('Overthinking')}
          >
            <Text style={styles.optionText}>Overthinking</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, selectedOptions.includes('Pressure from surroundings') && styles.selectedOption]}
            onPress={() => toggleOption('Pressure from surroundings')}
          >
            <Text style={styles.optionText}>Pressure from surroundings</Text>
          </TouchableOpacity>
          {/* Next Button */}
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 40,
    borderRadius: 10,
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 20,
  },
  question: {
    color: 'white',
    fontSize: 20,
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#f6eee3',
    padding: 5,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: '#8080ff',
  },
  optionText: {
    fontSize: 20,
    color: 'black',
    fontWeight: '400',
    // fontStyle: 'italic',
    fontFamily: 'Quicksand',
  },
  nextButton: {
    marginTop: 20,
    backgroundColor: '#8080ff',
    padding: 10,
    borderRadius: 5,
    width: '80%',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Seventh;
