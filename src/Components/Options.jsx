import React from 'react'

export default function Options ({question, dispatch, answer }) {

    const hasAnswered = answer !== null;

  return (
    <div className = "options">
            {question.options.map((item,i)=>(
                <button className = {`btn btn-option ${i === answer ? 'answer':''} 
                                    ${hasAnswered ? i === question.correctOption ? 'correct':'wrong':''}`} 
                        key={i}
                        disabled = {hasAnswered}
                        onClick={()=>dispatch({type:'answer', payload:i})}
                >{item}</button>
            ))}
    </div>
  )
}
