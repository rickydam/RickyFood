import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'lightgray',
    flex: 1,
    justifyContent: 'center'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#428BCA',
    borderRadius: 5,
    justifyContent: 'center',
    height: 50,
    width: 120,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});

module.exports = styles;