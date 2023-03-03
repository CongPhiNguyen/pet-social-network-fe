import React, { useEffect } from 'react'

import Status from '../components/home/Status'
import Posts from '../components/home/Posts'
import RightSideBar from '../components/home/RightSideBar'

import { useSelector } from 'react-redux'
import LoadIcon from '../images/loading.gif'
import { Row, Col } from 'antd'

let scroll = 0;

const Home = () => {
    const { homePosts } = useSelector(state => state)

    window.addEventListener('scroll', () => {
        if (window.location.pathname === '/') {
            scroll = window.pageYOffset
            return scroll;
        }
    })

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo({ top: scroll, behavior: 'smooth' })
        }, 100)
    }, [])

    return (
        <Row className='home'>
            <Col xs={7} >
            </Col>
            <Col xs={10} >
                <Status />
                {
                    homePosts.loading
                        ? <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
                        : (homePosts.result === 0 && homePosts.posts.length === 0)
                            ? <h2 className="text-center">No Post</h2>
                            : <Posts />
                }
            </Col>
            <Col xs={{ span: 6, offset: 1 }} >
                <RightSideBar />
            </Col>
        </Row>

    )
}

export default Home
