import React, {useState, useEffect, useContext} from 'react';
import {Route, Switch, Link} from 'react-router-dom'
import axios from 'axios'
import {DateContext} from './components/context/DateContext'
import TimerPage from './components/TimerPage'
import AddEvent from './components/AddEvent'
import List from './components/List'

function App() {
  const {setUpdate, update} = useContext(DateContext)
  const [dates, setDates] = useState()

  useEffect(() => {
    axios.get('/events')
      .then(resp => setDates(() => resp.data))
      .catch(err => console.log(err))
    setUpdate(() => false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update])

  if(dates){
  return (
    <Switch>
      <Route exact path='/'>
        <div className="home">
            <Link to='/filterpage' className="event">Upcoming Events</Link>
            <Link to='/listpage' className="event">Add New Event</Link>
        </div>
      </Route>
      <Route path='/listpage'>
        <div className="listPage">
            <AddEvent />
            <List dates={dates}/>
        </div>
      </Route>
      <Route path='/filterpage' >
        <div>
            <h1 className="filterpage">7 Day List</h1>
            <List dates={dates}/>
        </div>
      </Route>
      <Route path='/timerpage/:dateId'>
        <TimerPage dates={dates}/>
      </Route>
    </Switch>
    
  )}
  return (
    <div>Loading...</div>
  )
}

export default App;
