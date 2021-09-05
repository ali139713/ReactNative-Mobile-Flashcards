import React, { Component } from "react";
import { FlatList, Text, View } from "react-native";
import { connect } from "react-redux";
import { getDecks } from "../utils/dummyApi";
import { receiveDecks } from "../actions";
import SingleDeck from "./SingleDeck";

class DeckList extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    getDecks().then((decks) => dispatch(receiveDecks(decks)));
  }

  deckPressed = (title) => {
    this.props.navigation.navigate("Deck", { deckId: title });
  };

  renderItem = ({ item }) => {
    return <SingleDeck item={item} onDeckPressed={this.deckPressed} />;
  };

  render() {
    const { decks } = this.props;
    const deckList = Object.entries(decks).map((deck) => {
      return {
        title: deck[1].title,
        key: deck[1].title,
        questions: deck[1].questions,
      };
    });

    return (
      <View style={styles.viewContainer}>
        <Text style={styles.headingText}>Deck list</Text>
        <FlatList data={deckList} renderItem={this.renderItem} />
      </View>
    );
  }
}

const styles = {
  headingText: {
    marginLeft: "45%",
    fontStyle: "italic",
    fontSize: "30px",
    fontFamily: "sans-serif",
    textDecorationLine: "underline",
    textDecorationColor: "black",
    marginBottom: "10px",
  },

  viewContainer: {
    padding: 30,
    backgroundColor: "white",
  },
};

function mapStateToProps(decks) {
  return {
    decks,
  };
}

export default connect(mapStateToProps)(DeckList);
