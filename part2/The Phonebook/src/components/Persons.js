import React from "react";

const Persons = (props) => {


    return (
        <>
            {
                props.persons.filter(person => person.name.toLowerCase().includes(props.filter.toLowerCase())).map(p => (
                    <p key={p.id}>{p.name} {p.number} <button onClick={() => props.deletePerson(p.id, p.name)}>delete</button></p>
                ))
            }
        </>
    )
}

export default Persons