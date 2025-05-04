import React, { useEffect } from "react";
import {Text, View, TouchableOpacity, SafeAreaView, StatusBar, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { paths } from "@/utils/paths";
import { indexStyles } from "@/stylesheets/indexStyles";
import { auth } from "@/config/firebase";
import useInitializeApp from "@/utils/custom-hooks/useInitializeApp";
import useListenerState from "@/utils/custom-hooks/useListenerState";

// Randall 
// ADV 102 Final Project
// Status: Done
// Started: March 28, 2025
// Finished: April 17, 2025

export default function MainScreen() {
   const {isInitialize, stopInitialize } = useInitializeApp(true);
   const { isListenerActive, disableListener } = useListenerState();

  useEffect(() => {
    disableListener();
    if(!isListenerActive) return;
    
    const render = auth.onAuthStateChanged(async (user: any) => {
      await new Promise(res => setTimeout(res,2000));
      
      // navigate to the login, if user wasn't logged in
      if(user){
        // navigate to the mainSCreen, if user is currently logged in
        router.push("/auth/dashboard/mainScreen");
        return;
      }
      
      stopInitialize();
      
  });

      return () => render();
  }, [isInitialize]);

  return (
    <SafeAreaView style={indexStyles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={indexStyles.background}>
        {isInitialize ? (
          <ActivityIndicator style={indexStyles.indicatorContainer} size="large" color="black"/> 
        ) : (
          <View style={indexStyles.contentContainer}>
            <View style={indexStyles.titleContainer}>
              <Text style={indexStyles.title}>QuizApp</Text>
              <Text style={indexStyles.subtitle}>Test your knowledge</Text>
            </View>
            <View style={indexStyles.buttonContainer}>
              {paths.map((path, i) => ( 
                <TouchableOpacity
                key={i}
                style={indexStyles.button}
                onPress={() => path.route && router.push(path.route)
                }>
                  <Text style={indexStyles.buttonText}>{path.routeTitle}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
