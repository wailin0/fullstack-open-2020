const initState = null

const notificationReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_NOTI' : {
            return action.data.noti
        }
        case 'CLEAR_NOTI' : {
            return initState
        }
        default:
            return state
    }
}

export const setNoti = (noti) => {
    return {
        type: 'SET_NOTI',
        data: {
            noti
        }
    }
}

export const clearNoti = () => {
    return {
        type: 'CLEAR_NOTI'
    }
}


export default notificationReducer