import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { create } from "zustand";
import { Alarm } from "../utils/alarm";
import { scheduleAlarmNotification } from "../utils/notifications";

interface AlarmStore {
  alarms: Alarm[];
  setAlarms: (alarms: Alarm[]) => void;
  getAlarms: () => Promise<void>;
  addAlarm: (hour: number, minute: number, alarms: Alarm[]) => Promise<void>;
  removeAlarm: (id: string, alarms: Alarm[]) => Promise<void>;
}

export const useAlarmStore = create<AlarmStore>((set) => ({
  alarms: [],
  setAlarms: (alarms: Alarm[]) => {
    set({ alarms });
    AsyncStorage.setItem("alarms", JSON.stringify(alarms));
  },
  getAlarms: () => getAlarms(),
  addAlarm: (hour: number, minute: number, alarms: Alarm[]) =>
    addAlarm(hour, minute, alarms),
  removeAlarm: (id: string, alarms: Alarm[]) => removeAlarm(id, alarms),
}));

async function getAlarms() {
  try {
    const alarms = await AsyncStorage.getItem("alarms");
    const parsedAlarms: Alarm[] = alarms ? JSON.parse(alarms) : [];
    const sortedAlarms = parsedAlarms.sort((a, b) => {
      return a.hour * 60 + a.minute - (b.hour * 60 + b.minute);
    });

    useAlarmStore.setState({ alarms: alarms ? sortedAlarms : [] });
  } catch (e) {
    console.error(e);
  }
}

async function addAlarm(hour: number, minute: number, alarms: Alarm[]) {
  if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
    console.error("Invalid time");
  }

  const id = uuid.v4().toString();
  const newAlarm = { id, hour, minute, active: true };

  scheduleAlarmNotification(hour, minute);

  try {
    await AsyncStorage.setItem("alarms", JSON.stringify([...alarms, newAlarm]));
    const newAlarms = alarms ? [...alarms, newAlarm] : [newAlarm];
    const sortedAlarms = newAlarms.sort((a, b) => {
      return a.hour * 60 + a.minute - (b.hour * 60 + b.minute);
    });

    useAlarmStore.setState({ alarms: sortedAlarms });
  } catch (e) {
    console.error(e);
  }
}

async function removeAlarm(id: string, alarms: Alarm[]) {
  try {
    const newAlarms = alarms.filter((alarm) => alarm.id !== id);
    await AsyncStorage.setItem("alarms", JSON.stringify(newAlarms));
    useAlarmStore.setState({ alarms: newAlarms });
  } catch (e) {
    console.error(e);
  }
}
