import React, { useState } from 'react';
import apiClient from '../../Services/api';
import { getCsrfToken } from '../../helpers';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            await getCsrfToken();

            const response = await apiClient.post('/api/login', {
                email,
                password,
            });
            
            const { token, user } = response.data;
            
            localStorage.setItem('authToken', token);
            localStorage.setItem('user', JSON.stringify(user));
            
            window.location.href = '/';
        } catch (err) {
            if (err.response && err.response.status === 422) {
                // Parse validation errors
                const serverErrors = JSON.parse(err.response.data.errors);
                const formattedErrors = {};

                // Loop through errors and store the first error message in the state
                for (const [key, messages] of Object.entries(serverErrors)) {
                    // 'messages' is an array, so we take the first element
                    formattedErrors[key] = messages[0];
                }

                setErrors(formattedErrors);
            } else {
                setErrors({ general: 'Invalid credentials! Try again with valid credentials.' });
            }
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center text-start">
            <div className="card p-4" style={{ width: '400px', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
                <h3 className="text-center mb-1">
                    {process.env.REACT_APP_NAME}
                </h3>
                <p className="text-center">Welcome to Quick News</p>
                {errors.general && <div className="alert alert-danger">{errors.general}</div>}
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            placeholder='********'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
