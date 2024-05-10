//ForgotPassword.js
import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TextInput, TouchableOpacity, Platform } from 'react-native';
import { heightPercentageToDP as responsiveHeight, widthPercentageToDP as responsiveWidth } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from './constants/colors';
import { getAuth } from 'firebase/auth';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Alert} from 'react-native';

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const auth = getAuth();

  const handleResetPassword = async () => {
    if (!email) {
        alert('Email is required');
        return;
      }
  
      try {
        setIsLoading(true);
        await sendPasswordResetEmail(auth, email);
        alert('Password reset email sent', 'Check your email inbox for instructions to reset your password.');
      } catch (error) {
        alert('Error', error.message);
      } finally {
        setIsLoading(false);
      }
    };

  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={['rgba(58, 131, 244,0.4)', 'rgba(9, 181, 211, 0.4)']} // Transparent colors
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              Forgot Password
            </Text>
            <Text style={styles.subtitle}>
              Enter your email address to reset your password
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
          <TouchableOpacity
            style={styles.resetButton}
            onPress={handleResetPassword}
            disabled={isLoading}
          >
            <Text style={styles.resetButtonText}>
              {isLoading ? 'Resetting...' : 'Reset Password'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> navigation.navigate("Login")}>
          <Text style={styles.toLoginPage}>Go to Login Page</Text>
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
    toLoginPage: {
    fontSize: responsiveHeight(2.5),
    color: COLORS.black,
    alignSelf: 'center',

    marginTop: responsiveHeight(5),
    textDecorationLine: 'underline', // Add underline style
  },
 
  titleContainer: {
    marginBottom: responsiveHeight(2),
  },
  title: {
    fontSize: responsiveHeight(3.5),
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: responsiveHeight(1),
    textAlign:'center',
  },
  subtitle: {
    fontSize: responsiveHeight(2.5),
    color: COLORS.black,
  },
  inputContainer: {
    marginBottom: responsiveHeight(2),
  },
  label: {
    fontSize: responsiveHeight(3),
    fontWeight: '400',
    marginVertical: responsiveHeight(1),
  },
  textInputWrapper: {
    width: '100%',
    height: responsiveHeight(6),
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: responsiveWidth(4),
  },
  textInput: {
    width: '100%',
  },
  resetButton: {
    backgroundColor: COLORS.ninth,
    paddingVertical: responsiveHeight(2),
    borderRadius: 10,
    alignItems: 'center',
    marginTop: responsiveHeight(2),
  },
  resetButtonText: {
    fontSize: responsiveHeight(3),
    fontWeight: 'bold',
    color: COLORS.white,
  },
});

export default ForgotPassword;
