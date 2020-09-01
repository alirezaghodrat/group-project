const mongoose = require('mongoose')
const express = require('express')
const app = express()
const morgan = require('morgan')
const timeEvent = require('./model/time-events.js')

app.use('/events', express.json())
app.use(morgan('dev'))

//get all event
app.get('/events', (req, res, next) => { 
    timeEvent.find((err, item) => { 
        if(err){ 
            res.status(500)
            return(next(err))
        } else { 
           return res.status(200).send(item)
        }
    })
})

//get event by id
app.get('/events/:dateId', (req, res, next) => { 
    timeEvent.find({_id: req.params.dateId}, (err, item) => { 
        if(err){ 
            res.status(500)
            return(next(err))
        } else { 
            return res.status(200).send(item)
        }
    })
})

//add new event
app.post('/events', (req, res, next) => { 
    const newItem = new timeEvent(req.body)
    newItem.save((err, savedItem) => { 
       if(err){ 
           const error = new Error(err.message)
           res.status(500)
           return(next(error))
       } else { 
           return res.status(201).send(savedItem)
       }
    })
})

//delete event
app.delete('/events/:eventId', (req, res, next) => { 
    timeEvent.findOneAndDelete({_id: req.params.eventId}, (err, deleteditem)=>{ 
        if(err){ 
            const error = new Error(err.message)
            res.status(500)
            return(next(error))
        } else { 
            return res.status(200).send(`succesfully deleted ${deleteditem.title}`)
        }
    })
})

//update event
app.put('/events/:eventId', (req, res, next) => { 
    timeEvent.findOneAndUpdate({_id: req.params.eventId}, req.body , {new: true}, (err, updatedItem) => { 
        if(err){ 
            const error = new Error(err.message)
            res.status(500)
            return(next(error))
        } else { 
            return res.status(200).send(updatedItem)
        }
    })
})

mongoose.connect('mongodb+srv://Tracisz:wfQ2oEUpRNLRjbHU@cluster0-xvhyc.mongodb.net/test?retryWrites=true&w=majority', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true, 
    useFindAndModify: false
}, () => console.log("connected to database") 
)

app.use((err, req, res, next) => { 
    console.log(err)
    return res.send({ 
        errMsg: err.message,
    })
})


app.listen(9000,() => { 
    console.log('running on port 9000')
})


module.exports = app
