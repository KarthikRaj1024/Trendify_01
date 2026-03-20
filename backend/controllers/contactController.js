import contactModel from '../models/contactModel.js'

// Function to add contact
const addContact = async (req, res) => {
    try {
        const { name, mobile, message } = req.body

        const contactData = {
            name,
            mobile,
            message
        }

        const contact = new contactModel(contactData)
        await contact.save()

        res.json({ success: true, message: 'Message sent successfully! We\'ll get back to you soon.' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Function to get all contacts
const getContacts = async (req, res) => {
    try {
        const contacts = await contactModel.find({})
        res.json({ success: true, contacts })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { addContact, getContacts }