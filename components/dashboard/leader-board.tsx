import { useCallback } from "react";
import { auth } from "@/config/firebase";
import { leaderboardStyles } from "@/stylesheets/leaderboard-screenStyles";
import useFetchFirestore from "@/utils/custom-hooks/useFetchFirestore";
import { MaterialIcons } from "@expo/vector-icons";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { Surface } from "react-native-paper";
import { useFocusEffect } from '@react-navigation/native';

export default function LeaderBoard() {
    const { 
        tempData, 
        nextPage, 
        prevPage, 
        hasNextPage, 
        hasPrevPage, 
        isLoading, 
        currentIndexPage, 
        currentUserRank,
        refreshData
    } = useFetchFirestore("leaderboard");

    // logics for revisiting screen
    useFocusEffect(
      useCallback(() => {
        //   console.log("focused");
          refreshData();
          return () => {
            //   console.log("unfocused");
          };
      }, [])
  );
  

    return (
        <View style={leaderboardStyles.subContainer1}>
            {!tempData ? (
                <ActivityIndicator style={leaderboardStyles.activityIndicationContainer} size="large" color="black" />
            ) : (
                <>
                    {/* Current rank index title */}
                    <Text style={leaderboardStyles.currentRankText}>{`>#${currentUserRank}`}</Text>

                    {/* Columns title */}
                    <Text style={leaderboardStyles.textTitle}>Overall Top Ranks</Text>
                    <View style={leaderboardStyles.rowItem1}>
                    <Text style={leaderboardStyles.rank1}>Rank</Text>
                    <Text style={leaderboardStyles.name}>Name</Text>
                    <Text style={leaderboardStyles.answered}>Questions</Text>
                    <Text style={leaderboardStyles.score}>Scores</Text>
                    </View>

                    {isLoading ? (
                        <ActivityIndicator style={leaderboardStyles.activityIndicationContainer} size="large" color="black" />
                    ) : (
                        <View style={leaderboardStyles.subContainer2}>
                            {/* List of users */}
                            {Array.isArray(tempData) && tempData.map((data, i) => (
                                <Surface 
                                    key={i} 
                                    style={[leaderboardStyles.surface, {backgroundColor: data.id === auth.currentUser?.uid ? "gray" : "white"}]}>
                                    <View style={leaderboardStyles.rowItem2}>
                                        <Text style={[leaderboardStyles.rank2, {color: data.id === auth.currentUser?.uid ? "white" : "black"}]}>
                                        {`#${currentIndexPage * 5 + i + 1}`}
                                        </Text>
                                        <Text style={[leaderboardStyles.name, {color: data.id === auth.currentUser?.uid ? "white" : "black"}]}>
                                        {data.currentUser.charAt(0).toUpperCase() + data.currentUser.slice(1)}
                                        </Text>
                                        <Text style={[leaderboardStyles.answered, {color: data.id === auth.currentUser?.uid ? "white" : "black"}]}>
                                        {data.totalAnsweredQuestions}
                                        </Text>
                                        <Text style={[leaderboardStyles.score, {color: data.id === auth.currentUser?.uid ? "white" : "black"}]}>
                                        {data.totalScores}
                                        </Text>
                                    </View>
                                </Surface>        
                            ))}
                        </View>
                    )}

                    {/* Buttons for pagination */}
                    <View style={leaderboardStyles.actionButtons}>
                    <TouchableOpacity disabled={isLoading || !hasPrevPage} onPress={() => prevPage()}>
                    <MaterialIcons name="navigate-before" size={26} color="black" />
                    </TouchableOpacity>
                    <Text style={leaderboardStyles.currentPageIndexText}>{currentIndexPage + 1}</Text>
                    <TouchableOpacity disabled={isLoading || !hasNextPage} onPress={() => nextPage()}>
                    <MaterialIcons name="navigate-next" size={26} color="black" />
                    </TouchableOpacity>
                    </View>
                </>
            )}
        </View>
    );
}
