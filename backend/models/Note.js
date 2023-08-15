const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const noteSchema = new mongoose.Schema(
    {
       
        title: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        
        status: {
            type: String,
            default: "Open"
        },
        period: {
            type: String,
            default: "Short Term"
        }
    },
    {
        timestamps: true
    }
)

noteSchema.plugin(AutoIncrement, {
    inc_field: 'ticket',
    id: 'ticketNums',
    start_seq: 500
})

module.exports = mongoose.model('Note', noteSchema)