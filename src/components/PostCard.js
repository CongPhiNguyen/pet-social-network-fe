import React from 'react'
import CardHeader from './home/post_card/CardHeader'
import CardBody from './home/post_card/CardBody'
import CardFooter from './home/post_card/CardFooter'

import Comments from './home/Comments'
import InputComment from './home/InputComment'
import { Avatar, Card } from 'antd'
import { useSelector } from 'react-redux'

const PostCard = ({ post, theme }) => {
    const { auth } = useSelector(state => state)

    return (
        <>
            <Card style={{ marginBottom: 20 }}>
                <CardHeader post={post} />
                <CardBody post={post} theme={theme} />
                <CardFooter post={post} />

                <Comments post={post} />
                <div style={{ borderTop: '1px solid #00000038' }}>
                    <InputComment post={post} >
                        <Avatar style={{
                            backgroundColor: '#f56a00',
                            verticalAlign: 'middle',
                            marginRight: "5px",
                            marginRight: "15px"
                        }} src={auth?.user?.avatar === 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png' ? null : auth?.user?.avatar} size="default" >
                            {auth?.user?.username[0]?.toUpperCase()}
                        </Avatar>
                    </InputComment>
                </div>

            </Card>
        </>
    )
}

export default PostCard
