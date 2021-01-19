const mongoose = require('mongoose')
const Schema = mongoose.Schema

const videoSchema = mongoose.Schema({
    writer:{
        type: Schema.Types.ObjectId, // id만 넣어도 User model가서 모든 정보 가져오기 가능
        ref:'User'
    },
    title:{
        type: String,
        maxlength: 50
    },
    description:{
        type:String,
    },
    privacy:{
        type:Number
    },
    filePath:{
        type: String
    },
    category:{
        type:String
    },
    views:{
        type:Number,
        default:0,
    },
    duration:{
        type:String
    },
    thumbnail:{
        type:String
    }

}, {timestamps: true}) // 만든 날짜와 update한 날짜가 표기됌.

const Video = mongoose.model('Video',videoSchema)

module.exports = { Video }