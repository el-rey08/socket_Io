require('dotenv').config()
const mongoose = require ('mongoose')
const url = process.env.DATABASE_URL
mongoose.connect(url).then(()=>{
    console.log('connectio to database is sucessful')
}).catch((error)=>{
    console.log('error trying to connect to data base', error.message)
})