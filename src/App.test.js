import React from 'react'
import { render, screen } from '@testing-library/react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { App } from './App'
import { rootReducer } from './redux/rootReducer'

const renderWithRedux = (
    component,
    { initialState, store = createStore(rootReducer, initialState) } = {}
) => {
    return {
        ...render(<Provider store={store}>{component}</Provider>),
        store,
    }
}

test('render correctly', () => {
    renderWithRedux(<App />)
})
