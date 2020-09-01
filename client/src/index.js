import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {DateContextProvider} from './components/context/DateContext'
import {BrowserRouter as Router} from 'react-router-dom'

ReactDOM.render(
        <DateContextProvider>
            <Router>
                <App />
            </Router>
        </DateContextProvider>, 
        document.getElementById('root')
    );

