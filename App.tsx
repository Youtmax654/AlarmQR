// import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { Alarms } from "./components/Alarms";
import { Clock } from "./components/Clock";

export default function App() {
  // NavigationBar.setBackgroundColorAsync("#f9f9f9");

  return (
    <View className="items-center bg-light">
      <Clock />
      <Alarms />
      <StatusBar style="auto" />
    </View>
  );
}
