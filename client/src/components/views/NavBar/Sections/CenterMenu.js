import React,{useEffect,useState} from 'react'
import { SearchOutlined } from '@ant-design/icons'
import {withRouter} from 'react-router-dom'
function CenterMenu(props) {
    const [Search, setSearch] = useState('')
    const onChangeSearch = (e) =>{
        setSearch(e.currentTarget.value)
    }
    const onSearch = (e) =>{
        e.preventDefault();
        props.history.push({
        pathname:'/result',
        search: `search_query=${Search}`,
        state: {searchResult:Search}
        })
    }
    
    return (
        <div style={{display:'inline-block', textAlign:'center'}}>
            <form onSubmit={onSearch} style={{marginTop: '9px', padding:'6px', height:'32px'}}>
                <input type='text' style={{marginTop:'5px', width:'80%', height:'29px' }} placeholder='search..' onChange={onChangeSearch} />
                
                    <button onSubmit={onSearch} style={{height:'32px'}} >
                    {<SearchOutlined style={{ width:'100%', height:'20px'}} />}
                    </button>
                
            </form>
            
        </div>
    )
}

export default withRouter(CenterMenu)
