export default function Finished({points, highscore, candidate, totalScore}){

const percentage = (points/totalScore) * 100;

let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦‍♂️";

    return(
        <>
        <p className = 'result'>
            <span>{emoji}</span>{candidate} scored <b>{points}</b> out of {totalScore} ({Math.floor(percentage)}%)
        </p>
        <p className = 'highscore'>(Highscore:{highscore})</p>
        </>
    )
}