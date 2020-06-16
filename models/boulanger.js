let mongoose = require('mongoose')
let boulangerSchema = mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    telephone: {
        type: String,
        required: true
    },
    adress: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Boulanger',boulangerSchema)