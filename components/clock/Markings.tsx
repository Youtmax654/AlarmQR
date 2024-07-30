import { Group, Rect, rect } from "@shopify/react-native-skia";

type Props = {
  x: number;
  y: number;
};
const Markings = ({ x, y }: Props) => {
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

export default Markings;
