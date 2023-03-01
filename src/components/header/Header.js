import React from 'react'
import { Link } from 'react-router-dom'
// import Menu from './Menu'
import Search from './Search'
import { Image } from 'antd'
import Logo from "../../images/logo.jpg"
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer } = Layout;

const HeaderLayout = () => {
    return (
        // <div className="header bg-light">
        //     <nav className="navbar navbar-expand-lg navbar-light 
        //     bg-light justify-content-between align-middle">

        //         <Link to="/" className="logo">
        //             <h1 className="navbar-brand text-uppercase p-0 m-0"
        //                 onClick={() => window.scrollTo({ top: 0 })}>
        //                 <Image
        //                     width={50}
        //                     src={Logo}
        //                     preview={false}
        //                 />
        //             </h1>
        //         </Link>

        //         <Search />

        //         <Menu />
        //     </nav>
        // </div>
        <Header>
            <div className="logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                items={new Array(15).fill(null).map((_, index) => {
                    const key = index + 1;
                    return {
                        key,
                        label: `nav ${key}`,
                    };
                })}
            />
        </Header>
    )
}

export default HeaderLayout
