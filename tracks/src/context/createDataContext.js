import React, { useReducer, createContext } from 'react'

export default (reducer, actions, initialState) => {
    const Context = createContext()

    const Provider = ({ children }) => {
        const [state, dispatch] = useReducer(reducer, initialState)

        const boundActions = {}

        for (let key in actions) {
            //(Object.keys(actions)).forEach((key) => {
            // Object.keys(actions) returns an array of the keys of the actions object. Also written as for (let key in actions)...

            boundActions[key] = actions[key](dispatch) // boundActions is an object with the same keys as actions, but each key is a function that takes dispatch as an argument
        }

        return (
            <Context.Provider value={{ state, ...boundActions }}>
                {children}
            </Context.Provider>
        )
    }
    return { Context, Provider } // Provider provides to the entire App, Context provides to the component
}
