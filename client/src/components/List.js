import React from 'react'
import {useLocation, Link} from 'react-router-dom'
import Item from './Item'


function List(props){
    const {pathname} = useLocation()

    function date(item){
        let date = new Date(item.date)
        let month = date.getUTCMonth()
        let day = date.getUTCDate()
        let year = date.getUTCFullYear()
        const monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October",  "November", "December"]

        return {
            year,
            month,
            day,
            monthArr,
            date
        }
    }

    if(pathname === '/listpage') {
        const dateList = props.dates.map((item) => {
        const result = date(item)

        return (
            <Item 
                id={item._id}
                title={item.title}
                date={result.date}
                year={result.year}
                month={result.monthArr[result.month]}
                day={result.day}
                key={item._id}
            />
        )
    }) 
    return (
        <div>
            <div className='list' >
                {dateList}
            </div>
            <div className='buttons'>
                <Link to='/'>Home</Link>
                <Link to='/filterpage'>Upcoming Events</Link>
            </div>
        </div>
    )} 
    else if(pathname === '/filterpage') {

        const filterList = props.dates.filter(item => {
            const date = new Date()
            const currentDate = new Date(item.date)

            if((currentDate - date) / 86400000 <= 7){
                return true
            }
            return false
        })

        const filterDisplay = filterList.map(item => {
            const result = date(item)

            return (
                <Item 
                id={item._id}
                title={item.title}
                date={result.date}
                year={result.year}
                month={result.monthArr[result.month]}
                day={result.day}
                key={item._id}
            />
            )
        })

        return (
        <div>
            <div className='list'>
                {filterDisplay}
            </div>
            <div className='buttons'>
                <Link to='/'>Home</Link>
                <Link to='/listpage'>All Events</Link>
            </div>
        </div>  
        )
    }
    
}

export default List