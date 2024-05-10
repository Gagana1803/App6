//eight.js
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

const Eighth = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [progress, setProgress] = useState(70); // Adjust the progress value as per your requirement
  const auth=getAuth();

  const handleNext = async () => {
    // Check if an option is selected
    if (selectedOption) {
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
          await updateDoc(userDoc.ref, { '5':selectedOption }); // Update the selected option field

          console.log("Data saved successfully!"); // Verify update
          navigation.navigate('Ninth'); // Proceed only if update succeeded
        } else {
          console.error("User document not found!"); // Handle document not found
        }
      } catch (error) {
        console.error("Error updating document:", error); // Log detailed error
        Alert.alert('Error', 'Failed to update data. Please try again.');
      }
    } else {
      // Show an alert or handle the case where no option is selected
      alert('Please select an option');
    }
  };


  return (
    <View style={styles.container}>
      {/* Background Image */}
      <ImageBackground
        source={require('../assets/storyimages/imgs3.jpg')}
        style={styles.backgroundImage}
      >
        {/* Transparent Overlay */}
        <View style={styles.overlay}>
          {/* Progress Bar */}
          <ProgressBar progress={progress} />
          {/* Question */}
          <Text style={styles.question}>Do you feel confused about your sexuality and/or gender identity?</Text>
          {/* Options */}
          <TouchableOpacity
            style={[styles.optionButton, selectedOption === 'Yes(I feel different from my peers)' && styles.selectedOption]}
            onPress={() => setSelectedOption('Yes(I feel different from my peers)')}
          >
            <Text style={styles.optionText}>Yes(I feel different from my peers)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, selectedOption === 'Yes(I am confused due to my surroundings)' && styles.selectedOption]}
            onPress={() => setSelectedOption('Yes(I am confused due to my surroundings)')}
          >
            <Text style={styles.optionText}>Yes(I am confused due to my surroundings)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, selectedOption === 'Yes(but I am too scared to accept it)' && styles.selectedOption]}
            onPress={() => setSelectedOption('Yes(but I am too scared to accept it)')}
          >
            <Text style={styles.optionText}>Yes(but I am too scared to accept it)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, selectedOption === 'No' && styles.selectedOption]}
            onPress={() => setSelectedOption('No')}
          >
            <Text style={styles.optionText}>No</Text>
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

export default Eighth;
