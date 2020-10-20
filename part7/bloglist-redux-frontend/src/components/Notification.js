import React from 'react'
import {useSelector} from "react-redux";

const Notification = () => {
  const noti = useSelector(state => state.noti)
  return (
      <>
          {noti &&
          <div className='success'>
              {noti}
          </div>
          }
      </>
  )
}

export default Notification