//MoodTracker.js
import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Image, ActivityIndicator,ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import EmotionDisplay from './EmotionDisplay';
import { getFirestore, collection, getDocs, doc, getDoc, where,query } from 'firebase/firestore';
import db from './firebaseConfig';
import { getAuth } from 'firebase/auth';
import { useState,useEffect } from 'react';
import moment from 'moment';
import { useFocusEffect } from '@react-navigation/native';
import { Linking } from 'react-native';

const MoodTracker = () => {
  const navigation = useNavigation(); 
  const [username, setUsername] = useState(false);
  const [emotions, setEmotions] = useState([]);
  const [quote, setQuote] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      // Code to fetch mood data and username
      fetchMoodData();
      getUserName();
    }, [])
  );

  const fetchMoodData = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    console.log(user.uid)
  
    if (user) {
      const uid = user.uid;
      console.log(uid)
      const moodtrackerCollection = collection(db, 'moodtracker');
      const userDocRef = doc(moodtrackerCollection, uid);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        const moodCollectionRef = collection(userDocRef, 'mood');
        const today = moment().format('YYYY-MM-DD');
        const pastDays = [
          moment().format('YYYY-MM-DD'),
          moment().subtract(1, 'days').format('YYYY-MM-DD'),
          moment().subtract(6, 'days').format('YYYY-MM-DD'),
          moment().subtract(5, 'days').format('YYYY-MM-DD'),
          moment().subtract(4, 'days').format('YYYY-MM-DD'),
          moment().subtract(3, 'days').format('YYYY-MM-DD'),
          moment().subtract(2, 'days').format('YYYY-MM-DD'),
          
        ];

        const todayDocRef = doc(moodCollectionRef, today);
        const todayDocSnap = await getDoc(todayDocRef);
        const data = [];

        const dayAbbreviations = {
            "Monday": "Mon",
            "Tuesday": "Tue",
            "Wednesday": "Wed",
            "Thursday": "Thu",
            "Friday": "Fri",
            "Saturday": "Sat",
            "Sunday": "Sun"
          };
          const quotesCollectionRef = collection(db, 'quote');
          const quotesSnapshot = await getDocs(quotesCollectionRef);
          const quotes = [];

          quotesSnapshot.forEach((doc) => {
            const quoteData = doc.data();
            quotes.push(quoteData.quote);
          });

          const randomIndex = Math.floor(Math.random() * quotes.length);
          const randomQuote = quotes[randomIndex];

          setQuote(randomQuote);
          
          
    
        if (todayDocSnap.exists()) {
          const moodData = todayDocSnap.data();
          const emotion = moodData.mood;
          const image = getImageForMood(emotion);
          const day = dayAbbreviations[moment(pastDays[0], 'YYYY-MM-DD').format('dddd')];
    
          data.push({
            day:day,
            emotion: emotion,
            image: image,
          });
        } else {
          const emotion = 'None';
          const image = getImageForMood(emotion);
          const day = dayAbbreviations[moment(pastDays[0], 'YYYY-MM-DD').format('dddd')];
    
          data.push({
            day: day, // Today's day abbreviation
            emotion: emotion,
            image: image,
          });
        }

        const back1DocRef = doc(moodCollectionRef, pastDays[1]);
        const back1DocSnap = await getDoc(back1DocRef);
    
        if (back1DocSnap.exists()) {
          const moodData = back1DocSnap.data();
          const emotion = moodData.mood;
          const image = getImageForMood(emotion);
          const day = dayAbbreviations[moment(pastDays[1], 'YYYY-MM-DD').format('dddd')];
    
          data.push({
            day: day,
            emotion: emotion,
            image: image,
          });
        } else {
          const emotion = 'None';
          const image = getImageForMood(emotion);
          // Get the day abbreviation for pastDays[1]
          const day = dayAbbreviations[moment(pastDays[1], 'YYYY-MM-DD').format('dddd')];
        
          data.push({
            day: day,
            emotion: emotion,
            image: image,
          });
        }

        const back2DocRef = doc(moodCollectionRef, pastDays[6]);
        const back2DocSnap = await getDoc(back2DocRef);
    
        if (back2DocSnap.exists()) {
          const moodData = back2DocSnap.data();
          const emotion = moodData.mood;
          const image = getImageForMood(emotion);
          const day = dayAbbreviations[moment(pastDays[6], 'YYYY-MM-DD').format('dddd')];
    
          data.push({
            day: day,
            emotion: emotion,
            image: image,
          });
        } else {
          const emotion = 'None';
          const image = getImageForMood(emotion);
          // Get the day abbreviation for pastDays[1]
          const day = dayAbbreviations[moment(pastDays[6], 'YYYY-MM-DD').format('dddd')];
        
          data.push({
            day: day,
            emotion: emotion,
            image: image,
          });
        }

        const back3DocRef = doc(moodCollectionRef, pastDays[5]);
        const back3DocSnap = await getDoc(back3DocRef);
    
        if (back3DocSnap.exists()) {
          const moodData = back3DocSnap.data();
          const emotion = moodData.mood;
          const image = getImageForMood(emotion);
          const day = dayAbbreviations[moment(pastDays[5], 'YYYY-MM-DD').format('dddd')];
    
          data.push({
            day:day,
            emotion: emotion,
            image: image,
          });
        } else {
          const emotion = 'None';
          const image = getImageForMood(emotion);
        
          // Get the day abbreviation for pastDays[1]
          const day = dayAbbreviations[moment(pastDays[5], 'YYYY-MM-DD').format('dddd')];
        
          data.push({
            day: day,
            emotion: emotion,
            image: image,
          });
        }
        const back4DocRef = doc(moodCollectionRef, pastDays[4]);
        const back4DocSnap = await getDoc(back4DocRef);
    
        if (back4DocSnap.exists()) {
          const moodData = back4DocSnap.data();
          const emotion = moodData.mood;
          const image = getImageForMood(emotion);
          const day = dayAbbreviations[moment(pastDays[4], 'YYYY-MM-DD').format('dddd')];
        
    
          data.push({
            day: day,
            emotion: emotion,
            image: image,
          });
        } else {
          const emotion = 'None';
          const image = getImageForMood(emotion);
        
          // Get the day abbreviation for pastDays[1]
          const day = dayAbbreviations[moment(pastDays[4], 'YYYY-MM-DD').format('dddd')];
        
          data.push({
            day: day,
            emotion: emotion,
            image: image,
          });
        }
        const back5DocRef = doc(moodCollectionRef, pastDays[3]);
        const back5DocSnap = await getDoc(back5DocRef);
    
        if (back5DocSnap.exists()) {
          const moodData = back5DocSnap.data();
          const emotion = moodData.mood;
          const image = getImageForMood(emotion);
          const day = dayAbbreviations[moment(pastDays[3], 'YYYY-MM-DD').format('dddd')];
    
          data.push({
            day:day,
            emotion: emotion,
            image: image,
          });
        } else {
          const emotion = 'None';
          const image = getImageForMood(emotion);
        
          // Get the day abbreviation for pastDays[1]
          const day = dayAbbreviations[moment(pastDays[3], 'YYYY-MM-DD').format('dddd')];
        
          data.push({
            day: day,
            emotion: emotion,
            image: image,
          });
        }
        const back6DocRef = doc(moodCollectionRef, pastDays[2]);
        const back6DocSnap = await getDoc(back6DocRef);
    
        if (back6DocSnap.exists()) {
          const moodData = back6DocSnap.data();
          const emotion = moodData.mood;
          const image = getImageForMood(emotion);
          const day = dayAbbreviations[moment(pastDays[2], 'YYYY-MM-DD').format('dddd')];
    
          data.push({
            day:day,
            emotion: emotion,
            image: image,
          });
        } else {
          const emotion = 'None';
          const image = getImageForMood(emotion);
          // Get the day abbreviation for pastDays[1]
          const day = dayAbbreviations[moment(pastDays[2], 'YYYY-MM-DD').format('dddd')];
        
          data.push({
            day: day,
            emotion: emotion,
            image: image,
          });
        }
        setEmotions(data.reverse());
        console.log(data)
    } else {
      const data = [];
      const dayAbbreviations = {
        "Monday": "Mon",
        "Tuesday": "Tue",
        "Wednesday": "Wed",
        "Thursday": "Thu",
        "Friday": "Fri",
        "Saturday": "Sat",
        "Sunday": "Sun"
      };
  
      const today = moment().format('YYYY-MM-DD');
      const pastDays = [
        moment().subtract(6, 'days').format('YYYY-MM-DD'),
        moment().subtract(5, 'days').format('YYYY-MM-DD'),
        moment().subtract(4, 'days').format('YYYY-MM-DD'),
        moment().subtract(3, 'days').format('YYYY-MM-DD'),
        moment().subtract(2, 'days').format('YYYY-MM-DD'),
        moment().subtract(1, 'days').format('YYYY-MM-DD'),
        today
      ];
  
      pastDays.forEach((day) => {
        const emotion = 'None'; // Set emotion to None for all days
        const image = getImageForMood(emotion);
        const dayAbbreviation = dayAbbreviations[moment(day, 'YYYY-MM-DD').format('dddd')];
        data.push({
          day: dayAbbreviation,
          emotion: emotion,
          image: image,
        });
      });
  
      setEmotions(data);
    }
    }
  };
  useEffect(() => {
    fetchMoodData(); 
  }, []);

  useEffect(() => {
    getUserName(); // Fetch username on component mount
  }, []);

  // Function to get image for the mood
  const getImageForMood = (emotion) => {
    switch (emotion) {
      case 'Sad':
        return require('./assets/moodtrackerpage/emojis/sad.png');
      case 'Distress':
        return require('./assets/moodtrackerpage/emojis/distressed.png');
      case 'Angry':
        return require('./assets/moodtrackerpage/emojis/angry.png');
      case 'Neutral':
        return require('./assets/moodtrackerpage/emojis/neutral.png');
      case 'Confused':
        return require('./assets/moodtrackerpage/emojis/confused.png');
      case 'Good':
        return require('./assets/moodtrackerpage/emojis/good.png');
      case 'Great':
        return require('./assets/moodtrackerpage/emojis/great.png');
      case 'None':
        return require('./assets/moodtrackerpage/emojis/questionmark.png');
      default:
        // Default image if mood is not recognized
        return require('./assets/moodtrackerpage/emojis/questionmark.png');
    }
  };
  
    
  const getUserName = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const uid = user.uid;
      const usersCollection = collection(db, 'users'); // Reference users collection

      const q = query(usersCollection, where('uid', '==', uid)); // Query by UID field
      try {
        const querySnapshot = await getDocs(q);
        if (querySnapshot.size > 0) {
          const docData = querySnapshot.docs[0].data(); // Get data from first matching doc
          setUsername(docData.name || ''); // Set username from document (or empty string if not found)
        } else {
          console.error('User document not found'); // Handle no matching doc
        }
      } catch (error) {
        console.error('Error fetching username:', error); // Handle errors during retrieval
      }
    }
  };


  useEffect(() => {
    getUserName(); // Fetch username on component mount
  }, []);


  return (
    <View style={styles.container}>
      {/* Image background */}
      <ImageBackground
        source={require('./assets/moodtrackerpage/mt2.jpg')} // Replace with your image source
        style={styles.backgroundImage}
        resizeMode='cover'
      >
        {/* Motivational quote box */}
        {quote ? (
          <View style={styles.quoteContainer}>
            <Text style={styles.quoteText}>"{quote}"</Text>
          </View>
        ) : <View style={styles.quoteContainer}>
        <Text style={styles.quoteText}>"Every day may not be good, but there's something good in every day."</Text>
      </View>}

        {/* Emotions for past 7 days */}
        <ScrollView style={styles.scrollView}>
        <View style={styles.centeredOverlay}>
        <View style={styles.usernameContainer}>
          <Text style={styles.usernameText}>Hello, {username}</Text>
        </View>
        {emotions.length > 0 ? (
  <View style={styles.emotionsContainer}>
    <Text style={styles.moodHistoryText}>Mood History</Text>
    <View style={styles.moodcontainer}>
      {emotions.map((item, index) => (
        <EmotionDisplay key={index} day={item.day} emotion={item.emotion} image={item.image} />
      ))}
      <TouchableOpacity onPress={() => navigation.navigate('calender')}>
        <Image source={require('./assets/moodtrackerpage/icons/nextpage.png')} style={{height:40, width:40, top:15, left:10, marginRight:10}}  />
      </TouchableOpacity>
    </View>
  </View>
) : (
  <View style={styles.noDataContainer}>
    <Text style={styles.noDataText}>No mood data available</Text>
    <Text style={styles.noDataText}>please enter todays Mood</Text>
    {/* You can add additional handling or message for new users here */}
  </View>
)}
         {/* Container for "Enter your Current Mood" text and arrow image */}
         <View style={styles.enterMoodContainer}>
          <Text style={styles.enterMoodText}>Enter your Today's Mood</Text>
          <TouchableOpacity onPress={() => navigation.navigate('today')}>
            <Image source={require('./assets/moodtrackerpage/icons/nextpage.png')} style={{ height: 20, width: 20 }} />
          </TouchableOpacity>
        </View>
           <View style={styles.thingsToDoContainer}>
          <Text style={styles.thingsToDoText}>Things to do to feel better</Text>
          {/* TouchableOpacity with text on top */}
          <TouchableOpacity onPress={() => Linking.openURL('https://tinybuddha.com/blog/30-ways-to-improve-your-mood-when-youre-feeling-down/')}>
            <Text style={styles.linkText}>30 Ways to Improve Your Mood When You’re Feeling Down</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.verywellmind.com/how-to-make-yourself-feel-better-right-now-5093352')}>
            <Text style={styles.linkText}>How to Make Yourself Feel Better Mentally</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.videosContainer}>
  <Text style={styles.videosText}>Feeling Anxious? </Text>
  <Text style={styles.videosText}>Here are some videos to watch </Text>
  {/* Add TouchableOpacity components for each video link */}
  <TouchableOpacity onPress={() => Linking.openURL('https://youtu.be/O-6f5wQXSu8?si=gDamy4KZJ1rauBBZ')}>
    <Text style={styles.linkText}>10-Minute Meditation For Anxiety
</Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/channel/UCmQK52xYtdeg7EYiQhqEeZA/playlists')}>
    <Text style={styles.linkText}>Body Mind Zone</Text>
  </TouchableOpacity>
  {/* Add more TouchableOpacity components for additional videos if needed */}
</View>
      </View>
      </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollView: {
    flex: 1,
  },
  centeredOverlay: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255, 0.6)',
    marginBottom: 50,
    // marginLeft: 70,
    // marginRight: 70,
    marginTop: 30,
    borderRadius: 10,
    padding:20,
    marginHorizontal: 'auto',
  },
  quoteContainer: {
    backgroundColor: 'rgba(255,255,255, 0.8)',
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 'auto',
    marginTop: 20,
    alignItems: 'center',
    alignSelf: 'flex-start'
  },
  quoteText: {
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    
  },
  emotionsContainer: {
    backgroundColor: 'rgba(255, 250, 160, 0.4)',
    borderRadius: 10,
    marginTop: 10,
    marginHorizontal: 'auto',
    flexDirection: 'column',
    alignSelf: 'flex-start', // Align the container to the start of the parent container
    padding: 10,
    top: 10,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
 moodcontainer: {
    marginHorizontal: 'auto',
    flexDirection: 'row',
    alignSelf: 'flex-start', // Align the container to the start of the parent container
    padding: 10,
 },
  moodHistoryText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    fontStyle: 'italic',
    marginBottom: 5,
  },
