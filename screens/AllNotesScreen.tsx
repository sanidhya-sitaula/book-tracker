import { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useBooks, useBooksById } from "../hooks/useBooks";
import { Book } from "../models/Book";
import DropDownPicker from "react-native-dropdown-picker";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "../components/styled/Card";
import { useNotes } from "../hooks/useNotes";
import { FontAwesome } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

type AllNotesScreenProps = {
  route: {
    params: {
      book: Book;
    };
  };
};

type DropdownData = {
  label: string;
  value: string;
};

type Props = NativeStackScreenProps<RootStackParamList, "Notes">;

export const AllNotesScreen = ({ route, navigation }: AllNotesScreenProps & Props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>("");

  const notes = useNotes();
  const books = useBooks();

  const [items, setItems] = useState<DropdownData[]>([{ label: "All Books", value: "All Books" }]);

  useEffect(() => {
    if (books) {
      const dropDownData: DropdownData[] = [{ label: "All Books", value: "All Books" }];
      books.forEach((book) => {
        dropDownData.push({ label: book.name, value: book.name });
      });
      setItems(dropDownData);
    }
  }, [books]);

  useEffect(() => {
    if (route && route.params && route.params.book) {
      const setVal = () => setValue(route.params.book.name);
      setVal();
    } else {
      const setVal = () => setValue("All Books");
      setVal();
    }
  }, [route.params]);

  const renderNotes = () => {
    let thisNotes = [...notes];
    if (value !== "All Books") {
      thisNotes = thisNotes.filter((note) => note.book_name === value);
    }

    return thisNotes.map((note) => {
      let slicedNote = note.note_text.slice(0, 25) + " ...";
      return (
        <View style={{ marginBottom: 30 }}>
          <Card
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              navigation.navigate("NoteDetailsScreen", { note: note, bookId: note.book_id });
            }}
          >
            <Text style={[styles.dropdownTextStyle, { marginBottom: 10 }]}>{note.note_text.length < 25 ? note.note_text : slicedNote}</Text>
            <Text style={[styles.dropdownTextStyle, { fontSize: 20, marginBottom: 10, color: "gray" }]}>
              added on {note.added_timestamp.toLocaleDateString()} at {note.added_timestamp.toLocaleTimeString()}
            </Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={[styles.dropdownTextStyle, { fontSize: 15, marginBottom: 10, color: "#BA6400" }]}>
                <FontAwesome name="book" size={20} color="#BA6400" style={{ padding: 20 }} />{" "}
                {books.find((book) => book.id === note.book_id) ? (
                  books.find((book) => book.id === note.book_id)!.name
                ) : (
                  <ActivityIndicator size="small" />
                )}
              </Text>
              <FontAwesome name="caret-right" color="#BA6400" size={20} />
            </View>
          </Card>
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={{ margin: 20, flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <Text style={styles.headerText}>your notes</Text>
          </View>
          <View>
            <FontAwesome
              name="plus-square"
              size={30}
              color="#ffffff"
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                navigation.navigate("AddNoteByBookScreen");
              }}
              style={{ marginTop: 5 }}
            />
          </View>
        </View>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          style={{ backgroundColor: "#030013", borderColor: "#6a6a6b", margin: 20, width: 380 }}
          textStyle={styles.dropdownTextStyle}
          dropDownContainerStyle={{ backgroundColor: "#030013", margin: 20, width: 380, borderColor: "#6a6a6b" }}
        />
        <ScrollView style={styles.contentContainer}>{notes && books ? renderNotes() : <ActivityIndicator size="large" />}</ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#030013",
  },
  contentContainer: {
    margin: 30,
    marginBottom: 200,
  },
  dropdownTextStyle: {
    flex: 1,
    color: "#efefef",
    fontFamily: "nunito-sans-regular",
    fontSize: 20,
  },
  headerText: {
    color: "#ffffff",
    fontFamily: "nunito-sans-bold",
    fontSize: 32,
    marginBottom: 10,
    marginTop: 10,
  },
});
