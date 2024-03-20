import React from 'react'
import Header from './Components/Header'
import Main from './Components/Main'
import Loader from './Components/Loader'
import Error from './Components/Error'
import StartScreen from './Components/StartScreen'
import Question from './Components/Question'
import NextButton from './Components/NextButton'
import Progress from './Components/Progress'
import Finished from './Components/Finished'
import Footer from './Components/Footer'
import Timer from './Components/Timer'
import {useQuizContext} from './QuizContext'





export default function App(){

    const {status, dispatch} = useQuizContext()

    return(
        <div className = "app">
            
            <Header/>            
            <Main>
                {status === 'loading' && <Loader/>}
                {status === 'error'   &&  <Error/>}
                {status === 'ready' && <StartScreen/>}
                {status === 'active' && (
                <>
                <Progress/>
                <Question/>
                <Footer>
                <NextButton/>
                <Timer/>
                </Footer>
                </>         
                )}
                {status === 'finished' && 
                (<>
                <Finished/>
                <button className = 'btn btn-ui' onClick={()=>dispatch({type:'restart'})}>Restart</button>
                </>
                )}
            </Main>
        </div>
    )
}