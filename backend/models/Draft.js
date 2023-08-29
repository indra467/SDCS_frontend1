const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const draftSchema = new mongoose.Schema(
    {
       machine_no: {
        type: String,
        required: true
       },
       current_location: {
        type: String,
        required: true
       },
        c_name: {
            type: String,
            required: true
        },
        site_location: {
            type: String,
            required: true
        },
        
        order_duration: {
            type: String,
            required: true
        },
        configuration: {
            type: String,
            required: true
        },
        rental_charges: {
            type: Number,
            required: true
        },
        number_of_shifts: {
            type: Number,
            required: true
        },
        mobilization_charges: {
            type: Number,
            required: true
        },
        demobilization_charges: {
            type: Number,
            required: true
        },
        SDCS_poc: {
            type: String,
            required: true
        },
        delivery_deadline: {
            type: String,
            required: true
        },
        customer_poc: {
            type: String,
            required: true
        },
        urgency: {
            type: Boolean,
            default: false
        },
        myfile : String,
        SDG_id: {
            type:String
        },
        client : {
            type:String
        },
        current_location2: {
            type: String
        },
        invoice_description:{
            type: String
        },
        billing_period:{
            type: String
        },
        remarks:{
            type: String
        },
        myfile2: String,
        myfile3: String
    },
    {
        timestamps: true
    }
)

draftSchema.plugin(AutoIncrement, {
    inc_field: 'draft_ticket',
    id: 'draft_ticketNums',
    start_seq: 500
})

module.exports = mongoose.model('Draft', draftSchema)