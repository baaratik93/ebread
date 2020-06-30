let jwt = require('jsonwebtoken')
module.exports = (req,res,next)=>{
    try {
        let decoded = jwt.verify(req.body.token, process.env.JWT_KEY)
        req.userData = decoded
    } catch (error) {
        // return res.status(401).json({
        //     msgError : "Authentification échoué"
        // })
        res.redirect('/users/login')
    }
}