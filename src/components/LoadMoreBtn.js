import React from "react"
import { Button } from "antd"
const LoadMoreBtn = ({ result, page, load, handleLoadMore }) => {
  return (
    <>
      {result < 9 * (page - 1)
        ? ""
        : !load && (
            <Button
              className="mx-auto d-block"
              onClick={handleLoadMore}
              style={{ paddingBottom: 20, marginBottom: 20 }}
            >
              Load more
            </Button>
          )}
    </>
  )
}

export default LoadMoreBtn
