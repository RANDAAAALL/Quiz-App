import { StyleSheet } from "react-native";


const quizResultsStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        gap: 30,
    },
    resultText: {
        fontWeight: '600',
        textAlign: 'center',
        fontSize: 25
    },
    resultsTextNumber: {
        fontWeight: '600',
        fontSize: 25,
        textAlign: 'center',
    },
    tryAgainButton: {
        borderWidth: 2,
        borderColor: "black",
        padding: 10,
        borderRadius: 10,
        gap: 10
    },
    tryAgainButtonText: {
        textAlign: "center",
        fontWeight: 600,
        fontSize: 15,
    },
});

export { quizResultsStyles };