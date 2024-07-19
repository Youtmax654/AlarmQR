import { Canvas, Circle, Group, Shadow } from "@shopify/react-native-skia";
import { useState } from "react";
import { LayoutChangeEvent, Text } from "react-native";

type Props = {};
export const Clock = ({}: Props) => {
  return (
    <ClockFrame>
      <Text>Salut</Text>
    </ClockFrame>
  );
};

type ClockFrameProps = {
  children: React.ReactNode;
};
const ClockFrame = ({ children }: ClockFrameProps) => {
  const [canvasDimensions, setCanvasDimensions] = useState({
    width: 0,
    height: 0,
  });

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setCanvasDimensions({ width, height });
  };

  const { width, height } = canvasDimensions;
  const borderR = 101;
  const containerR = 88;
  const cx = width / 2;
  const cy = height / 2;

  return (
    <Canvas style={{ flex: 1, width: "100%" }} onLayout={handleLayout}>
      <Group>
        <Shadow dx={-1} dy={-1} blur={1} color="#FFFFFF" />
        <Shadow dx={12} dy={12} blur={8} color="#A6B4C8" />
        <Circle cx={cx} cy={cy} r={borderR} color="#EEF0F5" />
      </Group>
      <Group>
        <Shadow dx={12} dy={12} blur={8} color="#A6B4C8" inner />
        <Shadow dx={-1} dy={-1} blur={1} color="#FFFFFF" inner />
        <Circle cx={cx} cy={cy} r={containerR} color="#EEF0F5" />
      </Group>
    </Canvas>
  );
};
