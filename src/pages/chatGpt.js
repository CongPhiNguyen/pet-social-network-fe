import { FloatButton, Popconfirm, Popover } from 'antd'
import React, { useState } from 'react'
import { BiBot } from 'react-icons/bi'
import Gpt from './gpt/gpt'

export default function ChatGpt() {
    const [open, setOpen] = useState(false)
    const handleOpenChange1 = (newOpen) => {
        setOpen(newOpen)
    }

    return (
        <Popover
            className="popover-notify"
            onOpenChange={handleOpenChange1}
            placement="leftBottom"
            content={<Gpt></Gpt>}
            trigger="click"
            open={open}
        >
            <FloatButton
                icon={<BiBot style={{ fontSize: ' 1.6rem', transform: 'translateX(-4px)' }} />}
                shape="circle"
                badge={{ dot: true }}
                style={{ right: 40, height: 50, width: 50 }}
            >
            </FloatButton>
        </Popover>


    )
}
