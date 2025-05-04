import LeaderBoard from "@/components/dashboard/leader-board";
import { leaderboardStyles } from "@/stylesheets/leaderboard-screenStyles";
import { ScrollView } from "react-native";

export default function LeaderboardScreen(){
    return (
        <ScrollView contentContainerStyle={leaderboardStyles.scrollView}>
        <LeaderBoard/>
        </ScrollView>
    );
};