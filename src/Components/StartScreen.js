import React from 'react'

export default function StartScreen({questions,dispatch, isSelected}){
    return(
        <div className = "start">
            <h2>Welcome to The React Quiz!</h2>
            <h3>{questions} <span style = {{color:'green'}}>Questions</span> to test your React Skills</h3>
            <label>Enter you name and Proficiency to continue</label><br/>
            <span style = {{display:'flex', gap:'10px'}}>
            <input placeholder = "Himanshu" type = 'text' onChange={(e)=>dispatch({type:'name',payload:e.target.value})}></input>
            <select  onChange = {(e)=>dispatch({type:'proficient', payload:Number(e.target.value)})}>
                <option value = {11}>Expert</option>
                <option value = {5}>Intermeddiate</option>
                <option value = {-1}>Beginner</option>
            </select>
            </span>
            <br/>
            <button className = 'btn btn-ui' onClick = {() => dispatch({type:'showQuiz'})}
            disabled = {isSelected}
            >Let's go</button>
        </div>
    )
}