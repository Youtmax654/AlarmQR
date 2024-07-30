import { useState } from "react";
import { LayoutChangeEvent, View } from "react-native";
import AlarmList from "./AlarmList";
import AlarmTopTitle from "./AlarmTopTitle";

type Props = {};
const Alarms = ({}: Props) => {
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

export default Alarms;
