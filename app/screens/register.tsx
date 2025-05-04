import { View, SafeAreaView, StatusBar, KeyboardAvoidingView, Platform } from "react-native";
import {RegisterStyles} from '@/stylesheets/registerStyles'
import RegisterForm from "@/components/forms/registerForm";

export default function RegisterScreen(){
    return (
     <SafeAreaView style={RegisterStyles.container}>
        <StatusBar barStyle="dark-content" />
         <View style={RegisterStyles.background}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={RegisterStyles.keyBoardAvoid}>
            <RegisterForm />
          </KeyboardAvoidingView>
         </View>
     </SafeAreaView>
    );
}