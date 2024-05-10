//Welcome.js
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Image, Text, StyleSheet, Pressable, Platform } from 'react-native';
import COLORS from './constants/colors';
import Button from './components/Buttons';
import { heightPercentageToDP as responsiveHeight, widthPercentageToDP as responsiveWidth } from 'react-native-responsive-screen';

const Welcome = ({ navigation }) => {
  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={['rgba(58, 131, 244,0.4)', 'rgba(9, 181, 211, 0.4)']}
    >
      <View style={Platform.OS === 'web' ? styles.webContainer : styles.mobileContainer}>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('./assets/Glow1cropped.png')}
            style={{
              height: responsiveHeight(25),
              width: responsiveWidth(55),
              resizeMode: 'contain',
            }}
          />
          <View style={styles.textContainer}>
            <Text style={styles.welcomeText}>
              Welcome to the Glow App!
            </Text>
          </View>
          <Button
            title="Join Now"
            onPress={() => {
              console.log('Navigating to Signup');
              navigation.navigate('Signup');
            }}
            color={"#FFA500"}
            filled
            style={{
              padding: responsiveHeight(1),
              marginTop: responsiveHeight(2),
              width: '100%',
            }}
          />
          <View style={styles.textContainer}>
          <View style={styles.haveAccountContainer}>
            <Text style={styles.haveAccountText}>
              Already have an Account?
            </Text>
            <Pressable onPress={() => {
              console.log('Navigating to Login');
              navigation.navigate('Login');
            }}>
              <Text style={styles.loginText}>
                Login
              </Text>
            </Pressable>
          </View>
        </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  mobileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  webContainer: {
    width: '40%',
    height: '90%',
    margin: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: responsiveHeight(20),
    paddingHorizontal: responsiveWidth(5),
    borderRadius: 20,
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  textContainer: {
    paddingHorizontal: responsiveWidth(4),
    marginTop: responsiveHeight(2),
    paddingBottom: responsiveHeight(4),
    width: '100%',
    maxWidth: responsiveWidth(50), // Adjust maximum width as needed
    alignItems: 'center', // Center the text horizontally

  },
  welcomeText: {
    fontSize: responsiveHeight(4),
    fontWeight: '800',
    color: COLORS.black,
    fontFamily: 'Roboto',
    textAlign: 'center',
  },
  haveAccountContainer: {
    flexDirection: 'row',
    marginTop: responsiveHeight(1.5),
    justifyContent: 'center',
  },
  haveAccountText: {
    fontSize: responsiveHeight(3),
    color: 'rgba(0, 0, 0, 0.8)',
    textAlign:'center',
  },
  loginText: {
    fontSize: responsiveHeight(3),
    color: COLORS.black,
    fontWeight: 'bold',
    marginLeft: responsiveWidth(3),
    textAlign:'center',
  },
});

export default Welcome;
