//tenth,js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { getAuth } from 'firebase/auth';
import db from '../firebaseConfig';
import { collection, getDocs, updateDoc,setDoc,addDoc,where,query} from 'firebase/firestore';
import { useEffect } from 'react';

const ProgressBar = ({ progress }) => {
  return (
    <View style={styles.progressBar}>
      <View style={{ width: `${progress}%`, backgroundColor: '#8080ff', height: '100%', borderRadius: 5 }} />
    </View>
  );
};

const Tenth = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [progress, setProgress] = useState(100); // Adjust the progress value as per your requirement
  const auth=getAuth();
  const [userInputData, setUserInputData]= useState([]);

  useEffect(() => {
    const fetchUserInput= async()=> {
    const auth=getAuth();
    const user=auth.currentUser;
    const uid=user.uid;
    const data=[];

    const userDocRef = collection(db, 'users');
    const q = query(userDocRef, where('uid', '==', uid));
    const querySnapshot = await getDocs(q);
    const userDocSnap = querySnapshot.docs[0];
    const docPath = userDocSnap.ref.path;

    if (userDocSnap.exists()) {
      console.log(docPath)
      console.log("doc path exists")
      const userData= userDocSnap.data();
      if (userData['1'] && userData['1'].includes('Stress/Anxiety')){
        data.push("Anxiety");
      }
      if (userData['1'] && userData['1'].includes('ADHD')){
        data.push("ADHD");
      }
      if (userData['1'] && userData['1'].includes('Procrastination')){
        data.push("Procrastination");
      }
      if (userData['1'] && userData['1'].includes('Burnout')){
        console.log("working")
        data.push("Burnout");
      }
      if (userData['2'] && userData['2'].includes('Depressed')){
        data.push("depressed");
      }
      if (userData['2'] && userData['2'].includes('Anger')){
        data.push("anger");
      }
      if (userData['2'] && userData['2'].includes('Lonely')){
        data.push("lonely");
      }
      if (userData['3'] && userData['3'].includes('Excessive Worrying')){
        data.push("worrying");
      }
      if (userData['6'] && userData['6'].includes('Use alcohol or drugs to help me relax')){
        data.push("addiction");
      }
      if (userData['6'] && (userData['6'].includes('Self Harm') || userData['6'].includes('Comfort myself by eating') || userData['6'].includes('Detach myself from others') || userData['6'].includes('Sometimes i become physically violent') || userData['6'].includes('Go for a run or take a hot/cold shower') || userData['6'].includes('Others'))){
        data.push("ptsd");
      }
      if (userData['4'] && (userData['4'].includes('Lack of Motivation') || userData['4'].includes('Suicidal thoughts') || userData['4'].includes('Overthinking') || userData['4'].includes('Pressure from surroundings'))){
        data.push("ADHD2");
      }

    }else{
      console.log("path doesnt exist")
    }    
    setUserInputData(data);
  };
  fetchUserInput();
  },[])



