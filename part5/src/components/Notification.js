import React from 'react'

const Notification = (props) => (
  <>
    {props.success && (
      <p className="success">{props.success}</p>
    )}

    {props.error && (
      <p className="error">{props.error}</p>
    )}
  </>
)

export default Notification