import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BookContainer } from "../components/styled/BookContainer";
import { useBooks } from "../hooks/useBooks";
import { RootStackParamList } from "../navigation";
import { FontAwesome } from "@expo/vector-icons";


type Props = NativeStackScreenProps<RootStackParamList, "AddNoteByBookScreen">;

export const AddNoteByBookScreen = ({ navigation }: Props) => {
  const books = useBooks();

  const renderBooks = () => {
    return books.map((book) => {
      return (
        <View style={{ marginBottom: 20 }}>
          <BookContainer book={book} onPress={() => navigation.navigate("AddNoteScreen", { book: book })} />
        </View>
      );
    });
  };
  return (
    <ScrollView style={styles.container}>
      <SafeAreaView style={styles.contentContainer}>
        <FontAwesome color="#BA6400" name="angle-left" size={20} onPress={() => navigation.goBack()} />
        <Text style={styles.headerText}>select a book</Text>
        <View>{books ? renderBooks() : <ActivityIndicator size="large" />}</View>
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
  headerText: {
    color: "#ffffff",
    fontFamily: "nunito-sans-bold",
    fontSize: 32,
    marginBottom: 40,
    marginTop: 10,
  },
});
