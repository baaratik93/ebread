if (process.env.NODE_ENV !='production') {
  require('dotenv').config()
}
let express = require('express')
let app = express()
let expejslayout = require('express-ejs-layouts')
let indexRoute = require('./routes/index')
let boulangerRoute = require('./routes/boulanger')
let useRoute = require('./routes/user')
let mongoose = require('mongoose')
let bodyParser = require('body-parser')

//initialisation
app.set('view engine', 'ejs')
app.set('views',__dirname + '/views')
app.set('layout','layouts/layout')
//middlewares
app.use(expejslayout)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))

//import de routes
app.use('/',indexRoute)
app.use('/boulangers',boulangerRoute)
app.use('/boulangers/new',boulangerRoute)
app.use('/users',useRoute)
app.use('/users/signup',useRoute)
app.use('/users/login',useRoute)

//Connexion à MongoDB
mongoose.connect(process.env.DB_URL,  { useNewUrlParser: true })
const db = mongoose.connection
db.on('error',(error)=> console.error(console.error()))
db.once('open',()=> console.log('Connectée avec succès'))

app.listen(process.env.PORT)