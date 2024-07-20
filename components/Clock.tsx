import {
  Canvas,
  Circle,
  Group,
  Path,
  rect,
  Rect,
  Shadow,
  Skia,
} from "@shopify/react-native-skia";
import { useEffect, useState } from "react";
import { LayoutChangeEvent } from "react-native";
import { useDerivedValue } from "react-native-reanimated";

type Props = {};
export const Clock = ({}: Props) => {
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

type ClockFrameProps = {
  children?: React.ReactNode;
  x: number;
  y: number;
};
const ClockFrame = ({ children, x, y }: ClockFrameProps) => {
  const borderR = 101;
  const containerR = 88;

  return (
    <>
      <Group>
        <Shadow dx={-1} dy={-1} blur={1} color="#FFFFFF" />
        <Shadow dx={12} dy={12} blur={8} color="#A6B4C8" />
        <Circle cx={x} cy={y} r={borderR} color="#EEF0F5" />
      </Group>
      <Group>
        <Shadow dx={12} dy={12} blur={8} color="#A6B4C8" inner />
        <Shadow dx={-1} dy={-1} blur={1} color="#FFFFFF" inner />
        <Circle cx={x} cy={y} r={containerR} color="#EEF0F5" />
      </Group>
      {children}
    </>
  );
};

type MarkingsProps = {
  x: number;
  y: number;
};
const Markings = ({ x, y }: MarkingsProps) => {
  const northMark = rect(x - 1, y - 72.5, 2, 8);
  const southMark = rect(x - 1, y + 64.5, 2, 8);
  const westMark = rect(x - 72.5, y - 1, 8, 2);
  const eastMark = rect(x + 64.5, y - 1, 8, 2);

  return (
    <Group>
      <Rect rect={northMark} color="#A6B4C8" opacity={0.57} />
      <Rect rect={southMark} color="#A6B4C8" opacity={0.57} />
      <Rect rect={westMark} color="#A6B4C8" opacity={0.57} />
      <Rect rect={eastMark} color="#A6B4C8" opacity={0.57} />
    </Group>
  );
};

const Hands = ({ x, y }: { x: number; y: number }) => {
  const hourPath = Skia.Path.Make();
  hourPath.moveTo(x, y + 18);
  hourPath.lineTo(x, y - 42);

  const minutePath = Skia.Path.Make();
  minutePath.moveTo(x, y + 20);
  minutePath.lineTo(x, y - 55);

  const secondPath = Skia.Path.Make();
  secondPath.moveTo(x, y + 26);
  secondPath.lineTo(x, y - 65);
  secondPath.addRRect({ rect: rect(x - 1.5, y + 10, 3, 16), rx: 1.5, ry: 1.5 });

  const date = new Date();

  const [hours, setHours] = useState(
    (date.getHours() % 12) + date.getMinutes() / 60
  );
  const [minutes, setMinutes] = useState(
    date.getMinutes() + date.getSeconds() / 60
  );
  const [seconds, setSeconds] = useState(date.getSeconds());

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setHours((now.getHours() % 12) + now.getMinutes() / 60);
      setMinutes(now.getMinutes() + now.getSeconds() / 60);
      setSeconds(now.getSeconds());
    }, 1000);

    return () => clearInterval(interval);
  }, [hours, minutes, seconds]);

  const hourRotation = useDerivedValue(
    () => ((2 * Math.PI) / 12) * hours,
    [hours]
  );
  const minuteRotation = useDerivedValue(
    () => ((2 * Math.PI) / 60) * minutes,
    [minutes]
  );
  const secondRotation = useDerivedValue(
    () => ((2 * Math.PI) / 60) * (seconds + 2), // +2 to make the second hand ahead of the actual time
    [seconds]
  );

  return (
    <Group>
      <Group transform={[{ rotate: hourRotation.value }]} origin={{ x, y }}>
        <Path
          path={hourPath}
          color="#646E82"
          style="stroke"
          strokeWidth={3}
          strokeCap={"round"}
        />
        <Group>
          <Circle cx={x} cy={y} r={5} color="#646E82" />
          <Shadow dx={1} dy={1} blur={2} color="rgba(73, 84, 107, 0.57)" />
        </Group>
      </Group>
      <Group transform={[{ rotate: minuteRotation.value }]} origin={{ x, y }}>
        <Path
          path={minutePath}
          color="#646E82"
          style="stroke"
          strokeWidth={3}
          strokeCap={"round"}
        />
      </Group>
      <Group transform={[{ rotate: secondRotation.value }]} origin={{ x, y }}>
        <Path
          path={secondPath}
          color="#FD4538"
          style="stroke"
          strokeWidth={2}
          strokeCap={"round"}
        />
      </Group>
      <Group>
        <Circle cx={x} cy={y} r={3} color="#FD4538" />
        <Shadow dx={1} dy={1} blur={2} color="#49546B" />
      </Group>
    </Group>
  );
};
