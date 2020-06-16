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
router.post('/',async(req,res)=>{
    let boulanger = new Boulanger({
        nom:  req.body.nom,
        telephone: req.body.telephone,
        adress: req.body.adress
    })
    try {
        let newBoulanger = await boulanger.save()
        res.redirect('boulangers')
    } catch  {
                res.render('boulangers/new', {
                boulanger: boulanger,
                msgErr: "Erreur d'enrégistrement à la BD"
            })
    }
    // boulanger.save((err,newBoulanger)=>{
    //     if(err){
    //         res.render('boulangers/new', {
    //             boulanger: boulanger,
    //             msgErr: "Erreur d'enrégistrement à la BD"
    //         })
    //     }else
    //     {
    //         res.redirect('boulangers')
    //     }
    // })
})

module.exports = router