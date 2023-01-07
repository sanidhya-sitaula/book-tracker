import { FontAwesome } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Text, ScrollView, StyleSheet, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BookContainer } from "../components/styled/BookContainer";
import { useBooks, useBooksById } from "../hooks/useBooks";
import { Book } from "../models/Book";
import { Note } from "../models/Note";
import { RootStackParamList } from "../navigation";
import * as Haptics from "expo-haptics";

type NoteDetailScreenProps = {
  route: {
    params: {
      note: Note;
      bookId: string;
    };
  };
};

type Props = NativeStackScreenProps<RootStackParamList, "NoteDetailsScreen">;

export const NoteDetailScreen = ({ route, navigation }: Props & NoteDetailScreenProps) => {
  const note = route.params.note;
  const bookId = route.params.bookId;
  const book = useBooksById(bookId);

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView style={styles.contentContainer}>
        <View>
          <FontAwesome color="#BA6400" name="angle-left" size={25} onPress={() => navigation.goBack()} />
        </View>
        <View style={{ marginTop: 20, marginBottom: 20 }}>
          <Text style={styles.dateText}>
            {note.added_timestamp.toLocaleDateString()} {note.added_timestamp.toLocaleTimeString()}
          </Text>
          <Text style={styles.dateText}>page number {note.page_number}</Text>
        </View>
        <View>
          <Text style={styles.noteText}>{note.note_text}</Text>
        </View>
        <View>
          {book ? (
            <BookContainer
              book={book}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                navigation.navigate("BookDetailsScreen", { book: book });
              }}
            />
          ) : (
            <ActivityIndicator size="large" />
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
  contentContainer: {
    margin: 20,
  },
  dateText: {
    color: "gray",
    fontFamily: "nunito-sans-regular",
    fontSize: 18,
    marginBottom: 10,
  },
  noteContainer: {},
  noteText: {
    color: "#ffffff",
    fontFamily: "nunito-sans-regular",
    fontSize: 25,
    marginBottom: 10,
  },
});
