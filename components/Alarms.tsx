import { Entypo } from "@expo/vector-icons";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import {
  Canvas,
  Group,
  RoundedRect,
  Shadow,
  Text,
  useFont,
} from "@shopify/react-native-skia";
import { useState } from "react";
import {
  LayoutChangeEvent,
  Pressable,
  Text as RNText,
  ScrollView,
  View,
} from "react-native";
import { useAlarmStore } from "../hooks/useAlarmStore";
import { Alarm } from "../utils/alarm";

type Props = {};
export const Alarms = ({}: Props) => {
  return (
    <View className="w-full items-center bg-alarms-light flex-1 rounded-[20px]">
      <AlarmTopTitle />
      <AlarmList />
    </View>
  );
};

const AlarmTopTitle = () => {
  const [canvasDimensions, setCanvasDimensions] = useState({
    width: 0,
    height: 0,
  });
  const { width } = canvasDimensions;

  const font = useFont(
    require("../assets/fonts/poppins/Poppins-Medium.ttf"),
    18
  );

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setCanvasDimensions({ width, height });
  };

  return (
    <>
      <Canvas style={{ height: 80, width: "100%" }} onLayout={handleLayout}>
        <Group>
          <RoundedRect
            x={0}
            y={1}
            height={50}
            width={width}
            r={20}
            color="#EAECF1"
          />
          <Shadow dx={-1} dy={-1} blur={1} color="#FFFFFF" />
          <Text x={50} y={50} text="Alarms" font={font} color="#646E82" />
        </Group>
      </Canvas>
      <Pressable
        className="absolute right-10 top-9"
        onPress={() => {
          alert("Options button");
        }}
      >
        <Entypo name="dots-three-horizontal" size={24} color="#646E82" />
      </Pressable>
    </>
  );
};

const AlarmList = () => {
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

  const Slider = ({ alarm }: { alarm: Alarm }) => {
    return (
      <Pressable
        className={`relative w-12 h-6 rounded-full flex justify-center ${
          alarm.active ? "bg-primary" : "bg-slate-500"
        }`}
        onPress={() => handleAlarmToggle(alarm.id)}
      >
        <View
          className={`w-7 h-7 absolute bg-slate-300 rounded-full ${
            alarm.active ? "right-0" : "left-0"
          }`}
        ></View>
      </Pressable>
    );
  };

  return (
    <ScrollView
      className="w-full h-full"
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
            <RNText className="text-3xl font-medium">
              {alarm.hour.toString().padStart(2, "0") +
                ":" +
                alarm.minute.toString().padStart(2, "0")}
            </RNText>
            <Slider alarm={alarm} />
          </Pressable>
        ))
      ) : (
        <RNText className="text-lg font-medium">No alarms here</RNText>
      )}
    </ScrollView>
  );
};
