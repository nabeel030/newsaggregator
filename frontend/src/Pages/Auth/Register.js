import React, { useState } from 'react';
import axios from 'axios';
import apiClient from '../../Services/api';
import { getCsrfToken } from '../../helpers';

axios.defaults.withCredentials = true;

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [errors, setErrors] = useState({});

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await getCsrfToken();
            const response = await apiClient.post('/api/register', {
                name,
                email,
                password,
                password_confirmation: passwordConfirmation,
            });

            const { token, user } = response.data;

            localStorage.setItem('authToken', token);
            localStorage.setItem('user', JSON.stringify(user));

            window.location.href = '/';
        } catch (err) {
            if (err.response && err.response.status === 422) {
                const serverErrors = JSON.parse(err.response.data.errors);
                const formattedErrors = {};

                for (const [key, messages] of Object.entries(serverErrors)) {
                    formattedErrors[key] = messages[0];
                }

                setErrors(formattedErrors);

            } else {
                setErrors({ general: 'Registration failed. Please check your details.' });
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
                <form onSubmit={handleRegister}>
                    <div className="mb-2">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                            placeholder='Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>
                    <div className="mb-2">
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
                    <div className="mb-2">
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
                    <div className="mb-2">
                        <label className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            className={`form-control ${errors.password_confirmation ? 'is-invalid' : ''}`}
                            placeholder='********'
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            required
                        />
                        {errors.password_confirmation && <div className="invalid-feedback">{errors.password_confirmation}</div>}
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
