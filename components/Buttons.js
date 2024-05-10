import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import COLORS from '../constants/colors';
import { heightPercentageToDP as responsiveHeight, widthPercentageToDP as responsiveWidth } from 'react-native-responsive-screen';

const Button = (props) => {
  const filledBgColor = props.color || COLORS.first;
  const outlinedColor = COLORS.white;
  const bgColor = props.filled ? filledBgColor : outlinedColor;
  const textColor = props.filled ? COLORS.white : COLORS.sixth;

  const buttonStyle = Platform.select({
    web: {
      ...styles.button,
      backgroundColor: bgColor,
      ...props.style,
      width: responsiveWidth(20),
      height: responsiveHeight(7),
    },
    default: {
      ...styles.button,
      backgroundColor: bgColor,
      ...props.style,
    },
  });

  const textStyle = Platform.select({
    web: {
      fontSize: responsiveHeight(3),
      color: textColor,
      fontFamily: 'San Francisco',
    },
    default: {
      fontSize: 18,
      color: textColor,
    },
  });

  return (
    <TouchableOpacity style={buttonStyle} onPress={props.onPress}>
      <Text style={textStyle}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingBottom: responsiveHeight(1.6),
    paddingVertical: responsiveHeight(1),
    borderColor: COLORS.sixth,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
});

export default Button;
