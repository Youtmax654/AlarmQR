import { Pressable, Text, View } from "react-native";
import { addAlarm, useAlarmStore } from "../hooks/useAlarmStore";

type Props = {};
export const NewAlarmBtn = ({}: Props) => {
  const { alarms } = useAlarmStore();

  const handleNewAlarm = () => {
    const dummyHour = Math.floor(Math.random() * 24);
    const dummyMinute = Math.floor(Math.random() * 60);

    addAlarm(dummyHour, dummyMinute, alarms ?? []);
  };

  return (
    <View className="mt-8">
      <Pressable
        className="w-16 h-16 rounded-full bg-primary items-center justify-center"
        onPress={handleNewAlarm}
      >
        <Text className="text-white font-bold text-4xl">+</Text>
      </Pressable>
    </View>
  );
};
