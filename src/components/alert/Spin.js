import { Spin } from 'antd'
import React from 'react'

export default function SpinAntd() {
    return (
        <div className="overlay" >
            <Spin size="large" tip="Loading..." />
        </div>
    )
}
