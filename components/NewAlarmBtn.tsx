import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Pressable, Text, View } from "react-native";
import { addAlarm, useAlarmStore } from "../hooks/useAlarmStore";

type Props = {};
export const NewAlarmBtn = ({}: Props) => {
  const { alarms } = useAlarmStore();

  const handleNewAlarm = () => {
    DateTimePickerAndroid.open({
      value: new Date(),
      display: "default",
      onChange: (e, date) => {
        if (date && e.type === "set") {
          const hour = date.getHours();
          const minute = date.getMinutes();
          addAlarm(hour, minute, alarms ?? []);
        }
      },
      mode: "time",
    });
  };

  return (
    <View className="m-8 absolute bottom-8">
      <Pressable
        className="w-16 h-16 rounded-full bg-primary items-center justify-center"
        onPress={handleNewAlarm}
      >
        <Text className="text-white font-bold text-4xl">+</Text>
      </Pressable>
    </View>
  );
};
