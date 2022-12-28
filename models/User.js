const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email : { type: String, required: true},
    name : String,
    age : {type:Number, min:10, max:100}
}, {timestamps:true})

module.exports = mongoose.model('User', userSchema)
