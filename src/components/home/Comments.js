import React, { useState, useEffect } from 'react'
import CommentDisplay from './comments/CommentDisplay'

const Comments = ({ post, language }) => {
    const [comments, setComments] = useState([])
    const [showComments, setShowComments] = useState([])
    const [next, setNext] = useState(2)

    const [replyComments, setReplyComments] = useState([])

    useEffect(() => {
        const newCm = post.comments.filter(cm => !cm.reply)
        setComments(newCm)
        setShowComments(newCm.slice(newCm.length - next))
    }, [post.comments, next])

    useEffect(() => {
        const newRep = post.comments.filter(cm => cm.reply)
        setReplyComments(newRep)
    }, [post.comments])

    return (
        <div className="comments">
            {
                showComments.map((comment, index) => (
                    <CommentDisplay language={language} key={index} comment={comment} post={post}
                        replyCm={replyComments.filter(item => item.reply === comment._id)} />
                ))
            }
            {
                comments.length - next > 0
                    ? <div
                        className='readMore'
                        onClick={() => setNext(next + 10)}>
                        {language === 'en' ? "See more comments..." : "Xem thêm"}
                    </div>

                    : comments.length > 2 &&
                    <div
                        className='readMore'
                        onClick={() => setNext(2)}>
                        {language === 'en' ? "Hide comments..." : "Ẩn bớt"}

                    </div>
            }
        </div>
    )
}

export default Comments
