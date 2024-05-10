//first.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import db from '../firebaseConfig'; // Import your Firestore configuration
import { getAuth } from 'firebase/auth';
import { collection, addDoc, getDocs,getDoc, updateDoc } from 'firebase/firestore'; 


const ProgressBar = ({ progress }) => {
  return (
    <View style={styles.progressBar}>
      <View style={{ width: `${progress}%`, backgroundColor: '#8080ff', height: '100%', borderRadius: 5 }} />
    </View>
  );
};

const First = ({ navigation }) => {
  const [name, setName] = useState('');
  const [progress, setProgress] = useState(0);
  const auth = getAuth();  

  const [currentUserUID, setCurrentUserUID] = useState('');

  // useEffect(() => {
  //   const fetchCurrentUserUID = () => {
  //     if (auth.currentUser) {
  //       setCurrentUserUID(auth.currentUser.uid);
  //       alert(auth.currentUser.uid);
  //     }
  //   };

  //   fetchCurrentUserUID();
  // }, []);


  // useEffect(() => {
  //   // Simulating progress increase over time
  //   const interval = setInterval(() => {
  //     setProgress(prevProgress => (prevProgress >= 100 ? 0 : prevProgress + 10));
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  

    const handleNext = async () => {
      if (name.trim().length >= 8) {
        
        const uid = auth.currentUser.uid;
        const querySnapshot = await getDocs(collection(db, "users"));
    
        try {
          // Find the document where the UID matches the current user's UID
          let userDoc;
          querySnapshot.forEach((doc) => {
            if (doc.data().uid === uid) {
              userDoc = doc;
            }
          });
    
          if (userDoc) {
            await updateDoc(userDoc.ref, { name }); // Update the name field
    
            console.log("Data saved successfully!"); // Verify update
            navigation.navigate('Second', { name }); // Proceed only if update succeeded
          } else {
            console.error("User document not found!"); // Handle document not found
          }
        } catch (error) {
          alert(error)
          console.error("Error updating document:", error); // Log detailed error
        }
      } else {
        alert('Please enter a name with at least 8 characters');
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
          <ProgressBar progress={0} />
          {/* Question */}
          <Text style={styles.question}>What do you like to be called?</Text>
          {/* Text Input */}
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
          />
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
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#f6eee3',
    fontFamily: 'Quicksand',
    fontSize: 15,
    fontWeight: '200',
    width: '100%',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  nextButton: {
    backgroundColor: '#8080ff',
    padding: 10,
    borderRadius: 5,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default First;
