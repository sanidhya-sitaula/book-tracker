import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/HomeScreen";
import { FontAwesome } from "@expo/vector-icons";
import { AllBooksScreen } from "../screens/AllBooksScreen";
import { NotesScreen } from "../screens/NotesScreen";
import { StatisticsScreen } from "../screens/StatisticsScreen";
import { Book } from "../models/Book";
import { BookDetailsScreen } from "../screens/BookDetailsScreen";
import { ReadingScreen } from "../screens/ReadingScreen";
import { FinishSessionScreen } from "../screens/FinishSessionScreen";
import { ReadingSession } from "../models/ReadingSession";
import { SubmittedSessionScreen } from "../screens/SubmittedSessionScreen";
import { AddNoteScreen } from "../screens/AddNoteScreen";
import { Note } from "../models/Note";
import { AddNewBookScreen } from "../screens/AddNewBookScreen";
import { AllNotesScreen } from "../screens/AllNotesScreen";
import { NoteDetailScreen } from "../screens/NoteDetailsScreen";
import { AddNoteByBookScreen } from "../screens/AddNoteByBookScreen";

export type RootStackParamList = {
    Root: undefined;
    Home: undefined;
    Bookshelf: undefined;
    Notes: {book: Book};
    Statistics: undefined;
    BookDetailsScreen: {book: Book};
    ReadingScreen: {book: Book};
    FinishSessionScreen: {readingSession: ReadingSession, book: Book};
    SubmittedSessionScreen: {sessionId: string, book: Book };
    AddNoteScreen: {book: Book};
    AddNewBookScreen: undefined;
    NoteDetailsScreen: {note: Note, bookId: string};
    AddNoteByBookScreen: undefined;
};

export default function Navigation() {
    return (
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    );
  }
  

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />  
        <Stack.Screen name = "BookDetailsScreen"  component= {BookDetailsScreen} options = {{headerShown: false}} />
        <Stack.Screen name = "ReadingScreen"  component= {ReadingScreen} options = {{headerShown: false}} />
        <Stack.Screen name = "FinishSessionScreen" component = {FinishSessionScreen} options = {{presentation: "modal", headerShown: false}} />
        <Stack.Screen name = "SubmittedSessionScreen"  component= {SubmittedSessionScreen} options = {{presentation: "modal", headerShown: false}} />
        <Stack.Screen name = "AddNoteScreen"  component= {AddNoteScreen} options = {{presentation: "modal", headerShown: false}} />
        <Stack.Screen name = "AddNewBookScreen"  component= {AddNewBookScreen} options = {{presentation: "modal", headerShown: false}} />
        <Stack.Screen name = "NoteDetailsScreen"  component= {NoteDetailScreen} options = {{headerShown: false}} />
        <Stack.Screen name = "AddNoteByBookScreen"  component= {AddNoteByBookScreen} options = {{headerShown: false}} />

      </Stack.Navigator>
    );
  }
  
  const BottomTab = createBottomTabNavigator<RootStackParamList>();

  function BottomTabNavigator() {
    return (
      <BottomTab.Navigator screenOptions = {{
        tabBarStyle: {
          backgroundColor: "#1B1C39",
          borderTopColor:  "#1B1C39",
        },
        tabBarActiveTintColor: "#BA6400"
      }}>
        <BottomTab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ( {color, size} ) => {
              return <FontAwesome name="home" size={size} color={color} />;
            },
          }}
        />
        <BottomTab.Screen
          name="Bookshelf"
          component={AllBooksScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({color, size} ) => {
              return <FontAwesome name="book" size={size} color={color} />;
            },
          }}
        />
         <BottomTab.Screen
          name="Notes"
          component={AllNotesScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({color, size} ) => {
              return <FontAwesome name="table" size={size} color={color} />;
            },
          }}
        />
         <BottomTab.Screen
          name="Statistics"
          component={StatisticsScreen}
          options={{
            tabBarIcon: ({color, size} ) => {
              return <FontAwesome name="exclamation" size={size} color={color} />;
            },
          }}
        />
      </BottomTab.Navigator>
    );
  }


