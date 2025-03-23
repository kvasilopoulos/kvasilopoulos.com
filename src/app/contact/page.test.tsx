import '@testing-library/jest-dom'
import { render, screen } from '../../test-utils'
import ContactPage from './page'

describe('ContactPage', () => {
    it('renders the contact page title', () => {
        render(<ContactPage />)
        expect(screen.getByText('Contact')).toBeInTheDocument()
    })

    it('renders the introduction text', () => {
        render(<ContactPage />)
        expect(
            screen.getByText(/I'm always open to discussing new projects/i)
        ).toBeInTheDocument()
    })

    it('renders all social links', () => {
        render(<ContactPage />)

        // Check if all social platforms are present
        expect(screen.getByText('Email')).toBeInTheDocument()
        expect(screen.getByText('LinkedIn')).toBeInTheDocument()
        expect(screen.getByText('GitHub')).toBeInTheDocument()
        expect(screen.getByText('Twitter')).toBeInTheDocument()

        // Check if all usernames are present
        expect(screen.getByText('contact@example.com')).toBeInTheDocument()
        expect(screen.getByText('LinkedIn Profile')).toBeInTheDocument()
        expect(screen.getByText('GitHub Profile')).toBeInTheDocument()
        expect(screen.getByText('@twitter_handle')).toBeInTheDocument()
    })

    it('renders all social links with correct href attributes', () => {
        render(<ContactPage />)

        // Check if all links have correct href attributes
        expect(screen.getByRole('link', { name: /email/i })).toHaveAttribute(
            'href',
            'mailto:contact@example.com'
        )
        expect(screen.getByRole('link', { name: /linkedin/i })).toHaveAttribute(
            'href',
            'https://linkedin.com/in/'
        )
        expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute(
            'href',
            'https://github.com/'
        )
        expect(screen.getByRole('link', { name: /twitter/i })).toHaveAttribute(
            'href',
            'https://twitter.com/'
        )
    })

    it('renders the connect section', () => {
        render(<ContactPage />)
        expect(screen.getByText("Let's Connect")).toBeInTheDocument()
        expect(
            screen.getByText(/Whether you want to discuss a project/i)
        ).toBeInTheDocument()
    })

    it('renders all social icons', () => {
        render(<ContactPage />)
        const icons = screen.getAllByTestId('social-icon')
        expect(icons).toHaveLength(4) // One icon for each social link
    })
}) 