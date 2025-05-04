import Main from "@/components/dashboard/main";
import { mainScreenStyles } from "@/stylesheets/main-screenStyles";
import { useState } from "react";
import { SafeAreaView } from "react-native";

export default function MainScreen() {
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const handleRefresh = () => setRefreshKey(prev => prev+1);

  return (
    <SafeAreaView style={mainScreenStyles.container}>
      <Main refresh={handleRefresh} key={refreshKey} />
     </SafeAreaView>
  );
}
