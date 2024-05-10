// AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import { auth } from './firebaseConfig'; // Import your Firebase auth object

const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     const restoreUser = async () => {
//       try {
//         const user = await AsyncStorage.getItem('user');
//         if (user) {
//           setCurrentUser(JSON.parse(user));
//         }
//       } catch (error) {
//         console.error('Error restoring user:', error);
//       }
//     };
//     restoreUser();
//   }, []);

  const signIn = async (email, password) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      // Update currentUser state
      setCurrentUser(auth.currentUser);
    } catch (error) {
      console.error('Sign in error:', error);
      // Handle sign-in error (e.g., display error message)
    }
  };

  const signUp = async (email, password) => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      // Update currentUser state
      setCurrentUser(auth.currentUser);
    } catch (error) {
      console.error('Sign up error:', error);
      // Handle sign-up error (e.g., display error message)
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      // Clear currentUser state
      setCurrentUser(null);
    } catch (error) {
      console.error('Sign out error:', error);
      // Handle sign-out error (e.g., display error message)
    }
  };
//   useEffect(() => {
//     const storeUser = async (user) => {
//       try {
//         await AsyncStorage.setItem('user', JSON.stringify(user));
//       } catch (error) {
//         console.error('Error storing user:', error);
//       }
//     };
//     storeUser(currentUser);
//   }, [currentUser]);
  
  

  return (
    <AuthContext.Provider value={{ currentUser, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
