export default function Progress({index,numQuestions, points, answer}){
    return(
        <header className = "progress">
            <progress max = {numQuestions} value = {index + Number(answer !== null)} />
            <p>Question <b>{index+1}</b>/{numQuestions}</p>
            <p>{points}/280 points</p>
        </header>
    )
}