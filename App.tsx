// import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";
import { Suspense, useEffect } from "react";
import { Text, View } from "react-native";
import { Alarms } from "./components/Alarms";
import { Clock } from "./components/Clock";
import { NewAlarmBtn } from "./components/NewAlarmBtn";
import { getAlarms } from "./hooks/useAlarmStore";

export default function App() {
  // NavigationBar.setBackgroundColorAsync("#f9f9f9");

  useEffect(() => {
    const fetchData = async () => {
      await getAlarms();
    };
    fetchData();
  }, []);

  return (
    <Suspense
      fallback={
        <View>
          <Text>Loading...</Text>
        </View>
      }
    >
      <View className="items-center bg-light h-full">
        <Clock />
        <Alarms />
        <NewAlarmBtn />
        <StatusBar style="auto" />
      </View>
    </Suspense>
  );
}
