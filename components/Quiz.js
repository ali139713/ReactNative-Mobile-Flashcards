import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { Card } from "./Card";
import { Ionicons } from "@expo/vector-icons";
import { clearLocalNotification, setLocalNotification } from "../utils/helpers";
import { NavigationActions } from "react-navigation";

class Quiz extends Component {
  state = {
    questions: [],
    isQuestion: true,
    currentIndex: 0,
  };

  static navigationOptions = () => {
    return {
      title: "Quiz",
    };
  };

  componentDidMount() {
    const { decks, navigation } = this.props;

    const deck = Object.entries(decks).find((deck) => {
      return deck[1].title === navigation.state.params.deckId;
    });

    const questions = deck[1].questions.map((question) => {
      return {
        question: question.question,
        answer: question.answer,
        correct: false,
      };
    });

    this.setState({ questions });

    clearLocalNotification().then(setLocalNotification);
  }

  resetQuiz = () => {
    const questions = this.state.questions.map((question) => {
      return {
        question: question.question,
        answer: question.answer,
        correct: false,
      };
    });

    this.setState({ questions, currentIndex: 0, isQuestion: true });
  };

  handleButtons = (status) => {
    const questions = this.state.questions;
    questions[this.state.currentIndex].correct = status;

    this.setState({
      questions,
      currentIndex: this.state.currentIndex + 1,
      isQuestion: true,
    });
  };

  toggleQuestion = () => {
    this.setState({ isQuestion: !this.state.isQuestion });
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.questions.length > 0 &&
          this.state.currentIndex < this.state.questions.length && (
            <Card
              index={this.state.currentIndex}
              isQuestion={this.state.isQuestion}
              questions={this.state.questions}
              onQuestionPress={this.toggleQuestion}
              onButtonPress={this.handleButtons}
            />
          )}
        {this.state.questions.length > 0 &&
          this.state.currentIndex >= this.state.questions.length && (
            <View style={styles.container}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                {this.state.questions.filter((question) => question.correct)
                  .length === this.state.questions.length && (
                  <Ionicons
                    size={60}
                    style={styles.checkmarkIcon}
                    name="ios-checkmark-circle"
                  />
                )}
                {this.state.questions.filter((question) => question.correct)
                  .length !== this.state.questions.length && (
                  <Ionicons
                    size={60}
                    style={styles.alertIcon}
                    name="ios-alert"
                  />
                )}
                <Text style={style.quizDoneText}>
                  You've got{" "}
                  {
                    this.state.questions.filter((question) => question.correct)
                      .length
                  }{" "}
                  out of {this.state.questions.length} questions correct (
                  {Math.round(
                    (this.state.questions.filter((question) => question.correct)
                      .length /
                      this.state.questions.length) *
                      100
                  )}
                  %).
                </Text>
              </View>
              <View style={{ flex: 1, justifyContent: "flex-end" }}>
                <TouchableOpacity
                  style={[styles.button, style.sbackToDeckButton]}
                  onPress={() =>
                    this.props.navigation.dispatch(NavigationActions.back())
                  }
                >
                  <Text style={styles.buttonText}>Back to Deck</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.button}
                  onPress={this.resetQuiz}
                >
                  <Text style={styles.buttonText}>Restart Quiz</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        {this.state.questions.length === 0 && (
          <Text style={styles.noQuestions}>
            There are no questions in this deck. Please create some questions
            first.
          </Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "skyblue",
    flex: 1,
    justifyContent: "center",
  },
  buttonInputText: {
    borderColor: "grey",
    borderRadius: "50%",
    textAlign: "center",
  },

  noQuestions: {
    fontSize: 24,
    padding: 12,
  },
  quizDone: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  checkmarkIcon: {
    color: "green",
    marginBottom: 12,
  },
  alertIcon: {
    color: "red",
    marginBottom: 12,
  },
  quizDoneText: {
    fontSize: 24,
    textAlign: "center",
  },
  backToDeckButton: {
    backgroundColor: "white",
  },
});

function mapStateToProps(decks) {
  return {
    decks,
  };
}

export default connect(mapStateToProps)(Quiz);
