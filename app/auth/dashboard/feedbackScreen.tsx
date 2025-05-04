import Feedback from "@/components/dashboard/feed-back";
import { feedbackStyles } from "@/stylesheets/feed-backStyles";
import { KeyboardAvoidingView, Platform, SafeAreaView, StatusBar, View } from "react-native";

export default function FeedbackScreen(){
    return (
       <SafeAreaView style={feedbackStyles.container}>
        <StatusBar barStyle="dark-content" />
         <View style={feedbackStyles.background}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={feedbackStyles.keyBoardAvoid}>
            <Feedback />
          </KeyboardAvoidingView>
         </View>
       </SafeAreaView>
    );
}