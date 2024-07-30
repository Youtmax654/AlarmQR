import { Canvas } from "@shopify/react-native-skia";
import { useState } from "react";
import { LayoutChangeEvent } from "react-native";
import ClockFrame from "./ClockFrame";
import Hands from "./Hands";
import Markings from "./Markings";

type Props = {};
const Clock = ({}: Props) => {
  const [canvasDimensions, setCanvasDimensions] = useState({
    width: 0,
    height: 0,
  });

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setCanvasDimensions({ width, height });
  };

  const { width, height } = canvasDimensions;
  const x = width / 2;
  const y = height / 2;

  return (
    <Canvas
      style={{ height: 203, width: "100%", paddingVertical: 150 }}
      onLayout={handleLayout}
    >
      <ClockFrame x={x} y={y}>
        <Markings x={x} y={y} />
        <Hands x={x} y={y} />
      </ClockFrame>
    </Canvas>
  );
};

export default Clock;
