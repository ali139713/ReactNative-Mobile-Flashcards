import React, { Component } from "react";
import {
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import * as actions from "../actions";
import * as api from "../utils/dummyApi";
import { connect } from "react-redux";

class AddDeck extends Component {
  state = {
    title: "",
  };

  submit = () => {
    if (this.state.title) {
      const { dispatch } = this.props;

      dispatch(actions.addDeck(this.state.title));
      api.addDeck(this.state.title);

      this.setState({ title: "" });
      Keyboard.dismiss();
      this.props.navigation.navigate("Deck", { deckId: this.state.title });
    } else {
      alert("Title is mandatory");
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.deckTitle}>You can add a new deck here!!!</Text>
        <Text style={styles.formLabel}>Please enter a deck name</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(title) => this.setState({ title })}
          value={this.state.title}
        />
        <TouchableOpacity style={styles.addButton} onPress={this.submit}>
          <Text style={styles.buttonInputText}>Add</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  deckTitle: {
    fontSize: 24,
    padding: 12,
    fontWeight: "bold",
    fontFamily: "sans-serif",
    fontStyle: "italic",
    textDecorationLine: "underline",
    textDecorationColor: "black",
  },
  textInput: {
    paddingLeft: 6,
    paddingRight: 6,
    paddingTop: 11,
    paddingBottom: 11,
    borderColor: "black",
    backgroundColor: "white",
    width: "30%",
  },
  container: {
    backgroundColor: "skyblue",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formLabel: {
    padding: 10,
    fontSize: 15,
    fontStyle: "Italic",
  },
  addButton: {
    backgroundColor: "grey",
    margin: 14,
    width: "25%",
    paddingBottom: 12,
    paddingTop: 12,
    marginTop: "4%",
  },
  buttonInputText: {
    borderColor: "grey",
    borderRadius: "50%",
    textAlign: "center",
  },
});

export default connect()(AddDeck);
