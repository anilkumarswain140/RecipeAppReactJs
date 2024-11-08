import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './LogInForm';  // Adjust the path as needed
import useLogin from '../../hooks/useLogin';

// Mock the useLogin hook to avoid making actual API calls during tests
jest.mock('../../hooks/useLogin');

describe('Login Component', () => {
  
  beforeEach(() => {
    // Reset the mock before each test to ensure a clean state
    useLogin.mockReset();
  });

  it('renders the login form correctly', () => {
    // Mocking the useLogin hook to return default values
    useLogin.mockReturnValue({
      handleUserLogin: jest.fn(),
      loading: false,
      error: null,
    });

    render(<Login />);
    
    // Check if the email and password fields are rendered
    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });

  it('shows error message for empty email and password', async () => {
    useLogin.mockReturnValue({
      handleUserLogin: jest.fn(),
      loading: false,
      error: null,
    });

    render(<Login />);
    
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });
  });

  it('shows error message for invalid email format', async () => {
    useLogin.mockReturnValue({
      handleUserLogin: jest.fn(),
      loading: false,
      error: null,
    });

    render(<Login />);
    
    fireEvent.change(screen.getByLabelText(/Email address/i), { target: { value: 'invalidemail' } });
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/Email address is invalid/i)).toBeInTheDocument();
    });
  });

  it('shows error message for password too short', async () => {
    useLogin.mockReturnValue({
      handleUserLogin: jest.fn(),
      loading: false,
      error: null,
    });

    render(<Login />);
    
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: '12345' } });
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/Password must be at least 6 characters/i)).toBeInTheDocument();
    });
  });

  it('submits form with valid data and calls handleUserLogin', async () => {
    const mockHandleUserLogin = jest.fn();
    useLogin.mockReturnValue({ handleUserLogin: mockHandleUserLogin, loading: false, error: null });
    
    render(<Login />);
    
    fireEvent.change(screen.getByLabelText(/Email address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));
    
    await waitFor(() => {
      expect(mockHandleUserLogin).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password123' });
    });
  });

  it('disables the login button when loading', async () => {
    useLogin.mockReturnValue({ handleUserLogin: jest.fn(), loading: true, error: null });
    
    render(<Login />);
    
    expect(screen.getByRole('button', { name: /Login/i })).toBeDisabled();
  });

  it('displays server error message if login fails', async () => {
    const mockError = 'Invalid credentials';
    useLogin.mockReturnValue({ handleUserLogin: jest.fn(), loading: false, error: mockError });
    
    render(<Login />);
    
    await waitFor(() => {
      expect(screen.getByText(mockError)).toBeInTheDocument();
    });
  });
});
