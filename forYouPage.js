import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';
import { getDocs, collection, query, where } from 'firebase/firestore';
import db from './firebaseConfig'; // Assuming you have configured your Firebase instance

const ForYouPage = ({ onFetchForYouStories }) => {
  const [forYouStories, setForYouStories] = useState([]);

  useEffect(() => {
    const fetchForYouStories = async () => {
      try {
        // Retrieve the current user's UID
        const currentUserUID = 'replace-with-current-user-uid'; // You should replace this with actual current user's UID
      
        // Query the Firestore collection 'users' to find the document containing the user's UID
        const q = query(collection(db, 'users'), where('uid', '==', currentUserUID));
        const querySnapshot = await getDocs(q);
  
        // Check if the document exists and contains the user's preferences
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0].data(); // Assuming there's only one document per user
          
          let forYouStories = [];
  
          // Check if stress/anxiety is present in the user's preferences
          if (userDoc['1'] && (userDoc['1'].includes('Stress/Anxiety'))) {
            // Fetch stories from the 'Anxiety' collection
            const anxietyQuerySnapshot = await getDocs(collection(db, 'anxiety'));
            anxietyQuerySnapshot.forEach((doc) => {
              if (forYouStories.length < 2) {
                const data = doc.data();
                const storyData = {
                  title: data.title,
                  story: data.story,
                  link: data.link
                };
                forYouStories.push(storyData);
              }
            });
          }
  
          // Check if procrastination is present in the user's preferences
          if (userDoc['1'] && (userDoc['1'].includes('Procrastination'))) {
            // Fetch stories from the 'Procrastination' collection
            const procrastinationQuerySnapshot = await getDocs(collection(db, 'procrastination'));
            procrastinationQuerySnapshot.forEach((doc) => {
              if (forYouStories.length < 2) {
                const data = doc.data();
                const storyData = {
                  title: data.title,
                  story: data.story,
                  link: data.link
                };
                forYouStories.push(storyData);
              }
            });
          }

          if (userDoc['1'] && (userDoc['1'].includes('ADHD'))) {
            // Fetch stories from the 'ADHD' collection
            const adhdQuerySnapshot = await getDocs(collection(db, 'ADHD'));
            adhdQuerySnapshot.forEach((doc) => {
              if (forYouStories.length < 2) {
                const data = doc.data();
                const storyData = {
                  title: data.title,
                  story: data.story,
                  link: data.link
                };
                forYouStories.push(storyData);
              }
            });
          }

          if (userDoc['1'] && (userDoc['1'].includes('Burnout'))) {
            // Fetch stories from the 'burnout' collection
            const burnoutQuerySnapshot = await getDocs(collection(db, 'burnout'));
            burnoutQuerySnapshot.forEach((doc) => {
              if (forYouStories.length < 2) {
                const data = doc.data();
                const storyData = {
                  title: data.title,
                  story: data.story,
                  link: data.link
                };
                forYouStories.push(storyData);
              }
            });
          }
  
          setForYouStories(forYouStories);
          onFetchForYouStories(forYouStories); // Call the prop function to pass the array
        } else {
          // Handle case where user document doesn't exist
          // For now, let's set an empty array
          setForYouStories([]);
          onFetchForYouStories([]); // Call the prop function to pass an empty array
        }
      } catch (error) {
        console.error('Error fetching for you stories:', error);
        // Handle the error
      }
    };
  
    fetchForYouStories();
  }, [onFetchForYouStories]); // Ensure useEffect runs only when onFetchForYouStories changes
  
  return (
    <SafeAreaView>
      <ScrollView>
        <Text>For You Stories</Text>
        {/* Display For You Stories */}
        {/* You can map over the forYouStories array and render each story */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForYouPage;
