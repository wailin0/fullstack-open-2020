import React from "react";

const Notification = (props) => {
    if (props.error === null && props.success === null) {
        return null
    }
    return (
        <>
            {
                props.error &&
                <div className="error">
                    {props.error}
                </div>
            }
            {
                props.success &&
                <div className="success">
                    {props.success}
                </div>
            }
        </>
    )
}
export default Notification