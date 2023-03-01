import React, { useState, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../redux/actions/authAction'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import Avatar from '../Avatar'
import NotifyModal from '../NotifyModal'
import { Tooltip, Badge } from 'antd'
import {
    HomeFilled,
    MessageFilled,
    StarFilled,
    BellFilled
} from '@ant-design/icons';

const Menu = () => {
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
        { label: 'Discover', icon: <StarFilled />, path: '/discover' }
    ]

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
    return (
        // <div className="menu">
        //     <ul className="navbar-nav">
        //         {
        //             navLinks.map((link, index) => (
        //                 <li className={`nav-item${isActive(link.path)}`} key={index}>
        //                     <Link className="nav-link" to={link.path}>
        //                         <span className="material-icons">{link.icon}</span>
        //                     </Link>
        //                 </li>
        //             ))
        //         }

        //         {/* <li className="nav-item dropdown" style={{ opacity: 1 }} >
        //             <span className="nav-link position-relative" id="navbarDropdown"
        //                 role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

        //                 <span className="material-icons"
        //                     style={{ color: notify.data.length > 0 ? 'crimson' : '' }}>
        //                     favorite
        //                 </span>

        //                 <span className="notify_length">{notify.data.length}</span>

        //             </span>

        //             <div className="dropdown-menu" aria-labelledby="navbarDropdown"
        //                 style={{ transform: 'translateX(75px)' }}>
        //                 <NotifyModal />
        //             </div>

        //         </li>

        //         <li className="nav-item dropdown" style={{ opacity: 1 }} >
        //             <span className="nav-link dropdown-toggle" id="navbarDropdown"
        //                 role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        //                 <Avatar src={auth.user.avatar} size="medium-avatar" />
        //             </span>

        //             <div className="dropdown-menu" aria-labelledby="navbarDropdown">
        //                 <Link className="dropdown-item" to={`/profile/${auth.user._id}`}>Profile</Link>

        //                 <label htmlFor="theme" className="dropdown-item"
        //                     onClick={() => dispatch({
        //                         type: GLOBALTYPES.THEME, payload: !theme
        //                     })}>

        //                     {theme ? 'Light mode' : 'Dark mode'}
        //                 </label>

        //                 <div className="dropdown-divider"></div>
        //                 <Link className="dropdown-item" to="/"
        //                     onClick={() => dispatch(logout())}>
        //                     Logout
        //                 </Link>
        //             </div>
        //         </li> */}
        //     </ul>
        // </div>
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
            {/* <li className="nav-item dropdown" style={{ opacity: 1 }} >
                    <span className="nav-link position-relative" id="navbarDropdown"
                        role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                        <span className="material-icons"
                            style={{ color: notify.data.length > 0 ? 'crimson' : '' }}>
                            favorite
                        </span>

                        <span className="notify_length">{notify.data.length}</span>

                    </span>

                    <div className="dropdown-menu" aria-labelledby="navbarDropdown"
                        style={{ transform: 'translateX(75px)' }}>
                        <NotifyModal />
                    </div>

                </li>

                <li className="nav-item dropdown" style={{ opacity: 1 }} >
                    <span className="nav-link dropdown-toggle" id="navbarDropdown"
                        role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <Avatar src={auth.user.avatar} size="medium-avatar" />
                    </span>

                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
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
                </li> */}

        </div>

    )
}

export default Menu
