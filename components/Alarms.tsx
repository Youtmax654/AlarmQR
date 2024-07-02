import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

const dummyAlarms: Alarm[] = [
  { id: 1, time: "12:00", active: true },
  { id: 2, time: "12:00", active: true },
  { id: 3, time: "12:00", active: true },
];

type Props = {};
export const Alarms = ({}: Props) => {
  const [alarmsList, setAlarmsList] = useState<Alarm[]>(dummyAlarms);

  const handleAlarmToggle = (id: number) => {
    setAlarmsList((prev) =>
      prev.map((alarm) =>
        alarm.id === id ? { ...alarm, active: !alarm.active } : alarm
      )
    );
  };

  return (
    <View className="w-full h-full items-center bg-slate-500">
      <View className="p-5 gap-6 items-center">
        <View className="flex-row justify-between items-center w-full px-10">
          <Text className="text-lg font-medium">Alarms</Text>
          <Entypo name="dots-three-horizontal" size={24} color="black" />
        </View>

        {alarmsList.map((alarm) => (
          <View
            key={alarm.id}
            className="w-80 h-[75px] bg-slate-400 flex-row items-center justify-between px-4 rounded-[20px]"
          >
            <Text className="text-3xl font-medium">{alarm.time}</Text>
            <Slider alarm={alarm} handler={handleAlarmToggle} />
          </View>
        ))}
      </View>
      <NewAlarm />
    </View>
  );
};

type SliderProps = {
  alarm: Alarm;
  handler: (id: number) => void;
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

const NewAlarm = () => {
  return (
    <View className="mt-8">
      <Pressable className="w-16 h-16 rounded-full bg-primary items-center justify-center">
        <Text className="text-white font-bold text-4xl">+</Text>
      </Pressable>
    </View>
  );
};

export type Alarm = {
  id: number;
  time: string;
  active: boolean;
};
