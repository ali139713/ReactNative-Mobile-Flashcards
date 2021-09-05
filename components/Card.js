import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

export function Card(props) {
  const { index, showQuestion, questions, onQuestionPress, onButtonPress } =
      props,
    question = questions[index].question,
    answer = questions[index].answer;

  return (
    <View style={styles.container}>
      <Text style={styles.count}>
        {index + 1} / {questions.length}
      </Text>

      <View
        style={{ flex: 0.8, justifyContent: "flex-end", alignItems: "center" }}
      >
        {showQuestion && <Text style={styles.questionAnswer}>{question}</Text>}

        {!showQuestion && <Text style={styles.questionAnswer}>{answer}</Text>}

        <TouchableOpacity onPress={onQuestionPress}>
          <Text style={styles.toggleQuestionAnswer}>
            Show {showQuestion ? "Answer" : "Question"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <TouchableOpacity
          style={[styles.button, styles.correctButton]}
          onPress={() => onButtonPress(true)}
        >
          <Text style={styles.buttonText}>Correct</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.incorrectButton]}
          onPress={() => onButtonPress(false)}
        >
          <Text style={styles.buttonText}>Incorrect</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  count: {
    padding: 12,
  },
  questionAnswer: {
    fontSize: 24,
    paddingBottom: 6,
    paddingLeft: 12,
    paddingRight: 12,
  },
  toggleQuestionAnswer: {
    color: "lightgrey",
    fontSize: 18,
  },
  correctButton: {
    backgroundColor: "green",
  },
  incorrectButton: {
    backgroundColor: "red",
  },
  buttonInputText: {
    borderColor: "grey",
    borderRadius: "50%",
    textAlign: "center",
  },
  container: {
    backgroundColor: "skyblue",
    flex: 1,
    justifyContent: "center",
  },
});
