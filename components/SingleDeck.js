import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default class DeckListItem extends Component {
  deckPressed(title) {
    this.props.onDeckPressed(title);
  }

  render() {
    const { item } = this.props;

    return (
      <TouchableOpacity
        style={style.deckButton}
        onPress={() => this.deckPressed(item.title)}
      >
        <View style={{}}>
          <Text style={style.deckText}>{item.title}</Text>
          <Text>{item.questions.length} cards</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const style = StyleSheet.create({
  deckButton: {
    padding: 20,
    borderTopColor: "#cccccc",
    borderTopWidth: 1,
  },
  deckText: {
    paddingBottom: 3,
    fontSize: 18,
  },
});
