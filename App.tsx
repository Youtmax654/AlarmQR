// import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { useAlarmStore } from "./hooks/useAlarmStore";
import HomeScreen from "./pages/HomeScreen";
import WakeUpScreen from "./pages/WakeUpScreen";
import { initNotifications } from "./utils/notifications";
import { initAudio } from "./utils/sounds";

export default function App() {
  // NavigationBar.setBackgroundColorAsync("#f9f9f9");
  const { status, setStatus, getAlarms } = useAlarmStore();

  const initApp = async () => {
    await getAlarms();
    await initNotifications(setStatus);
    await initAudio();
  };

  useEffect(() => {
    initApp();
  }, []);

  return (
    <>
      {status === "none" ? <HomeScreen /> : <WakeUpScreen />}
      <StatusBar style="auto" />
    </>
  );
}
