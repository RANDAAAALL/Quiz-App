import { StyleSheet } from "react-native";

const mainScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    subContainer1:{
        flex: 1,
        padding: 30,
    },
    subContainer2:{ 
        flex: 1,
        justifyContent: 'center',
        gap: 10
    },
    activityIndicationContainer: {
        padding: 25,
        gap: 10,
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    textTitle: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '500',
        marginVertical: 20
    },
    button: {
        borderWidth: 2,
        borderColor: "black",
        padding: 10,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: 'row',
        gap: 10
    },
    buttonTextTitle: {
        // color: "black"
        // fontSize: 17,
        fontWeight: '500'
    },
    antDesignIcon: {
        marginTop: 2,
        color: "black"
    },
    activityIndicator: {
        color: "black"
    },
    textInput: {
        borderWidth: 2,
        borderColor: "black",
        padding: 11,
        borderRadius: 7,
        marginBottom: 20,
    }
});

export { mainScreenStyles };