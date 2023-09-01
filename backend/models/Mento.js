const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const mentoSchema = new mongoose.Schema(
    {
       operator_name: {
        type: String,
        required: true
       },
       fleet_number: {
        type: String,
        required: true
       },
        date: {
            type: String,
            required: true
        },
        week: {
            type: String,
            required: true
        },
        
        location: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        hr_up: {
            type: String,
            required: true
        },
        hr_uns: {
            type: String,
            required: true
        },
        last_done: {
            type: String,
            required: true
        },
        next_done: {
            type: String,
            required: true
        },
        type1: {
            type: String,
            required: true
        },
       type2: {
            type: String,
            required: true
        },
        date2: {
            type: String,
            required: true
        },
        date3: {
            type: String,
            required: true
        },
        hour2: {
            type: String,
            required: true
        },
        hour3: {
            type: String,
            required: true
        },
        overall: {
            type: String,
            required: true
        },
        tt_1: {
            type: Boolean,
            default: false
        },
        tt_2: {
            type: Boolean,
            default: false
        },
        tt_3: {
            type: Boolean,
            default: false
        },
        tt_4: {
            type: Boolean,
            default: false
        },
        tyre_p: {
            type: Boolean,
            default: false
        },
        tyre_c: {
            type: Boolean,
            default: false
        },
        centarl_greasing: {
            type: Boolean,
            default: false
        },
        lower_oil: {
            type: Boolean,
            default: false
        },
        lower_coolant: {
            type: Boolean,
            default: false
        },
        design_oil1: {
            type: Boolean,
            default: false
        },
        design_oil2: {
            type: Boolean,
            default: false
        },
        pump_oil: {
            type: Boolean,
            default: false
        },
        winches_oil: {
            type: Boolean,
            default: false
        },
        winches_grease: {
            type: Boolean,
            default: false
        },
        hydraulic_oil: {
            type: Boolean,
            default: false
        },
        leakage: {
            type: Boolean,
            default: false
        },
        central_greasing2: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

mentoSchema.plugin(AutoIncrement, {
    inc_field: 'mento_ticket',
    id: 'mento_ticketNums',
    start_seq: 500
})

module.exports = mongoose.model('Mento', mentoSchema)