const Mento = require('../models/Mento')
const User = require('../models/User')

// @desc Get all notes 
// @route GET /notes
// @access Private
const getAllMentos = async (req, res) => {
    // Get all notes from MongoDB
    const mentos = await Mento.find().lean()

    // If no notes 
    if (!mentos?.length) {
        return res.status(400).json({ message: 'No mentos found' })
    }

    // Add username to each note before sending the response 
    // See Promise.all with map() here: https://youtu.be/4lqJBBEpjRE 
    // You could also do this with a for...of loop
    const mentosWithUser = await Promise.all(mentos.map(async (mento) => {
        const user = await User.findById(mento.user).lean().exec()
        return { ...mento }
    }))

    res.json(mentosWithUser)
}

// @desc Create new note
// @route POST /notes
// @access Private
const createNewMento = async (req, res) => {
    const { user,operator_name,fleet_number, date,week,location,country,hr_up,hr_uns,last_done,next_done,type1,type2, date2, date3, hour2, hour3, overall,tt_1,tt_2,tt_3,tt_4,tyre_p,tyre_c,centarl_greasing,lower_oil,lower_coolant,design_oil1,design_oil2,pump_oil,winches_oil,winches_grease,hydraulic_oil,leakage,central_greasing2    } = req.body

    // Confirm data
    if (!user || !operator_name|| ! fleet_number|| ! date|| ! week|| ! location|| ! country|| ! hr_up|| ! hr_uns|| ! last_done|| ! next_done|| ! type1|| ! type2|| ! date2|| ! date3|| ! hour2|| ! hour3|| ! overall) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate title
    const duplicate = await Mento.findOne({ operator_name }).collation({ locale: 'en', strength: 2 }).lean().exec()

    /*if (duplicate) {
        return res.status(409).json({ message: 'Duplicate note title' })
    }*/

    // Create and store the new user 
    const mento = await Mento.create({ user,operator_name,fleet_number, date,week,location,country,hr_up,hr_uns,last_done,next_done,type1,type2, date2, date3, hour2, hour3, overall,tt_1,tt_2,tt_3,tt_4,tyre_p,tyre_c,centarl_greasing,lower_oil,lower_coolant,design_oil1,design_oil2,pump_oil,winches_oil,winches_grease,hydraulic_oil,leakage,central_greasing2     })

    if (mento) { // Created 
        return res.status(201).json({ message: 'New mento created' })
    } else {
        return res.status(400).json({ message: 'Invalid mento data received' })
    }

}

// @desc Update a note
// @route PATCH /notes
// @access Private
const updateMento = async (req, res) => {
    const { user,operator_name,fleet_number, date,week,location,country,hr_up,hr_uns,last_done,next_done,type1,type2, date2, date3, hour2, hour3, overall,tt_1,tt_2,tt_3,tt_4,tyre_p,tyre_c,centarl_greasing,lower_oil,lower_coolant,design_oil1,design_oil2,pump_oil,winches_oil,winches_grease,hydraulic_oil,leakage,central_greasing2    } = req.body

    // Confirm data
    if (!user || !operator_name|| ! fleet_number|| ! date|| ! week|| ! location|| ! country|| ! hr_up|| ! hr_uns|| ! last_done|| ! next_done|| ! type1|| ! type2|| ! date2|| ! date3|| ! hour2|| ! hour3|| ! overall) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm note exists to update
    const mento = await Mento.findById(id).exec()

    if (!mento) {
        return res.status(400).json({ message: 'Mento not found' })
    }

    // Check for duplicate title
    const duplicate = await Mento.findOne({ operator_name }).collation({ locale: 'en', strength: 2 }).lean().exec()

    // Allow renaming of the original note 
    /*if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate note title' })
    }*/

    mento.operator_name=operator_name
 mento.fleet_number=fleet_number
 mento.date=date
 mento.week=week
 mento.location=location
 mento.country=country
 mento.hr_up=hr_up
 mento.hr_uns=hr_uns
 mento.last_done=last_done
 mento.next_done=next_done
 mento.type1=type1
 mento.type2=type2
 mento.date2=date2
 mento.date3=date3
 mento.hour2=hour2
 mento.hour3=hour3
 mento.overall=overall
 mento.tt_1=tt_1
     mento.tt_2=tt_2
     mento.tt_3=tt_3
     mento.tt_4=tt_4
     mento.tyre_p=tyre_p
     mento.tyre_c=tyre_c
     mento.centarl_greasing=centarl_greasing
     mento.lower_oil=lower_oil
     mento.lower_coolant=lower_coolant
     mento.design_oil1=design_oil1
     mento.design_oil2=design_oil2
     mento.pump_oil=pump_oil
     mento.winches_oil=winches_oil
     mento.winches_grease=winches_grease
     mento.hydraulic_oil=hydraulic_oil
     mento.leakage=leakage
     mento.central_greasing2=central_greasing2




    const updatedMento = await mento.save()

    res.json(`'${updatedMento.title}' updated`)
}

// @desc Delete a note
// @route DELETE /notes
// @access Private
const deleteMento = async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Mento ID required' })
    }

    // Confirm note exists to delete 
    const mento = await Mento.findById(id).exec()

    if (!mento) {
        return res.status(400).json({ message: 'Mento not found' })
    }

    const result = await mento.deleteOne()

    const reply = `Mento '${result.title}' with ID ${result._id} deleted`

    res.json(reply)
}

module.exports = {
    getAllMentos,
    createNewMento,
    updateMento,
    deleteMento
}