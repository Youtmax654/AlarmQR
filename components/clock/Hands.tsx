import {
  Circle,
  Group,
  Path,
  rect,
  Shadow,
  Skia,
} from "@shopify/react-native-skia";
import { useEffect, useState } from "react";
import { useDerivedValue } from "react-native-reanimated";

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

export default Hands;
