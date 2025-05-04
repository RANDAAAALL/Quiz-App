import Setting from "@/components/dashboard/setting";
import { settingStyles } from "@/stylesheets/settingStyles";
import { SafeAreaView } from "react-native";

export default function SettingScreen(){
    return (
        <SafeAreaView style={settingStyles.container}>
        <Setting/>
        </SafeAreaView>
    );
}
