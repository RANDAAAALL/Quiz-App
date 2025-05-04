import { StyleSheet } from "react-native";

const settingStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        gap: 10,
        margin: 20
    },
    button: {
        borderWidth: 2,
        borderColor: "black",
        padding: 10,
        borderRadius: 10,
    },
    buttonText: {
        textAlign: "center",
        fontSize: 17,
    },
    image: {
        width: 160,
        height: 140,
        borderRadius: 100,
    },
    imagePlaceholder: { 
        width: 160,
        height: 140,
        borderRadius: 100,
    }
});

export { settingStyles };