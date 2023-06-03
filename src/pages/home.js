import React, { useEffect } from "react"

import Status from "../components/home/Status"
import Posts from "../components/home/Posts"
import RightSideBar from "../components/home/RightSideBar"

import { useSelector } from "react-redux"
import LoadIcon from "../images/loading.gif"
import { Row, Col, Result, Card } from "antd"
import LeftNavigation from "../components/navigation/LeftNavigation"

let scroll = 0

const Home = () => {
  const { homePosts } = useSelector((state) => state)

  window.addEventListener("scroll", () => {
    if (window.location.pathname === "/") {
      scroll = window.pageYOffset
      return scroll
    }
  })

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: scroll, behavior: "smooth" })
    }, 100)
  }, [])

  return (
    <div style={{ width: "100%", maxWidth: 1200, margin: "auto" }}>
      <Row style={{ marginTop: "64px" }} className="home">
        <Col xs={0} sm={0} md={8} lg={6}>
          <LeftNavigation />
        </Col>
        <Col xs={{ span: 20, offset: 2 }} md={12} lg={8}>
          <Status />
          {homePosts.loading ? (
            <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
          ) : homePosts.result === 0 && homePosts.posts.length === 0 ? (
            <Card>
              <Result
                status="404"
                title="NO POST"
                subTitle="You can follow someone or create new post!"
              />
            </Card>
          ) : (
            <Posts />
          )}
        </Col>
        <Col xs={0} sm={0} md={0} lg={{ span: 6, offset: 2 }}>
          <RightSideBar />
        </Col>
      </Row>
    </div>
  )
}

export default Home
