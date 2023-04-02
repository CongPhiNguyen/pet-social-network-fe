import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteComment } from '../../../redux/actions/commentAction'
import { SlOptions } from 'react-icons/sl'
import { Button, Space } from 'antd'
import { BiTrash, BiEdit } from 'react-icons/bi'

const CommentMenu = ({ post, comment, setOnEdit }) => {

    const { auth, socket } = useSelector(state => state)
    const dispatch = useDispatch()

    const handleRemove = () => {
        if (post.user._id === auth.user._id || comment.user._id === auth.user._id) {
            dispatch(deleteComment({ post, auth, comment, socket }))
        }
    }

    const MenuItem = () => {
        return (
            <Space direction="vertical" style={{ width: '100%' }}>
                {
                    comment.user._id === auth.user._id && <Button type="text" block onClick={() => setOnEdit(true)}>
                        <BiEdit />
                    </Button>
                }
                <Button type="text" block onClick={handleRemove}>
                    <BiTrash />
                </Button>
            </Space>
        )
    }



    return (
        <div className="menu comment-menu">
            {
                (post.user._id === auth.user._id || comment.user._id === auth.user._id) &&
                <div className="nav-item dropdown">
                    <span className="material-icons more-option" id="moreLink" data-toggle="dropdown">
                        <SlOptions />
                    </span>
                    <div className="dropdown-menu" style={{ minWidth: " 5rem" }} aria-labelledby="moreLink">
                        {
                            post.user._id === auth.user._id
                                ? MenuItem()
                                : comment.user._id === auth.user._id && MenuItem()
                        }
                    </div>
                </div>
            }

        </div>
    )
}

export default CommentMenu
