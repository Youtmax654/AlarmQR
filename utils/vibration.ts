import * as Haptics from "expo-haptics";

let interval: NodeJS.Timeout;

export const vibrate = async () => {
  if (interval) {
    clearInterval(interval);
  }

  interval = setInterval(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  }, 1000);
};

export const stopVibration = () => {
  clearInterval(interval);
};
