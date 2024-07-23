// import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";
import { Suspense, useEffect } from "react";
import { Text, View } from "react-native";
import { Alarms } from "./components/alarms/Alarms";
import { Clock } from "./components/Clock";
import { NewAlarmBtn } from "./components/NewAlarmBtn";
import { useAlarmStore } from "./hooks/useAlarmStore";
import { initNotifications } from "./utils/notifications";

export default function App() {
  // NavigationBar.setBackgroundColorAsync("#f9f9f9");
  const { getAlarms } = useAlarmStore();

  const initApp = async () => {
    await getAlarms();
    await initNotifications();
  };

  useEffect(() => {
    initApp();
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
