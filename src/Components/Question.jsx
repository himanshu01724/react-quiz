import React from "react";
import Options from "./Options";
import { useQuizContext } from "../QuizContext";

function Question() {
  const { question, dispatch, answer } = useQuizContext();
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Question;
