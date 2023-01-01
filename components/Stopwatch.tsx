import { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";

type StopWatchProps = {
    time: number;
    setTime: React.Dispatch<React.SetStateAction<number>>;
    running: boolean;
    setRunning: React.Dispatch<React.SetStateAction<boolean>>;
}


export const Stopwatch = ({ time, setTime, running, setRunning }: StopWatchProps) => {
 
  useEffect(() => {
    let interval: any;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  return (
    <View>
      <View>
        <Text style = {{color: "#fff"}}>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</Text>
        <Text style = {{color: "#fff"}}>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</Text>
      </View>
      <View style = {{flexDirection: "row"}}>
          <Button onPress = {() => setRunning(true)} title = "Start" color = "#fff" />
          <Button onPress = {() => setRunning(false)} title = "Stop"  color = "#fff" />
          <Button onPress={() => setTime(0)} title = "Reset"  color = "#fff" />       
      </View>
    </View>
  );
};
