import { Text, View } from "react-native";

type Props = {};

export const Clock = ({}: Props) => {
  return (
    <View className="w-[203px] h-[203px] my-12 mx-20 bg-slate-500">
      <Text>Time: 13:00</Text>
    </View>
  );
};
