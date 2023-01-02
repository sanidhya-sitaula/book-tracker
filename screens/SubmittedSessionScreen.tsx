import { FontAwesome } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { RootStackParamList } from "../navigation";
import { Book } from "../models/Book";
import { Note } from "../models/Note";

type FinishSessionProps = {
    route: {
      params: {
        sessionId: string;
        book: Book;
      };
    };
  };

type Props = NativeStackScreenProps<RootStackParamList, "SubmittedSessionScreen">;

export const SubmittedSessionScreen = ({route, navigation}: FinishSessionProps & Props) => {

    const book = route.params.book;

    const handleGoToHome = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        navigation.navigate("Home");
    }

    const handleAddNewNote = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        navigation.navigate("AddNoteScreen", {book: book});
    }

    return (
        <View style = {styles.container}>
             <SafeAreaView style = {{flex: 1, margin: 20}} >
                 <View style = {styles.headerContainer}>
                    <Text style = {styles.bookTitleText}>well done!</Text>
                    <Text style = {styles.headerSubtitleText}>your session has been recorded <FontAwesome name = "check" color = "green" size = {20} /></Text>
                 </View>
                 <View style = {styles.buttonContainer}>
                    <Pressable style = {styles.button} onPress = {() => handleAddNewNote()}>
                        <Text style = {styles.buttonText}>add notes from this session</Text>
                    </Pressable>
                    <Pressable style = {[styles.button, {backgroundColor: "#25287B"}]} onPress = {() => handleGoToHome()}>
                        <Text style = {styles.buttonText}>go to home</Text>
                    </Pressable>
                 </View>
        </SafeAreaView>
        </View>
       
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#030013"
    },
    headerContainer: {
        flex: 0.2
    },
    bookTitleText: {
        color: "#ffffff",
        fontFamily: "nunito-sans-bold",
        fontSize: 40,
        marginBottom: 10,
        flexWrap: "wrap",
      },
      headerSubtitleText: {
        color: "#ffffff",
        fontFamily: "nunito-sans-regular",
        fontSize: 20,
        marginTop: 20,
      },
      buttonText: {
        color: "#ffffff",
        fontFamily: "nunito-sans-bold",
        fontSize: 25,
      },
      buttonContainer: {
        flex: 0.3,
        alignItems: "center",
        justifyContent: "center"
      },
      button:{
        backgroundColor: "#BA6400",
        borderRadius: 16,
        padding: 20,
        flex: 0.6,
        width: 400,
        marginTop: 30,
        alignItems: "center",
        justifyContent: "center",
      }
})

