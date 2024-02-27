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


const initialState = {
    questions:[],
    status:'loading',                                //status will have multiple states like error, active
    index:0,
    answer:null,
    points:0,

}

function reducer(state, action){
    switch(action.type){
        case('settingData'):
            return {...state, questions:action.payload, status: 'ready'}
        case('dataFailed'):
            return {...state, status:'error'}
        case('showQuiz'):
            return {...state, status:'active'}
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
        default:
            throw new Error('Unwanted Action')
    }
}

export default function App(){

const [state, dispatch] = useReducer(reducer, initialState)
const {questions, status, index, answer, points} = state

const numQuestions = questions.length;

useEffect(()=>{
    fetchquestions()
},[])

async function fetchquestions(){
    try{
        const response = await fetch(`http://localhost:8000/questions`);
        if(!response.ok){
            throw new Error('Network Error')
        }
        const data = await response.json()
        dispatch({type:'settingData', payload:data})
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
                                                    dispatch = {dispatch}/>}
                {status === 'active' && (<>
                <Progress index = {index} 
                          numQuestions={numQuestions} 
                          points={points}
                          answer = {answer}
                />
                <Question question = {questions[index]} 
                dispatch = {dispatch}
                answer = {answer}
                />
                <NextButton dispatch={dispatch} answer = {answer}/>
                                        </>         )}
            </Main>
        </div>
    )
}