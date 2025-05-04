import { StyleSheet } from "react-native";

const indexStyles = StyleSheet.create({
    container: {
      flex: 1,
    },
    background: {
      width: '100%',
      flex: 1,
    },
    indicatorContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    contentContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    titleContainer: {
      alignItems: 'center',
      marginBottom: 80,
    },
    title: {
      fontSize: 48,
      fontWeight: 'bold',
      // color: 'white',
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 18,
      // color: 'rgba(255, 255, 255, 0.8)'
    },
    buttonContainer: {
      width: '100%',
      maxWidth: 300,
    },
    button: {
      paddingVertical: 15,
      paddingHorizontal: 20,
      // backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderRadius: 10,
      alignItems: 'center',
      marginBottom: 15,
      borderWidth: 2,
      // borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    buttonText: {
      // color: 'white',
      fontSize: 18,
      fontWeight: '600',
    },
  });

  export {indexStyles};
  