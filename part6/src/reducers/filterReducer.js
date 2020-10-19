const initState = ''

const filterReducer = (state = initState, action) => {
    console.log('state now: ', state)
    console.log('action', action.data)
    switch (action.type) {
        case 'FILTER' :
            return action.data
        default:
            return state
    }
}

export const filter = filtered => {
    return {
        type: 'FILTER',
        data: filtered
    }
}

export default filterReducer