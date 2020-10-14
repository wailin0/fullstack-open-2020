import React from "react";
import Course from "./Course";

const Courses = (props) => {


    return (
        <>
            {
                props.courses.map((course) => (
                    <Course key={course.id}
                            name={course.name}
                            parts={course.parts}
                    />
                ))
            }
        </>
    )
}

export default Courses