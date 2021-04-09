import React,{useState} from 'react'
import { Typography, Button, Form, message, Input, Icon} from 'antd';
import Dropzone from 'react-dropzone';
import axios from 'axios'
import {useSelector} from 'react-redux'

const {Title} = Typography;
const {TextArea} = Input;

const PrivateOptions = [
    {value: 0, label: "Private"},
    {value: 1, label: "Public"}
]

const CategoryOptions= [
    {value: 0, label:"Film & Animation"},
    {value: 1, label:"Autos & Vehicles"},
    {value: 2, label:"Music"},
    {valud: 3, label:"Pets & Animals"},
]

function VideoUploadPage(props) {
    const user = useSelector(state=>state.user)
    const [VideoTitle,setVideoTitle] = useState('')
    const [Description, setDescription] = useState('')
    const [Private, setPrivate] = useState(0)
    const [Category, setCategory] = useState("Film & Animation")
    const [FilePath, setFilePath] = useState('')
    const [Duration, setDuration] = useState('')
    const [ThumbnailPath, setThumbnailPath] = useState('')

    const onTitleChange = (e) =>{
        setVideoTitle(e.currentTarget.value)
    }
    const onDescriptionChange = (e) =>{
        setDescription(e.currentTarget.value)
    }
    const onPrivateChange = (e) =>{
        setPrivate(e.currentTarget.value)
    }
    const onCategoryChange = (e) =>{
        setCategory(e.currentTarget.value)
    }
    const onDrop = (files) =>{
        let formData = new FormData();
        const config = {
            header: {'content-type' : 'multipart/form-data'}
        }
        formData.append("file",files[0])

        axios.post('/api/video/uploadfiles',formData, config)
        .then(res=>{
            if(res.data.success){
                let variable = {
                    filePath : res.data.filePath,
                    fileName : res.data.fileName
                }
                setFilePath(res.data.filePath)

                axios.post('/api/video/thumbnail', variable)
                .then(res=>{
                    if(res.data.success){
                        // 정보를 state에 저장
                        setDuration(res.data.fileDuration)
                        setThumbnailPath(res.data.thumbsFilePath)
                    }else{
                        alert('썸네일 생성에 실패했습니다.')
                    }
                })
            } else{
                alert('비디오 업로드 실패')
            }
        })
    }

    const onSubmit = (e)=>{
        e.preventDefault();

        const variable={
            writer:user.userData._id,
            title:VideoTitle,
            description:Description,
            privacy:Private,
            filePath:FilePath,
            category:Category,
            duration:Duration,
            thumbnail:ThumbnailPath
        }
        axios.post('/api/video/uploadVideo',variable)
        .then(res=>{
            if(res.data.success){
                message.success('성공적으로 업로드를 했습니다.')
                setTimeout(() => {
                    props.history.push('/')    
                }, 2000);
                
            }else{
                alert('비디오 업로드 실패')
            }
        })
    }
    const onReset = ()=>{
        props.history.push('/')
    }
    return (
        <div style={{ maxWidth:'700px', margin:'2rem auto'}}>
            <title>React-Youtube</title>
            <div style={{ textAlign:'center', marginBottom:'2rem'}}>
                <Title level={2}>Upload Video</Title>
            </div>
            <Form onSubmit={onSubmit}>
                <div style={{display:'flex', justifyContent: 'space-between'}}>
                    {/**Drop Zone */}
                        <Dropzone
                        onDrop={onDrop}
                        multiple={false} // 한번에 파일 한개 올릴거면 false
                        maxSize={1000000000000}
                        >
                        {({getRootProps, getInputProps}) => (
                            <div style={{width:'300px', height:'240px', border:'1px solid lightgray', display:'flex',
                        alignItems:'center', justifyContent:'center'}} {...getRootProps()}>
                            <input {...getInputProps()} />
                            <Icon type='plus' style={{fontSize:'3rem'}}/>
                        </div>

                        )}
                        </Dropzone>
                    {/**Tumbnail */}
                    { ThumbnailPath!=='' &&
                        <div>
                            <img src={`http://localhost:5000/${ThumbnailPath}`} alt="thumbnail"/>
                        </div>
                    }
                </div>
            <br/>
            <br/>
            <label>Title</label>
            <Input
                onChange={onTitleChange}
                value={VideoTitle}
            />
            <br/>
            <br/>
            <label>Description</label>
            <TextArea
                onChange={onDescriptionChange}
                value={Description}
            />
            <br/>
            <br/>

            <select onChange={onPrivateChange}>
                {PrivateOptions.map((item, index)=>{
                    return(
                    <option key={index} value={item.value}>{item.label}</option>
                    )
                })}
            </select>
            <br/>
            <br/>
            <select onChange={onCategoryChange}>
                {CategoryOptions.map((item,index)=>{
                    return(
                    <option key={index} value={item.value}>{item.label}</option>
                    )
                })}
            </select>
            <br/>
            <br/>
            <Button type='primary' size='large' onClick={onSubmit}>
                Submit
            </Button>&nbsp;
            <Button type='danger' size='large' onClick={onReset}>
                Back
            </Button>
            </Form>
        </div>
    )
}

export default VideoUploadPage
