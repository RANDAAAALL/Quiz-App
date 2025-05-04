import { statusStyles } from "@/stylesheets/statusStyles";
import { useRoute } from "@react-navigation/native";
import { View, Text } from "react-native";

export default function UnauthorizedScreen() {
  const route = useRoute();
  const { status } = route.params as { status: string };

  const statusCode = Number(status);

  return (
    <View style={statusStyles.container}>
      <Text style={statusStyles.textTile}>{statusCode} Unauthorized!</Text>
    </View>
  );
}
