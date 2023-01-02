import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, StyleSheet, TextInput, Pressable, ActivityIndicator } from "react-native";
import { RootStackParamList } from "../navigation";
import { useState, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Book } from "../models/Book";
import { addBook } from "../hooks/addBook";
import { BookContainer } from "../components/styled/BookContainer";
import * as Haptics from "expo-haptics";

type Props = NativeStackScreenProps<RootStackParamList, "AddNewBookScreen">;

export const AddNewBookScreen = ({ navigation }: Props) => {
  const [formData, setFormData] = useState({
    name: "",
    author: "",
    pages: "",
    genre: "",
    image: "",
  });

  const [loading, setLoading] = useState<boolean | null>();
  const [book, setBook] = useState<Book>();

  const testBook = {
    name: "Strengthsfinder",
    author: "Tom Rath",
    pages: 200,
    genre: "Productivity",
    date_added: new Date(),
    current_page: 0,
    image: "https://images-na.ssl-images-amazon.com/images/I/41GSOHixD7L._AC_UL900_SR615,900_.jpg",
  } as Book;

  const handleAddBook = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setLoading(true);
    const thisBook = await addBook({
      name: formData.name,
      author: formData.author,
      image: formData.image,
      pages: Number(formData.pages),
      genre: formData.genre,
      date_added: new Date(),
      current_page: 0,
    });

    setBook(thisBook);
    setLoading(false);
  };

  const handleBookPress = (book: Book) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    navigation.popToTop();
    navigation.navigate("BookDetailsScreen", { book: book })
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>add a new book</Text>
        <View style={{ flex: 1 }}>
          <TextInput
            placeholder="name"
            placeholderTextColor="#616060"
            style={styles.textInput}
            value={formData.name}
            onChangeText={(e) => setFormData({ ...formData, name: e })}
          />
          <TextInput
            placeholder="author"
            placeholderTextColor="#616060"
            style={styles.textInput}
            value={formData.author}
            onChangeText={(e) => setFormData({ ...formData, author: e })}
          />
          <View style={{ flexDirection: "row" }}>
            <TextInput
              placeholder="pages"
              placeholderTextColor="#616060"
              style={styles.textInput}
              value={formData.pages}
              onChangeText={(e) => setFormData({ ...formData, pages: e })}
            />
            <TextInput
              placeholder="genre"
              placeholderTextColor="#616060"
              style={styles.textInput}
              value={formData.genre}
              onChangeText={(e) => setFormData({ ...formData, genre: e })}
            />
          </View>
          <TextInput
            placeholder="link to image"
            placeholderTextColor="#616060"
            style={styles.textInput}
            value={formData.image}
            onChangeText={(e) => setFormData({ ...formData, image: e })}
          />

          <Pressable
            onPress={() => {
              handleAddBook();
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
      </View>
      {book && (
        <View style={{ flexGrow: 0.25, margin: 20 }}>
          <Text style={styles.headerText}>added!</Text>
          <BookContainer book={book} onPress={() => handleBookPress(book)} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#030013",
  },
  headerContainer: {
    flex: 0.6,
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
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: "#ffffff",
    fontFamily: "nunito-sans-bold",
    fontSize: 20,
    alignItems: "center",
    justifyContent: "space-around",
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#616060",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    fontFamily: "nunito-sans-regular",
    color: "#ffffff",
    flexWrap: "wrap",
    marginRight: 10,
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
});
