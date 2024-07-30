import { Entypo } from "@expo/vector-icons";
import {
  Canvas,
  Group,
  RoundedRect,
  Shadow,
  Text,
  useFont,
} from "@shopify/react-native-skia";
import { LayoutChangeEvent, Pressable } from "react-native";

type Props = {
  handleLayout: (event: LayoutChangeEvent) => void;
  width: number;
};

const AlarmTopTitle = ({ handleLayout, width }: Props) => {
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

export default AlarmTopTitle;
