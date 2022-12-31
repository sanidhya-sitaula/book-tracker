import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "../components/styled/Card";
import { useBooks } from "../hooks/useBooks";
import { Book } from "../models/Book";
import { getMostRecentBook } from "../utils/BookFilters";
import ProgressBar from "react-native-progress-bar-horizontal";
import { Chart } from "../components/LineChart";
import { FontAwesome } from "@expo/vector-icons";

export const HomeScreen = () => {
  const books = useBooks();

  const [mostRecentBook, setMostRecentBook] = useState<Book>();

  useEffect(() => {
    if (books) {
      setMostRecentBook(getMostRecentBook(books));
    }
  }, [books]);

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
                  uri: "https://scontent-lga3-1.cdninstagram.com/v/t51.2885-19/241313662_173868561536402_8129563786257425794_n.jpg?stp=dst-jpg_s320x320&_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=lTlfziaDABcAX-0OyDe&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfArvtMwPE8av0Sd7jDCYQuhNa3LXsHq2wAWNCZjY7_GAg&oe=63B52A29&_nc_sid=8fd12b",
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
                <Chart />
                <Pressable style = {{alignSelf: "flex-end", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: -10}}>
                  <Text style={{ color: "#BA6400", fontFamily: "nunito-sans-regular", fontSize: 20}}>this week</Text>
                  <FontAwesome name = "angle-right" size = {20} color = {"#BA6400"} style = {{marginLeft: 5}}/>
                </Pressable>
              </Card>
            </View>
          </View>
          <View style={styles.continuteReadingContainer}>
            <View style={styles.continueReadingTextContainer}>
              <Text style={styles.headerBoldedSubtitleText}>continue reading</Text>
            </View>
            {mostRecentBook ? (
              <View style={styles.continueReadingCardContainer}>
                <Card>
                  <View style={styles.cardTopContainer}>
                    <View style={styles.imageContainer}>
                      <Image source={{ uri: mostRecentBook.image }} style={styles.bookImage} />
                    </View>
                    <View style={styles.cardTextContainer}>
                      <Text style={styles.bookTitleText}>{mostRecentBook.name}</Text>
                      <Text style={styles.bookAuthorText}>{mostRecentBook.author}</Text>
                    </View>
                  </View>
                  <View style={styles.cardBottomContentContainer}>
                    <View>
                      <ProgressBar
                        progress={mostRecentBook.current_page / mostRecentBook.pages}
                        fillColor="#BA6400"
                        unfilledColor="#434343"
                        height={10}
                        animated={true}
                        width={300}
                      />
                    </View>
                    <View>
                      <Text style={styles.progressPercent}>{Math.floor((mostRecentBook.current_page / mostRecentBook.pages) * 100)}%</Text>
                    </View>
                  </View>
                </Card>
              </View>
            ) : (
              <Text style={{ color: "#fff" }}>Loading...</Text>
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
    marginTop: 10
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
