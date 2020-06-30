let express = require('express')
let router = express.Router()
let Production = require('../models/production')
let checkAuth = require('../middlewares/checkAuth')


router.get('/',checkAuth, async(req,res)=>{
    
    try {
        
        let productions = await Production.find({})
        res.render('productions/index',{
            productions: productions
        })

    }catch {
        res.redirect('/')
    }
})
//  demande du formulaire d'ajout d'une production
router.get('/new',checkAuth, (req,res)=>{
    res.render('productions/new',{ production: new Production() })
})
//  Ajouter une production à la BD
router.post('/',checkAuth,async(req,res)=>{
    Production.findOne({codeProduction: req.body.codeProduction})
    .exec()
    .then((prod)=>{
       if(prod){
        res.status(409).json({
            msgErr: "Production existante dépasssée"
        })
       }else{
        let production =  new Production({
            codeProduction: req.body.codeProduction,
              poids_farine: req.body.poids_farine,
                    levure: req.body.levure,
                ameliorant: req.body.ameliorant
       })
     
       production.save((err,newProduction)=>{
           if(err){
               res.render('productions/new', {
                   productions: productions,
                   msgErr: "Erreur d'enrégistrement à la BD"
               })
           }else
           {
               res.redirect('productions')
           }
       })
       }
    })
    .catch(() =>{
            res.status(500).json({
                err: "Erreur de validation"
            })
        })
    })

module.exports = router