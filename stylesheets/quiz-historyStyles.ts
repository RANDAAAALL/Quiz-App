import { StyleSheet } from "react-native";

const quizHistoryStyles = StyleSheet.create({
    scrollView: {
        flex: 1,
        paddingBottom: 40
    },
    activityIndicationContainer: {
        padding: 25,
        gap: 10,
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    surface: {
        marginVertical: 6,
        marginHorizontal: 12,
        padding: 4,
        borderRadius: 10,
        elevation: 2,
        backgroundColor: "white",   
    },
    subContainer: {
        flex: 1,
        padding: 10,
    },
    currentEmptyTextContainer: {
        flex:1,
        justifyContent: "center",
        alignItems: "center"       
    },
    currentEmptyTextTile: {
        fontSize: 20,
        fontWeight: 600
    }
});

export { quizHistoryStyles };