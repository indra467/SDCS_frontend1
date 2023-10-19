const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const notifSchema = new mongoose.Schema(
    {
       
       fleet_number: {
        type: String,
        required: true
       },
        description: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

notifSchema.plugin(AutoIncrement, {
    inc_field: 'notif_ticket',
    id: 'notif_ticketNums',
    start_seq: 500
})

module.exports = mongoose.model('Notif', notifSchema)