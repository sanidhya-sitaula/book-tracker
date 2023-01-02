import { FontAwesome } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { Card } from "../components/styled/Card";
import { useNotes, useNotesByBook } from "../hooks/useNotes";
import { Book } from "../models/Book";
import { Note } from "../models/Note";
import { useState, useEffect } from "react";
import { RootStackParamList } from "../navigation";
import { addNote } from "../hooks/addNote";
import app from "../firebase";

type AddNoteScreenProps = {
  route: {
    params: {
      book: Book;
    };
  };
};

type Props = NativeStackScreenProps<RootStackParamList, "AddNoteScreen">;

export const getNotes = async (book_id: string) => {
 
    const notes = await app.firestore().collection("notes").get();
    let finalArray: Note[] = [];
    
    notes.docs.map((note) => {
        let thisNote = note.data() as Note;
        let id = note.id;
        thisNote.id = id;
        let addedDate = note.data().added_timestamp.toDate();
        thisNote.added_timestamp = addedDate;
        if (thisNote.book_id === book_id){
        finalArray.push(thisNote);
        }
    });
    
    const sortedNotes = finalArray.sort((a, b) => a.added_timestamp > b.added_timestamp ? -1 : a.added_timestamp < b.added_timestamp ? 1 : 0)

    return sortedNotes;
}

export const AddNoteScreen = ({ route, navigation }: AddNoteScreenProps & Props) => {
  const book = route.params.book;

  const [pageNumber, setPageNumber] = useState("");
  const [noteText, setNoteText] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [loadNotes, setLoadNotes] = useState<boolean>(true);
  const [notes, setNotes] = useState<Note[]>();

  const handleSubmitNote = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

    const thisNote: Note = {
      note_text: noteText,
      added_timestamp: new Date(),
      book_id: book.id,
      page_number: Number(pageNumber),
    };

    setLoading(true);
    await addNote(thisNote);
    setLoading(false);
    setNoteText("");
    setPageNumber("");
    setLoadNotes(true);
  };

  useEffect(() => {
    const getAllNotes = async () => {
        const notes = await getNotes(book.id);
        return notes;
    }
    if (loadNotes) {
        getAllNotes().then(notes => setNotes(notes));
    }
    setLoadNotes(false);
  }, [loadNotes])

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.headerContainer}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text style={styles.headerText}>add a new note</Text>
            <FontAwesome name="close" size={25} color="#ffffff" onPress={() => navigation.popToTop()} style={{ marginTop: 10, marginBottom: 40 }} />
          </View>
          <TextInput
            placeholder="page number"
            placeholderTextColor="#616060"
            style={styles.textInput}
            value={pageNumber}
            onChangeText={(e) => setPageNumber(e)}
          />
          <TextInput
            placeholder="note text"
            placeholderTextColor="#616060"
            style={[styles.textInput, styles.noteTextInput]}
            multiline={true}
            textAlignVertical="center"
            value={noteText}
            onChangeText={(e) => setNoteText(e)}
          />
          <Pressable
            onPress={() => {
              handleSubmitNote();
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>
              {loading ? (
                <ActivityIndicator size="small" color="#fff" style={{ justifyContent: "center" }} />
              ) : (
                <FontAwesome name="plus" color={"#ffffff"} size={30} />
              )}
            </Text>
          </Pressable>
        </View>
        <View style={styles.notesSectionContainer}>
          <Text style={styles.headerText}>notes on {book.name}</Text>
          <View style={styles.notesContainer}>
            {notes && !loadNotes && notes.slice(0, 3).map((note) => {
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
            {loadNotes && 
                <View style = {{justifyContent: "center", alignItems: "center"}}>
                    <ActivityIndicator size = "large" color = "#fff"/>
                </View>
            }
            <Pressable style={{ alignSelf: "flex-end", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: -10 }}>
              <Text style={{ color: "#ffffff", fontFamily: "nunito-sans-regular", fontSize: 20 }}>view all</Text>
              <FontAwesome name="angle-right" size={20} color={"#BA6400"} />
            </Pressable>
          </View>
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
  headerContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#1B1C39",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    justifyContent: "space-between",
  },
  headerText: {
    color: "#ffffff",
    fontFamily: "nunito-sans-bold",
    fontSize: 32,
    marginBottom: 40,
    marginTop: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontFamily: "nunito-sans-bold",
    fontSize: 20,
    alignItems: "center",
    justifyContent: "space-around",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#616060",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    fontFamily: "nunito-sans-regular",
    color: "#ffffff",
    flexWrap: "wrap",
  },
  noteTextInput: {
    height: 100,
  },
  button: {
    backgroundColor: "#25287B",
    borderRadius: 16,
    padding: 20,
    width: 200,
    marginTop: 30,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  notesSectionContainer: {
    margin: 20,
  },
  notesContainer: {},
  bookAuthorText: {
    color: "#ffffff",
    fontFamily: "nunito-sans-regular",
    fontSize: 17,
    flex: 1,
    flexWrap: "wrap",
    marginBottom: 10,
  },
});
