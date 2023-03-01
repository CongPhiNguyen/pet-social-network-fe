import React, { useState, useMemo } from 'react'
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
            <Link className={`nav-link`} >
                <span className="material-icons">
                    <Tooltip placement="bottom" title={'Notification'} arrow={mergedArrow}>
                        <Badge count={99}>
                            <BellFilled className='icon' />
                        </Badge>
                    </Tooltip>
                </span>
            </Link>
            <Link onClick={handleOpenChange} className={`nav-link`} >
                <span className="material-icons">
                    <Popover onOpenChange={handleOpenChange} placement="bottomRight" content={content} trigger="click" open={open}>
                        <Avatar src={auth.user.avatar} size={'default'} />
                    </Popover>
                </span>
            </Link>
        </div>

    )
}

export default Menu
