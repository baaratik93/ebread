if (process.env.NODE_ENV !='production') {
  require('dotenv').config()
}
let express = require('express')
let app = express()
let expejslayout = require('express-ejs-layouts')
let indexRoute = require('./routes/index')
let mongoose = require('mongoose')
//initialisation
app.set('view engine', 'ejs')
app.set('views',__dirname + '/views')
app.set('layout','layouts/layout')
//middlewares
app.use(expejslayout)
app.use(express.static('public'))

//import de routes
app.use('/',indexRoute)

//Connexion à MongoDB
mongoose.connect(process.env.DB_URL,  { useNewUrlParser: true },()=>console.log('en train de se connecter'))
const db = mongoose.connection
db.on('error',(error)=> console.error(console.error()))
db.once('open',()=> console.log('Connectée avec succès'))

app.listen(process.env.PORT || 3001)