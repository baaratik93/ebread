let mongoose = require('mongoose')
let painSchema = mongoose.Schema({
    libele: {
        type: String,
        required: true
    },
    masse: {
        type: Number,
        required: true
    },
    code: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Pain',painSchema )