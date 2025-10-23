import { useReducer } from "react"
import reducer, { initState } from "./reducer"

function UseReducer() {
    const [state, dispatch] = useReducer(reducer, initState)

    return (
        <div>
            <button
                aria-label="Increment value"
                onClick={() =>
                    dispatch({
                        type: "increment",
                    })
                }
            >
                Increment
            </button>
            <span>{state.count}</span>
            <button
                aria-label="Decrement value"
                onClick={() =>
                    dispatch({
                        type: "decrement",
                    })
                }
            >
                Decrement
            </button>
            <button
                aria-label="+5"
                onClick={() =>
                    dispatch({
                        type: "incrementByAmount",
                        payload: 5,
                    })
                }
            >
                +5
            </button>
        </div>
    )
}

export default UseReducer
