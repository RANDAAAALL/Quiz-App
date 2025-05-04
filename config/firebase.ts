import { initializeApp } from "@firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  confirmPasswordReset,
  deleteUser,
  getAuth,
  // getReactNativePersistence,
  initializeAuth,
  sendPasswordResetEmail,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { Platform } from "react-native";
const { getReactNativePersistence } = require("firebase/auth") as any;

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

  const app =  initializeApp(firebaseConfig);

  let auth: any;

  if (Platform.OS !== "web") {
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } else {
    auth = getAuth(app);
  }

  const db = getFirestore(app);

export {
  app,
  auth, confirmPasswordReset, db,
  deleteUser,
  sendPasswordResetEmail
};

