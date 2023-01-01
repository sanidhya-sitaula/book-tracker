import { Book } from "../models/Book";
import { View, Text, ScrollView, StyleSheet, Image, Pressable } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Card } from "../components/styled/Card";
import { useState } from "react";
import { Chart } from "../components/LineChart";
import * as Haptics from "expo-haptics";

type BookDetailsScreenProps = {
  route: {
    params: {
      book: Book;
    };
  };
};

type TabsProps = "notes" | "statistics";

type Props = NativeStackScreenProps<RootStackParamList, "BookDetailsScreen">;

const notes = [
  {
    id: "1",
    noteText: "Note Content 1",
    dateAdded: "2022-04-10",
  },
  {
    id: "2",
    noteText: "Note Content 2",
    dateAdded: "2022-04-10",
  },
  {
    id: "3",
    noteText: "Note Content 3",
    dateAdded: "2022-04-10",
  },
];

export const BookDetailsScreen = ({ route, navigation }: Props & BookDetailsScreenProps) => {
  const book = route.params.book;
  const progress = Math.floor((book.current_page / book.pages) * 100);

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
        <View style={styles.readBookContainer}>
          <Pressable
            style={styles.readBookButtonContainer}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            }}
          >
            <Text style={styles.readBookButtonText}>start reading</Text>
          </Pressable>
        </View>
        <View style={styles.progressDetailsContainer}>
          <Card>
            <View style={styles.progressDetailsCardContainer}>
              <AnimatedCircularProgress size={100} width={10} fill={progress} tintColor="#BA6400" backgroundColor="#3d5875">
                {(fill) => <Text style={[styles.bookAuthorText, { marginTop: 30, fontFamily: "nunito-sans-bold" }]}>{progress}%</Text>}
              </AnimatedCircularProgress>
              <View style={{ flexShrink: 1, marginLeft: 50 }}>
                <Text style={styles.bookTitleText}>page {book.current_page}</Text>
                <Text style={styles.bookAuthorText}>added {new Date(book.date_added.toDate()).toDateString()}</Text>
                <Text style={styles.bookAuthorText}>last read {new Date(book.last_read.toDate()).toDateString()}</Text>
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
                <Chart />
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
                    <Text style={[styles.bookTitleText, { alignSelf: "center" }]}>24</Text>
                    <Text style={[styles.bookAuthorText, { alignSelf: "center" }]}>total minutes read</Text>
                  </Card>
                </View>
                <View style={{ flex: 1 }}>
                  <Card>
                    <Text style={[styles.bookTitleText, { alignSelf: "center" }]}>2</Text>
                    <Text style={[styles.bookAuthorText, { alignSelf: "center" }]}>days spent reading</Text>
                  </Card>
                </View>
              </View>
              <View style={styles.statCardContainer}>
                <View style={{ flex: 1, marginRight: 10 }}>
                  <Card>
                    <Text style={[styles.bookTitleText, { alignSelf: "center" }]}>10</Text>
                    <Text style={[styles.bookAuthorText, { alignSelf: "center" }]}>average pages per day</Text>
                  </Card>
                </View>
                <View style={{ flex: 1 }}>
                  <Card>
                    <Text style={[styles.bookTitleText, { alignSelf: "center" }]}>3</Text>
                    <Text style={[styles.bookAuthorText, { alignSelf: "center" }]}>total notes added</Text>
                  </Card>
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.notesContainer}>
              {notes.map((note) => {
                return (
                  <View style={{ marginBottom: 20 }} key = {note.id}>
                    <Card key={note.id}>
                      <Text style={styles.bookAuthorText}>{note.noteText}</Text>
                      <Text style={styles.bookAuthorText}>added on {note.dateAdded}</Text>
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