import { Button, Text, View } from "react-native";
import { useAlarmStore } from "../hooks/useAlarmStore";
import { stopAlarmSound } from "../utils/sounds";
import { stopVibration } from "../utils/vibration";

type Props = {};
const WakeUpScreen = ({}: Props) => {
  const { setStatus } = useAlarmStore();

  const handleDismiss = () => {
    stopAlarmSound();
    stopVibration();
    setStatus("none");
  };

  return (
    <View className="items-center justify-center bg-light h-full">
      <Text>Wake up !</Text>
      <Button title="Dismiss" onPress={handleDismiss} />
    </View>
  );
};

export default WakeUpScreen;
