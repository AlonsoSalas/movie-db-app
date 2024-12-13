import { Stack } from "expo-router";
import { View, Text } from "react-native";
export default function Layout() {
  return (
    <View className="flex-1">
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "black" },
          headerTitle: "",
          headerLeft: () => (
            <Text className="text-white text-xl font-bold">Pop Movies</Text>
          ),
        }}
      />
    </View>
  );
}