usernameContainer: {
  marginTop: 10, // Add some margin between quote and username
  marginBottom: 10, // Add some margin between username and emotions
  paddingHorizontal: 20, // Add horizontal padding for the text
  backgroundColor: 'transparent', // Makes the container invisible behind the background image
  flexDirection: 'row', // Arrange username text and potentially an icon (if desired) in a row
  alignItems: 'center', // Vertically align text and icon (if present) at the center
},
usernameText: {
  fontSize: 20, // Adjust font size for the username
  fontWeight: 'bold', // Make the username text bold
  color: 'black', // Set white color for the username to stand out on the background image
  flex: 1, // Allow the text to expand and fill available space (assuming no icon)
  fontStyle: 'italic',
},
enterMoodContainer: {
  backgroundColor: '#665679',
  paddingVertical:20,
  paddingHorizontal:40,
  marginHorizontal:'auto',
  borderRadius:9,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 30,
},
enterMoodText: {
  fontSize: 18,
  fontWeight: 'bold',
  color: 'white',
  marginRight: 10,
},
thingsToDoContainer: {
  backgroundColor: '#E6E6FA', // Adjust background color as needed
  paddingVertical: 10, // Adjust vertical padding as needed
  paddingHorizontal: 20, // Adjust horizontal padding as needed
  borderRadius: 10, // Adjust border radius as needed
  marginHorizontal: 'auto', // Center horizontally
  marginTop: 20, // Add margin from the "Enter your Today's Mood" container
},
thingsToDoText: {
  fontSize: 18,
  fontWeight: 'bold',
  color: 'black',
  fontStyle: 'italic', // Apply italic style if needed
},
linkText: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#6A5ACD', // Adjust color as needed
  textDecorationLine: 'underline', // Add underline for better indication
  marginTop: 10, // Add margin to separate the text from the top
},
videosContainer: {
  backgroundColor: '#E6E6FA', // Adjust background color as needed
  paddingVertical: 10, // Adjust vertical padding as needed
  paddingHorizontal: 20, // Adjust horizontal padding as needed
  borderRadius: 10, // Adjust border radius as needed
  marginHorizontal: 'auto', // Center horizontally
  marginTop: 20, // Add margin from the "Things to do to feel better" container
},
videosText: {
  fontSize: 18,
  fontWeight: 'bold',
  color: 'black',
  fontStyle: 'italic', // Apply italic style if needed
},
});

export default MoodTracker;
