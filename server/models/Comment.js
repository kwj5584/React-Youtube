const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = mongoose.Schema({
    writer:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    postId:{
        type:Schema.Types.ObjectId,
        ref:'Video' // videoId
    },
    responseTo:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    content:{
        type:String
    }

}, {timestamps: true}) // 만든 날짜와 update한 날짜가 표기됌.

const Comment = mongoose.model('Comment',commentSchema)

module.exports = { Comment }