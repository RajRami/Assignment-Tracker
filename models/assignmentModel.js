//Import mongoose
const mongoose = require('mongoose')

//Define a schema for assignmentModel
var assignmentSchema = new mongoose.Schema({
    courseTitle: {
        type: String,
        required: 'Course title is required'
    },
    typeOfWork: {
        type: String,
        required: 'Type of work is required'
    },
    titleOfWork: {
        type: String,
        required: 'Title of work is required'
    },
    weighted: {
        type: String,
        required: 'Weighted is required'
    },
    dueDate:{
        type: String,
        required: 'Due date is required'
    }
})

//Make public
module.exports = mongoose.model('Assignment', assignmentSchema)