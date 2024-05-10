//calender.js
import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Image , Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { getFirestore, collection, getDocs, doc, getDoc, where, query } from 'firebase/firestore';
import db from '../firebaseConfig';
import { getAuth } from 'firebase/auth';
import MoodDetailsPopup from './moodPopup';
import { useNavigation } from '@react-navigation/native';

// Define the CalendarPage component
const CalendarPage = () => {
  const navigation = useNavigation();
  // Define state variables
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [moodDates, setMoodDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null); // State to store selected date
  const [moodDetails, setMoodDetails] = useState(null); // State to store mood details for selected date

  const handleDatePress = (date) => {
    if (moodDates[date]) {
      setSelectedDate(date);
      fetchMoodDetails(date);
    } else {
      // If no mood details available for selected date, show a message
      Alert.alert('No Mood Details', 'No mood details available for this date.');
    }
  };

  // Function to get color for each mood
  const getColorForMood = (mood) => {
    switch (mood) {
      case 'Distressed':
        return '#9C3848'; // Dark Red
      case 'Sad':
        return '#5C80BC'; // Dark Blue
      case 'Angry':
        return '#D93025'; // Darker Red
      case 'Neutral':
        return '#A3A3A3'; // Gray
      case 'Confused':
        return '#D7A726'; // Dark Yellow
      case 'Good':
        return '#82B366'; // Dark Green
      case 'Great':
        return '#F49FBC'; // Light Pink
      default:
        return '#000000'; // Black (default color)
    }
  };

  const fetchMoodDetails = async (date) => {
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userUID = currentUser.uid;
        const moodTrackerRef = doc(db, 'moodtracker', userUID);
        const moodDocRef = doc(collection(moodTrackerRef, 'mood'), date);
        const moodDocSnapshot = await getDoc(moodDocRef);
        if (moodDocSnapshot.exists()) {
          const { date,mood, positive, negative,summary,time} = moodDocSnapshot.data();
          setMoodDetails({ date,mood, positive, negative,summary,time });
        } else {
          // If mood details not found for the selected date, show a message
          Alert.alert('No Mood Details', 'No mood details available for this date.');
        }
      }
    } catch (error) {
      console.error('Error fetching mood details:', error);
    }
  };

  // Function to handle month change
  const handleMonthChange = (newMonth) => {
    setCurrentMonth(newMonth);
    console.log('Current month:', newMonth);
  };

  // Function to navigate to the previous month
  const goToPreviousMonth = () => {
    const previousMonth = new Date(currentMonth);
    previousMonth.setMonth(previousMonth.getMonth() - 1);
    setCurrentMonth(previousMonth);
  };

  // Function to navigate to the next month
  const goToNextMonth = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentMonth(nextMonth);
  };

  // Effect hook to fetch mood dates
  useEffect(() => {
    const fetchMoodDates = async () => {
      try {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        if (currentUser) {
          const userUID = currentUser.uid;
          const moodTrackerRef = doc(db, 'moodtracker', userUID);
          const moodTrackerDocSnapshot = await getDoc(moodTrackerRef);
          if (moodTrackerDocSnapshot.exists()) {
            const moodCollectionRef = collection(moodTrackerRef, 'mood');
            const moodCollectionSnapshot = await getDocs(moodCollectionRef);
            const datesWithEmotions = {};
            moodCollectionSnapshot.forEach((doc) => {
              const { date, mood} = doc.data();
              datesWithEmotions[date] = mood;
            });
            console.log(datesWithEmotions);
            setMoodDates(datesWithEmotions);
          } else {
            console.error('User mood tracker document not found.');
          }
        } else {
          console.error('Current user not found.');
        }
      } catch (error) {
        console.error('Error fetching mood dates:', error);
      }
    };

    fetchMoodDates();
  }, []);

  // Create an object to store formatted mood dates
  const formattedMoodDates = {};

  // Iterate through mood dates and format them
  if (typeof moodDates === 'object' && Object.keys(moodDates).length > 0) {
    for (const date in moodDates) {
      const mood = moodDates[date];
      formattedMoodDates[date] = { selected: true, selectedColor: getColorForMood(mood) };
    }
  } else {
    console.error('moodDates is not an object or is empty. Please handle this case appropriately.');
    // Handle the case where moodDates is not an object or is empty (e.g., display a loading indicator)
  }

  // Return the JSX content
  return (
    <View style={styles.container}>
      {/* Image background */}
      <ImageBackground
        source={require('../assets/moodtrackerpage/mt2.jpg')} // Replace with your image source
        style={styles.backgroundImage}
        resizeMode='cover'
      >
        {/* Overlay */}
        <View style={styles.centeredOverlay}>
          {/* Previous month button */}
          <TouchableOpacity onPress={goToPreviousMonth} style={styles.arrowButton}>
            <Image source={require('../assets/moodtrackerpage/left.png')} style={styles.arrowImage} />
          </TouchableOpacity>

          {/* Calendar */}
          <Calendar
            key={currentMonth.toString()}
            current={currentMonth.toString()}
            onMonthChange={handleMonthChange}
            markedDates={formattedMoodDates} 
            onDayPress={(day) => handleDatePress(day.dateString)}
            theme={{
              backgroundColor: 'rgba(0,0,0,0.8)',
              calendarBackground: 'transparent',
              textSectionTitleColor: '#000',
              selectedDayBackgroundColor: '#00adf5',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#00adf5',
              dayTextColor: '#2d4150',
              textDisabledColor: '#d9e1e8',
              dotColor: '#00adf5',
              selectedDotColor: '#ffffff',
              arrowColor: '#000',
              disabledArrowColor: '#d9e1e8',
              monthTextColor: '#000',
              indicatorColor: '#000',
              textDayFontFamily: 'monospace',
              textMonthFontFamily: 'monospace',
              textDayHeaderFontFamily: 'monospace',
              textDayFontWeight: '300',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: '300',
              textDayFontSize: 20,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16
            }}
          />

          {/* Next month button */}
          <TouchableOpacity onPress={goToNextMonth} style={styles.arrowButton}>
            <Image source={require('../assets/moodtrackerpage/right.png')} style={styles.arrowImage} />
          </TouchableOpacity>
        </View>

        {/* Mood labels */}
        <View style={styles.moodLabels}>
          <View style={styles.moodLabel}>
            <View style={[styles.colorIndicator, { backgroundColor: getColorForMood('Distressed') }]} />
            <Text style={styles.labelText}>Distressed</Text>
          </View>
          <View style={styles.moodLabel}>
            <View style={[styles.colorIndicator, { backgroundColor: getColorForMood('Sad') }]} />
            <Text style={styles.labelText}>Sad</Text>
          </View>
          <View style={styles.moodLabel}>
            <View style={[styles.colorIndicator, { backgroundColor: getColorForMood('Angry') }]} />
            <Text style={styles.labelText}>Angry</Text>
          </View>
          <View style={styles.moodLabel}>
            <View style={[styles.colorIndicator, { backgroundColor: getColorForMood('Neutral') }]} />
            <Text style={styles.labelText}>Neutral</Text>
          </View>
          <View style={styles.moodLabel}>
            <View style={[styles.colorIndicator, { backgroundColor: getColorForMood('Confused') }]} />
            <Text style={styles.labelText}>Confused</Text>
          </View>
          <View style={styles.moodLabel}>
            <View style={[styles.colorIndicator, { backgroundColor: getColorForMood('Good') }]} />
            <Text style={styles.labelText}>Good</Text>
          </View>
          <View style={styles.moodLabel}>
            <View style={[styles.colorIndicator, { backgroundColor: getColorForMood('Great') }]} />
            <Text style={styles.labelText}>Great</Text>
          </View>
        </View>
            {/* Back button */}
    <TouchableOpacity onPress={() => navigation.navigate('moodpage')} style={styles.backButton}>
      <Text style={styles.backButtonText}>Back</Text>
    </TouchableOpacity>
      </ImageBackground>
      <MoodDetailsPopup
        visible={selectedDate !== null && moodDetails !== null}
        onClose={() => {
          setSelectedDate(null);
          setMoodDetails(null);
        }}
        date={moodDetails?.date}
        mood={moodDetails?.mood}
        positiveEmotions={moodDetails?.positive}
        negativeEmotions={moodDetails?.negative}
        summary={moodDetails?.summary}
        time={moodDetails?.time}

      />
    </View>
  );
};

// Define styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  centeredOverlay: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255, 0.6)',
    marginHorizontal: 'auto',
    marginTop: 30,
    marginBottom: 30,
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 'auto',
    flexDirection: 'row', // Align arrow buttons horizontally
    alignItems: 'center', // Center arrow buttons vertically
    justifyContent: 'space-between', // Distribute arrow buttons evenly
  },
  arrowButton: {
    padding: 10,
  },
  arrowImage: {
    width: 20,
    height: 20,
  },
  moodLabels: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 40,
  },
  moodLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 5,
  },
  labelText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    bottom: 65,
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  }
});

// Export the component
export default CalendarPage;
