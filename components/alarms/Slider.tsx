import {
  Canvas,
  Circle,
  Group,
  RoundedRect,
  Shadow,
} from "@shopify/react-native-skia";
import { Pressable } from "react-native";
import { Alarm } from "../../utils/alarm";

type Props = {
  top: number;
  right: number;
  alarm: Alarm;
  handler: (id: string) => void;
};
const Slider = ({ top, right, alarm, handler }: Props) => {
  return (
    <Pressable
      onPress={() => handler(alarm.id)}
      className="absolute"
      style={{ top, right }}
    >
      {alarm.active ? (
        <Canvas style={{ width: 60, height: 60 }}>
          <Group>
            <RoundedRect
              x={17}
              y={23}
              height={14}
              width={33}
              r={40}
              color="#FE4B3D"
            />
            <Shadow
              dx={1.6}
              dy={1.3}
              blur={1.98}
              color="rgba(0, 0, 0, 0.2)"
              inner
            />
            <Shadow dx={2} dy={2} blur={5} color="rgba(253, 37, 30, 0.35)" />
          </Group>
          <Group>
            <Circle r={10.5} cx={43} cy={30} color="#EAEDF2" />
            <Shadow dx={-1} dy={-1} blur={1} color="#C0CAD7" inner />
            <Shadow dx={1} dy={1} blur={1} color="#FAFBFB" inner />
            <Shadow dx={3} dy={3} blur={3} color="rgba(166, 180, 200, 0.65)" />
          </Group>
        </Canvas>
      ) : (
        <Canvas style={{ width: 60, height: 60 }}>
          <Group>
            <RoundedRect
              x={17}
              y={23}
              height={14}
              width={33}
              r={40}
              color="#C0CAD7"
            />
            <Shadow dx={1} dy={-1} blur={1} color="#FDFDFE" inner />
            <Shadow dx={-1} dy={1} blur={1} color="#BAC3CF" inner />
            <Shadow
              dx={1.6}
              dy={1.3}
              blur={1.98}
              color="rgba(99, 116, 139, 0.2)"
              inner
            />
          </Group>
          <Group>
            <Circle r={10.5} cx={23} cy={30} color="#EAEDF2" />
            <Shadow dx={-1} dy={-1} blur={1} color="#C0CAD7" inner />
            <Shadow dx={1} dy={1} blur={1} color="#FAFBFB" inner />
            <Shadow dx={3} dy={3} blur={3} color="rgba(166, 180, 200, 0.65)" />
          </Group>
        </Canvas>
      )}
    </Pressable>
  );
};

export default Slider;
