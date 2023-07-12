import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getDataAPI } from "../../utils/fetchData"
import { GLOBALTYPES } from "../../redux/actions/globalTypes"
import { Form, Input, Button, Popover, Result, Spin } from "antd"
import UserCard from "../UserCard"
import LoadIcon from "../../images/loading.gif"
import { message } from "antd"
import { useLocation, useNavigate } from "react-router-dom"
import { useContext } from "react"
import LanguageContext from "../../context/LanguageContext"

const { Search } = Input

const SearchComponent = () => {
  const location = useLocation()
  const [search, setSearch] = useState("")
  const [users, setUsers] = useState([])
  const [open, setOpen] = useState(false)
  const { auth } = useSelector((state) => state)
  const { language } = useContext(LanguageContext);
  const [load, setLoad] = useState(false)
  const navigate = useNavigate()
  useEffect(async () => {
    if (search === "") {
      setOpen(false)
    } else {
      if (!search) return
      if (location.pathname === '/search') return
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
  }, [search])

  const handleSearch = async () => {
    if (search === "") return
    navigate(`/search?search=${search}`)
    // if (!search) return
    // try {
    //   setLoad(true)
    //   const res = await getDataAPI(`search?username=${search}`, auth.token)
    //   setUsers(res.data.users)
    //   setLoad(false)
    //   setOpen(true)
    // } catch (err) {
    //   message.error(err.response.data.msg)
    // }
  }

  const handleChange = (e) => {
    setSearch(e.target.value.toLowerCase().replace(/ /g, ""))
  }

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen)
  }
  const hide = () => {
    setOpen(false)
  }

  const content = (
    <div className="users">
      {load && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: 200,
            alignItems: "center"
          }}
        >
          <Spin size="large" tip="Loading..." />
        </div>
      )}
      {search && (
        <div>
          {users.map((user) => (
            <UserCard key={user._id} user={user} handleClose={hide} />
          ))}
        </div>
      )}
      {!load && users.length === 0 && (
        <Result status="404" title={language === 'en' ? "User not found!" : "Không tìm thấy user"} />
      )}
    </div>
  )

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Search
        size="default"

        onChange={handleChange}
        onSearch={handleSearch}
        placeholder={language === 'en' ? "Search in petlove" : "Tìm kiếm..."}
        loading={load}
      />
      <Popover
        onOpenChange={handleOpenChange}
        placement="bottomLeft"
        title={"Result"}
        content={content}
        trigger="click"
        open={open}
      ></Popover>
    </div>
  )
}

export default SearchComponent
