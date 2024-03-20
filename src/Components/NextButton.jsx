import { useQuizContext } from "../QuizContext";

export default function NextButton() {
  const { dispatch, answer, index, numQuestions } = useQuizContext();
  console.log(numQuestions - 1);
  if (answer === null) return null;

  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "updateIndex" })}
      >
        Next
      </button>
    );

  if (index === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "final" })}
      >
        Finish
      </button>
    );
}
