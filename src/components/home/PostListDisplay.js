import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import PostCard from "../PostCard"
import { Badge, Button, Modal, Tag } from "antd"
import { getPostFeedApi } from "../../api/post"

const PostListDisplay = ({ postList, hashTagList, setPostList }) => {
  const { theme } = useSelector((state) => state)
  const [currentHashtag, setCurrentHashTag] = useState(null)
  const [isOpenModal, setIsOpenModal] = useState(false)

  // const getPostFeed = async () => {
  //   const response = await getPostFeedApi()
  //   const { data, status } = response
  //   if (status === 200) {
  //     setPostList(data?.posts)
  //     // setHashTagList(data?.hashTagList)
  //     console.log(data)
  //   }
  // }

  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        {hashTagList.slice(0, 5).map((val) => (
          <span
            style={{
              marginRight: 12,
              marginBottom: 4,
              cursor: "pointer"
            }}
          >
            <Badge color="green" count={val?.count} offset={[-10, 0]}>
              <Tag
                color={
                  currentHashtag?.hashTag === val?.hashTag ? "#edc860" : ""
                }
                style={{ padding: 8, fontSize: 14, marginBottom: 10 }}
                onClick={() => {
                  setCurrentHashTag(val)
                }}
              >{`#${val?.hashTag}`}</Tag>
            </Badge>
          </span>
        ))}
        {currentHashtag &&
          !hashTagList.slice(0, 5).includes(currentHashtag) && (
            <Tag
              color={"#edc860"}
              style={{ padding: 8, fontSize: 14, marginBottom: 10 }}
              onClick={() => {
                setCurrentHashTag(currentHashtag)
              }}
            >{`#${currentHashtag?.hashTag}`}</Tag>
          )}
        {hashTagList.length > 5 && (
          <Tag
            style={{
              padding: 8,
              fontSize: 14,
              marginBottom: 10,
              cursor: "pointer"
            }}
            onClick={() => {
              setIsOpenModal(true)
            }}
          >{`+${hashTagList.length - 5}`}</Tag>
        )}
      </div>
      <Modal
        title="Hashtag list"
        open={isOpenModal}
        onOk={() => {
          setIsOpenModal(false)
        }}
        onCancel={() => {
          setIsOpenModal(false)
        }}
      >
        {hashTagList.map((val) => (
          <span
            style={{
              marginRight: 12,
              marginBottom: 4,
              cursor: "pointer"
            }}
          >
            <Badge color="green" count={val?.count} offset={[-10, 0]}>
              <Tag
                color={currentHashtag === val ? "#edc860" : ""}
                style={{ padding: 8, fontSize: 14, marginBottom: 10 }}
                onClick={() => {
                  setCurrentHashTag(val)
                  setIsOpenModal(false)
                }}
              >{`#${val?.hashTag}`}</Tag>
            </Badge>
          </span>
        ))}
      </Modal>
      <div className="posts">
        {postList.map((post) => (
          <PostCard key={post._id} post={post} theme={theme} />
        ))}
      </div>
    </div>
  )
}

export default PostListDisplay
