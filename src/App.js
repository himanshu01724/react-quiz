import React from 'react'
import Header from './Components/Header'
import Main from './Components/Main'
import { useEffect,useReducer } from 'react'
import Loader from './Components/Loader'
import Error from './Components/Error'
import StartScreen from './Components/StartScreen'
import Question from './Components/Question'
import NextButton from './Components/NextButton'
import Progress from './Components/Progress'
import Finished from './Components/Finished'
import Footer from './Components/Footer'
import Timer from './Components/Timer'

const TIME_FOR_QUESTION = 30;

const initialState = {
    questions:[],
    proficiency:11,
    status:'loading',                                //status will have multiple states like error, active
    index:0,
    answer:null,
    points:0,
    highscore:0,
    secondsRemaining:null,
    candidate:'',
    isSelected:true
}

function reducer(state, action){
    switch(action.type){
        case('name'):
            return {...state, candidate:action.payload, isSelected: state.candidate?.length > 2 ? false : state.isSelected}
        case('settingData'):
            return {...state, questions:action.payload, status: 'ready'}
        case('dataFailed'):
            return {...state, status:'error'}
        case('proficient'):
        let updatedQuestions;
        if(action.payload < 0){
            updatedQuestions = state.questions.slice(0, 5)
        }
        else if(action.payload>0 && action.payload<10){
            updatedQuestions = state.questions.slice(0,10)
        }
        else{
            updatedQuestions = state.questions;
        }
        console.log(action.payload)
            return {...state, proficiency:action.payload, questions: updatedQuestions }
        case('showQuiz'):
            return {...state, status:'active', secondsRemaining:state.questions.length*TIME_FOR_QUESTION}
        case('answer'):
            const question = state.questions.at(state.index)
            return {...state, answer:action.payload, points:
                                                     action.payload === question.correctOption
                                                     ? state.points + question.points
                                                     : state.points,            
            };
        case('updateIndex'):
            const len = state.questions.length
            return {...state, index:state.index <=len ? state.index + 1:state.index, answer:null}
        case('final'):
            return {...state, status:'finished', highscore: state.points > state.highscore ? 
                                                                           state.points :
                                                                           state.highscore}
        case('restart'):
            return {...initialState, status:'active', questions:state.questions }      
        
        case('timeout'):
            return {...state, secondsRemaining:state.secondsRemaining-1,
                              status:state.secondsRemaining === 0 ? 'finished':state.status}
        default:
            throw new Error('Unwanted Action')
    }
}

export default function App(){

const [state, dispatch] = useReducer(reducer, initialState)
const {questions, status, index, answer, points, highscore, secondsRemaining, candidate, isSelected, proficiency} = state

const numQuestions = questions.length;

const totalScore = questions.length > 0 ?questions.reduce((acc, item)=>{
    return acc + item.points
},0) : 0;

console.log(totalScore, candidate, proficiency)

useEffect(()=>{
    fetchquestions()
},[])

async function fetchquestions(){
    try{
        const response = await fetch(`/questions.json`);
        if(!response.ok){
            throw new Error('Network Error')
        }
        const data = await response.json()
        console.log(data)
        dispatch({type:'settingData', payload:data.questions})
    }
    catch(error){
        dispatch({type:'dataFailed'})
    }
}

    return(
        <div className = "app">
            {console.log(questions)}
            <Header/>

            
            <Main>
                {status === 'loading' && <Loader/>}
                {status === 'error'   &&  <Error/>}
                {status === 'ready' && <StartScreen questions={numQuestions}
                                                    dispatch = {dispatch}
                                                    name = {candidate}
                                                    isSelected = {isSelected}
                                                    />}
                {status === 'active' && (
                <>
                <Progress index = {index} 
                          numQuestions={numQuestions} 
                          points={points}
                          answer = {answer}
                          totalScore = {totalScore}
                          
                />
                <Question question = {questions[index]} 
                          dispatch = {dispatch}
                          answer = {answer}
                          
                />
                <Footer>
                <NextButton dispatch={dispatch} 
                            answer={answer}  
                            index={index} 
                            numQuestions={numQuestions}
                />
                <Timer dispatch = {dispatch} secondsRemaining = {secondsRemaining}/>
                </Footer>
                </>         
                )}
                {status === 'finished' && 
                (<>
                <Finished  points = {points} highscore = {highscore} candidate = {candidate} totalScore={totalScore}/>
                <button className = 'btn btn-ui' onClick={()=>dispatch({type:'restart'})}>Restart</button>
                </>
                )}
            </Main>
        </div>
    )
}