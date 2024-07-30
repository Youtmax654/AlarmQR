import { View } from "react-native";
import Alarms from "../components/alarms/Alarms";
import Clock from "../components/clock/Clock";
import NewAlarmBtn from "../components/NewAlarmBtn";

type Props = {};
const HomeScreen = ({}: Props) => {
  return (
    <View className="items-center bg-light h-full">
      <Clock />
      <Alarms />
      <NewAlarmBtn />
    </View>
  );
};

export default HomeScreen;
