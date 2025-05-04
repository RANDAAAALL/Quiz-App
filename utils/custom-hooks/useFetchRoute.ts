import { auth } from "@/config/firebase";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import useInitializeApp from "./useInitializeApp";

export default function useFetchRoute(fetchName: string, methodName: string){
  const {isInitialize, stopInitialize} = useInitializeApp(true);
  const [ userData, setUserData] = useState<Record<string,string>>();
  
  useEffect(() => {
        const verifyUser = async () => {
          await new Promise((res) => setTimeout(res, 2000));     
          
          try {
          const user = auth.currentUser;
          
          // for web-users
          if (!user) {
            console.log("Unauthorized: not logged in, redirecting to login...");
            router.replace(`/auth/404` as any);
            return;
          }
    
            const idToken = await user?.getIdToken();
    
            // make a request to the server
            const response = await fetch(`http://${process.env.EXPO_PUBLIC_FETCH_NETWORK_ADDRESS}:3000/auth/dashboard/${fetchName}`, {
              method: `${methodName}`,
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${idToken}`,
              },
            });
            
            const data = await response.json();
    
            if ([401, 402, 403].includes(data.status)) {
              console.log(`Unauthorized: ${data.status}, redirecting...`);
              router.replace(`/auth/${String(data?.status)}` as any);
            } else {
                console.log("Authorized User: ", user);
                setUserData({ email: data?.UserEmailFromServer, message: data?.message });
                stopInitialize();
            }
    
          } catch (error) {
            console.log("Error: ", error);
            router.replace("/screens/login");
          } finally {
            stopInitialize(); 
          }
        }
        verifyUser();
    },[]);

    return {isInitialize, userData};
}