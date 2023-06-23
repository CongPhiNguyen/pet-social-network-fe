import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getDataAPI } from '../../utils/fetchData'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { Form, Input, Button, Popover, Result, Spin } from 'antd'
import UserCard from '../UserCard'
import LoadIcon from '../../images/loading.gif'
import { message } from 'antd'
const { Search } = Input

const SearchComponent = () => {
    const [search, setSearch] = useState('')
    const [users, setUsers] = useState([])
    const [open, setOpen] = useState(false);
    const { auth } = useSelector(state => state)
    const [load, setLoad] = useState(false)


    const handleSearch = async (e) => {
        if (!search) return;
        try {
            setLoad(true)
            const res = await getDataAPI(`search?username=${search}`, auth.token)
            setUsers(res.data.users)
            setLoad(false)
            setOpen(true)
        } catch (err) {
            message.error(err.response.data.msg)
        }
    }

    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };
    const hide = () => {
        setOpen(false);
    };

    const content = (
        <div className="users">
            {load && <div style={{ display: "flex", justifyContent: "center", height: 200, alignItems: "center" }}><Spin size="large" tip="Loading..." /></div>}
            {
                search && users.map(user => (
                    <UserCard
                        key={user._id}
                        user={user}
                        handleClose={hide}
                    />
                ))
            }
            {
                !load && users.length === 0 && (
                    <Result
                        status="404"
                        title="User not found!"
                    />
                )
            }
        </div>
    );

    return (
        <div style={{ display: 'flex', flexDirection: "column" }}>
            <Search size='default' onChange={e => setSearch(e.target.value.toLowerCase().replace(/ /g, ''))} onSearch={handleSearch} placeholder="Input name user" loading={load} />
            <Popover onOpenChange={handleOpenChange} placement="bottomLeft" title={"Result"} content={content} trigger="click" open={open}>
            </Popover>
        </div>

    )
}

export default SearchComponent
