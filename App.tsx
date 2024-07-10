// import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";
import { Suspense, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Alarms } from "./components/Alarms";
import { Clock } from "./components/Clock";
import { Alarm, getAlarms } from "./utils/Alarm";

export default function App() {
  // NavigationBar.setBackgroundColorAsync("#f9f9f9");

  const [alarms, setAlarms] = useState<Alarm[]>();

  useEffect(() => {
    const fetchData = async () => {
      const alarms = await getAlarms();
      setAlarms(alarms);
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
      <View className="items-center bg-light">
        <Clock />
        <Alarms alarms={alarms} setAlarms={setAlarms} />
        <StatusBar style="auto" />
      </View>
    </Suspense>
  );
}
