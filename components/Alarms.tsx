import { Entypo } from "@expo/vector-icons";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Alarm, useAlarmStore } from "../hooks/useAlarmStore";

type Props = {};

export const Alarms = ({}: Props) => {
  const { alarms, setAlarms } = useAlarmStore();

  const handleAlarmToggle = (id: string) => {
    if (!alarms) return;

    const newAlarms = alarms.map((alarm) =>
      alarm.id === id ? { ...alarm, active: !alarm.active } : alarm
    );
    setAlarms(newAlarms);
  };

  return (
    <View className="w-full items-center bg-slate-500 flex-1">
      <View className="flex-row justify-between items-center w-full px-12 py-6">
        <Text className="text-lg font-medium">Alarms</Text>
        <Entypo name="dots-three-horizontal" size={24} color="black" />
      </View>

      <ScrollView
        className="bg-slate-500 w-full"
        contentContainerStyle={{ alignItems: "center", gap: 30 }}
      >
        {alarms?.map((alarm) => (
          <View
            key={alarm.id}
            className="w-80 h-[75px] bg-slate-400 flex-row items-center justify-between px-4 rounded-[20px]"
          >
            <Text className="text-3xl font-medium">
              {alarm.hour + ":" + alarm.minute.toString().padStart(2, "0")}
            </Text>
            <Slider alarm={alarm} handler={handleAlarmToggle} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

type SliderProps = {
  alarm: Alarm;
  handler: (id: string) => void;
};
const Slider = ({ alarm, handler }: SliderProps) => {
  return (
    <Pressable
      className={`relative w-12 h-6 rounded-full flex justify-center ${
        alarm.active ? "bg-primary" : "bg-slate-500"
      }`}
      onPress={() => handler(alarm.id)}
    >
      <View
        className={`w-7 h-7 absolute bg-slate-300 rounded-full ${
          alarm.active ? "right-0" : "left-0"
        }`}
      ></View>
    </Pressable>
  );
};
