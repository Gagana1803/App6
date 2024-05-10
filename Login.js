//login.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TextInput, TouchableOpacity, Image, Pressable, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CheckBox from 'expo-checkbox';
import Button from './components/Buttons'; // Assuming this import is correct
import COLORS from './constants/colors';
import { heightPercentageToDP as responsiveHeight, widthPercentageToDP as responsiveWidth } from 'react-native-responsive-screen';
import firebase from './firebaseConfig'; // Import your Firebase configuration
import { useNavigation } from '@react-navigation/native';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { LinearGradient } from 'expo-linear-gradient';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Store any error messages

  // Initialize userCredentials to be null (optional, clarifies usage)
  const [userCredentials, setUserCredentials] = useState(null);

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  useEffect(() => {
    if (userCredentials) {
      navigation.navigate('StoryPage'); // Navigate if userCredentials is not null
    }
  }, [userCredentials, navigation]);

  const handleGoogleLogin = async () => {
    try {
      const auth=getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const userCredential = result; // Contains user info
      navigation.navigate('StoryPage');
    } catch (error) {
      console.error('Google sign-in error:', error);
      alert('Google sign-in failed. Please try again.');
    }
  };

  const handleLogin = async () => {
    setIsLoading(true); // Indicate login in progress
    setError(null); // Reset error message

     try {
    //   // Validate email and password before proceeding (replace with stricter checks)
    //   if (!validateEmail(email)) {
    //     setError('Invalid email format.');
    //     return;
    //   }

    //   if (!validatePassword(password)) {
    //     setError('Password must be at least 8 characters long and contain a lowercase letter, an uppercase letter, and a digit.');
    //     return;
    //   }

      const auth = getAuth(); // Retrieve auth instance
      const userCredentials = await signInWithEmailAndPassword(auth, email, password);
      setUserCredentials(userCredentials); // Update state after successful login
    } catch (error) {
      alert('Login failed: invalid email or password');
      // alert('invalid email or password'); // Set error message for display
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  // // Email and password validation functions (consider more robust checks)
  // const validateEmail = (email) => {
  //   return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i.test(email);
  // };

  // const validatePassword = (password) => {
  //   return password.length >= 8 && /[a-z]/i.test(password) && /[A-Z]/i.test(password) && /[0-9]/i.test(password);
  // };

  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={['rgba(58, 131, 244,0.4)', 'rgba(9, 181, 211, 0.4)']}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              Hey Welcome Back!
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
            title="Login"
            color={COLORS.ninth}
            filled
            onPress={handleLogin}
            style={styles.LoginButton}
          />
          <View style={styles.separatorContainer}>
            <View
              style={styles.separator} />
            <Text style={styles.separatorText}>
              Or Login with
            </Text>
            <View
              style={styles.separator} />
          </View>
          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity
              onPress={handleGoogleLogin}
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
          <View style={styles.signUpTextContainer}>
            <Text style={styles.signUpText}>
              Don't have an account?
            </Text>
            <Pressable
              onPress={() => navigation.navigate("Signup")}
            >
              <Text style={styles.signUp}>
                Sign Up
              </Text>
            </Pressable>
          </View>
          <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
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
  forgotPassword: {
    fontSize: responsiveHeight(2.5),
    color: COLORS.black,
    alignSelf: 'center',
    marginTop: responsiveHeight(2),
    textDecorationLine: 'underline', // Add underline style
  },
  innerContainer: {
    flex: 1,
    marginHorizontal: responsiveWidth(4),
  },
  titleContainer: {
    flex: 0.5,
    marginHorizontal: responsiveWidth(4),
    marginBottom: responsiveHeight(8),
    paddingHorizontal:5,

  },
  title: {
    fontSize: responsiveHeight(3.5),
    fontWeight: 'bold',
    marginVertical: responsiveHeight(2),
    color: COLORS.black,
    // paddingBottom: responsiveHeight(0.5),
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
  LoginButton: {
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
  signUpTextContainer: {
    flexDirection:'row',
    fontSize: responsiveHeight(2),
    color: 'rgba(0, 0, 0, 0.8)',
  },
  signUpText: {
    fontSize: responsiveHeight(3),
    color: COLORS.black,
    fontWeight: 'normal',
    marginLeft: responsiveWidth(3),
    alignSelf: 'center',
  },
  signUp: {
    fontSize: responsiveHeight(3),
    color: COLORS.black,
    fontWeight: 'bold',
    marginLeft: responsiveWidth(3),
    alignSelf: 'center',
  },
});

export default Login;

