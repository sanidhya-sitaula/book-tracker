import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState, useEffect } from "react";
import { ImageBackground, View, StyleSheet, Text, ScrollView, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stop } from "react-native-svg";
import { Stopwatch } from "../components/Stopwatch";
import { Card } from "../components/styled/Card";
import { Book } from "../models/Book";
import * as Haptics from "expo-haptics";

import { RootStackParamList } from "../navigation";
import { ReadingSession } from "../models/ReadingSession";
import { FontAwesome } from "@expo/vector-icons";
import { BookContainer } from "../components/styled/BookContainer";

type ReadingScreenProps = {
  route: {
    params: {
      book: Book;
    };
  };
};

type Props = NativeStackScreenProps<RootStackParamList, "ReadingScreen">;

export const ReadingScreen = ({ route, navigation }: Props & ReadingScreenProps) => {
  const book = route.params.book;
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [startTime, setStartTime] = useState<Date>();
  const [endTime, setEndTime] = useState<Date>();
  const [started, setStarted] = useState(false);

  const onStartStopReadingPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setStarted(true);

    if (!running && !started) {
      setStartTime(new Date());
    }

    if (running) {
      setEndTime(new Date());
    }

    setRunning(!running);
  };

  const onFinishSessionPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    const readingSession: ReadingSession = {
      book: book,
      minutes: Number(
        Math.floor((time / 1000) % 60)
          .toString()
          .slice(-2)
      ),
      startTime: startTime!,
      endTime: endTime!,
    };
    navigation.navigate("SubmittedSessionScreen", {sessionId: "1", book: book });
    //navigation.navigate("FinishSessionScreen", { readingSession: readingSession, book: book });
  };

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
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1513112300738-bbb13af7028e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
      }}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>
              {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:{("0" + Math.floor((time / 1000) % 60)).slice(-2)}
            </Text>
          </View>
          <View style={{ flex: 0.4, flexGrow: 0.4, flexShrink: 0.8 , borderRadius: 20}}>
                <Image source=  {{uri: book.image}} style = {styles.bookImage}/>
          </View>
          <View style={{ flex: 0.3, flexGrow: 0.3, flexDirection: "row", justifyContent: "space-between" }}>
            <Pressable
              style={[styles.readBookButtonContainer, running ? { backgroundColor: "red", flex: 1.5 } : { backgroundColor: "#1B1C39", flex: 1.5 }]}
              onPress={() => {
                onStartStopReadingPress();
              }}
            >
              <Text style={styles.readBookButtonText}>
                {running ? (
                  <FontAwesome name="pause" color="#ffffff" size={20} />
                ) : started ? (
                  <FontAwesome name="forward" color="#ffffff" size={20} />
                ) : (
                  <FontAwesome name="play" color="#ffffff" size={20} />
                )}{" "}
              </Text>
            </Pressable>
            {started && !running && (
              <Pressable
                style={[styles.readBookButtonContainer, running ? { backgroundColor: "red" } : { backgroundColor: "#BA6400", flex: 1.5 }]}
                onPress={() => {
                  onFinishSessionPress();
                }}
              >
                <Text style={styles.readBookButtonText}>
                  <FontAwesome name="stop" color="#ffffff" size={20} />{" "}
                </Text>
              </Pressable>
            )}
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 25,
    justifyContent: "space-between",
    alignItems: "center"
  },
  timerContainer: {
    flex: 0.2,
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  bookCardContainer: {
    flex: 0.25,
  },
  timerText: {
    color: "#ffffff",
    fontFamily: "nunito-sans-bold",
    fontSize: 120,
    marginBottom: 10,
    flexGrow: 3,
    flex: 1,
    flexShrink: 3,
    flexWrap: "wrap",
  },
  bookImage: {
    width: undefined,
    height: undefined,
    aspectRatio: 1,
    flex: 1,
    alignSelf: "center",
    borderRadius: 25,
    resizeMode: "contain",
  },
  bookAuthorText: {
    color: "#ffffff",
    fontFamily: "nunito-sans-regular",
    fontSize: 17,
    flex: 1,
    flexWrap: "wrap",
    marginBottom: 10,
    flexShrink: 3,
    flexGrow: 3,
  },
  bookTitleText: {
    color: "#ffffff",
    fontFamily: "nunito-sans-bold",
    fontSize: 25,
    flexWrap: "wrap",
  },
  cardTopContainer: {
    display: "flex",
    flex: 0.3,
    flexShrink: 1,
    flexGrow: 1,
    flexDirection: "row",
  },
  imageContainer: {
    flex: 0.8,
  },
  cardTextContainer: {
    flex: 1,
    flexGrow: 1.5,
    width: 0,
    paddingLeft: 20,
    marginBottom: 30,
  },
  bookContainer: {
    flex: 0.8,
  },
  addNoteContainer: {
    flex: 0.4,
  },
  bookDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  readBookButtonContainer: {
    backgroundColor: "red",
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
  },
  readBookButtonText: {
    color: "#ffffff",
    fontFamily: "nunito-sans-bold",
    fontSize: 25,
  },
});
