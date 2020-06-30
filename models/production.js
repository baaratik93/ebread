let mongoose = require('mongoose')
let productionSchema = mongoose.Schema({
    codeProduction: {
        type: String,
        required: true
    },
    poids_farine: {
        type: Number,
        required: true
    },
    levure: {
        type: Number,
        required: true
    },
    ameliorant: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Production',productionSchema)