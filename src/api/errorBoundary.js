import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state to trigger fallback UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can log the error to an error reporting service here
        console.error("Error caught by ErrorBoundary:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // Render any fallback UI
            return <h2>Something went wrong. Please try refreshing the page.</h2>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
