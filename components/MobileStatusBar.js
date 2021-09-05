import React from "react";
import { StatusBar, View } from "react-native";
import Constants from "expo-constants";

export default function MobileStatusBar() {
  return (
    <View
      style={{
        backgroundColor: "lightgrey",
        height: Constants.statusBarHeight,
      }}
    >
      <StatusBar
        translucent
        backgroundColor="lightgrey"
        barStyle="light-content"
      />
    </View>
  );
}
