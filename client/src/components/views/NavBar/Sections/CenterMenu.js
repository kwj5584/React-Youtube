import React,{useState} from 'react'
import {withRouter} from 'react-router-dom'
import {Input} from 'antd';

const { Search } = Input;

function CenterMenu(props) {
    const [InputSearch, InputSetSearch] = useState('')

    const onSearch = (value) =>{
        InputSetSearch(value);
        props.history.push({
        pathname:'/result',
        search: `search_query=${value}`,
        state: {searchResult:value}
        })
    }

    const onSearchEnter = (e) =>{
        e.preventDefault();
        props.history.push({
            pathname:'/result',
            search: `search_query=${InputSearch}`,
            state: {searchResult:InputSearch}
            })
    }
    
    return (
        <div>
            <form onSubmit={onSearchEnter} style={{marginTop: '9px', padding:'6px', height:'32px'}}>
            <Search placeholder="검색" size="large" onSearch={onSearch} style={{ width:400 }} enterButton/>
            </form>
        </div>
    )
}

export default withRouter(CenterMenu)
