//summary.js
import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, FlatList, ScrollView, TextInput } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, getDoc } from 'firebase/firestore';
import db from '../firebaseConfig'; 
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';


const Summary = () => {
  const navigation = useNavigation();
 
  const [showAllPositiveEmotions, setShowAllPositiveEmotions] = useState(false);
  const [showAllNegativeEmotions, setShowAllNegativeEmotions] = useState(false);
  const [summaryText, setSummaryText] = useState('');
  const [clickedEmotions, setClickedEmotions] = useState([]); // State to track clicked emotions
  const [showPopup, setShowPopup] = useState(false);

  // List of positive emotions
  const positiveEmotions = [
    "Joy", "Happiness", "Love", "Excitement", "Gratitude",
    "Contentment", "Hope", "Optimism", "Serenity", "Satisfaction",
    "Peacefulness", "Amusement", "Enthusiasm", "Elation", "Bliss",
    "Pride", "Wonder", "Inspiration", "Empathy", "Compassion"
  ];

  // List of negative emotions
  const negativeEmotions = [
    "Sadness", "Anger", "Fear", "Anxiety", "Disappointment",
    "Frustration", "Guilt", "Shame", "Regret", "Loneliness",
    "Jealousy", "Resentment", "Envy", "Embarrassment", "Insecurity",
    "Helplessness", "Hopelessness", "Boredom", "Irritation", "Disgust"
  ];

  // Number of emotions per row
  const emotionsPerRow = 4;

  // Function to handle 'Show More' button press for positive emotions
  const handleShowMorePositive = () => {
    setShowAllPositiveEmotions(true);
  };

  // Function to handle 'Show Less' button press for positive emotions
  const handleShowLessPositive = () => {
    setShowAllPositiveEmotions(false);
  };

  // Function to handle 'Show More' button press for negative emotions
  const handleShowMoreNegative = () => {
    setShowAllNegativeEmotions(true);
  };

  // Function to handle 'Show Less' button press for negative emotions
  const handleShowLessNegative = () => {
    setShowAllNegativeEmotions(false);
  };

  // Function to handle saving the summary
  const handleSave = async () => {
    try {
      // Get current user's UID
      const auth = getAuth();
      const user = auth.currentUser;
      const uid = user.uid;
  
      // Get current date using JavaScript's Date object
      const currentDate = moment().format('YYYY-MM-DD');
  
      // Reference to moodtracker collection
      const moodtrackerCollection = collection(db, 'moodtracker');
  
      // Reference to user document within moodtracker collection
      const userDocRef = doc(moodtrackerCollection, uid);
      const userDocSnap = await getDoc(userDocRef);
  
      if (userDocSnap.exists()) {
        // Reference to mood collection within user document
        console.log('Doc exists')
        const moodCollectionRef = collection(userDocRef, 'mood');
  
        // Reference to today's document within mood collection
        const todayDocRef = doc(moodCollectionRef, currentDate);
  
        // Save the selected positive emotions, selected negative emotions, and summary
        await setDoc(todayDocRef, {
          positive: clickedEmotions.filter(emotion => positiveEmotions.includes(emotion)),
          negative: clickedEmotions.filter(emotion => negativeEmotions.includes(emotion)),
          summary: summaryText
        }, { merge: true });
  
        console.log('Summary saved successfully!');
        setShowPopup(true);
          // Reset form fields
        setSummaryText('');
        setClickedEmotions([]);

      } else {
        console.error('User document does not exist.');
      }
    } catch (error) {
      console.error('Error saving summary:', error);
    }
  };

  

  // Function to handle emotion click
  const handleEmotionClick = (emotion) => {
    // Check if the emotion is already clicked
    if (clickedEmotions.includes(emotion)) {
      // Remove the emotion from clickedEmotions
      setClickedEmotions(clickedEmotions.filter(item => item !== emotion));
    } else {
      // Add the emotion to clickedEmotions
      setClickedEmotions([...clickedEmotions, emotion]);
    }
  };
  const handleOKPress = () => {
    setShowPopup(false);
    navigation.navigate('moodpage'); // Replace 'MoodPage' with the name of your moodpage screen
  };

  return (
    <ImageBackground
      source={require('../assets/moodtrackerpage/beautiful.jpg')}
      style={styles.backgroundImage}
      resizeMode='cover'
    >
      <View style={styles.overlay}>
        <Text style={styles.questionText}>What other emotions do you feel?</Text>
        <ScrollView style={styles.scrollView}>
          <View style={styles.contentContainer}>
            {/* Positive Emotions Container */}
            <View style={styles.container}>
              <Text style={styles.title}>Positive</Text>
              <View style={styles.emotionsContainer}>
                <FlatList
                  data={showAllPositiveEmotions ? positiveEmotions : positiveEmotions.slice(0, 10)}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={[
                        styles.emotionItem,
                        clickedEmotions.includes(item) && styles.clickedEmotion // Apply clickedEmotion style if the emotion is clicked
                      ]}
                      onPress={() => handleEmotionClick(item)} // Call handleEmotionClick function with the emotion item
                    >
                      <Text style={styles.emotionText}>{item}</Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                  numColumns={emotionsPerRow}
                />
              </View>
              {/* Show 'Show More' button if not displaying all emotions */}
              {!showAllPositiveEmotions ? (
                <TouchableOpacity style={styles.showMoreButton} onPress={handleShowMorePositive}>
                  <Text style={styles.showMoreText}>Show More</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.showMoreButton} onPress={handleShowLessPositive}>
                  <Text style={styles.showMoreText}>Show Less</Text>
                </TouchableOpacity>
              )}
            </View>
            {/* Negative Emotions Container */}
            <View style={styles.container}>
              <Text style={styles.title}>Negative</Text>
              <View style={styles.emotionsContainer}>
                <FlatList
                  data={showAllNegativeEmotions ? negativeEmotions : negativeEmotions.slice(0, 10)}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={[
                        styles.emotionItem,
                        clickedEmotions.includes(item) && styles.clickedEmotion // Apply clickedEmotion style if the emotion is clicked
                      ]}
                      onPress={() => handleEmotionClick(item)} // Call handleEmotionClick function with the emotion item
                    >
                      <Text style={styles.emotionText}>{item}</Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                  numColumns={emotionsPerRow}
                />
              </View>
              {/* Show 'Show More' button if not displaying all emotions */}
              {!showAllNegativeEmotions ? (
                <TouchableOpacity style={styles.showMoreButton} onPress={handleShowMoreNegative}>
                  <Text style={styles.showMoreText}>Show More</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.showMoreButton} onPress={handleShowLessNegative}>
                  <Text style={styles.showMoreText}>Show Less</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </ScrollView>
        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
        {/* Summary Input Box */}
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Summary</Text>
          <TextInput
            style={styles.summaryInput}
            multiline
            placeholder="Write your summary here..."
            value={summaryText}
            onChangeText={text => setSummaryText(text)}
          />
        </View>
                {/* Popup Message */}
                {showPopup && (
          <View style={styles.popupContainer}>
            <Text style={styles.popupText}>Your Mood details has been saved</Text>
            <TouchableOpacity style={styles.okButton} onPress={handleOKPress}>
              <Text style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'lightblue',
    borderRadius: 8,
    marginHorizontal:20,
    marginBottom: 10,
    width: 500,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    marginVertical: 10,
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
    marginHorizontal: 'auto',
    paddingHorizontal: 30,
  },
  questionText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 20,
    marginBottom: 10,
  },
  emotionsColumn: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  emotionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  saveButton: {
    backgroundColor: '#4CAF50', // Green color
    padding: 15,
    borderRadius: 8,
    marginTop: 0,
    marginBottom:20,
    alignItems: 'center',
    marginHorizontal:'auto',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  emotionItem: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
    marginRight: 5,
    marginBottom: 10,
    width: 'auto', // Adjust as needed
    alignItems: 'center',
    marginHorizontal:5,
    // flexBasis: '24%', // Adjust for 4 emotions per row
  },
  emotionText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  clickedEmotion: {
    backgroundColor: '#C8A2D1', // Change background color to blue for clicked emotions
  },
  showMoreButton: {
    backgroundColor: '#C8A2C8', // Lilac color
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
    marginHorizontal:'auto',
  },
  showMoreText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 10,
    marginBottom:20,
  },
  summaryContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'white',
    marginHorizontal: 10,
    borderRadius: 8,
    marginBottom:20,
    paddingBottom:20,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 10,
  },
  summaryInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    minHeight: 100,
    width: '100%',
    paddingBottom: 20,
    fontSize: 15,
  },
  popupContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: '-50%' }, { translateY: '-70%' }],
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    elevation: 5,
    zIndex: 1000,
  },
  popupText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  okButton: {
    backgroundColor: '#4CAF50', // Green color
    padding: 10,
    borderRadius: 8,
    alignSelf: 'center',
  },
  okButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Summary;
