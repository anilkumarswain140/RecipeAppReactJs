import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignUp from './SingUp'; // Adjust the path if needed
import { BrowserRouter as Router } from 'react-router-dom';
import useSignUp from '../../hooks/useSignUp'; // Mock this hook

jest.mock('../../hooks/useSignUp', () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe('SignUp Component', () => {
    let mockHandleSignUp;

    beforeEach(() => {
        mockHandleSignUp = jest.fn();
        useSignUp.mockReturnValue({
            handleSignUp: mockHandleSignUp,
            loading: false,
            error: '',
        });
    });

    test('renders SignUp form correctly', () => {
        render(
            <Router>
                <SignUp />
            </Router>
        );

        expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Email Address')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByText('Signup')).toBeInTheDocument();
    });

    test('calls handleSignUp with correct data on form submission', async () => {
        render(
            <Router>
                <SignUp />
            </Router>
        );

        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText('Email Address'), { target: { value: 'testuser@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Password@123' } });

        fireEvent.click(screen.getByText('Signup'));

        await waitFor(() => {
            expect(mockHandleSignUp).toHaveBeenCalledWith({
                username: 'testuser',
                email: 'testuser@example.com',
                password: 'Password@123',
            });
        });
    });

    test('displays error message for invalid email format', async () => {
        render(
            <Router>
                <SignUp />
            </Router>
        );

        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText('Email Address'), { target: { value: 'invalidemail' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Password@123' } });

        fireEvent.click(screen.getByText('Signup'));

        await waitFor(() => {
            expect(screen.getByText('Invalid email format')).toBeInTheDocument();
        });
    });

    test('displays error message when password does not meet requirements', async () => {
        render(
            <Router>
                <SignUp />
            </Router>
        );

        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText('Email Address'), { target: { value: 'testuser@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'short' } });

        fireEvent.click(screen.getByText('Signup'));

        await waitFor(() => {
            expect(screen.getByText('Password must be at least 6 characters')).toBeInTheDocument();
        });
    });

    test('disables Signup button when loading', async () => {
        useSignUp.mockReturnValue({
            handleSignUp: mockHandleSignUp,
            loading: true,
            error: '',
        });

        render(
            <Router>
                <SignUp />
            </Router>
        );

        expect(screen.getByText('Signup')).toBeDisabled();
    });

    test('displays error message if there is a general error', async () => {
        useSignUp.mockReturnValue({
            handleSignUp: mockHandleSignUp,
            loading: false,
            error: 'Something went wrong',
        });

        render(
            <Router>
                <SignUp />
            </Router>
        );

        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText('Email Address'), { target: { value: 'testuser@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Password@123' } });

        fireEvent.click(screen.getByText('Signup'));

        await waitFor(() => {
            expect(screen.getByText('Something went wrong')).toBeInTheDocument();
        });
    });

    test('navigates to login page when the link is clicked', () => {
        render(
            <Router>
                <SignUp />
            </Router>
        );

        fireEvent.click(screen.getByText(/Login/i));

        expect(window.location.pathname).toBe('/login');
    });
});
