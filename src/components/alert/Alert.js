import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import SpinAntd from './Spin'
import Toast from './Toast'
import { message } from 'antd'

const Notify = () => {
    const { alert } = useSelector(state => state)
    const dispatch = useDispatch()
    useEffect(() => {

    }, [alert])
    return (
        <div>
            {/* {alert.loading && <Loading />} */}
            {alert.loading && <SpinAntd />}
            {
                // alert.error && message.error(alert.error)
                // <Toast msg={{ title: 'Error', body: alert.error }}
                //     handleShow={() => dispatch({ type: GLOBALTYPES.ALERT, payload: {} })}
                //     bgColor="bg-danger" />
            }

            {
                // alert.success && message.success(alert.success)
                // <Toast msg={{ title: 'Success', body: alert.success }}
                //     handleShow={() => dispatch({ type: GLOBALTYPES.ALERT, payload: {} })}
                //     bgColor="bg-success" />
            }
        </div>
    )
}

export default Notify
