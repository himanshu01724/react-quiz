export default function Progress({index,numQuestions, points, answer, totalScore}){
    return(
        <header className = "progress">
            <progress max = {numQuestions} value = {index + Number(answer !== null)} />
            <p>Question <b>{index+1}</b>/{numQuestions}</p>
            <p>{points}/{totalScore} points</p>
        </header>
    )
}