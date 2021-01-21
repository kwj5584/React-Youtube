const mongoose = require('mongoose')
const Schema = mongoose.Schema

const subscriberSchema = mongoose.Schema({
    userTo:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    userFrom:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }

}, {timestamps: true}) // 만든 날짜와 update한 날짜가 표기됌.

const Subscriber = mongoose.model('Subscriber',subscriberSchema)

module.exports = { Subscriber }