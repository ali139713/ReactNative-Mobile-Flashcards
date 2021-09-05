import React from "react";
import { StyleSheet, View } from "react-native";
import MobileStatusBar from "./components/MobileStatusBar";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { setLocalNotification } from "./utils/helpers";
import AppNavigation from "./navigation/Container";
import reducer from "./reducers";

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1,justifyContent:"space-around" }}>
          <MobileStatusBar />
          <AppNavigation />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
