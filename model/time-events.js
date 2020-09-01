const mongoose = require('mongoose')
const Schema = mongoose.Schema


const timeEventsSchema = new Schema ({ 
    title: {
        type: String, 
        required: true
    }, 
    date: { 
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('timeEvent', timeEventsSchema)