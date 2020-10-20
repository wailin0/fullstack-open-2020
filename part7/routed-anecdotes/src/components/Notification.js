import React from 'react'

const Notification = ({notification}) => {
    const style = {
        border: 'black solid 1px',
        display: 'inline'
    }
    return (
        <>
            {notification &&
            <p style={style}>{notification}</p>
            }
        </>
    )
}

export default Notification