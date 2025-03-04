const mongoose = require("mongoose")
const Joi = require("joi")
const formSchema = new mongoose.Schema({
    fName: { type: String, required: true },
    lName: { type: String, required: true },
    email: { type: String, required: true },
    frame: { type: String, required: true },
    package: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true }
})
const Forms = mongoose.model('forms', formSchema, 'forms')
const mySchemas = { 'Forms': Forms }
module.exports = mySchemas;