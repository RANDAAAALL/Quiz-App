import { StyleSheet } from "react-native";

const profileScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25
    },
    activityIndicationContainer: {
        padding: 25,
        gap: 10,
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    textTitle: {
        marginBottom: 10,
        fontSize: 13,
        fontWeight: 'bold',
    },
    TotalOfQuestionsContainer: {
        flex: 1,
        justifyContent: "center",
        gap: 30,
        marginBottom: 15
    },
    TotalOfQuestionsSubContainer: {
        alignItems: "center"
    },
    SubTitles1: {
        marginBottom: 10,
        fontSize: 20,
        fontWeight: 'bold'
    },
    SubTitles2: {
        marginBottom: 10,
        fontSize: 15,
        fontWeight: 'bold'
    },
    keyValuePairsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 70,
        marginBottom: 10
    },
    keyValuePairsSubContainer: {
        flexDirection: "column",
        alignItems: 'center',
        gap: 10
    },
    keyTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    valueTitle: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    chartConfigBgColor: {
        backgroundColor: "#e26a00"
    },
    chartConfigBgGradientFrom: {
        backgroundColor: "#ff6e00",
    },
    chartConfigBgGradientTo: {
        backgroundColor: "#ff8c00",
    },
    chartConfigBorderRaidus: {
        borderRadius: 16,
    }
});

export {profileScreenStyles}