let mongoose = require('mongoose')
let userSchema = mongoose.Schema({
    prenom: {
        type:String,
        required: true
    },
    nom: {
        type:String,
        required: true
    },
    email: {
        type:String,
        required: true
    },
    pwd: {
        type:String,
        required: true
    }

})

module.exports = mongoose.model('User',userSchema)