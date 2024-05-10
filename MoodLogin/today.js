//today.js
import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, TouchableOpacity } from 'react-native'; // Import Button component
import moment from 'moment'; // Import moment library for date manipulation
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, getDoc, getDocs } from 'firebase/firestore';
import db from '../firebaseConfig'; // Import your Firebase configuration
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';

const TodayPage = () => {
  const navigation = useNavigation(); 
  const [sliderValue, setSliderValue] = useState(0.542);

  const emotions = [
    "Distressed",
    "Sad",
    "Angry",
    "Neutral",
    "Confused",
    "Good",
    "Great"
  ];

  const getEmotionText = () => {
    if (typeof sliderValue === 'number' && !isNaN(sliderValue)) {
      const parsedValue = parseFloat(sliderValue);
      if (parsedValue <= 0.142) {
        return emotions[0];
      } else if (parsedValue <= 0.285) {
        return emotions[1];
      } else if (parsedValue <= 0.428) {
        return emotions[2];
      } else if (parsedValue <= 0.571) {
        return emotions[3];
      } else if (parsedValue <= 0.714) {
        return emotions[4];
      } else if (parsedValue <= 0.857) {
        return emotions[5];
      } else {
        return emotions[6];
      }
    } else {
      return "Unknown"; // Default text if sliderValue is not a valid number
    }
  }

  useEffect(() => {
    // Function to save today's mood data to Firestore
    const saveTodayMood = async () => {
      // Get current user's UID
      const auth = getAuth();
      const user = auth.currentUser;
      const uid = user.uid;

      // Get current date, day, and time using moment library
      const currentDate = moment().format('YYYY-MM-DD');
      const currentDay = moment().format('dddd');
      const currentTime = moment().format('LT');


      // Reference to moodtracker collection
      const moodtrackerCollection = collection(db, 'moodtracker');

      try {
        // Check if a document exists with the current user's UID
        const userDocRef = doc(moodtrackerCollection, uid);
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) {
          // If user document does not exist, create one
          await setDoc(userDocRef, {});

          // Reference to mood collection within user document
          const moodCollectionRef = collection(userDocRef, 'mood');

          // Create a document with today's date within mood collection
          const todayDocRef = doc(moodCollectionRef, currentDate);
          await setDoc(todayDocRef, {
            date: currentDate,
            day: currentDay,
            time: currentTime,
          });
        } else {
          // If user document already exists, check if mood collection exists
          const moodCollectionRef = collection(userDocRef, 'mood');
          const moodCollectionSnap = await getDocs(moodCollectionRef);

          if (moodCollectionSnap.empty) {
            // If mood collection does not exist, create one
            const todayDocRef = doc(moodCollectionRef, currentDate);
            await setDoc(todayDocRef, {
              date: currentDate,
              day: currentDay,
              time: currentTime,
            });
          } else {
            // If mood collection exists, check if today's date document exists
            let todayDocExists = false;
            moodCollectionSnap.forEach(doc => {
              if (doc.id === currentDate) {
                todayDocExists = true;
              }
            });

            if (!todayDocExists) {
              // If today's date document does not exist, create one
              const todayDocRef = doc(moodCollectionRef, currentDate);
              await setDoc(todayDocRef, {
                date: currentDate,
                day: currentDay,
                time: currentTime,
              });
            }
          }
        }
      } catch (error) {
        console.error('Error saving mood data:', error);
      }
    };

    // Call the function to save today's mood data
    saveTodayMood();
  }, []); // Run this effect only once on component mount

  // Function to handle slider value change
  const handleSliderChange = (value) => {
    const validValue = typeof value === 'number' ? Math.max(0, Math.min(1, value)) : 0;
    setSliderValue(validValue);
  };


  // Function to get image source based on slider value
  const getImageSource = () => {
    let imageSource;

    if (typeof sliderValue === 'number' && !isNaN(sliderValue)) {
      const parsedValue = parseFloat(sliderValue);
      if (parsedValue <= 0.142) {
        imageSource = require('../assets/moodtrackerpage/emojis/distressed.png');
      } else if (parsedValue <= 0.285) {
        imageSource = require('../assets/moodtrackerpage/emojis/sad.png');
      } else if (parsedValue <= 0.428) {
        imageSource = require('../assets/moodtrackerpage/emojis/angry.png');
      } else if (parsedValue <= 0.571) {
        imageSource = require('../assets/moodtrackerpage/emojis/neutral.png');
      } else if (parsedValue <= 0.714) {
        imageSource = require('../assets/moodtrackerpage/emojis/confused1.png');
      } else if (parsedValue <= 0.857) {
        imageSource = require('../assets/moodtrackerpage/emojis/good.png');
      } else {
        imageSource = require('../assets/moodtrackerpage/emojis/great.png');
      }
    } else {
      imageSource = require('../assets/moodtrackerpage/emojis/distressed.png');
    }
    
    return imageSource;
  }

  // Function to handle log button press
    const handleLogButtonPress = async () => {
      // Get current user's UID
      const auth = getAuth();
      const user = auth.currentUser;
      const uid = user.uid;
    
      // Get current date using moment library
      const currentDate = moment().format('YYYY-MM-DD');
      const currentTime = moment().format('LT');
    
      // Reference to moodtracker collection
      const moodtrackerCollection = collection(db, 'moodtracker');
    
      try {
        // Reference to user document within moodtracker collection
        const userDocRef = doc(moodtrackerCollection, uid);
        const userDocSnap = await getDoc(userDocRef);
    
        if (userDocSnap.exists()) {
          // Reference to mood collection within user document
          const moodCollectionRef = collection(userDocRef, 'mood');
    
          // Reference to today's document within mood collection
          const todayDocRef = doc(moodCollectionRef, currentDate);
    
          // Save the selected mood in the 'mood' field of today's document
          await setDoc(todayDocRef, { mood: getEmotionText(), time: currentTime}, { merge: true });
    
          console.log('Mood logged successfully!');
        } else {
          console.error('User document does not exist.');
        }
      } catch (error) {
        console.error('Error logging mood:', error);
      }
      navigation.navigate('Summary');
    };    

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/moodtrackerpage/mt3.jpg')}
        style={styles.backgroundImage}
        resizeMode='cover'
      >
        <View style={styles.overlay}>
          <View style={styles.content}>
            <Text style={styles.questionText}>What's your mood today?</Text>
            <View style={styles.imageContainer}>
              <Image
                source={getImageSource()}
                style={{ height: 100, width: 100 }}
              />
              <Text style={styles.emojiText}>{getEmotionText()}</Text>
            </View>
            <View style={styles.slidercontainer}>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                thumbTintColor="#C8A2C8"
                step={1/6}
                value={sliderValue}
                onValueChange={handleSliderChange}
              />
               {/* TouchableOpacity as log button */}
            <TouchableOpacity
              style={styles.logButton} // Added style
              onPress={handleLogButtonPress}
              activeOpacity={0.8} // Adjust opacity as needed
            >
              <Text style={styles.logButtonText}>Log Mood</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slider: {
    width: 400,
    height: 40,
  },
  slidercontainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  emojiText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'black',
    textAlign: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255, 0.6)',
    marginBottom: 50,
    marginTop: 30,
    borderRadius: 10,
    padding: 20,
    paddingHorizontal: 70,
    marginHorizontal: 'auto',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  questionText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
    top: 50,
  },
  imageContainer: {
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center',
    top: 100,
  },
  logButton: {
    marginTop: 20, // Adjust as needed
    paddingHorizontal: 20, // Adjust as needed
    paddingVertical:10,
    backgroundColor: '#C8A2C8', // Lilac color
    borderRadius: 8, // Adjust as needed
    justifyContent: 'center', // Center text vertically
    alignItems: 'center', // Center text horizontally
  },
  // Style for the log button text
  logButtonText: {
    textTransform: 'uppercase', // Convert text to uppercase
    fontSize: 19, // Adjust as needed
    fontWeight: 'bold', // Adjust as needed
    letterSpacing: 1, // Adjust as needed
    color: 'black', // Text color
  },

  
});

export default TodayPage;
