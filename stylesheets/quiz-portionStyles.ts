import { StyleSheet } from "react-native";

const quizPortionStyles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    subContainer1:{
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
    quizNumber: {
        fontWeight: '600',
        fontSize: 15
    },
    quizCategory: {
        fontWeight: '600',
        fontSize: 15,
    },
    quizDifficulty: {
        fontWeight: '600',
        fontSize: 15,
    },
    quizQuestion: {
        fontWeight: '600',
        marginVertical: 20,
        textAlign: 'center',
        fontSize: 15
    },
    quizChoicesButton: {
        borderWidth: 2,
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: 'row',
        gap: 10
    },
    quizChoicesButtonText: {
        fontWeight: '600'
    },
    quizErrorTexts: {
        fontWeight: '600',
        marginVertical: 20,
        fontSize: 15,
        textAlign: 'center'
    }
});

export { quizPortionStyles };