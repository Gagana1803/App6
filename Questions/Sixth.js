//sixth.js
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

const Sixth = ({ navigation }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [progress, setProgress] = useState(50); // Adjust the progress value as per your requirement
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
          const optionsArray = selectedOptions.slice(); // Copy the selectedOptions array
  
          await updateDoc(userDoc.ref, { '3': optionsArray }); // Update the selected options field
  
          console.log("Data saved successfully!"); // Verify update
          navigation.navigate('Seventh'); // Proceed only if update succeeded
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
        source={require('../assets/storyimages/imgs1.jpg')}
        style={styles.backgroundImage}
      >
        {/* Transparent Overlay */}
        <View style={styles.overlay}>
          {/* Progress Bar */}
          <ProgressBar progress={progress} />
          {/* Question */}
          <Text style={styles.question}>Did you frequently experience any of the following in the last few weeks?</Text>
          {/* Options */}
          <TouchableOpacity
            style={[styles.optionButton, selectedOptions.includes('Panic, anxiety attacks') && styles.selectedOption]}
            onPress={() => toggleOption('Panic, anxiety attacks')}
          >
            <Text style={styles.optionText}>Panic, anxiety attacks</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, selectedOptions.includes('Feeling nervous, anxious or on edge') && styles.selectedOption]}
            onPress={() => toggleOption('Feeling nervous, anxious or on edge')}
          >
            <Text style={styles.optionText}>Feeling nervous, anxious or on edge</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, selectedOptions.includes('Excessive worrying') && styles.selectedOption]}
            onPress={() => toggleOption('Excessive worrying')}
          >
            <Text style={styles.optionText}>Excessive worrying</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, selectedOptions.includes('Trouble falling asleep') && styles.selectedOption]}
            onPress={() => toggleOption('Trouble falling asleep')}
          >
            <Text style={styles.optionText}>Trouble falling asleep</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, selectedOptions.includes('Getting irritated easily') && styles.selectedOption]}
            onPress={() => toggleOption('Getting irritated easily')}
          >
            <Text style={styles.optionText}>Getting irritated easily</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, selectedOptions.includes('Feeling afraid something terrible may happen') && styles.selectedOption]}
            onPress={() => toggleOption('Feeling afraid something terrible may happen')}
          >
            <Text style={styles.optionText}>Feeling afraid something terrible may happen</Text>
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

export default Sixth;
