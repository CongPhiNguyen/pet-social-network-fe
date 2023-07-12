import React, { useContext, useEffect, useState } from "react"
import Info from "./components/Info"
import { useSelector, useDispatch } from "react-redux"
import { getProfileUsers } from "../../redux/actions/profileAction"
import { useParams } from "react-router-dom"
import { Card, Col, Row, Spin, message, Result, Tabs } from "antd"
import Following from "./components/Following"
import { getPostByUserIdApi } from "../../api/post"
import PostCard from "../../components/PostCard"
import { getUserInfoApi } from "../../api/user"
import "../../styles/home.css"
import NotFoundPage from "../notFound"
import { getPostsByLocationDispatch } from "../../redux/actions/postAction"
import { getDataAPI } from "../../utils/fetchData"
import LanguageContext from "../../context/LanguageContext"



const Profile = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const { auth } = useSelector((state) => state)
  const [isGettingProfile, setIsGettingProfile] = useState(false)
  const [profile, setProfile] = useState({})
  const { language } = useContext(LanguageContext);
  const [loading, setLoading] = useState(false)
  const { theme } = useSelector((state) => state)
  const { homePosts } = useSelector((state) => state)
  const [option, setOption] = useState("Personal")
  const { posts: postList } = homePosts
  const getUserPost = async (userId) => {
    setLoading(true)
    const response = option === 'Personal' ? await getPostByUserIdApi(userId) : await getDataAPI(`getSavePosts`, auth.token)
    const { data, status } = response
    if (status === 200) {
      dispatch(getPostsByLocationDispatch({ posts: option === 'Personal' ? data?.postList || [] : data?.savePosts || [] }))
    }
    setLoading(false)
  }
  const items = [
    {
      key: `Personal`,
      label: 'Personal',
    },
    {
      key: `Saved`,
      label: 'Saved',
    },

  ];
  const getProfileInfo = async () => {
    setIsGettingProfile(true)
    try {
      const response = await getUserInfoApi(id)
      const { data, status } = response
      if (status === 200) {
        setProfile(data.user)
      } else {
        message.error("User info not found" || "Unexpected Error")
      }
    } catch (err) {
      message.error(err?.response?.data?.message || "Unexpected Error")
      setProfile(null)
    }
    setIsGettingProfile(false)
  }
  useEffect(() => {
    getProfileInfo(id)
  }, [id])

  useEffect(() => {
    getUserPost(id)
  }, [id, option])


  if (isGettingProfile) {
    return <Spin loading={isGettingProfile}></Spin>
  } else if (profile) {
    return (
      <div className="profile" style={{ marginTop: 64 }}>
        <Info auth={auth} profile={profile} dispatch={dispatch} id={id} language={language} />
        <div
          style={{
            width: "100%",
            maxWidth: 1200,
            margin: "auto",
            marginTop: -10,
            padding: "0px 10px"
          }}
        >
          <Row gutter={[16, 16]}>
            <Col xl={8} md={24} sm={24}>
              {!profile?.loading && (
                <Card>
                  <Following language={language} />
                </Card>
              )}
            </Col>
            <Col xl={16} md={24} sm={24}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Tabs defaultActiveKey="Personal" items={items} onChange={setOption} />
              </div>

              {loading ? (
                <div style={{ display: "flex", justifyContent: "center", height: 200, alignItems: "center" }}><Spin size="large" tip="Loading..." /></div>
              ) : postList.length === 0 ? (
                <Card>
                  <Result
                    status="404"
                    title={language === 'en' ? "NO POST" : "Không có bài viết nào!"}
                    subTitle={language === 'en' ? "You can follow someone or create new post!" : "Hãy theo dõi ai đó hoặc tạo nhiều bài viết"}
                  />
                </Card>
              ) : (
                <div className="posts">
                  {postList.map((post) => (
                    <PostCard key={post._id} post={post} theme={theme} />
                  ))}
                </div>
              )}
              {/* <div className="home posts">
                {postList.map((val, index) => {
                  return <PostCard key={index} post={val} />
                })}
              </div> */}
            </Col>
          </Row>
        </div>
      </div>
    )
  } else {
    return <NotFoundPage />
  }
}

export default Profile
