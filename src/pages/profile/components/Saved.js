import React, { useState, useEffect } from "react"
import PostThumb from "../../../components/PostThumb"
import LoadIcon from "../../../images/loading.gif"
import LoadMoreBtn from "../../../components/LoadMoreBtn"
import { getDataAPI } from "../../../utils/fetchData"
import { GLOBALTYPES } from "../../../redux/actions/globalTypes"
import { Spin } from "antd"

const Saved = ({ auth, dispatch }) => {
  const [savePosts, setSavePosts] = useState([])
  const [result, setResult] = useState(9)
  const [page, setPage] = useState(2)
  const [load, setLoad] = useState(false)

  useEffect(() => {
    setLoad(true)
    getDataAPI("getSavePosts", auth.token)
      .then((res) => {
        setSavePosts(res.data.savePosts)
        setResult(res.data.result)
        setLoad(false)
      })
      .catch((err) => {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { error: err.response.data.msg }
        })
      })

    return () => setSavePosts([])
  }, [auth.token, dispatch])

  const handleLoadMore = async () => {
    setLoad(true)
    const res = await getDataAPI(`getSavePosts?limit=${page * 9}`, auth.token)
    setSavePosts(res.data.savePosts)
    setResult(res.data.result)
    setPage(page + 1)
    setLoad(false)
  }

  return (
    <div>
      <PostThumb posts={savePosts} result={result} />

      {load && <div style={{ display: "flex", justifyContent: "center", height: 200, alignItems: "center" }}><Spin size="large" tip="Loading..." /></div>}

      <LoadMoreBtn
        result={result}
        page={page}
        load={load}
        handleLoadMore={handleLoadMore}
      />
    </div>
  )
}

export default Saved
