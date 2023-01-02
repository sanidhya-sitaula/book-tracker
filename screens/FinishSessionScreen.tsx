import { FontAwesome } from "@expo/vector-icons";
import { View, Text, StyleSheet, Image, Pressable, ActivityIndicator } from "react-native";
import { Card } from "../components/styled/Card";
import { ReadingSession } from "../models/ReadingSession";
import { Picker } from "react-native-wheel-pick";
import { useState } from "react";
import { Session } from "../models/Session";
import { addSession } from "../hooks/addSession";
import * as Haptics from "expo-haptics";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation";
import { BookContainer } from "../components/styled/BookContainer";
import { Book } from "../models/Book";

type FinishSessionProps = {
  route: {
    params: {
      readingSession: ReadingSession;
      book: Book
    };
  };
};
type Props = NativeStackScreenProps<RootStackParamList, "FinishSessionScreen">;

const getPickerData = () => {
  var data = [];
  for (let i: number = 1; i < 301; i++) {
    data.push(i.toLocaleString());
  }
  return data;
};

export const FinishSessionScreen = ({ route, navigation }: FinishSessionProps & Props) => {
  const readingSession = route.params.readingSession;
  const book = readingSession.book;
  const [pagesRead, setPagesRead] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

    readingSession.pages = pagesRead;

    setLoading(true);
    const addedSessionId = await addSession(readingSession);
    setLoading(false);
    if (addedSessionId) {
      navigation.navigate("SubmittedSessionScreen", {sessionId: addedSessionId.id, book: book});
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ margin: 20, flex: 1 }}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>your reading session</Text>
        </View>
        <View style = {{flex: 0.5}}>
        <View style={{ flex: 1, flexGrow: 1, flexDirection: "row", marginTop: 30}}>
          <View style={{ flex: 1, flexGrow: 1 }}>
              <Image source = {{uri: book.image}} style = {{flex: 1, borderRadius: 20, resizeMode : "contain"}} />
          </View>
          <View style={{ flex: 1, flexGrow: 1, flexDirection: "column", justifyContent: "space-between", alignItems: "center" }}>
            <View style = {{flex: 0.4, flexGrow: 0.4}}>
              <Card>
                <Text style={styles.headerText}>
                  {readingSession.startTime.toLocaleTimeString().slice(0, 5)}
                  {readingSession.startTime.toLocaleTimeString().slice(8)}
                </Text>
                <Text style={styles.headerSubtitleText}>{readingSession.startTime.toDateString()}</Text>
              </Card>
            </View>
            <View style = {{flex: 0.1, flexGrow: 0.1}}>
              <FontAwesome name="arrow-down" size={30} color="#BA6400" />
            </View>
            <View style = {{flex: 0.4, flexGrow: 0.4}}>
              <Card>
                <Text style={styles.headerText}>
                  {readingSession.endTime.toLocaleTimeString().slice(0, 5)}
                  {readingSession.endTime.toLocaleTimeString().slice(8)}
                </Text>
                <Text style={styles.headerSubtitleText}>{readingSession.endTime.toDateString()}</Text>
              </Card>
            </View>
          </View>
        </View>
        </View>
        <View
          style={{
            flex: 0.2,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 70,
            flexShrink: 0.3,
            flexGrow: 0.3,
          }}
        >
          <View style={{ flex: 1, flexShrink: 1 }}>
            <Text style={styles.headerText}>how many pages did you read</Text>
          </View>
          <View>
            <Picker
              style={{ backgroundColor: "#3d64a8", width: 200, height: 200, borderRadius: 10 }}
              selectedValue="1"
              pickerData={getPickerData()}
              onValueChange={(value) => {
                setPagesRead(Number.parseInt(value));
              }}
            />
          </View>
        </View>
        <View style={{ flex: 0.2 }}>
          <Pressable style={styles.readBookButtonContainer} onPress={handleSubmit}>
            <Text style={styles.headerText}>submit {loading && <ActivityIndicator color = "#ffffff" size = "small" />}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#030013",
  },
  headerContainer: {
    marginTop: 40,
  },
  headerText: {
    color: "#ffffff",
    fontFamily: "nunito-sans-bold",
    fontSize: 32,
    flexGrow: 0.3,
    flexWrap: "wrap",
  },
  headerSubtitleText: {
    color: "#AEADAD",
    fontFamily: "nunito-sans-regular",
    fontSize: 18,
    marginTop: 20,
  },
  bookDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    marginTop: 10,
  },
  bookImage: {
    width: undefined,
    height: undefined,
    aspectRatio: 1,
    borderRadius: 15,
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
    marginBottom: 10,
    flexGrow: 3,
    flex: 1,
    flexShrink: 3,
    flexWrap: "wrap",
  },
  bookCardContainer: {
    marginTop: 50,
    flex: 0.25,
  },
  readBookButtonContainer: {
    backgroundColor: "#BA6400",
    borderRadius: 16,
    padding: 20,
    flex: 0.6,
    width: 400,
    marginTop: 30,
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
  },
});
