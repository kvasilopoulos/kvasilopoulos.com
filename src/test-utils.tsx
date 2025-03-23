import React from 'react'
import { render as rtlRender } from '@testing-library/react'

// Create a custom render function that includes providers if needed
function render(ui: React.ReactElement, options = {}) {
    return rtlRender(ui, {
        wrapper: ({ children }) => children,
        ...options,
    })
}

// Re-export everything
export * from '@testing-library/react'

// Override render method
export { render } 