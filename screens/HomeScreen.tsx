import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, ScrollView, Pressable, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "../components/styled/Card";
import { useBooks } from "../hooks/useBooks";
import { Book } from "../models/Book";
import { getMostRecentBook } from "../utils/BookFilters";
import ProgressBar from "react-native-progress-bar-horizontal";
import { Chart } from "../components/LineChart";
import { FontAwesome } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation";
import { useSessions } from "../hooks/useSessions";
import { getAllChartData, getWeeklyChartData } from "../utils/ChartData";
import { ChartData } from "react-native-chart-kit/dist/HelperTypes";
import { BookContainer } from "../components/styled/BookContainer";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export const HomeScreen = ({ navigation }: Props) => {
  const books = useBooks();
  const sessions = useSessions();

  const [mostRecentBook, setMostRecentBook] = useState<Book>();
  const [chartData, setChartData] = useState<ChartData | undefined>(undefined);

  useEffect(() => {
    if (books) {
      setMostRecentBook(getMostRecentBook(books));
    }
  }, [books]);


  useEffect(() => {
    if (sessions && books) {
       const chartData = getWeeklyChartData(sessions);
       setChartData(chartData);
    }
  }, [sessions, books])

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <View>
              <Text style={styles.headerText}>hi,</Text>
              <Text style={styles.headerSubtitleText}>sanidhya</Text>
            </View>
            <View style={styles.headerImageContainer}>
              <Image
                source={{
                  uri: "https://scontent-lga3-1.cdninstagram.com/v/t51.2885-19/241313662_173868561536402_8129563786257425794_n.jpg?stp=dst-jpg_s320x320&_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=O4ts_bo_s2wAX8MeLRA&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfA1k_uy7t_hPKGJ7xEks5ca7X-p_XioiyPhJoxU2pd2zg&oe=63BD1329&_nc_sid=8fd12b",
                }}
                style={styles.headerImage}
              />
            </View>
          </View>
      
          <View style={{ flex: 1, marginTop: 50, justifyContent: "flex-start" }}>
            <View style={styles.continueReadingTextContainer}>
              <Text style={styles.headerBoldedSubtitleText}>your daily reads</Text>
            </View>
            <View style={{ display: "flex", marginTop: 20 }}>
              <Card>
                {chartData ? <Chart chartData = {chartData}/> : <ActivityIndicator size = "large" />}
                <Pressable
                  style={{ alignSelf: "flex-end", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: -10 }}
                >
                  <Text style={{ color: "#ffffff", fontFamily: "nunito-sans-regular", fontSize: 20 }}>last seven days</Text>
                  <FontAwesome name="angle-right" size={20} color={"#BA6400"} style={{ marginLeft: 5 }} />
                </Pressable>
              </Card>
            </View>
          </View>
          <View style={styles.continuteReadingContainer}>
            <View style={styles.continueReadingTextContainer}>
              <Text style={styles.headerBoldedSubtitleText}>continue reading</Text>
            </View>
            {mostRecentBook ? (
                <BookContainer 
                    book = {mostRecentBook}
                    onPress = {() => {navigation.navigate("BookDetailsScreen", {book: mostRecentBook})}}
                    withInProgressLabel={true}
                  />
            ) : (
              <Card>
                <View style={{ justifyContent: "center", alignItems: "center", alignSelf: "center" }}>
                  <ActivityIndicator size="large" />
                </View>
              </Card>
            )}
          </View>
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

  contentContainer: {
    flex: 1,
    marginTop: 30,
    marginLeft: 25,
    marginRight: 25,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerImageContainer: {
    width: 90,
    height: 90,
    borderRadius: 90 / 2,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "#BA6400",
    justifyContent: "center",
  },
  progressPercent: {
    color: "#BA6400",
    fontFamily: "nunito-sans-regular",
    marginLeft: 15,
    alignSelf: "flex-end",
  },
  headerImage: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    alignSelf: "center",
    alignContent: "center",
  },
  headerText: {
    color: "#ffffff",
    fontFamily: "nunito-sans-bold",
    fontSize: 40,
    marginBottom: 10,
  },
  headerSubtitleText: {
    color: "#ffffff",
    fontFamily: "nunito-sans-regular",
    fontSize: 32,
  },
  headerBoldedSubtitleText: {
    color: "#ffffff",
    fontFamily: "nunito-sans-bold",
    fontSize: 32,
  },
  continueReadingCardContainer: {
    flex: 0.4,
    marginTop: 20,
    flexShrink: 1,
  },
  continueReadingTextContainer: {
    marginBottom: 20,
  },
  continuteReadingContainer: {
    flex: 1,
    marginTop: 40,
  },
  cardContentContainer: {
    flex: 1,
  },
  cardTopContentContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexGrow: 2,
  },
  cardBottomContentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
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
  cardTopContainer: {
    display: "flex",
    flex: 1,
    flexShrink: 3,
    flexGrow: 3,
    flexDirection: "row",
  },
  cardTextContainer: {
    flex: 1,
    flexGrow: 1.5,
    width: 0,
    paddingLeft: 20,
    marginBottom: 30,
  },
  imageContainer: {
    flex: 0.8,
  },
  bookImage: {
    width: undefined,
    height: undefined,
    aspectRatio: 1,
    borderRadius: 15,
    resizeMode: "contain",
  },
});

/*

  <View style={styles.cardContentContainer}>
                  <View style={styles.cardTopContentContainer}>
                    <Image source={{ uri: mostRecentBook.image }} style={styles.bookImage} />
                    <View style={styles.cardTextContainer}>
                      <Text style={[styles.bookTitleText, {fontSize: Math.floor((mostRecentBook.name.length / 4) + 20)}]}>{mostRecentBook.name}</Text>
                      <Text style={styles.bookAuthorText}>{mostRecentBook.author}</Text>
                    </View>
                  </View>
                  <View style={styles.cardBottomContentContainer}>
                    <ProgressBar
                      progress={mostRecentBook.current_page / mostRecentBook.pages}
                      fillColor="#BA6400"
                      unfilledColor="#434343"
                      height={10}
                      animated={true}
                      width={320}
                    />
                    <Text style = {styles.progressPercent}>{(mostRecentBook.current_page / mostRecentBook.pages) * 100}%</Text>
                  </View>
                </View>
*/
