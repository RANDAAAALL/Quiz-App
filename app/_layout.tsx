import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="index" options={{headerShown: false}} />
      <Stack.Screen name="screens/login" options={{ title: "Login" }} />
      <Stack.Screen name="screens/register" options={{ title: "Register" }} />
      <Stack.Screen name="screens/reset-password" options={{ title: "Reset Password" }} />
      <Stack.Screen name="auth/dashboard" options={{headerShown: false, headerLeft: () => null }} />
      <Stack.Screen name="auth/[status]" options={{ title: "Unauthorized"}} />
    </Stack>
  );
  // return <Slot />;
}
