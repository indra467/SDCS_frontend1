const Draft = require('../models/Draft')
const User = require('../models/User')

// @desc Get all notes 
// @route GET /notes
// @access Private
const getAllDrafts = async (req, res) => {
    // Get all notes from MongoDB
    const drafts = await Draft.find().lean()

    // If no notes 
    if (!drafts?.length) {
        return res.status(400).json({ message: 'No drafts found' })
    }

    // Add username to each note before sending the response 
    // See Promise.all with map() here: https://youtu.be/4lqJBBEpjRE 
    // You could also do this with a for...of loop
    const draftsWithUser = await Promise.all(drafts.map(async (draft) => {
        const user = await User.findById(draft.user).lean().exec()
        return { ...draft }
    }))

    res.json(draftsWithUser)
}

// @desc Create new note
// @route POST /notes
// @access Private
const createNewDraft = async (req, res) => {
    const { user,machine_no, current_location,demobilization_charges, c_name, site_location, order_duration, configuration, rental_charges, number_of_shifts, mobilization_charges, SDCS_poc, delivery_deadline, customer_poc, urgency, myfile } = req.body

    // Confirm data
    if (!user ||!machine_no ||!current_location || !demobilization_charges||!c_name|| !site_location|| !order_duration|| !configuration|| !rental_charges|| !number_of_shifts|| !mobilization_charges|| !SDCS_poc|| !delivery_deadline|| !customer_poc||!myfile ) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate title
    const duplicate = await Draft.findOne({ c_name }).collation({ locale: 'en', strength: 2 }).lean().exec()

    /*if (duplicate) {
        return res.status(409).json({ message: 'Duplicate note title' })
    }*/

    // Create and store the new user 
    const draft = await Draft.create({ user,machine_no, current_location,demobilization_charges, c_name, site_location, order_duration, configuration, rental_charges, number_of_shifts, mobilization_charges, SDCS_poc, delivery_deadline, customer_poc, urgency, myfile })

    if (draft) { // Created 
        return res.status(201).json({ message: 'New draft created' })
    } else {
        return res.status(400).json({ message: 'Invalid draft data received' })
    }

}

// @desc Update a note
// @route PATCH /notes
// @access Private
const updateDraft = async (req, res) => {
    const { id, user, machine_no, current_location,demobilization_charges, c_name, site_location, order_duration, configuration, rental_charges, number_of_shifts, mobilization_charges, SDCS_poc, delivery_deadline, customer_poc, urgency, SDG_id, client, current_location2, invoice_description, billing_period, remarks, myfile2, myfile3 } = req.body

    // Confirm data
    if (!id || !user || !machine_no ||!current_location || !demobilization_charges || !c_name|| !site_location|| !order_duration|| !configuration|| !rental_charges|| !number_of_shifts|| !mobilization_charges|| !SDCS_poc|| !delivery_deadline|| !customer_poc||  !SDG_id || !client || !current_location2 || !invoice_description || !billing_period || !remarks ) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm note exists to update
    const draft = await Draft.findById(id).exec()

    if (!draft) {
        return res.status(400).json({ message: 'Note not found' })
    }

    // Check for duplicate title
    const duplicate = await Draft.findOne({ c_name }).collation({ locale: 'en', strength: 2 }).lean().exec()

    // Allow renaming of the original note 
    /*if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate note title' })
    }*/

    draft.user = user
    draft.machine_no= machine_no
    draft.current_location= current_location
    draft.demobilization_charges = demobilization_charges
draft.c_name = c_name
draft.site_location = site_location
draft.order_duration = order_duration
draft.configuration = configuration
draft.rental_charges = rental_charges
draft.number_of_shifts = number_of_shifts
draft.mobilization_charges = mobilization_charges
draft.SDCS_poc = SDCS_poc
draft.delivery_deadline = delivery_deadline
draft.customer_poc = customer_poc
draft.urgency = urgency
draft.SDG_id = SDG_id
draft.client = client
draft.current_location2 = current_location2
draft.invoice_description = invoice_description
draft.billing_period = billing_period
draft.remarks = remarks
if(!myfile3){
   draft.myfile2 = myfile2 
}else{
    draft.myfile3 = myfile3
}


    const updatedDraft = await draft.save()

    res.json(`'${updatedDraft.title}' updated`)
}

// @desc Delete a note
// @route DELETE /notes
// @access Private
const deleteDraft = async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Draft ID required' })
    }

    // Confirm note exists to delete 
    const draft = await Draft.findById(id).exec()

    if (!draft) {
        return res.status(400).json({ message: 'Draft not found' })
    }

    const result = await draft.deleteOne()

    const reply = `Draft '${result.title}' with ID ${result._id} deleted`

    res.json(reply)
}

module.exports = {
    getAllDrafts,
    createNewDraft,
    updateDraft,
    deleteDraft
}