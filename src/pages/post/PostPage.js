import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getPost } from "../../redux/actions/postAction"
import LoadIcon from "../../images/loading.gif"
import PostCard from "../../components/PostCard"
import { Col, Row, Spin } from "antd"

const PostPage = () => {
  const { id } = useParams()
  const [post, setPost] = useState([])

  const { auth, detailPost } = useSelector((state) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPost({ detailPost, id, auth }))

    if (detailPost.length > 0) {
      const newArr = detailPost.filter((post) => post._id === id)
      setPost(newArr)
    }
  }, [detailPost, dispatch, id, auth])

  return (
    <Row style={{ marginTop: "64px" }} className="home">
      <Col xs={6}></Col>
      <Col xs={12}>
        <div style={{ paddingTop: 16 }} className="posts">
          {post.length === 0 && (
            <div style={{ display: "flex", justifyContent: "center", height: 200, alignItems: "center" }}><Spin size="large" tip="Loading..." /></div>
          )}
          {post.map((item) => (
            <PostCard key={item._id} post={item} />
          ))}
        </div>
      </Col>
    </Row>
  )
}

export default PostPage
