import React, { useState, useMemo, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Tooltip, Badge, Popover } from 'antd'
import {
    HomeFilled,
    MessageFilled,
    StarFilled,
    BellFilled
} from '@ant-design/icons';
import { Avatar } from 'antd';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import { logout } from "../../redux/actions/authAction"
import NotifyModal from '../NotifyModal'
const navLinks = [
    {
        label: 'Home',
        icon: <HomeFilled />,
        path: '/'
    },
    {
        label: 'Message',
        icon: <MessageFilled />,
        path: '/message'
    },
    {
        label: 'Discover',
        icon: <StarFilled />,
        path: '/discover'
    }
]

const Menu = () => {
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const { auth, theme, notify } = useSelector(state => state)
    const dispatch = useDispatch()
    const { pathname } = useLocation()
    const isActive = (pn) => {
        if (pn === pathname) return 'active'
        return ''
    }
    const [showArrow, setShowArrow] = useState(true);
    const [arrowAtCenter, setArrowAtCenter] = useState(false);

    const mergedArrow = useMemo(() => {
        if (arrowAtCenter) return { arrowPointAtCenter: true };
        return showArrow;
    }, [showArrow, arrowAtCenter]);

    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };
    const handleOpenChange1 = (newOpen) => {
        setOpen1(newOpen);
    };

    const content = (
        <div aria-labelledby="navbarDropdown">
            <Link className="dropdown-item" to={`/profile/${auth.user._id}`}>Profile</Link>
            <label htmlFor="theme" className="dropdown-item"
                onClick={() => dispatch({
                    type: GLOBALTYPES.THEME, payload: !theme
                })}>

                {theme ? 'Light mode' : 'Dark mode'}
            </label>

            <div className="dropdown-divider"></div>
            <Link className="dropdown-item" to="/"
                onClick={() => dispatch(logout())}>
                Logout
            </Link>
        </div>
    );
    useEffect(() => {
        console.log(open);
    }, [open])

    return (
        <div className='menu'>
            {
                navLinks.map((link, index) => (
                    <Link key={index} className={`nav-link${isActive(link.path)}`} to={link.path}>
                        <span className="material-icons">
                            <Tooltip placement="bottom" title={link.label} arrow={mergedArrow}>
                                {link.icon}
                            </Tooltip>
                        </span>
                    </Link>
                ))
            }
            <div style={{ position: "relative" }}>
                <Link onClick={handleOpenChange1} className={`nav-link`} >
                    <span className="material-icons">
                        <Badge count={notify.data.length}>
                            <BellFilled className='icon' />
                        </Badge>
                    </span>
                </Link>
                <div style={{ position: "absolute", bottom: 20, right: 15 }}>
                    <Popover className='popover-notify' onOpenChange={handleOpenChange1} placement='bottomRight' content={<NotifyModal />} trigger="click" open={open1}>
                    </Popover>
                </div>
            </div>
            <div style={{ position: "relative" }}>
                <Link onClick={handleOpenChange} className={`nav-link`} >
                    <span className="material-icons">
                        <Avatar src={auth.user.avatar} size={'default'} />
                    </span>
                </Link>
                <div style={{ position: "absolute", bottom: 20, right: 15 }}>
                    <Popover onOpenChange={handleOpenChange} placement="bottomRight" content={content} trigger="click" open={open}>
                    </Popover>
                </div>
            </div>


        </div>

    )
}

export default Menu
