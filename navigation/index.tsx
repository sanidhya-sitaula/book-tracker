import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/HomeScreen";
import { FontAwesome } from "@expo/vector-icons";
import { AllBooksScreen } from "../screens/AllBooksScreen";
import { NotesScreen } from "../screens/NotesScreen";
import { StatisticsScreen } from "../screens/StatisticsScreen";

export type RootStackParamList = {
    Root: undefined;
    Home: undefined;
    AllBooks: undefined;
    Notes: undefined;
    Statistics: undefined;
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
      </Stack.Navigator>
    );
  }
  
  const BottomTab = createBottomTabNavigator<RootStackParamList>();

  function BottomTabNavigator() {
    return (
      <BottomTab.Navigator screenOptions = {{
        tabBarStyle: {
          backgroundColor: "#1B1C39",
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
          name="AllBooks"
          component={AllBooksScreen}
          options={{
            tabBarIcon: ({color, size} ) => {
              return <FontAwesome name="book" size={size} color={color} />;
            },
          }}
        />
         <BottomTab.Screen
          name="Notes"
          component={NotesScreen}
          options={{
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


