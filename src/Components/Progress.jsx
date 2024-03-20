import { useQuizContext } from "../QuizContext";

export default function Progress() {
  const { index, numQuestions, points, answer, totalScore } = useQuizContext();
  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <b>{index + 1}</b>/{numQuestions}
      </p>
      <p>
        {points}/{totalScore} points
      </p>
    </header>
  );
}
