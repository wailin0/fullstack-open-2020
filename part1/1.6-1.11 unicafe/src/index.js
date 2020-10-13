import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {
    const all = props.good + props.neutral + props.bad
    const average = (props.good - props.bad) / all
    const positive = (props.good / all) * 100
    return (
        <div>
            <h1>statistics</h1>
            {(props.good === 0 && props.neutral === 0 && props.bad === 0) ? <p>No feedback given</p> :
                <>
                    <Statistic text="good" value={props.good}/>
                    <Statistic text="neutral" value={props.neutral}/>
                    <Statistic text="bad" value={props.bad}/>
                    <Statistic text="all" value={all}/>
                    <Statistic text="average" value={average}/>
                    <Statistic text="positive" value={positive+ " %"}/>
                </>
            }
        </div>
    )
}

const Statistic = (props) => {
    return (
        <>
                <tr>
                    <td>{props.text}</td>
                    <td>{props.value}</td>
                </tr>
        </>
    )
}


const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const PressGood = () => {
        setGood(good + 1)
    }

    const PressNeutral = () => {
        setNeutral(neutral + 1)
    }

    const PressBad = () => {
        setBad(bad + 1)
    }


    return (
        <div>
            <h1>give feedback</h1>
            <button onClick={() => PressGood()}>good</button>
            <button onClick={() => PressNeutral()}>neutral</button>
            <button onClick={() => PressBad()}>bad</button>

            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

ReactDOM.render(<App/>,
    document.getElementById('root')
)