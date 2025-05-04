import { StyleSheet } from "react-native";

const resetPasswordStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        width: '100%',
    },
    keyBoardAvoid: {
        flex: 1
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        gap: 5
    },
    formContainer: {
        width: '100%',
        maxWidth: 350,
        gap: 10
    },
    textTitle: {
        // color: 'white',
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center'
    },
    subTextTitle: {
        // color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 16,
        marginBottom: 30,
        textAlign: 'center'
    },
    input: {
        // backgroundColor: 'rgba(255, 255, 255, 0.15)',
        // color: 'white',
        // borderColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 10,
        padding: 15,
        borderWidth: 2,
    },
    button: {
        borderWidth: 2,
        borderColor: "black",
        padding: 10,
        borderRadius: 10,
        marginTop: 2,
        paddingVertical: 15,
    },
    buttonTextTitle: {
        // color: "black"
        // fontSize: 17,
        fontWeight: '500',
        textAlign: 'center'
    },
    errorTextTitle: {
        color: "red",
        marginLeft: 5
    }
});

export { resetPasswordStyles };