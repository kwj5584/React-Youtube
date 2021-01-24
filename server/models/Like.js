const mongoose = require('mongoose')
const Schema = mongoose.Schema

const likeSchema = mongoose.Schema({
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

const Like = mongoose.model('Like',likeSchema)

module.exports = { Like }