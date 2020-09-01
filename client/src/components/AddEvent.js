import React, {useState, useContext} from 'react'
import {DateContext} from './context/DateContext'

function AddEvent(props){
    const {editDate, addDate} = useContext(DateContext)
    const [addForm, setAddForm] = useState({title: props.title || "", date: ""})
    
    function handleSubmit(e){
        e.preventDefault()
        if(props.edit){
            editDate(props.id, addForm.title, addForm.date)
            props.setIsEdit(false)
        } else {
            addDate(addForm.title, addForm.date)
        }
    }

    function handleChange(e){
        const {name, value} = e.target
        setAddForm(prevForm => {
            return {
                ...prevForm,
                [name]: value
            } 
        })
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <input 
                onChange={handleChange} 
                value={addForm.title} 
                name='title' 
                className="inputTitle" 
                type='text' 
                placeholder='Enter Title...' />
            <input 
                onChange={handleChange} 
                value={addForm.date} 
                name='date' 
                className="input" 
                type='date' />
            <button className="button">{props.edit ? "Save" : "Submit"}</button>
        </form>
    )
}

export default AddEvent