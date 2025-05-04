import QuizHistory from "@/components/dashboard/quiz-history";
import { quizHistoryStyles } from "@/stylesheets/quiz-historyStyles";
import { ScrollView } from "react-native";

export default function QuizHistoryScreen(){
    return (
        <ScrollView contentContainerStyle={quizHistoryStyles.scrollView}>
        <QuizHistory/>
        </ScrollView>
    );
}