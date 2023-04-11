import React from 'react'
import { Spin } from 'antd'

export default function SpinAntd() {
    return (
        <div className="overlay" >
            <Spin size="large" tip="Loading..." />
        </div>
    )
}