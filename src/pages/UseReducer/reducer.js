export const initState = {
    count: 0,
    // state2: "value2",
    // state3: "value3",
    // state4: "value4",
    // stateN: "valueN",
}

function reducer(state, action) {
    switch (action.type) {
        case "increment":
            return {
                ...state,
                count: state.count + 1,
            }
        case "decrement":
            return {
                ...state,
                count: state.count - 1,
            }
        case "incrementByAmount":
            return {
                ...state,
                count: state.count + action.payload,
            }
        default:
            throw new Error(`Active type "${action.type}" invalid.`)
    }
}

export default reducer
