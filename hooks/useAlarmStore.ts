import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { create } from "zustand";

export type Alarm = {
  id: string;
  hour: number;
  minute: number;
  active: boolean;
};

interface AlarmStore {
  alarms: Alarm[];
  setAlarms: (alarms: Alarm[]) => void;
}

export const useAlarmStore = create<AlarmStore>((set) => ({
  alarms: [],
  setAlarms: (alarms: Alarm[]) => set({ alarms }),
}));

export async function getAlarms() {
  try {
    const alarms = await AsyncStorage.getItem("alarms");
    useAlarmStore.setState({ alarms: alarms ? JSON.parse(alarms) : [] });
  } catch (e) {
    console.error(e);
  }
}

export async function addAlarm(hour: number, minute: number, alarms: Alarm[]) {
  if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
    console.error("Invalid time");
  }

  const id = uuid.v4().toString();
  const newAlarm = { id, hour, minute, active: true };

  try {
    await AsyncStorage.setItem("alarms", JSON.stringify([...alarms, newAlarm]));
    useAlarmStore.setState({ alarms: [...alarms, newAlarm] });
  } catch (e) {
    console.error(e);
  }
}

// export function setAlarm(hour: number, minute: number, enabled: boolean) {
//   const alarm = new Date();
//   alarm.setHours(hour);
//   alarm.setMinutes(minute);
//   alarm.setSeconds(0);

//   if (enabled) {
//     if (alarm.getTime() < Date.now()) {
//       alarm.setDate(alarm.getDate() + 1);
//     }

//     const alarmId = Notifications.scheduleNotificationAsync({
//       content: {
//         title: "Alarm",
//         body: "Wake up!",
//       },
//       trigger: alarm,
//     });

//     return alarmId;
//   }
// }
