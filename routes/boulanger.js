let express = require('express')
let router = express.Router()
let Boulanger = require('../models/boulanger')

//  Lister tous les boulangers
router.get('/',(req,res)=>{
    res.render('boulangers/index')
})
//  demande du formulaire d'ajout d'un boulanger
router.get('/new',(req,res)=>{
    res.render('boulangers/new',{ boulanger: new Boulanger() })
})
//  Ajouter un boulanger à la BD
router.post('/',(req,res)=>{
    res.send(new Boulanger({
        nom:  req.body.nom,
        telephone: req.body.telephone,
        adress: req.body.adress
    }))
})

module.exports = router