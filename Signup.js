//Signup.js
import React,{ useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image, Pressable, Platform, StyleSheet } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import CheckBox from 'expo-checkbox';
import Button from './components/Buttons';
import COLORS from './constants/colors';
import { heightPercentageToDP as responsiveHeight, widthPercentageToDP as responsiveWidth } from 'react-native-responsive-screen';
import firebase from './firebaseConfig'; // Import your Firebase configuration
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { LinearGradient } from 'expo-linear-gradient';
import { addDoc, collection } from "firebase/firestore";
import { doc } from 'firebase/firestore';
import db from './firebaseConfig';
import { auth } from './firebaseConfig';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const Signup = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  // const [isChecked, setIsChecked] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
        const auth = getAuth(); 
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        // Handle successful sign-in (e.g., navigate to a different screen)
        await addDoc(collection(db, "users"), {
          uid: user.uid,
      });
        console.log('User signed in with Google:', user);
        navigation.navigate('First'); // Or your desired screen
    } catch (error) {
        console.error('Error in Google sign-in:', error);
        alert('Error in Google sign-in. Please try again later.');
    }
  };

  const handleSignup = async () => {
    try {
      // Validate email and password before proceeding
      if (!validateEmail(email)) {
        alert('Invalid email format. Please enter a valid email address.');
        return;
      }
  
      if (!validatePassword(password)) {
        alert('Invalid password. Password must be at least 8 characters long and contain a lowercase letter, an uppercase letter, and a digit.');
        return;
      }
  
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user; // Move user declaration outside the try block

      await addDoc(collection(db, "users"), {
          uid: user.uid,
      });

      console.log('Signup successful!', user.email); // Log successful signup
      navigation.navigate('First');
    } catch (error) {
      console.error('Signup failed:', error); // Log detailed error
      if (error.code === 'auth/email-already-in-use') {
        alert('The email address is already in use. Please use a different email address or login.');
      } else {
        alert(error);
        alert('Signup failed. Please try again later.');
      }
    }
  };
  // Email and password validation functions (replace with your specific requirements)
  const validateEmail = (email) => {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8 && /[a-z]/i.test(password) && /[A-Z]/i.test(password) && /[0-9]/i.test(password);
  };

  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={['rgba(58, 131, 244,0.4)', 'rgba(9, 181, 211, 0.4)']}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
                   {`  `}CREATE ACCOUNT{`   `}
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              Email Address
            </Text>
            <View style={styles.textInputWrapper}>
              <TextInput
                placeholder="Enter your Email address"
                placeholderTextColor={COLORS.black}
                keyboardType='email-address'
                value={email}
                onChangeText={setEmail}
                style={styles.textInput}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              Password
            </Text>
            <View style={styles.textInputWrapper}>
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor={COLORS.black}
                secureTextEntry={!isPasswordShown}
                value={password}
                onChangeText={setPassword}
                style={styles.textInput}
              />
              <TouchableOpacity
                onPress={() => setIsPasswordShown(!isPasswordShown)}
                style={styles.eyeIconWrapper}>
                {isPasswordShown == true ? (
                  <Ionicons name="eye-off" size={24} color={COLORS.black} />
                ) : (
                  <Ionicons name="eye" size={24} color={COLORS.black} />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <Button
            title="SignUp"
            color={COLORS.ninth}
            filled
            onPress={handleSignup}
            style={styles.SignupButton}
          />
          <View style={styles.separatorContainer}>
            <View
              style={styles.separator} />
            <Text style={styles.separatorText}>
              Or SignUp with
            </Text>
            <View
              style={styles.separator} />
          </View>
          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity
              onPress={handleGoogleSignIn}
              style={styles.googleButton}>
              <Image
                source={require("./assets/googleicon.png")}
                style={styles.googleIcon}
                resizeMode='contain'
              />
              <Text style={styles.googleButtonText}>
                Google
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.loginTextContainer}>
            <Text style={styles.loginText}>
              Already Have an Account ?
            </Text>
            <Pressable
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.login}>
                Login
              </Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 20,
    overflow: 'hidden',
    ...Platform.select({
      web: {
        width: '40%',
        height: '80%', // Adjust the height as needed
        margin: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: responsiveHeight(10), // Adjust the padding as needed
        paddingHorizontal: responsiveWidth(5),
        borderRadius: 20,
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
      },
      default: {
        flex: 1,
        marginHorizontal: responsiveWidth(6),
      },
    }),
  },
  innerContainer: {
    flex: 1,
    marginHorizontal: responsiveWidth(4),
  },
  titleContainer: {
    flex: 0.5,
    marginHorizontal: responsiveWidth(4),
    marginBottom: responsiveHeight(5),
    paddingHorizontal:5,


  },
  title: {
    fontSize: responsiveHeight(3.5),
    fontWeight: 'bold',
    marginVertical: responsiveHeight(2),
    color: COLORS.black,
  },
  inputContainer: {
    marginBottom: responsiveHeight(1),
  },
  label: {
    fontSize: responsiveHeight(3),
    fontWeight: '200',
    marginVertical: responsiveHeight(1),
    // fontWeight: '100',
  },
  textInputWrapper: {
    width: '100%',
    height: responsiveHeight(6),
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: responsiveWidth(4),
  },
  textInput: {
    width: '100%',
  },
  eyeIconWrapper: {
    position: 'absolute',
    right: responsiveWidth(4),
  },
  SignupButton: {
    alignSelf: 'center',
    marginTop: responsiveHeight(2),
    marginBottom: responsiveHeight(0.5),
    fontSize: responsiveHeight(2),
    width: responsiveWidth(10)
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: responsiveHeight(2),
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.ninth,
    marginHorizontal: responsiveWidth(3),
  },
  separatorText: {
    fontSize: responsiveHeight(2),
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: responsiveHeight(4),
  },
  googleButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: responsiveHeight(8),
    borderWidth: 1,
    borderColor: COLORS.black,
    marginRight: responsiveWidth(2),
    borderRadius: 10,
    backgroundColor: COLORS.ninth,
  },
  googleIcon: {
    height: responsiveHeight(4),
    width: responsiveHeight(4),
    marginRight: responsiveWidth(2),
  },
  googleButtonText: {
    fontSize: responsiveHeight(3),
    color: COLORS.white,
  },
  loginTextContainer: {
    flexDirection:'row',
    fontSize: responsiveHeight(2),
    color: 'rgba(0, 0, 0, 0.8)',
  },
  loginText: {
    fontSize: responsiveHeight(3),
    color: COLORS.black,
    fontWeight: 'normal',
    marginLeft: responsiveWidth(3),
    alignSelf: 'center',
  },
  login: {
    fontSize: responsiveHeight(3),
    color: COLORS.black,
    fontWeight: 'bold',
    marginLeft: responsiveWidth(3),
    alignSelf: 'center',
  },
});

export default Signup;