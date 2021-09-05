import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";

class Deck extends Component {
  state = {
    deck: null,
  };

  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params;

    return {
      title: deckId,
    };
  };

  componentDidMount() {
    const { decks, navigation } = this.props;

    const deck = Object.entries(decks).find((deck) => {
      return deck[1].title === navigation.state.params.deckId;
    });

    this.setState({ deck: deck[1] });
  }

  componentWillReceiveProps(props) {
    if (props.decks) {
      const { navigation } = this.props;

      const deck = Object.entries(props.decks).find((deck) => {
        return deck[1].title === navigation.state.params.deckId;
      });

      this.setState({ deck: deck[1] });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.deck && (
          <View style={styles.viewDeck}>
            <Text style={styles.deckTitle}>{this.state.deck.title}</Text>
            <Text style={styles.questionCount}>
              {this.state.deck.questions.length} cards
            </Text>
          </View>
        )}
        {this.state.deck && (
          <View style={styles.viewDeck}>
            <TouchableOpacity
              style={[styles.button, styles.addCardButton]}
              onPress={() =>
                this.props.navigation.navigate("AddCard", {
                  deckId: this.state.deck.title,
                })
              }
            >
              <Text style={styles.buttonText}>Add card</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                this.props.navigation.navigate("Quiz", {
                  deckId: this.state.deck.title,
                })
              }
            >
              <Text style={styles.buttonInputText}>Start quiz</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  deckTitle: {
    fontSize: 24,
    paddingBottom: 6,
  },
  container: {
    backgroundColor: "skyblue",
    flex: 1,
    justifyContent: "center",
  },
  questionCount: {
    color: "grey",
    fontSize: 18,
  },
  addCardButton: {
    backgroundColor: "white",
  },
  viewDeck: {
    flex: 0.9,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonInputText: {
    borderColor: "grey",
    borderRadius: "50%",
    textAlign: "center",
  },
});

function mapStateToProps(decks) {
  return {
    decks,
  };
}

export default connect(mapStateToProps)(Deck);
