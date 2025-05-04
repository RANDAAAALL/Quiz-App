import { StyleSheet } from "react-native";

const drawerStyles = StyleSheet.create({
    imageContainer: {
      alignItems: 'center',
      paddingVertical: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      marginBottom: 10,
    },
    profileImage: {
      width: 130,
      height: 110,
      borderRadius: 100,
      backgroundColor: '#e0e0e0', 
    },
    textTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    }
  });

export {drawerStyles};