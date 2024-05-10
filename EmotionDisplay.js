//EmotionDisplay.js
import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';

const EmotionDisplay = ({ day, emotion, image}) => {
  return (
    <View style={styles.container}>
      <Image source={image} style={{height: 30, width: 30}}/>
      {/* <Text style={styles.emoji}>{image}</Text> */}
      <Text style={styles.day}>{day}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 5,
  },
  emoji: {
    fontSize: 24,
  },
  day: {
    marginTop: 5,
    fontSize: 16,
  },
});

export default EmotionDisplay;
