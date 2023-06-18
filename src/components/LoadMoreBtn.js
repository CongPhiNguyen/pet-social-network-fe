import React from 'react'
import { Button } from 'antd'
const LoadMoreBtn = ({ result, page, load, handleLoadMore }) => {
    return (
        <>
            {
                result < 9 * (page - 1) ? '' :

                    !load && <Button className="btn btn-dark mx-auto d-block"
                        onClick={handleLoadMore}>
                        Load more
                    </Button>
            }

        </>
    )
}

export default LoadMoreBtn
