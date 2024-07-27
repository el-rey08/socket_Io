const mongoose = require('mongoose')
const messageSchema = new mongoose.Schema({
    user:String,
    message:String,
    timeStamps:{type:Date, default: Date.now()}
})

module.exports = mongoose.model('Message', messageSchema)