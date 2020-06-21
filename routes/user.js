const express = require('express')
const route = express.Router()
let User = require('../models/user')

route.get('/',(req,res)=>{
    res.send('Les utilisateurs de e-bread')
})
route.get('/signup',(req,res)=>{
    res.render('users/signup',{user: new User()})
})

route.get('/login',(req,res)=>{
    res.render('users/login', {user: new User()})
})

module.exports = route