useEffect(() => {
    const addStories = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      const uid = user.uid;
      console.log(userInputData)  
      const userDocRef = collection(db, 'users');

      const q = query(userDocRef, where('uid', '==', uid));
      const querySnapshot = await getDocs(q);

      const userDocSnap = querySnapshot.docs[0];
      const docPath = userDocSnap.ref.path;
      const userData = userDocSnap.data();
      const forYouStoriesRef = collection(db,docPath,'ForYouStories');
      const forYouStoriesSnapshot = await getDocs(forYouStoriesRef);

    
      try {
        if (forYouStoriesSnapshot.empty) {
            console.log(userData);
            const forYouStoriesData = {};
            for (const userInput of userInputData) {
              let docRef;
              switch (userInput) {
                case 'Anxiety':
                  docRef = collection(db, 'Anxiety');
                  break;
                case 'ADHD':
                  docRef = collection(db, 'ADHD');
                  break;
                case 'Procrastination':
                  docRef = collection(db, 'Procrastination');
                  break;
                case 'Burnout':
                  docRef = collection(db, 'Burnout');
                  break;
                case 'lonely':
                  docRef = collection(db, 'lonely');
                  break;
                  case 'angry':
                    docRef = collection(db, 'angry');
                    break;  
                  case 'worrying':
                    docRef = collection(db, 'worrying');
                    break;  
                  case 'depressed':
                  docRef = collection(db, 'depression');
                  break;
                  case 'addiction':
                  docRef = collection(db, 'Addiction');
                  break;  
                  case 'ptsd':
                  docRef = collection(db, 'ptsd');
                  break;
                  case 'ADHD2':
                  docRef = collection(db, 'bipolar disorder');
                  break;
                default:
                  break;
              }
  
              const docsSnap = await getDocs(docRef);
              let index = 0;
              docsSnap.forEach(doc => {
                if (index < 2) {
                  forYouStoriesData[doc.id] = doc.data();
                  index++;
                }
              });
            }
            const forYouStoriesCollectionRef = collection(db, docPath, 'ForYouStories');

            try {
              for (const docId in forYouStoriesData) {
                await addDoc(forYouStoriesCollectionRef, forYouStoriesData[docId]);
              }
            } catch (error) {
              console.error('Error adding stories:', error);
            }

          } else {
            console.log("ForYouStories already exists in the user document.");
          }
      } catch (error) {
        console.log("docPath:",docPath)
        console.error('Error adding stories:', error);
      }
    };
    addStories();
  }, [userInputData]);


  const handleNext = async () => {
    // Check if an option is selected
    if (selectedOption) {
      try {
        const uid = auth.currentUser.uid; // Get current user's UID
        const usersCollection = collection(db, 'users'); // Reference to users collection
        const querySnapshot = await getDocs(usersCollection); // Get all documents from users collection

        let userDoc;
        querySnapshot.forEach((doc) => {
          if (doc.data().uid === uid) {
            userDoc = doc;
          }
        });

        if (userDoc) {
          await updateDoc(userDoc.ref, { '7': selectedOption }); // Update selectedOption field in user document
          console.log('Selected option updated successfully!');
          navigation.navigate('StoryPage'); // Navigate to the next screen
        } else {
          console.error('User document not found!');
          Alert.alert('Error', 'User document not found. Please try again.');
        }
      } catch (error) {
        console.error('Error updating selected option:', error);
        Alert.alert('Error', 'Failed to update selected option. Please try again.');
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
        source={require('../assets/storyimages/imgs5.jpg')}
        style={styles.backgroundImage}
      >
        {/* Transparent Overlay */}
        <View style={styles.overlay}>
          {/* Progress Bar */}
          <ProgressBar progress={progress} />
          {/* Question */}
          <Text style={styles.question}>Do you ever feel like you do not deserve to be happy or have satisfaction in your life?</Text>
          {/* Options */}
          <TouchableOpacity
            style={[styles.optionButton, selectedOption === 'I feel worthless' && styles.selectedOption]}
            onPress={() => setSelectedOption('I feel worthless')}
          >
            <Text style={styles.optionText}>I feel worthless</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, selectedOption === 'I don’t deserve joy, good health or wealth' && styles.selectedOption]}
            onPress={() => setSelectedOption('I don’t deserve joy, good health or wealth')}
          >
            <Text style={styles.optionText}>I don’t deserve joy, good health or wealth</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, selectedOption === 'No victory makes me feel pleased' && styles.selectedOption]}
            onPress={() => setSelectedOption('No victory makes me feel pleased')}
          >
            <Text style={styles.optionText}>No victory makes me feel pleased</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, selectedOption === 'I deserve to be happy and have good health and wealth' && styles.selectedOption]}
            onPress={() => setSelectedOption('I deserve to be happy and have good health and wealth')}
          >
            <Text style={styles.optionText}>I deserve to be happy and have good health and wealth</Text>
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

export default Tenth;
