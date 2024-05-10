//fifth.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { collection, getDocs, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import db from '../firebaseConfig';

const ProgressBar = ({ progress }) => {
  return (
    <View style={styles.progressBar}>
      <View style={{ width: `${progress}%`, backgroundColor: '#8080ff', height: '100%', borderRadius: 5 }} />
    </View>
  );
};

const Fifth = ({ navigation }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [progress, setProgress] = useState(40); // Adjust the progress value as per your requirement
  const auth = getAuth();

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
          await updateDoc(userDoc.ref, { '2': selectedOptions }); // Update the selected options field
          console.log("Data saved successfully!"); // Verify update
          navigation.navigate('Sixth'); // Proceed only if update succeeded
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
        source={require('../assets/storyimages/imgs5.jpg')}
        style={styles.backgroundImage}
      >
        {/* Transparent Overlay */}
        <View style={styles.overlay}>
          {/* Progress Bar */}
          <ProgressBar progress={progress} />
          {/* Question */}
          <Text style={styles.question}>How do you feel most of the time?</Text>
          {/* Options */}
          <TouchableOpacity
            style={[styles.optionButton, selectedOptions.includes('Happy') && styles.selectedOption]}
            onPress={() => toggleOption('Happy')}
          >
            <Text style={styles.optionText}>Happy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, selectedOptions.includes('sad') && styles.selectedOption]}
            onPress={() => toggleOption('sad')}
          >
            <Text style={styles.optionText}>Sad</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, selectedOptions.includes('depressed') && styles.selectedOption]}
            onPress={() => toggleOption('depressed')}
          >
            <Text style={styles.optionText}>Depressed</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, selectedOptions.includes('angry') && styles.selectedOption]}
            onPress={() => toggleOption('angry')}
          >
            <Text style={styles.optionText}>Angry</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, selectedOptions.includes('anxious') && styles.selectedOption]}
            onPress={() => toggleOption('anxious')}
          >
            <Text style={styles.optionText}>Anxious</Text>
           </TouchableOpacity> 
            <TouchableOpacity
            style={[styles.optionButton, selectedOptions.includes('motivated') && styles.selectedOption]}
            onPress={() => toggleOption('motivated')}
          >
            <Text style={styles.optionText}>Motivated</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, selectedOptions.includes('lonely') && styles.selectedOption]}
            onPress={() => toggleOption('lonely')}
          >
            <Text style={styles.optionText}>Lonely</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, selectedOptions.includes('indifferent') && styles.selectedOption]}
            onPress={() => toggleOption('indifferent')}
          >
            <Text style={styles.optionText}>Indifferent</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, selectedOptions.includes('others') && styles.selectedOption]}
            onPress={() => toggleOption('others')}
          >
            <Text style={styles.optionText}>Others</Text>
          </TouchableOpacity>
          {/* Other options... */}
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
    borderRadius: 7,
    width: '80%',
    alignItems: 'center',
    marginBottom: 10,
    
  },
  selectedOption: {
    backgroundColor: '#8080ff',
  },
  optionText: {
    fontSize: 15,
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

export default Fifth;
