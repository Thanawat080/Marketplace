const express = require("express")
var cors = require('cors')
const path = require("path")

const session = require('express-session')
const { MemoryStore } = require('express-session')
const sess = {
  store: new MemoryStore(),
  secret: 'testtest123',
  resave: false,
  saveUninitialized: false,
  cookie: {
      maxAge: 1000*60*60  
    },
}


const app = express();
app.use(cors({
  origin:true,
  credentials:true
}))

// Statics
app.use(express.static('static'))
app.use(session(sess));



app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// routers
const registerRouter = require('./routes/register')
app.use(registerRouter.router)

const loginRouter = require('./routes/login')
app.use(loginRouter.router)


const profileRouter = require('./routes/profile')
app.use(profileRouter.router)

const changepasswordRouter = require('./routes/changepassword')
app.use(changepasswordRouter.router)


const indexRouter = require('./routes/index')
app.use(indexRouter.router)

const storeRouter = require('./routes/store')
app.use(storeRouter.router)


app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`)
})