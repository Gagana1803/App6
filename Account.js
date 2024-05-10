//Accounts.js
import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { getAuth, signOut } from 'firebase/auth';

const Account = () => {
  const navigation = useNavigation(); // Initialize navigation

  // Function to handle signout
    const handleSignOut = async () => {
      try {
        const auth = getAuth(); // Get the Firebase authentication instance
        await signOut(auth); // Sign out the user
        // Navigate to the desired screen after signout
        navigation.navigate('Login'); // Example: Navigate to the Login screen
      } catch (error) {
        console.error('Signout failed:', error);
        // Handle signout failure
      }
    };
  

  return (
    <LinearGradient
      style={styles.container}
      colors={['rgba(58, 131, 244, 0.4)', 'rgba(9, 181, 211, 0.4)']}
    >
        <View style={styles.overlay}>
          {/* Signout button */}
          <TouchableOpacity style={styles.signoutButton} onPress={handleSignOut}>
            <Text style={styles.signoutButtonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // Transparent black overlay
    justifyContent: 'center',
    alignItems: 'center',
    width:'40%',
    height:'80%',
    margin:'auto',
    borderRadius: 30,
  },
  signoutButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  signoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Account;
