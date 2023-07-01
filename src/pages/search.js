import React from 'react'
import RightSideBar from '../components/home/RightSideBar'
import { Card, Col, Result, Row, Spin } from 'antd'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UserCard from '../components/UserCard'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { searchInPageSearch } from '../api/post'
import PostCard from '../components/PostCard'
import { getPostsByLocationDispatch } from '../redux/actions/postAction'

export default function SearchPage() {
    const dispatch = useDispatch()
    const { theme } = useSelector((state) => state)

    const { homePosts } = useSelector((state) => state)
    const [users, setUsers] = useState([])
    const [load, setLoad] = useState(false)
    const location = useLocation()
    useEffect(async () => {
        if (location.search.includes("?search=") && location.search.length >= 8) {
            //call api
            setLoad(true)
            const res = await searchInPageSearch(location.search)
            setUsers(res.data.users || [])
            dispatch(getPostsByLocationDispatch({ posts: res.data.posts || [] }))
            setLoad(false)
        }
    }, [location])



    return (
        <div style={{ width: "100%", maxWidth: 1200, margin: "auto" }}>
            <Row style={{ marginTop: "64px" }} className="home">
                <Col xs={{ span: 20, offset: 2 }} sm={{ span: 20, offset: 2 }} md={{ span: 20, offset: 2 }} lg={{ span: 14, offset: 2 }} xl={{ span: 14, offset: 2 }} >
                    <Card title="Mọi người" style={{ marginTop: 25 }}>
                        <div>
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
                            <div>
                                {users.map((user) => (
                                    <UserCard key={user._id} user={user} />
                                ))}
                            </div>
                            {!load && users.length === 0 && (
                                <Result status="404" title="User not found!" />
                            )}
                        </div>
                    </Card>
                    <Card title="Bài viết" style={{ marginTop: 25 }}>
                        {load ? (
                            <div style={{ display: "flex", justifyContent: "center", height: 200, alignItems: "center" }}><Spin size="large" tip="Loading..." /></div>
                        ) : homePosts.posts && homePosts.posts.length === 0 ? (
                            <Card>
                                <Result
                                    status="404"
                                    title="NO POST"
                                    subTitle="You can follow someone or create new post!"
                                />
                            </Card>
                        ) : (
                            <div className="posts">
                                {homePosts.posts && homePosts.posts.map((post) => (
                                    <PostCard key={post._id} post={post} theme={theme} />
                                ))}
                            </div>
                        )}
                    </Card>
                </Col>
                <Col xs={0} sm={0} md={0} lg={{ span: 6, offset: 2 }}>
                    <RightSideBar />
                </Col>
            </Row>
        </div>
    )
}
