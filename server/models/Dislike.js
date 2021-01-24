const mongoose = require('mongoose')
const Schema = mongoose.Schema

const disLikeSchema = mongoose.Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    commentId:{
        type:Schema.Types.ObjectId,
        ref:'Comment'
    },
    videoId:{
        type:Schema.Types.ObjectId,
        ref:'Video'
    }

}, {timestamps: true}) // 만든 날짜와 update한 날짜가 표기됌.

const Dislike = mongoose.model('Dislike', disLikeSchema)

module.exports = { Dislike }