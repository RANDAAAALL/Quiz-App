import ResetPasswordForm from "@/components/forms/reset-passwordForm";
import { resetPasswordStyles } from "@/stylesheets/reset-passwordStyles";
import { KeyboardAvoidingView, Platform, SafeAreaView, StatusBar, View } from "react-native";

export default function ResetPasswordScreen(){
    return (
       <SafeAreaView style={resetPasswordStyles.container}>
        <StatusBar barStyle="dark-content" />
         <View style={resetPasswordStyles.background}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={resetPasswordStyles.keyBoardAvoid}>
            <ResetPasswordForm />
          </KeyboardAvoidingView>
         </View>
       </SafeAreaView>
    );
}