//StoryDetails.js
import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Linking } from 'react-native';


const StoryDetails = ({ route }) => {
  const navigation = useNavigation(); // Initialize navigation
  const { title, content, image, link } = route.params;

  const renderContent = () => {
    return content.split('<br>').map((line, index) => (
      <Text key={index} style={styles.content}>{line}</Text>
    ));
  };

  const renderLink = () => {
    if (link) {
      return (
        <Text
          style={styles.link}
          onPress={() => Linking.openURL(link)}>
          {link} {/* Display the entire link */}
        </Text>
      );
    }
    return null; // If no link is provided, return null
  };

  return (
    <View style={styles.outerContainer}>
      <ImageBackground source={image} style={styles.backgroundImage} resizeMode='cover'>
        <View style={styles.centeredOverlay}> {/* Centered overlay container */}
          <ScrollView style={styles.scrollView}>
            <View style={styles.overlay}> {/* Content container with existing styles */}
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.content}>
                {renderContent()}
              </Text>
              {renderLink()} {/* Render the link conditionally */}
              <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1, // Allow outer container to grow and fill the screen
    position: 'relative', // Allow positioning inner container absolutely
  },
  scrollView: {
    flex: 1, // Allow ScrollView to grow and accommodate content
  },
  innerContainer: {
    position: 'absolute', // Position inner container absolutely within outer container
    top: 0,
    left: 0,
    right: 0,
    bottom: 0, // Fill the entire outer container
    backgroundColor: 'transparent', // Make background transparent
  },
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  centeredOverlay: {
    /* Center the entire overlay with its contents */
    position: 'absolute',
    top: 50,
    bottom: 50,
    left: 250,
    right: 50,
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    position: 'absolute',
    padding: 40,
    borderRadius: 10,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center',
    maxWidth: '80%', // Limit width of the overlay content
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  contentContainer: {
    flex: 1,
    position: 'absolute', // Optional: center content vertically
    top: 0,
    left: 0,
    right: 0,
    // Adjust margins/padding as needed
  },
  content: {
    fontWeight: '600',
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    marginTop: 20,
    flexWrap: 'wrap', // Wrap text content if it overflows
  },
  link: {
    fontSize: 18,
    color: 'blue',
    textAlign: 'center',
    marginTop: 20,
  },
  backButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});

export default StoryDetails;
