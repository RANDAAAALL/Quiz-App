import { quizResultsStyles } from "@/stylesheets/quiz-resultsStyles";
import { TouchableOpacity, Text, View } from "react-native";

export default function QuizResult({ HandleTryAgain, correctAnswers, responseData }: any){
    // console.log("QuizResult-component");

    return (
        <View style={quizResultsStyles.container}>
        <Text style={quizResultsStyles.resultText}>Results</Text>
        <Text style={quizResultsStyles.resultsTextNumber}>{`${correctAnswers}/${responseData.length}`}</Text>
        <TouchableOpacity onPress={HandleTryAgain} style={quizResultsStyles.tryAgainButton}>
        <Text style={quizResultsStyles.tryAgainButtonText}>Try Again!</Text>
        </TouchableOpacity>
        </View>
    );
}