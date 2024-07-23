import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import {
  Canvas,
  Circle,
  Group,
  LinearGradient,
  Shadow,
  Text,
  useFont,
} from "@shopify/react-native-skia";
import { Pressable } from "react-native";
import { useAlarmStore } from "../hooks/useAlarmStore";

type Props = {};
export const NewAlarmBtn = ({}: Props) => {
  const { alarms, addAlarm } = useAlarmStore();

  const font = useFont(
    require("../assets/fonts/poppins/Poppins-Medium.ttf"),
    36
  );

  const handleNewAlarm = async () => {
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
    <Pressable onPress={handleNewAlarm} className="absolute bottom-8">
      <Canvas style={{ height: 170, width: 200 }}>
        <Group>
          <Circle cx={100} cy={100} r={45} />
          <LinearGradient
            colors={["#DBE0EA", "#E6E9EF"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 150, y: 150 }}
          />
          <Shadow dx={5} dy={5} blur={5} color="rgba(0, 0, 0, 0.25)" />
          <Shadow dx={-5} dy={-5} blur={5} color="rgba(255, 255, 255, 0.25)" />
        </Group>
        <Group>
          <Circle cx={100} cy={100} r={35} />
          <LinearGradient
            colors={["#A6B4C8", "#768FB1"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 150, y: 150 }}
          />
        </Group>
        <Group>
          <Circle cx={100} cy={100} r={33} />
          <LinearGradient
            colors={["#FFA294", "#E5120A"]}
            start={{ x: 70, y: 80 }}
            end={{ x: 150, y: 150 }}
          />
          <Shadow dx={5} dy={5} blur={7} color="rgba(253, 37, 30, 0.35)" />
          <Shadow dx={-5} dy={-5} blur={7} color="rgba(255, 255, 255, 0.6)" />
        </Group>
        <Group>
          <Circle cx={100} cy={100} r={30} />
          <LinearGradient
            colors={["#FD251E", "#FF907E"]}
            start={{ x: 70, y: 70 }}
            end={{ x: 110, y: 110 }}
          />
        </Group>
        <Text x={87} y={112} text="+" color="#FFFFFF" font={font} />
      </Canvas>
    </Pressable>
  );
};
