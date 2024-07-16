import { Entypo } from "@expo/vector-icons";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Alarm, useAlarmStore } from "../src/hooks/useAlarmStore";

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

  const handleAlarmClick = (id: string) => {
    DateTimePickerAndroid.open({
      value: new Date(),
      display: "default",
      mode: "time",
      positiveButton: { label: "Set" },
      neutralButton: { label: "Delete", textColor: "red" },
      negativeButton: { label: "Cancel" },
      onChange: (e, date) => {
        if (date && e.type === "set") {
          const hour = date.getHours();
          const minute = date.getMinutes();
          const newAlarms = alarms.filter((alarm) => alarm.id !== id);
          setAlarms([...newAlarms, { id, hour, minute, active: true }]);
        } else if (e.type === "neutralButtonPressed") {
          const newAlarms = alarms.filter((alarm) => alarm.id !== id);
          setAlarms(newAlarms);
        } else if (e.type === "dismissed") {
          return;
        }
      },
    });
  };

  return (
    <View className="w-full items-center bg-slate-500 flex-1">
      <View className="flex-row justify-between items-center w-full px-12 py-6">
        <Text className="text-lg font-medium">Alarms</Text>
        <Entypo name="dots-three-horizontal" size={24} color="black" />
      </View>

      <ScrollView
        className="bg-slate-500 w-full h-full"
        contentContainerStyle={{
          alignItems: "center",
          gap: 30,
          paddingBottom: 30,
        }}
      >
        {alarms.length > 0 ? (
          alarms.map((alarm) => (
            <Pressable
              key={alarm.id}
              onPress={() => handleAlarmClick(alarm.id)}
              className="w-[88%] h-[75px] bg-slate-400 flex-row items-center justify-between px-4 rounded-[20px]"
            >
              <Text className="text-3xl font-medium">
                {alarm.hour.toString().padStart(2, "0") +
                  ":" +
                  alarm.minute.toString().padStart(2, "0")}
              </Text>
              <Slider alarm={alarm} handler={handleAlarmToggle} />
            </Pressable>
          ))
        ) : (
          <Text className="text-lg font-medium">No alarms here</Text>
        )}
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
