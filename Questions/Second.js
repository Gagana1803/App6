//second.js
import React, { useState, useEffect } from 'react';
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

const Second = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [progress, setProgress] = useState(0);
  const auth=getAuth();

  useEffect(() => {
    // Simulating progress increase over time
    const interval = setInterval(() => {
      setProgress(prevProgress => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleNext = async () => {
    // Check if an option is selected
    if (selectedOption) {
      const uid = auth.currentUser.uid;
      const querySnapshot = await getDocs(collection(db, "users"));
      try {
        // const uid = auth.currentUser.uid;
        // const querySnapshot = await getDocs(collection(db, "users"));
        let userDoc;

        querySnapshot.forEach((doc) => {
          if (doc.data().uid === uid) {
            userDoc = doc;
          }
        });

        if (userDoc) {
          await updateDoc(userDoc.ref, { gender: selectedOption }); // Update the gender field

          console.log("Data saved successfully!"); // Verify update
          navigation.navigate('Third', { selectedOption }); // Proceed only if update succeeded
        } else {
          alert(error)
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
          <ProgressBar progress={10} />
          {/* Question */}
          <Text style={styles.question}>How do you identify yourself?</Text>
          {/* Options */}
          <TouchableOpacity
            style={[styles.optionButton, selectedOption === 'male' && styles.selectedOption]}
            onPress={() => setSelectedOption('male')}
          >
            <Text style={styles.optionText}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, selectedOption === 'female' && styles.selectedOption]}
            onPress={() => setSelectedOption('female')}
          >
            <Text style={styles.optionText}>Female</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, selectedOption === 'others' && styles.selectedOption]}
            onPress={() => setSelectedOption('others')}
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
    padding: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: '#8080ff',
  },
  optionText: {
    fontSize: 15,
    fontWeight: '450',
    // fontStyle: 'italic',
    fontFamily: 'Quicksand',
    color: 'black',
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
    fontFamily: 'Quicksand',
  },
});

export default Second;
