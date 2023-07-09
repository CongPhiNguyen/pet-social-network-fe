import React from "react"
import CardHeader from "./home/post_card/CardHeader"
import CardBody from "./home/post_card/CardBody"
import CardFooter from "./home/post_card/CardFooter"

import Comments from "./home/Comments"
import InputComment from "./home/InputComment"
import { Avatar, Card } from "antd"
import { useSelector } from "react-redux"
import LanguageContext from "../context/LanguageContext"
import { useContext } from "react"

const PostCard = ({ post, theme }) => {
  // console.log(post)
  const { auth } = useSelector((state) => state)
  const { language } = useContext(LanguageContext);

  return (
    <>
      <Card style={{ marginBottom: 20 }}>
        <CardHeader post={post} language={language} />
        <CardBody post={post} theme={theme} language={language} />
        <CardFooter post={post} language={language} />
        <Comments post={post} language={language} />
        <div style={{ borderTop: "1px solid #00000038" }}>
          <InputComment post={post} language={language}>
            <Avatar
              style={{
                backgroundColor: "#f56a00",
                verticalAlign: "middle",
                marginRight: "5px",
                marginRight: "15px"
              }}
              src={
                auth?.user?.avatar ===
                  "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
                  ? null
                  : auth?.user?.avatar
              }
              size="default"
            >
              {auth?.user?.username[0]?.toUpperCase()}
            </Avatar>
          </InputComment>
        </div>
      </Card>
    </>
  )
}

export default PostCard
