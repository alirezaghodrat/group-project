import React, {useEffect, useState} from 'react'
import {useHistory, useParams} from 'react-router-dom'


function TimerPage(props){
    const history = useHistory()
    const {dateId} = useParams()
    const singleItem = props.dates.find(item => item._id === dateId)

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(singleItem.date))
    const timerComponents = []

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft(singleItem.date))
        }, 1000)
        return () => {
            clearTimeout(timer)
        }
    })
    
    function calculateTimeLeft(endDate) {
       const difference = +new Date(endDate) - +new Date()
       let timeLeft = {}

       if (difference > 0) {
           timeLeft = {
               DAYS: Math.floor(difference / (1000 * 60 * 60 * 24)),
               HOURS: Math.floor((difference / (1000 * 60 * 60)) % 24),
               MIN: Math.floor((difference / 1000 / 60) % 60),
               SEC: Math.floor((difference / 1000) % 60)
           }
       }

       return timeLeft
    }

    Object.keys(timeLeft).forEach(interval => {
        if (!timeLeft[interval]){
            return;
        }
        timerComponents.push(
            <h1>
                {timeLeft[interval]} {interval}{" "}
            </h1>
        )
    })






    function handleClick() {
        history.goBack()
    }

    return (
        <div className='timer'>
            <h2 className='title'>{singleItem.title}</h2>
            <div className='timerContainer'>
                {timerComponents.length ? timerComponents : <span>Time's Up!</span>}
            </div>
            <button onClick={handleClick} className="back">Back</button>  
        </div>
    ) 
    
}

export default TimerPage



