import { Entypo } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { addAlarm, Alarm } from "../utils/Alarm";

type Props = {
  alarms: Alarm[] | undefined;
  setAlarms: (alarms: Alarm[]) => void;
};

export const Alarms = ({ alarms, setAlarms }: Props) => {
  const handleAlarmToggle = (id: string) => {
    if (!alarms) return;

    const newAlarms = alarms.map((alarm) =>
      alarm.id === id ? { ...alarm, active: !alarm.active } : alarm
    );
    setAlarms(newAlarms);
  };

  const handleNewAlarm = () => {
    const dummyHour = Math.floor(Math.random() * 24);
    const dummyMinute = Math.floor(Math.random() * 60);

    addAlarm(dummyHour, dummyMinute, alarms ?? []).then((newAlarms) =>
      setAlarms(newAlarms)
    );
  };

  return (
    <View className="w-full h-full items-center bg-slate-500">
      <View className="p-5 gap-6 items-center">
        <View className="flex-row justify-between items-center w-full px-10">
          <Text className="text-lg font-medium">Alarms</Text>
          <Entypo name="dots-three-horizontal" size={24} color="black" />
        </View>

        {alarms?.map((alarm) => (
          <View
            key={alarm.id}
            className="w-80 h-[75px] bg-slate-400 flex-row items-center justify-between px-4 rounded-[20px]"
          >
            <Text className="text-3xl font-medium">
              {alarm.hour + ":" + alarm.minute}
            </Text>
            <Slider alarm={alarm} handler={handleAlarmToggle} />
          </View>
        ))}
      </View>
      <NewAlarm handler={handleNewAlarm} />
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

type NewAlarmProps = {
  handler: () => void;
};
const NewAlarm = ({ handler }: NewAlarmProps) => {
  return (
    <View className="mt-8">
      <Pressable
        className="w-16 h-16 rounded-full bg-primary items-center justify-center"
        onPress={handler}
      >
        <Text className="text-white font-bold text-4xl">+</Text>
      </Pressable>
    </View>
  );
};
