const express = require('express')
const route = express.Router()
let User = require('../models/user')
let bcrypt = require('bcrypt')

route.get('/',(req,res)=>{
    res.send('Les utilisateurs de e-bread')
})
route.get('/signup',(req,res)=>{
    res.render('users/signup',{user: new User()})
})

route.get('/login',(req,res)=>{
    res.render('users/login', {user: new User()})
})
route.post('/signup',(req,res)=>{
 User.find({email: req.body.email})
    .exec()
    .then((user)=>{
        if(user.length >= 1){
          return res.status(409).json({err: "Le mail existe déja"})
        }else{
            if(req.body.pwd === req.body.cpwd)
            {
                    bcrypt.hash(req.body.pwd,10,(err,hash)=>{
                        if(err){
                                res.status(500).json({error: err})
                        }else
                        {
                            let user =  new User({
                                nom: req.body.nom,
                                prenom: req.body.prenom,
                                email: req.body.email,
                                pwd: req.body.pwd
                           })
                            user.save()
                                .then((result)=> 
                                    {return res.status(201).json({msg: "L'utilisateur est ajouté avec succès"})}
                                 )
                                .catch((err)=> 
                                    {
                                        return res.status(404).json({err: err})
                                    })
                        }
                    })
            }else{
                res.status(404).json({err: "les mots de passe ne correspondent pas"})
            }
        }
    })
})


module.exports = route