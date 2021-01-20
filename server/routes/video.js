const express = require('express');
const router = express.Router();
const { Video } = require("../models/Video");

const { auth } = require("../middleware/auth");
const multer = require('multer');
var ffmpeg = require('fluent-ffmpeg');


let storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null,"uploads/");
    },
    filename:(req, file, cb)=>{
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb)=>{
        const ext = path.extname(file.originalname)
        if(ext !== '.mp4'){
            return cb(res.status(400).end('only mp4 is allowed'),false);
        }
        cb(null, true)
    }
})
const uplaod = multer({storage:storage}).single("file")
//=================================
//             Video
//=================================

router.post('/uploadfiles',(req,res)=>{
    // 비디오를 서버에 저장
    uplaod(req, res ,err => {
        if(err) {
            return res.json({ success : false, err})
        }
        return res.json({ success: true, filePath : res.req.file.path, fileName : res.req.file.filename })
    })
})

router.post('/thumbnail',(req,res)=>{
    // 썸네일 생성하고 비디오 러닝타임도 가져오기

    let thumbsFilePath = ""
    let fileDuration = ""

    // ffmpeg.setFfmpegPath("C:\Users\kwj55\React\ffmpeg-4.3.1-2021-01-01-full_build\bin\ffmpeg.exe")
    // 비디오 정보 가져오기
    ffmpeg.ffprobe(req.body.filePath, function(err, metadata){
        console.dir(metadata);
        console.log(metadata.format.duration);

        fileDuration = metadata.format.duration
    })

    //썸네일 생성
    ffmpeg(req.body.filePath) // 클라이언트에서 온 저장 경로
    .on('filenames', function(filenames){ // 파일네임 생성
        console.log('Will generate ' + filenames.join(', '))

        thumbsFilePath = "uploads/thumbnails/" + filenames[0]
    })
    .on('end', function(){ // 썸네일 생성 후 로직
        console.log('Screenshots taken');
        return res.json({success: true, thumbsFilePath: thumbsFilePath, fileDuration : fileDuration})
    })
    .on('error', function(err){ // 에러 발생시 로직
        return res.json({success:false, err})
    })
    .screenshots({ 
        // Will take screenshots at 20%, 40%, 60% and 80% of the video
        count:3,
        folder : 'uploads/thumbnails',
        size:'320x240',
        // %b : input basename( filename w/o extension)
        filename:'thumbnail-%b.png'
    })
})

router.post('/uploadVideo',(req,res)=>{
    // 비디오 정보들을 저장
    const video = new Video(req.body)
    video.save((err,doc)=>{
        if(err) res.status.json({success:false, err})
        res.status(200).json({success:true})
    })
})

router.get('/getVideos',(req,res)=>{
    // 비디오를 DB에서 가져와서 클라이언트에 보낸다.
    Video.find()
    .populate('writer')
    .exec((err,videos)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({success:true, videos})
    })
})

module.exports = router;
