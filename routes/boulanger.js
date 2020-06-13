let express = require('express')
let router = express.Router()

//  Lister tous les boulangers
router.get('/',(req,res)=>{
    res.render('boulangers/index')
})
//  demande du formulaire d'ajout d'un boulanger
router.get('/new',(req,res)=>{
    res.render('boulangers/new')
})
//  Ajouter un boulanger à la BD
router.post('/',(req,res)=>{
    res.render('boulangers/create')
})

module.exports = router