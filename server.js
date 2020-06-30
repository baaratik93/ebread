if (process.env.NODE_ENV !='production') {
  require('dotenv').config()
}
let express = require('express')
let app = express()
let expejslayout = require('express-ejs-layouts')
let indexRoute = require('./routes/index')
let boulangerRoute = require('./routes/productions')
let useRoute = require('./routes/user')
let painRoute = require('./routes/pains')
let mongoose = require('mongoose')
let bodyParser = require('body-parser')
let morgan = require('morgan')
let cors = require('cors')

//initialisation
app.set('view engine', 'ejs')
app.set('views',__dirname + '/views')
app.set('layout','layouts/layout')
//middlewares
app.use(expejslayout)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))
app.use(cors())
app.use(morgan('dev'))
//Headers authorizations
app.use((req,res,next)=>{
  res.header("Access-Control-Allow-Origin" , "*");
  res.header(
    "Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
  if(req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next()
});
//import de routes
app.use('/',indexRoute)
app.use('/productions',boulangerRoute)
app.use('/productions/new',boulangerRoute)
app.use('/users',useRoute)
app.use('/users/signup',useRoute)
app.use('/users/login',useRoute)
app.use('/pains',painRoute)
app.use('/pains/new',painRoute)



//Connexion à MongoDB
mongoose.connect(process.env.DB_URL,  { useNewUrlParser: true })
const db = mongoose.connection
db.on('error',(error)=> console.error(console.error()))
db.once('open',()=> console.log('Connectée avec succès'))

app.listen(process.env.PORT)