import React, {useState, useContext} from 'react'
import {Link} from 'react-router-dom'
import {DateContext} from './context/DateContext'

import AddEvent from './AddEvent'

function Item(props){
    const [edit, setIsEdit] = useState(false)
    const {deleteDate} = useContext(DateContext)

    function handleDelete(){
        deleteDate(props.id)
    }

    function handleEdit(){
        setIsEdit(() => true)
    }

    if(edit){
        return (
            <div className='listItem'>
                <AddEvent 
                    edit={edit} 
                    setIsEdit={setIsEdit} 
                    title={props.title} 
                    date={props.date} 
                    id={props.id}
                />
            </div>
        )
    } else {
        return (
            <div className='listItem'>
                <Link 
                to={`/timerpage/${props.id}`}
                    >{`${props.title} -- ${props.month} ${props.day}, ${props.year}`}
                </Link>
                <div>
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
                </div>
            </div>
        )
    }
}

export default Item