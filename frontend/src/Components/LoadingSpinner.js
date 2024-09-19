import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Container } from 'react-bootstrap';

const LoadingSpinner = () => {
    return (
        <Container fluid className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </Container>
    );
};

export default LoadingSpinner;
