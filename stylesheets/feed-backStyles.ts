import { StyleSheet } from "react-native";

const feedbackStyles = StyleSheet.create({
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
        // alignItems: 'center',
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
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '600',
        marginBottom: 10,
        textAlign: 'justify',
    },
    input: {
        borderRadius: 10,
        padding: 15,
        borderWidth: 2,
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
    antDesignIcon: {
        marginTop: 2,
        color: "black"
    },
    activityIndicator: {
        color: "black"
    },
    buttonTextTitle: {
        fontWeight: '500',
    },
    errorTextTitle: {
        color: "red",
        marginLeft: 5
    }
});

export { feedbackStyles };