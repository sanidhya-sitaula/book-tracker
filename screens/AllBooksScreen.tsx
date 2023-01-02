import { FontAwesome } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { BookContainer } from "../components/styled/BookContainer";
import { Card } from "../components/styled/Card";
import { Book } from "../models/Book";
import { SelectedCard } from "../components/styled/SelectedCard";
import { useBooks } from "../hooks/useBooks";
import { RootStackParamList } from "../navigation";
import { sortBooks } from "../utils/BookFilters";
import ProgressBar from "react-native-progress-bar-horizontal";
import * as Haptics from "expo-haptics";

type Props = NativeStackScreenProps<RootStackParamList, "Bookshelf">;

type Genre = {
  name: string;
  icon: string;
};

export const AllBooksScreen = ({ navigation }: Props) => {
  const books = useBooks();
  const [selectedGenre, setSelectedGenre] = useState("Fiction");

  const getRecentlyReadBooks = (): Book[] => {
    return sortBooks(books);
  };

  const genres: Genre[] = [
    {
      name: "All Books",
      icon: "list",
    },
    {
      name: "Fiction",
      icon: "film",
    },
    {
      name: "Non Fiction",
      icon: "gears",
    },
    {
      name: "History",
      icon: "history",
    },
    {
      name: "Productivity",
      icon: "book",
    },
    {
      name: "Self-Help",
      icon: "stethoscope",
    },
  ];

  const renderGenreSelector = (): JSX.Element[] => {
    return genres.map((genre) => {
      if (selectedGenre === genre.name) {
        return (
          <View style={styles.cardContainer} key={genre.name}>
            <SelectedCard>
              <Text style={styles.genreCardText}>
                {/* @ts-expect-error */}
                <FontAwesome name={genre.icon} size={20} color="white" /> {genre.name}
              </Text>
            </SelectedCard>
          </View>
        );
      } else {
        return (
          <View style={styles.cardContainer} key={genre.name}>
            <Card onPress={() => {Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); setSelectedGenre(genre.name);}}>
              <Text style={styles.genreCardText}>
                {/* @ts-expect-error */}
                <FontAwesome name={genre.icon} size={20} color="white" /> {genre.name}
              </Text>
            </Card>
          </View>
        );
      }
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>your bookshelf</Text>
            <FontAwesome name="plus-square" size={30} color="white" onPress={() => {Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); navigation.navigate("AddNewBookScreen");}} />
          </View>
          <View>
            <ScrollView horizontal={true}>{renderGenreSelector()}</ScrollView>
          </View>
          <ScrollView horizontal={true} style={{ marginTop: 30, marginBottom: 30 }}>
            {books &&
              books.map((book) => {
                if (book.genre === selectedGenre || selectedGenre === "All Books") {
                  return (
                    <View style={styles.cardContainer} key={book.id}>
                      <Card
                        onPress={() => {
                          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                          navigation.navigate("BookDetailsScreen", { book: book });
                        }}
                      >
                        <View style={{ alignSelf: "center" }}>
                          <Image source={{ uri: book.image }} style={{ width: 200, height: 200, resizeMode: "contain", borderRadius: 10 }} />
                        </View>
                        <View style={styles.cardBottomContentContainer}>
                          <View>
                            <ProgressBar
                              progress={book.current_page / book.pages}
                              fillColor="#BA6400"
                              unfilledColor="#434343"
                              height={10}
                              animated={true}
                              width={200}
                            />
                          </View>
                          <View>
                            <Text style={styles.progressPercent}>{Math.floor((book.current_page / book.pages) * 100)}%</Text>
                          </View>
                        </View>
                      </Card>
                    </View>
                  );
                }
              })}
          </ScrollView>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>recently read</Text>
          </View>
          <ScrollView horizontal={true} style={{ marginBottom: 30 }}>
            {books &&
              getRecentlyReadBooks()
                .slice(0, 2)
                .map((book) => {
                  return (
                    <View style={styles.cardContainer} key={book.id}>
                      <Card
                        onPress={() => {
                          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                          navigation.navigate("BookDetailsScreen", { book: book });
                        }}
                      >
                        <View style={{ alignSelf: "center" }}>
                          <Image source={{ uri: book.image }} style={{ width: 200, height: 200, resizeMode: "contain", borderRadius: 10 }} />
                        </View>
                        <View style={styles.cardBottomContentContainer}>
                          <View>
                            <ProgressBar
                              progress={book.current_page / book.pages}
                              fillColor="#BA6400"
                              unfilledColor="#434343"
                              height={10}
                              animated={true}
                              width={200}
                            />
                          </View>
                          <View>
                            <Text style={styles.progressPercent}>{Math.floor((book.current_page / book.pages) * 100)}%</Text>
                          </View>
                        </View>
                      </Card>
                    </View>
                  );
                })}
          </ScrollView>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>unread</Text>
          </View>
          <ScrollView horizontal={true} style={{ marginBottom: 30 }}>
            {books &&
              books.map((book) => {
                if (book.current_page === 0) {
                  return (
                    <View style={styles.cardContainer} key={book.id}>
                      <Card
                        onPress={() => {
                          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                          navigation.navigate("BookDetailsScreen", { book: book });
                        }}
                      >
                        <View style={{ alignSelf: "center" }}>
                          <Image source={{ uri: book.image }} style={{ width: 200, height: 200, resizeMode: "contain", borderRadius: 10 }} />
                        </View>
                        <View style={styles.cardBottomContentContainer}>
                          <View>
                            <ProgressBar
                              progress={book.current_page / book.pages}
                              fillColor="#BA6400"
                              unfilledColor="#434343"
                              height={10}
                              animated={true}
                              width={200}
                            />
                          </View>
                          <View>
                            <Text style={styles.progressPercent}>{Math.floor((book.current_page / book.pages) * 100)}%</Text>
                          </View>
                        </View>
                      </Card>
                    </View>
                  );
                }
              })}
          </ScrollView>
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}>completed</Text>
          </View>
          <ScrollView horizontal={true} style={{ marginBottom: 30 }}>
            {books &&
              books.map((book) => {
                if (book.current_page === book.pages) {
                  return (
                    <View style={styles.cardContainer} key={book.id}>
                      <Card
                        onPress={() => {
                          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                          navigation.navigate("BookDetailsScreen", { book: book });
                        }}
                      >
                        <View style={{ alignSelf: "center" }}>
                          <Image source={{ uri: book.image }} style={{ width: 200, height: 200, resizeMode: "contain", borderRadius: 10 }} />
                        </View>
                        <View style={styles.cardBottomContentContainer}>
                          <View>
                            <ProgressBar
                              progress={book.current_page / book.pages}
                              fillColor="#BA6400"
                              unfilledColor="#434343"
                              height={10}
                              animated={true}
                              width={200}
                            />
                          </View>
                          <View>
                            <Text style={styles.progressPercent}>{Math.floor((book.current_page / book.pages) * 100)}%</Text>
                          </View>
                        </View>
                      </Card>
                    </View>
                  );
                }
              })}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#030013",
  },
  contentContainer: {
    flex: 1,
    margin: 20,
    marginTop: 100,
  },
  headerText: {
    color: "#ffffff",
    fontFamily: "nunito-sans-bold",
    fontSize: 32,
    marginBottom: 40,
    marginTop: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressPercent: {
    color: "#BA6400",
    fontFamily: "nunito-sans-regular",
    marginLeft: 15,
    alignSelf: "flex-end",
  },
  genreCardText: {
    color: "#ffffff",
    fontFamily: "nunito-sans-bold",
    fontSize: 22,
  },
  cardContainer: {
    marginRight: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  cardBottomContentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  selectedCardContainer: {},
});
