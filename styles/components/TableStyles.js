import {StyleSheet} from 'react-native';

const tableStyles = StyleSheet.create({
  deleteButton: {
    alignItems: 'center',
    backgroundColor: '#CD0000',
    borderRadius: 10,
    borderWidth: 1,
    color: 'white',
    height: 20,
    justifyContent: 'center',
    position: 'absolute',
    right: -5,
    top: -5,
    width: 20
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});

module.exports = tableStyles;