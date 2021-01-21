import React,{useEffect,useState} from 'react'
import axios from 'axios'
function Subscribe(props) {
    const [SubscribeNumber, setSubscribeNumber] = useState(0)
    const [Subscribed, setSubscribed] = useState(false)
    useEffect(() => {
        let variable = {userTo:props.userTo}
        axios.post('/api/subscribe/subscriberNumber',variable)
        .then(res=>{
            if(res.data.success){
                setSubscribeNumber(res.data.subscribeNumber)
            }else{
                alert('구독자 수 정보를 받아오지 못했습니다.')
            }
        })
        let subscribedVariable = {userTo: props.userTo, userFrom:localStorage.getItem('userId')}
        axios.post('/api/subscribe/subscribed',subscribedVariable)
        .then(res=>{
            if(res.data.success){
                setSubscribed(res.data.subscribed)
            }else{
                alert('정보를 받아오지 못했습니다.')
            }
        })
    }, [])
    const onSubscribe = () =>{
        let subscribeVariable={
            // 로그인 정보와 게시자 정보
            userTo: props.userTo,
            userFrom: props.userFrom
        }
        if(Subscribed){
            //이미 구독 중이라면
            axios.post('/api/subscribe/unSubscribe',subscribeVariable)
                .then(res=>{
                    if(res.data.success){
                        setSubscribeNumber(SubscribeNumber -1)
                        setSubscribed(!Subscribed)
                    }else{
                        alert('구독 취소를 실패했습니다.')
                    }
                })
        } else{
            axios.post('/api/subscribe/subscribe',subscribeVariable)
                .then(res=>{
                    if(res.data.success){
                        setSubscribeNumber(SubscribeNumber + 1)
                        setSubscribed(!Subscribed)
                    }else{
                        alert('구독을 실패했습니다.')
                    }
                })
            // 구독을 안했다면
        }
    }

    return (
        <div>
            <button
                style={{backgroundColor: `${Subscribed? '#AAAAAA': '#CC0000'}`, borderRadius:"4px",
                color:'white', padding:'10px 16px',
                fontWeight:'500', fontSize:'1rem', textTransform:'uppercase'
            }}
            onClick={onSubscribe}
            >
                {SubscribeNumber} {Subscribed? 'Subscribed' : 'Subscribe'}
            </button>
        </div>
    )
}

export default Subscribe
