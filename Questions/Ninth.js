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

const Ninth = ({ navigation }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [progress, setProgress] = useState(90); // Adjust the progress value as per your requirement
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
  
          await updateDoc(userDoc.ref, { '6': optionsArray }); // Update the selected options field
  
          console.log("Data saved successfully!"); // Verify update
          navigation.navigate('Tenth'); // Proceed only if update succeeded
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
        source={require('../assets/storyimages/imgs4.jpg')}
        style={styles.backgroundImage}
      >
        {/* Transparent Overlay */}
        <View style={styles.overlay}>
          {/* Progress Bar */}
          <ProgressBar progress={progress} />
          {/* Question */}
          <Text style={styles.question}>What do you do when you feel emotionally or mentally overwhelmed?</Text>
          {/* Options */}
          <TouchableOpacity
            style={[styles.optionButton, selectedOptions.includes('Self harm') && styles.selectedOption]}
            onPress={() => toggleOption('Self harm')}
          >
            <Text style={styles.optionText}>Self harm</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, selectedOptions.includes('Comfort myself by eating') && styles.selectedOption]}
            onPress={() => toggleOption('Comfort myself by eating')}
          >
            <Text style={styles.optionText}>Comfort myself by eating</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, selectedOptions.includes('Detach myself from others') && styles.selectedOption]}
            onPress={() => toggleOption('Detach myself from others')}
          >
            <Text style={styles.optionText}>Detach myself from others</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, selectedOptions.includes('Use alcohol or drugs to help me relax') && styles.selectedOption]}
            onPress={() => toggleOption('Use alcohol or drugs to help me relax')}
          >
            <Text style={styles.optionText}>Use alcohol or drugs to help me relax</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, selectedOptions.includes('Sometimes I become physically violent') && styles.selectedOption]}
            onPress={() => toggleOption('Sometimes I become physically violent')}
          >
            <Text style={styles.optionText}>Sometimes I become physically violent</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, selectedOptions.includes('Go for a run or take a hot/cold shower') && styles.selectedOption]}
            onPress={() => toggleOption('Go for a run or take a hot/cold shower')}
          >
            <Text style={styles.optionText}>Go for a run or take a hot/cold shower</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, selectedOptions.includes('Others') && styles.selectedOption]}
            onPress={() => toggleOption('Others')}
          >
            <Text style={styles.optionText}>Others</Text>
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

export default Ninth;
