import React, { useState, useEffect } from 'react'
import CommentCard from './CommentCard'

const CommentDisplay = ({ comment, post, replyCm, language }) => {
    const [showRep, setShowRep] = useState([])
    const [next, setNext] = useState(1)

    useEffect(() => {
        setShowRep(replyCm.slice(replyCm.length - next))
    }, [replyCm, next])

    return (
        <div className="comment_display">
            <CommentCard language={language} comment={comment} post={post} commentId={comment._id} >
                <div className="pl-4">
                    {
                        showRep.map((item, index) => (
                            item.reply &&
                            <CommentCard
                                key={index}
                                comment={item}
                                post={post}
                                commentId={comment._id}
                            />
                        ))
                    }

                    {
                        replyCm.length - next > 0
                            ? <div className='readMore'
                                style={{ margin: '10px 5px' }}
                                onClick={() => setNext(next + 10)}>
                                {language === 'en' ? "See more comments..." : "Xem thêm"}
                            </div>
                            : replyCm.length > 1 &&
                            <div className='readMore'
                                style={{ margin: '10px 5px' }}
                                onClick={() => setNext(1)}>\
                                {language === 'en' ? "Hide comments..." : "Ẩn bớt"}

                            </div>
                    }
                </div>
            </CommentCard>
        </div>
    )
}

export default CommentDisplay
