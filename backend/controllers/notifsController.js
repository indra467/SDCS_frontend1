const Notif = require('../models/Notif')
const User = require('../models/User')

// @desc Get all notes 
// @route GET /notes
// @access Private
const getAllNotifs = async (req, res) => {
    // Get all notes from MongoDB
    const notifs = await Notif.find().lean()

    // If no notes 
    if (!notifs?.length) {
        return res.status(400).json({ message: 'No notifs found' })
    }

    // Add username to each note before sending the response 
    // See Promise.all with map() here: https://youtu.be/4lqJBBEpjRE 
    // You could also do this with a for...of loop
    const notifsWithUser = await Promise.all(notifs.map(async (notif) => {
        const user = await User.findById(notif.user).lean().exec()
        return { ...notif }
    }))

    res.json(notifsWithUser)
}

// @desc Create new note
// @route POST /notes
// @access Private
const createNewNotif = async (req, res) => {
    const { user, fleet_number, description } = req.body

    // Confirm data
    if (!user ||  !fleet_number || !description) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate title
   

    /*if (duplicate) {
        return res.status(409).json({ message: 'Duplicate note title' })
    }*/

    // Create and store the new user 
    const notif = await Notif.create({ user, fleet_number, description })

    if (notif) { // Created 
        return res.status(201).json({ message: 'New notif created' })
    } else {
        return res.status(400).json({ message: 'Invalid notif data received' })
    }

}

// @desc Update a note
// @route PATCH /notes
// @access Private


module.exports = {
    getAllNotifs,
    createNewNotif,
   
}