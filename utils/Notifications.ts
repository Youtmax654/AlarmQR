import * as Notifications from "expo-notifications";
import { Status } from "./alarm";
import { playAlarmSound } from "./sounds";
import { vibrate } from "./vibration";

export async function initNotifications(setStatus: (status: Status) => void) {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") {
    alert("You need to enable notifications to use this app.");
    return;
  }

  const subscription = Notifications.addNotificationReceivedListener(
    (notification) => {
      if (notification.request.identifier === ALARM) {
        playAlarmSound();
        vibrate();
        setStatus("ringing");
        console.log("Alarm notification received");
      }
    }
  );

  return () => subscription.remove();
}

const ALARM = "alarm";
const REMINDER = "reminder";

export async function scheduleAlarmNotification(hour: number, minute: number) {
  const trigger = new Date();
  trigger.setHours(hour, minute, 0, 0);

  await Notifications.scheduleNotificationAsync({
    identifier: ALARM,
    content: {
      title: "Alarm",
      body: "Wake up!",
      sticky: true,
      autoDismiss: false,
      sound: false,
    },
    trigger,
  });
}

export async function scheduleAlarmReminderNotification(
  hour: number,
  minute: number
) {
  const trigger = new Date();
  trigger.setHours(hour, minute - 30, 0, 0);

  await Notifications.scheduleNotificationAsync({
    identifier: REMINDER,
    content: {
      title: "Alarm is set",
      body: `An alarm is set for ${hour}:${minute}`,
    },
    trigger,
  });
}
