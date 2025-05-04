import { StyleSheet } from "react-native";

const leaderboardStyles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },  
    subContainer1: {
        flex: 1,
        padding: 10,
    },
    subContainer2: {
        flex: 1,
    },
    textTitle: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '600',
        marginVertical: 20
    },
    activityIndicationContainer: {
        padding: 25,
        gap: 10,
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    actionButtons: {
        flexDirection: "row",
        gap: 20,
        justifyContent: "center",
        marginBottom: 50,
    },
    surface: {
        marginVertical: 6,
        marginHorizontal: 12,
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 12,
        elevation: 2,
    },
    rowItem1: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 23,
        paddingVertical: 13,    
    }, 
    rowItem2: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    currentRankText: {
        fontSize: 15,
        marginHorizontal: 20,
        marginTop: 5,
        fontWeight: 'bold',
    },
    currentPageIndexText: {
        fontSize: 15,
        fontWeight: "bold"
    },
    rank1: {
        width: "15%",
        fontWeight: "600",
    },
    rank2: {
        width: "15%",
        fontWeight: "700",
    },
    name: {
        width: "35%",
        fontWeight: "600",
    },
    answered: {
        width: "25%",
        textAlign: "center",
        fontWeight: "500",
    },
    score: {
        width: "25%",
        textAlign: "right",
        fontWeight: "500",
    },      
});

export { leaderboardStyles };