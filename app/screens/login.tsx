import LoginForm from "@/components/forms/loginForm";
import { RegisterStyles } from "@/stylesheets/registerStyles";
import { View, SafeAreaView, StatusBar, KeyboardAvoidingView, Platform } from "react-native";

export default function LoginScreen(){
    return ( 
     <SafeAreaView style={RegisterStyles.container}>
        <StatusBar barStyle="dark-content" />
         <View style={RegisterStyles.background}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={RegisterStyles.keyBoardAvoid}>
           <LoginForm />
          </KeyboardAvoidingView>
         </View>
     </SafeAreaView>
    );
}