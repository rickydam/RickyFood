import {StyleSheet} from 'react-native';

const touchableOpacity = (backgroundColor, height, margin, width) => StyleSheet.create({
  view: {
    alignItems: 'center',
    backgroundColor: backgroundColor,
    borderRadius: 5,
    justifyContent: 'center',
    height: height,
    margin: margin,
    width: width
  },
  text: {
    color: 'white',
    fontWeight: 'bold'
  }
});

module.exports = touchableOpacity;