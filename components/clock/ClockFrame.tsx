import { Circle, Group, Shadow } from "@shopify/react-native-skia";

type Props = {
  children?: React.ReactNode;
  x: number;
  y: number;
};

const ClockFrame = ({ children, x, y }: Props) => {
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

export default ClockFrame;
