import React from 'react'
import { Footer } from '../../components/Footer'
import { render } from '@testing-library/react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { rootReducer } from '../../redux/rootReducer'

const renderWithRedux = (
    component,
    { initialState, store = createStore(rootReducer, initialState) } = {}
) => {
    return {
        ...render(<Provider store={store}>{component}</Provider>),
        store,
    }
}

describe('Footer', () => {
    test('should contains 4 links', () => {
        const { getAllByRole } = renderWithRedux(<Footer />)
        const links = getAllByRole('link')
        expect(links).toHaveLength(4)
    })

    test('should contains correct in document', () => {
        const { getByText } = renderWithRedux(<Footer />)
        expect(getByText('2021')).toBeInTheDocument()
    })
})
