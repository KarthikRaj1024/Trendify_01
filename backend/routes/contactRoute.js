import express from 'express'
import { addContact, getContacts } from '../controllers/contactController.js'
import adminAuth from '../middleware/adminAuth.js'

const contactRouter = express.Router()

contactRouter.post('/add', addContact)
contactRouter.get('/list', adminAuth, getContacts)

export default contactRouter