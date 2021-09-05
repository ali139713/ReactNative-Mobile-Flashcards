import React, { Component } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as actions from "../actions";
import * as api from "../utils/dummyApi";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";

class AddCard extends Component {
  state = {
    question: "",
    answer: "",
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: `Add card`,
    };
  };

  submit = () => {
    if (this.state.question && this.state.answer) {
      const { dispatch, navigation } = this.props;

      dispatch(
        actions.addToDeck(
          navigation.state.params.deckId,
          this.state.question,
          this.state.answer
        )
      );
      api.addToDeck(
        navigation.state.params.deckId,
        this.state.question,
        this.state.answer
      );

      this.setState({ question: "", answer: "" });
      Keyboard.dismiss();
      this.props.navigation.dispatch(NavigationActions.back());
    } else {
      alert("All fields are mandatory....");
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.deckTitle}>
          Add card to {this.props.navigation.state.params.deckId}
        </Text>
        <Text style={styles.formLabel}>Please Enter a Question</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(question) => this.setState({ question })}
          value={this.state.question}
        />
        <Text style={styles.formLabel}>Please Enter an Answer</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(answer) => this.setState({ answer })}
          value={this.state.answer}
        />
        <TouchableOpacity style={styles.addButton} onPress={this.submit}>
          <Text style={styles.buttonInputText}>Add card</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  deckTitle: {
    fontSize: 24,
    padding: 12,
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
  },
  formLabel: {
    padding: 10,
    fontSize: 15,
    fontStyle: "Italic",
    borderColor: "black",
  },
  buttonInputText: {
    borderColor: "grey",
    borderRadius: "50%",
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "grey",
    margin: 12,
    width: "30%",
    marginLeft: "36%",
    paddingBottom: 12,
    paddingTop: 12,
  },
});

export default connect()(AddCard);
