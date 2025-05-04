import { auth } from "@/config/firebase";
import { drawerStyles } from "@/stylesheets/drawer-styles";
import useFetchFirestore from "@/utils/custom-hooks/useFetchFirestore";
import { Entypo, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { Image, Text, View } from "react-native";
import FeedbackScreen from "./feedbackScreen";
import LeaderboardScreen from "./leaderboardScreen";
import MainScreen from "./mainScreen";
import ProfileScreen from "./profileScreen";
import QuizHistoryScreen from "./quizhistoryScreen";
import SettingScreen from "./settingScreen";
const Drawer = createDrawerNavigator();

// Custom Drawer Content
function CustomDrawerContent(props: any) {
  const { tempData } = useFetchFirestore("profile_picture_setting");
  const router = useRouter();

  // and signOut current user's account on the firebase Auth
  // and navigate to the login screen
  const handleLogout = async () => {
    await auth.signOut();
    console.log("Logging out...");
    router.replace("/screens/login"); 
  };

  return (
    <>
     <DrawerContentScrollView {...props}>
     <View style={drawerStyles.imageContainer}>
      <>
      <Image 
      source={tempData ? {uri: tempData} : require('../../../assets/images/person_image_placeholder.png')}
      style={drawerStyles.profileImage}
      />
      <Text style={drawerStyles.textTitle}>
      {auth.currentUser?.email.length > 20 ? auth.currentUser?.email.slice(0, 15) + "..." : auth.currentUser?.email}
      </Text>
      </>
      </View>
      <DrawerItemList {...props} />
     <DrawerItem
      label="Logout"
      onPress={handleLogout}
      icon={({ color = "black", size = 15 }) => (
        <MaterialCommunityIcons name="logout" color={color} size={size} />
      )}
      />
     </DrawerContentScrollView>
    </>
  );
}

export default function DashboardDrawer() {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}
    screenOptions={{
      drawerType: 'slide',
      }}
    >
      <Drawer.Screen name="Home" component={MainScreen} 
      options={{
        drawerIcon: ({color = "black", size = 15}) => (
           <MaterialCommunityIcons name="home" color={color} size={size}/> 
        )
      }}/>
       <Drawer.Screen name="Profile" component={ProfileScreen} 
      options={{
        drawerIcon: ({color = "black", size = 15}) => (
           <Entypo name="user" color={color} size={size}/> 
        )
      }}/>
        <Drawer.Screen name="Leaderboard" component={LeaderboardScreen} 
      options={{
        drawerIcon: ({color = "black", size = 15}) => (
           <MaterialIcons name="leaderboard" size={size} color={color} /> 
        )
      }}/>
      <Drawer.Screen name="Quiz History" component={QuizHistoryScreen} 
      options={{
        drawerIcon: ({color = "black", size = 15}) => (
           <MaterialIcons name="history" size={size} color={color} /> 
        )
      }}/>
      <Drawer.Screen name="Feedback" component={FeedbackScreen} 
      options={{
        drawerIcon: ({color = "black", size = 15}) => (
          <MaterialIcons name="feedback" size={size} color={color} />
        )
      }}/>
       <Drawer.Screen name="Settings" component={SettingScreen} 
      options={{
        drawerIcon: ({color = "black", size = 15}) => (
          <MaterialIcons name="settings" size={size} color={color} />
        )
      }}/>
    </Drawer.Navigator>
  );
}