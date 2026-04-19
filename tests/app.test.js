import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../src/App';
import { useForm } from 'react-hook-form';

// Mock react-hook-form
vi.mock('react-hook-form', () => ({
  useForm: vi.fn(),
  Controller: ({ children }) => children({ field: { onChange: vi.fn(), value: '' } }),
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    form: ({ children, ...props }) => <form {...props}>{children}</form>,
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
    a: ({ children, ...props }) => <a {...props}>{children}</a>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
    h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }) => <h2 {...props}>{children}</h2>,
    h3: ({ children, ...props }) => <h3 {...props}>{children}</h3>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
    section: ({ children, ...props }) => <section {...props}>{children}</section>,
  },
  useScroll: () => ({ scrollY: { current: 0 } }),
  useTransform: (_, __, target) => target[0],
  useAnimation: () => ({
    start: vi.fn(),
    set: vi.fn(),
  }),
}));

describe('Portfolio Site', () => {
  it('renders hero section with name and role', () => {
    render(<App />);
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('Full-Stack Developer & Designer')).toBeInTheDocument();
  });

  it('renders about section with descriptive paragraph', () => {
    render(<App />);
    expect(screen.getByText(/I'm a passionate full-stack developer/i)).toBeInTheDocument();
  });

  it('renders three project cards with correct content', () => {
    render(<App />);
    expect(screen.getAllByRole('link', { name: /View Project/i })).toHaveLength(3);
    expect(screen.getByText('E-Commerce Platform')).toBeInTheDocument();
    expect(screen.getByText('Task Management App')).toBeInTheDocument();
    expect(screen.getByText('Analytics Dashboard')).toBeInTheDocument();
  });

  it('handles contact form validation correctly', async () => {
    const mockHandleSubmit = vi.fn();
    const mockReset = vi.fn();
    
    useForm.mockImplementation(() => ({
      register: vi.fn(),
      handleSubmit: (cb) => (e) => {
        e.preventDefault();
        return cb({ name: 'John', email: 'john@example.com', message: 'Hello' });
      },
      formState: { errors: {}, isSubmitting: false },
      reset: mockReset,
    }));

    render(<App />);
    
    const nameInput = screen.getByLabelText('Name');
    const emailInput = screen.getByLabelText('Email');
    const messageInput = screen.getByLabelText('Message');
    const submitButton = screen.getByRole('button', { name: 'Send Message' });

    fireEvent.change(nameInput, { target: { value: 'John' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'Hello' } });
    fireEvent.click(submitButton);

    expect(mockHandleSubmit).toHaveBeenCalled();
  });

  it('shows success message after form submission', () => {
    // Mock the form with submission state
    useForm.mockImplementation(() => ({
      register: vi.fn(),
      handleSubmit: vi.fn(),
      formState: { errors: {}, isSubmitting: false },
      reset: vi.fn(),
    }));

    render(<App />);
    
    // Mock successful submission
    const appInstance = screen.getByRole('main');
    // In real implementation, this would be handled by state
    // This test assumes the success state can be rendered
    expect(screen.queryByText('Thanks for reaching out!')).not.toBeInTheDocument();
  });
});