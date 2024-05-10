//third.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, CheckBox } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
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

const Third = ({ navigation }) => {
  const [age, setAge] = useState(18); // Default age is 18
  const [isChecked, setIsChecked] = useState(false);
  const [checkboxText, setCheckboxText] = useState('I confirm that I am 18 years old or above');
  const [progress, setProgress] = useState(0);
  const auth=getAuth();

  useEffect(() => {
    // Simulating progress increase over time
    const interval = setInterval(() => {
      setProgress(prevProgress => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (age) {
      setCheckboxText(`I confirm that I am ${age} years old or above`);
    }
  }, [age]);

  const handleNext = async () => {
    if (isChecked) {
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
          await updateDoc(userDoc.ref, { age }); // Update the age field and isAgeConfirmed flag

          console.log("Data saved successfully!"); // Verify update
          navigation.navigate('Fourth'); // Proceed only if update succeeded
        } else {
          console.error("User document not found!"); // Handle document not found
        }
      } catch (error) {
        console.error("Error updating document:", error); // Log detailed error
        Alert.alert('Error', 'Failed to update data. Please try again.');
      }
    } else {
      // Show an alert or handle the case where the checkbox is not checked
      alert('Please confirm your age');
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
          <ProgressBar progress={20} />
          {/* Question */}
          <Text style={styles.question}>Enter your age</Text>
          {/* Age Selector */}
          <RNPickerSelect
            onValueChange={(value) => setAge(parseInt(value))}
            items={Array.from({ length: 96 }, (_, i) => ({ label: (i + 5).toString(), value: i + 5 }))}
            value={age}
            style={pickerSelectStyles}
          />
          {/* Checkbox */}
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={isChecked}
              onValueChange={setIsChecked}
              style={styles.checkbox}
            />
            <Text style={styles.checkboxText}>{checkboxText}</Text>
          </View>
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
    marginBottom: 30,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  checkbox: {
    color:'#f6eee3',
    alignSelf: 'center',
  },
  checkboxText: {
    color: 'white',
    marginLeft: 10,
  },
  nextButton: {
    backgroundColor: '#8080ff',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 30, // Increase font size
    paddingVertical: 30, // Increase padding
    paddingHorizontal: 20, // Increase padding
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'white',
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: 'black', // Background color of the picker
    textAlign: 'center', // Center align the text
  },
  inputAndroid: {
    fontSize: 30, // Increase font size
    paddingHorizontal: 30, // Increase padding
    paddingVertical: 15, // Increase padding
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'white',
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: 'black', // Background color of the picker
    textAlign: 'center', // Center align the text
  },
  inputWeb: {
    fontSize: 20, // Increase font size
    paddingVertical: 10, // Increase padding
    paddingHorizontal: 20, // Increase padding
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: 'white', // Background color of the picker
    textAlign: 'center', // Center align the text
  },
});

export default Third;