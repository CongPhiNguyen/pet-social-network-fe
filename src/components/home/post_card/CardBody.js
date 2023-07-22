import React, { useEffect, useState } from "react"
import { Image, Carousel } from "antd"
import { ImLocation2 } from "react-icons/im"

const CardBody = ({ post, theme, language }) => {
  const [readMore, setReadMore] = useState(false)
  const [visible, setVisible] = useState(false)
  return (
    <div className="card_body">
      <div
        className="card_body-content"
        style={{
          filter: theme ? "invert(1)" : "invert(0)",
          color: theme ? "white" : "#111"
        }}
      >
        <span>
          {post.content.length < 60 ? (
            post.content
              .split("\n")
              .map((val) => (
                <p style={{ marginTop: 0, marginBottom: 4 }}>{val}</p>
              ))
          ) : readMore ? (
            post.content
              .split("\n")
              .map((val) => (
                <p style={{ marginTop: 0, marginBottom: 4 }}>{val}</p>
              ))
          ) : (
            <div>
              {post.content
                .slice(0, 60)
                .split("\n")
                .map((text) => {
                  return <p style={{ marginTop: 0, marginBottom: 4 }}>{text}</p>
                })}
              <p>.....</p>
            </div>
          )}
        </span>
        {post.content.replace("\n", "<br/>").length > 60 && (
          <span className="readMore" onClick={() => setReadMore(!readMore)}>
            {readMore
              ? language === "en"
                ? "Hide away"
                : "Ẩn bớt"
              : language === "en"
              ? "See more"
              : "Xem thêm"}
          </span>
        )}
        {post?.hashtag && (
          <p style={{ fontSize: 12, marginTop: 10 }}>
            Hashtag:{" "}
            {(post?.hashtag || []).map((val) => (
              <span
                style={{ color: "#f07c4b", cursor: "pointer" }}
              >{`#${val} `}</span>
            ))}
          </p>
        )}
        <div style={{ display: "flex", marginTop: "5px" }}>
          <div style={{ width: "20px" }}>
            <ImLocation2
              style={{
                fontSize: "1rem",
                color: "#0000007a",
                transform: "translateY(-3px)"
              }}
            ></ImLocation2>
          </div>
          <div
            style={{
              fontWeight: "500",
              fontSize: ".7rem",
              color: "#0000007a",
              fontStyle: "italic"
            }}
          >
            {post.location}
          </div>
        </div>
      </div>

      {post.images.length > 0 && (
        <>
          <Carousel autoplay dots>
            {post.images.map((image, index) => (
              <div
                key={index}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Image
                  preview={{
                    visible: false
                  }}
                  height={300}
                  style={{ display: "flex", justifyContent: "center" }}
                  src={image.url}
                  onClick={() => setVisible(true)}
                />
              </div>
            ))}
          </Carousel>
          <div
            style={{
              display: "none"
            }}
          >
            <Image.PreviewGroup
              preview={{
                visible,
                onVisibleChange: (vis) => setVisible(vis)
              }}
            >
              {post.images.map((image) => (
                <Image src={image.url} />
              ))}
            </Image.PreviewGroup>
          </div>
        </>
      )}
    </div>
  )
}

export default CardBody
