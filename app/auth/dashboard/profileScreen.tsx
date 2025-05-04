import { SafeAreaView } from "react-native";
import { profileScreenStyles } from "@/stylesheets/profile-screenStyles";
import Profile from "@/components/dashboard/profile";

export default function ProfileScreen(){
    return (
    // containers
    <SafeAreaView style={profileScreenStyles.container}>
    <Profile/>
    </SafeAreaView>
  );
};