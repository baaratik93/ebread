let express = require('express')
let router = express.Router()
let Pain = require('../models/pain')
//La liste des pains en production
router.get('/',(req,res,next)=>{
    let pains = Pain.find({})
    .exec()
    .then((pains)=>{
        //res.render('pains/index', {pains: pains})
     return   res.status(200).json({
            pains:pains
        })
    })
    .catch((erros)=>{
        return res.status(404).json({
            error: "Aucun form de pains trouvé"
        })
    })

   
})
//demande du formulaire d'ajout du pain
router.get('/new',(req,res,next)=>{
 return res.status(201).render('pains/new', { pain: new Pain() })
 next()
})
//Ajouter un type pain
router.post('/',async(req, res)=>{
    Pain.findOne({libele: req.body.libele})
    .exec()
    .then((pain) =>{
            if(pain){
                res.status(406).json({
                    error: "Ce type de pain existe", pain: pain
                })
            } else {
                let newPain = new Pain({
                    libele: req.body.libele,
                    masse: req.body.masse,
                    code: req.body.code
                })
                    newPain.save()
                    .then(succes => {
                        return res.status(200).json({
                            msg: "enrégistré avec succès"
                        })
                    })
                    .catch(() => {
                        return res.status(401).json({
                            error: "Ce type de pain n'est pas enrégistré"
                        })
                    })
            }
    })
    .catch( (err) => {
        return res.status(402).json({
            error:  err,
            msg: "La validation a échoué"
        })
    })

})
//Eliminer un type de pain
router.delete('/:code',(req,res,next)=>{
    Pain.remove({code: req.params.code})
    .exec()
    .then((pain)=>{
        res.status(200).json({
            msg: "Ce pain est supprimée avec succès",
            pain: pain
        })
    })
    .catch(err => {
        res.status(406).json({
            err:err,
            errMsg: "Ce pain n'existe pas"
        })
    })
})
//Modifier un type de pain
router.put('/:id',(req,res,next)=>{
    
})

module.exports = router