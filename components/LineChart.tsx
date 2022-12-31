import { LineChart } from "react-native-chart-kit";
import { View, Text, Dimensions } from "react-native";

const line = {
  labels: ["", "", "", "", "", "", ""],
  datasets: [
    {
      data: [30, 35, 20, 0, 60, 20],
      strokeWidth: 2, // optional
    },
  ],
};

export const Chart = () => {
  return (
    <View>
      <LineChart
        data={line}
        width={380} // from react-native
        height={170}
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
            flex: 1,
          },
        }}
        getDotColor={() => "#BA6400"}
        transparent={true}
        withInnerLines={false}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
          flex: 1,
          marginLeft:-30

        }}
      />
    </View>
  );
};
