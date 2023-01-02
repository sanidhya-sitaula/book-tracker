import { Book } from "../models/Book";
import { View, Text, ScrollView, StyleSheet, Image, Pressable, ImageBackground } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Card } from "../components/styled/Card";
import { useEffect, useState } from "react";
import { Chart } from "../components/LineChart";
import * as Haptics from "expo-haptics";
import { useSessionsByBookId } from "../hooks/useSessions";
import { ChartData } from "react-native-chart-kit/dist/HelperTypes";
import { getChartDataByBook } from "../utils/ChartData";
import { getAveragePagesPerDay, getTotalDaysRead, getTotalMinsRead } from "../utils/BookDetailsData";
import { useNotesByBook } from "../hooks/useNotes";

type BookDetailsScreenProps = {
  route: {
    params: {
      book: Book;
    };
  };
};

type BookDetailStatData = {
  totalMinutesRead: number;
  totalDaysSpend: number;
  averagePages: number;
  totalNotes: number;
};

type TabsProps = "notes" | "statistics";

type Props = NativeStackScreenProps<RootStackParamList, "BookDetailsScreen">;

export const BookDetailsScreen = ({ route, navigation }: Props & BookDetailsScreenProps) => {
  const book = route.params.book;
  const progress = Math.floor((book.current_page / book.pages) * 100);
  const [chartData, setChartData] = useState<ChartData>();
  const [bookDetailStatData, setBookDetailStatData] = useState<BookDetailStatData>();

  const sessions = useSessionsByBookId(book.id!);
  const notes = useNotesByBook(book.id!);

  const handleStartReadingOnPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    navigation.navigate("ReadingScreen", { book: book });
  };

  useEffect(() => {
    if (sessions) {
      setChartData(getChartDataByBook(sessions));
    }
  }, [sessions]);

  useEffect(() => {
    if (sessions) {
      var result: BookDetailStatData = {
        totalMinutesRead: getTotalMinsRead(sessions),
        totalDaysSpend: getTotalDaysRead(sessions),
        averagePages: Math.ceil(getAveragePagesPerDay(sessions, book.current_page)),
        totalNotes: 5,
      };
      setBookDetailStatData(result);
    }
  }, [sessions]);

  const [activeTab, setActiveTab] = useState<TabsProps>("statistics");

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView style={{ marginTop: 40, marginLeft: 20, marginRight: 20 }}>
        <FontAwesome name="angle-left" size={30} color="#BA4600" style={{ marginBottom: 20, marginLeft: 20 }} onPress={() => navigation.pop()} />
        <View style={styles.bookContainer}>
          <View style={{ flex: 0.8 }}>
            <Image source={{ uri: book.image }} style={styles.bookImage} />
          </View>
          <View style={{ flexShrink: 1 }}>
            <Text style={styles.bookTitleText}>{book.name}</Text>
            <Text style={styles.bookAuthorText}>{book.author}</Text>
            <Text style={styles.bookAuthorText}>{book.genre}</Text>
            <Text style={styles.bookAuthorText}>{book.pages} pages</Text>
          </View>
        </View>
        {book.current_page !== book.pages ? (
          <View style={styles.readBookContainer}>
            <Pressable style={styles.readBookButtonContainer} onPress={() => handleStartReadingOnPress()}>
              <Text style={styles.readBookButtonText}>read this book</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.readBookContainer}>
            <Pressable style={styles.readBookButtonContainer}>
              <Text style={styles.readBookButtonText}>book complete!</Text>
            </Pressable>
          </View>
        )}

        <View style={styles.progressDetailsContainer}>
          <Card>
            <View style={styles.progressDetailsCardContainer}>
              <AnimatedCircularProgress size={100} width={10} fill={progress} tintColor="#BA6400" backgroundColor="#3d5875">
                {(fill) => <Text style={[styles.bookAuthorText, { marginTop: 30, fontFamily: "nunito-sans-bold" }]}>{progress}%</Text>}
              </AnimatedCircularProgress>
              <View style={{ flexShrink: 1, marginLeft: 50 }}>
                <Text style={styles.bookTitleText}>page {book.current_page}</Text>
                <Text style={styles.bookAuthorText}>added {new Date(book.date_added.toDate()).toDateString()}</Text>
                {book.last_read !== undefined && (
                  <Text style={styles.bookAuthorText}>last read {new Date(book.last_read.toDate()).toDateString()}</Text>
                )}
              </View>
            </View>
          </Card>
        </View>
        <View style={styles.tabsContainer}>
          <Pressable
            style={[activeTab === "statistics" ? styles.activeTabContainer : styles.inactiveTabContainer, styles.leftTab]}
            onPress={() => setActiveTab("statistics")}
          >
            <Text style={activeTab === "statistics" ? styles.activeTabText : styles.inactiveTabText}>statistics</Text>
          </Pressable>
          <Pressable
            style={[activeTab === "notes" ? styles.activeTabContainer : styles.inactiveTabContainer, styles.rightTab]}
            onPress={() => setActiveTab("notes")}
          >
            <Text style={activeTab === "notes" ? styles.activeTabText : styles.inactiveTabText}>notes</Text>
          </Pressable>
        </View>
        <View>
          {activeTab === "statistics" ? (
            <View style={styles.chartContainer}>
              <Card>
                {chartData?.datasets.length !== 0 && chartData?.labels.length !== 0 ? (
                  <Chart chartData={chartData} />
                ) : (
                  <Text style={styles.bookAuthorText}>No Read History To Show</Text>
                )}
                <Pressable
                  style={{ alignSelf: "flex-end", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: -10 }}
                >
                  <Text style={{ color: "#ffffff", fontFamily: "nunito-sans-regular", fontSize: 20 }}>view history</Text>
                  <FontAwesome name="angle-right" size={20} color={"#BA6400"} style={{ marginLeft: 5 }} />
                </Pressable>
              </Card>
              <View style={styles.statCardContainer}>
                <View style={{ flex: 1, marginRight: 10 }}>
                  <Card>
                    <Text style={[styles.bookTitleText, { alignSelf: "center" }]}>
                      {bookDetailStatData?.totalMinutesRead ? bookDetailStatData.totalMinutesRead : "Loading..."}
                    </Text>
                    <Text style={[styles.bookAuthorText, { alignSelf: "center" }]}>total minutes read</Text>
                  </Card>
                </View>
                <View style={{ flex: 1 }}>
                  <Card>
                    <Text style={[styles.bookTitleText, { alignSelf: "center" }]}>
                      {bookDetailStatData?.totalDaysSpend ? bookDetailStatData.totalDaysSpend : "Loading..."}
                    </Text>
                    <Text style={[styles.bookAuthorText, { alignSelf: "center" }]}>days spent reading</Text>
                  </Card>
                </View>
              </View>
              <View style={styles.statCardContainer}>
                <View style={{ flex: 1, marginRight: 10 }}>
                  <Card>
                    <Text style={[styles.bookTitleText, { alignSelf: "center" }]}>
                      {bookDetailStatData?.averagePages ? bookDetailStatData.averagePages : "Loading..."}
                    </Text>
                    <Text style={[styles.bookAuthorText, { alignSelf: "center" }]}>average pages per day</Text>
                  </Card>
                </View>
                <View style={{ flex: 1 }}>
                  <Card>
                    <Text style={[styles.bookTitleText, { alignSelf: "center" }]}>
                      {bookDetailStatData?.totalNotes ? bookDetailStatData.totalNotes : "Loading..."}
                    </Text>
                    <Text style={[styles.bookAuthorText, { alignSelf: "center" }]}>total notes added</Text>
                  </Card>
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.notesContainer}>
              {notes.slice(0, 3).map((note) => {
                return (
                  <View style={{ marginBottom: 20 }} key={note.id}>
                    <Card key={note.id}>
                      <Text style={styles.bookAuthorText}>{note.note_text}</Text>
                      <Text style={styles.bookAuthorText}>
                        added on {note.added_timestamp.toLocaleDateString()} at {note.added_timestamp.toLocaleTimeString()}
                      </Text>
                    </Card>
                  </View>
                );
              })}
              <Pressable
                style={{ alignSelf: "flex-end", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: -10 }}
              >
                <Text style={{ color: "#ffffff", fontFamily: "nunito-sans-regular", fontSize: 20 }}>view all</Text>
                <FontAwesome name="angle-right" size={20} color={"#BA6400"} style={{ marginLeft: 5 }} />
              </Pressable>
            </View>
          )}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#030013",
  },
  bookContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bookImage: {
    width: undefined,
    height: undefined,
    aspectRatio: 1,
    borderRadius: 15,
    resizeMode: "contain",
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
  readBookButtonText: {
    color: "#ffffff",
    fontFamily: "nunito-sans-bold",
    fontSize: 25,
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
  progressDetailsContainer: {
    marginTop: 50,
    flexDirection: "row",
  },
  progressDetailsCardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tabsContainer: {
    marginTop: 50,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  leftTab: {
    borderTopStartRadius: 10,
    borderBottomLeftRadius: 10,
  },
  rightTab: {
    borderTopEndRadius: 10,
    borderBottomRightRadius: 10,
  },
  inactiveTabContainer: {
    flex: 1,
    borderColor: "#efefef",
    backgroundColor: "#efefef",
    alignItems: "center",
    color: "#000000",
    padding: 8,
  },

  activeTabContainer: {
    flex: 1,
    borderColor: "#efefef",
    alignItems: "center",
    color: "#000000",
    padding: 8,
    backgroundColor: "#BA6400",
  },
  activeTabText: {
    color: "#ffffff",
    fontFamily: "nunito-sans-bold",
  },
  inactiveTabText: {
    color: "#000000",
    fontFamily: "nunito-sans-regular",
  },
  chartContainer: {
    marginTop: 30,
  },
  statCardContainer: {
    marginTop: 30,
    flexDirection: "row",
  },
  notesContainer: {
    flex: 1,
    marginTop: 30,
  },
  readBookContainer: {
    flex: 1,
    marginTop: 40,
  },
  readBookButtonContainer: {
    backgroundColor: "#BA6400",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

/*

<ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1513112300738-bbb13af7028e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
        }}
        resizeMode="cover"
        style={{ flex: 1, justifyContent: "center" }}
      >

    */
