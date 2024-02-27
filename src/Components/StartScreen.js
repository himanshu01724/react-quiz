import React from 'react'

export default function StartScreen({questions,dispatch}){
    return(
        <div className = "start">
            <h2>Welcome to The React Quiz!</h2>
            <h3>{questions} <span style = {{color:'green'}}>Questions</span> to test your React Skills</h3>
            <button className = 'btn btn-ui' onClick = {() => dispatch({type:'showQuiz'})}>Let's go</button>
        </div>
    )
}