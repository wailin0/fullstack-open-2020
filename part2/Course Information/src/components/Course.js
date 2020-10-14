import React from "react";

const Course = (props) => {
    const totalExercises = props.parts.reduce((s,p) => s+p.exercises,0)
    return (
        <>
            <h1>{props.name}</h1>
            {
                props.parts.map((part) => (
                    <p key={part.id}>{part.name} {part.exercises}</p>
                ))
            }
            <strong>total of {totalExercises} exercises</strong>
        </>
    )
}

export default Course