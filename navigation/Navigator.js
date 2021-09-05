import React from "react";
import { Platform } from "react-native";
import * as Icon from "@expo/vector-icons";
import {
  createBottomTabNavigator,
  createStackNavigator,
} from "react-navigation";
import Deck from "../components/Deck";
import AddCard from "../components/AddCard";
import Quiz from "../components/Quiz";
import { Ionicons } from "@expo/vector-icons";
import DeckList from "../components/DeckList";
import AddDeck from "../components/AddDeck";
const isIOS = Platform.OS === "ios" ? true : false;

const Tabs = createBottomTabNavigator(
  {
    DeckList: {
      screen: DeckList,
      navigationOptions: {
        tabBarLabel: "Decks",
        tabBarIcon: (
          <Icon.Ionicons
            name={isIOS ? "ios-bookmarks" : "md-bookmarks"}
            size={25}
          />
        ),
      },
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: "Add deck",
        tabBarIcon: <Ionicons size={25} name="ios-add-circle-outline" />,
      },
    },
  },
  {
    tabBarOptions: {
      labelStyle: {
        fontSize: 14,
      },
      style: {
        height: 56,
        backgroundColor: Platform.OS === "ios" ? "white" : "lightgrey",
        shadowColor: "rgba(0, 0, 0, 0.24)",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowRadius: 6,
        shadowOpacity: 1,
      },
    },
  }
);

const AppNavigation = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null,
    },
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "lightgrey",
      },
    },
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "lightgrey",
      },
    },
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "lightgrey",
      },
    },
  },
});

export default AppNavigation;
