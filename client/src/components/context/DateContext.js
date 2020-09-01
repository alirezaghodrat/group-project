import React, {useState} from 'react'
import axios from 'axios'

const DateContext = React.createContext()

function DateContextProvider(props){
    const [update, setUpdate] = useState(false)

    function addDate(title, date){
        axios.post('/events', {
            title,
            date
        })
        setUpdate(() => true)
    }

    function deleteDate(id){
        axios.delete(`/events/${id}`)
        setUpdate(() => true)
    }

    function editDate(id, title, date){
        axios.put(`/events/${id}`, {
            title,
            date
        })
        setUpdate(() => true)
    }

    return (
        <DateContext.Provider value={{update, setUpdate, addDate, deleteDate, editDate}}>
            {props.children}
        </DateContext.Provider>
    )
}

export {DateContextProvider, DateContext}