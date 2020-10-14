import React from "react";

const PersonForm = (props) => {
    return (
        <>
            <h2>add a new </h2>
            <form onSubmit={props.submitHandler}>
                <div>
                    name: <input value={props.newName} onChange={props.nameChangeHandler}/>
                </div>
                <div>
                    number: <input value={props.newPhone} onChange={props.phoneChangeHandler}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </>
    )
}

export default PersonForm