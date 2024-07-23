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
import { useAlarmStore } from "../../hooks/useAlarmStore";
import Slider from "./Slider";

type Props = {};
export const Alarms = ({}: Props) => {
  const [canvasDimensions, setCanvasDimensions] = useState({
    width: 0,
    height: 0,
  });
  const { width } = canvasDimensions;

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setCanvasDimensions({ width, height });
  };

  return (
    <View className="w-full items-center bg-alarms-light flex-1 rounded-[20px]">
      <AlarmTopTitle handleLayout={handleLayout} width={width} />
      <AlarmList width={width} />
    </View>
  );
};

type AlarmTopTitleProps = {
  handleLayout: (event: LayoutChangeEvent) => void;
  width: number;
};
const AlarmTopTitle = ({ handleLayout, width }: AlarmTopTitleProps) => {
  const font = useFont(
    require("../../assets/fonts/poppins/Poppins-Medium.ttf"),
    18
  );

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
        className="absolute right-10 top-8"
        onPress={() => {
          alert("Options button");
        }}
      >
        <Entypo name="dots-three-horizontal" size={24} color="#646E82" />
      </Pressable>
    </>
  );
};

type AlarmListProps = {
  width: number;
};
const AlarmList = ({ width }: AlarmListProps) => {
  const { alarms, setAlarms } = useAlarmStore();
  const alarmWidth = width * 0.88;
  const alarmPosX = width / 2 - alarmWidth / 2;

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

  const hourFont = useFont(
    require("../../assets/fonts/poppins/Poppins-Medium.ttf"),
    34
  );

  return (
    <ScrollView
      className="w-full flex-1"
      contentContainerStyle={{
        alignItems: "center",
        paddingBottom: 30,
      }}
    >
      {alarms.length > 0 ? (
        alarms.map((alarm) => (
          <Pressable key={alarm.id} onPress={() => handleAlarmClick(alarm.id)}>
            <Canvas style={{ height: 105, width: alarmWidth + 50 }}>
              <Group>
                <RoundedRect
                  x={alarmPosX}
                  y={0}
                  height={75}
                  width={alarmWidth}
                  r={20}
                  color="#EAECF2"
                />
                <Shadow dx={1} dy={1} blur={1} color="#FFFFFF" inner />
                <Shadow dx={-1} dy={-1} blur={1} color="#BAC3CF" inner />
                <Shadow
                  dx={-5}
                  dy={-5}
                  blur={20}
                  color="rgba(255, 255, 255, 0.53)"
                />
                <Shadow
                  dx={8}
                  dy={12}
                  blur={8}
                  color="rgba(166, 180, 200, 0.57)"
                />
              </Group>
              <Group>
                <Text
                  x={alarmPosX + 20}
                  y={47.5}
                  text={
                    alarm.hour.toString().padStart(2, "0") +
                    ":" +
                    alarm.minute.toString().padStart(2, "0")
                  }
                  font={hourFont}
                  color="#646E82"
                  opacity={alarm.active ? 1 : 0.42}
                />
              </Group>
            </Canvas>
            <Slider
              top={6}
              right={45}
              alarm={alarm}
              handler={handleAlarmToggle}
            />
          </Pressable>
        ))
      ) : (
        <RNText className="text-xl font-medium text-[#646E82]">
          No alarms here
        </RNText>
      )}
    </ScrollView>
  );
};
