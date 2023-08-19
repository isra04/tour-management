import React, { useState, useContext } from 'react';
import {
    Row,
    Col,
    Form,
    FormGroup,
    Button,
    Input,
    FormFeedback
} from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loginImg from '../assets/images/login.png';
import userIcon from '../assets/images/user.png';

import { AuthContext } from './../context/AuthContext';
import { BASE_URL } from '../utils/config';

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const hasValidationError = () => {
        return (
            Object.values(credentials).filter((error) => error === '').length ||
            Object.values(errors).filter((error) => error !== '').length
        );
    };

    const validateEmail = (email) => {
        const pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return !pattern.test(email);
    };

    const handleValidation = (type) => {
        const newErrors = {};

        if (
            (type === 'email' && !credentials.email) ||
            validateEmail(credentials.email)
        ) {
            newErrors.email = 'Invalid email address';
        }

        if (type === 'password' && !credentials.password) {
            newErrors.password = 'Password is required';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        }
    };

    const resetValidation = (type) => {
        setErrors((prev) => ({ ...prev, [type]: '' }));
    };

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch({ type: 'LOGIN_START' });

        try {
            const res = await fetch(`${BASE_URL}/auth/login`, {
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(credentials)
            });

            const result = await res.json();

            if (!res.ok) {
                toast.error(result.message); // Display toast on login failure
            } else {
                dispatch({ type: 'LOGIN_SUCCESS', payload: result.data });
                navigate('/');
            }
        } catch (err) {
            dispatch({ type: 'LOGIN_FAILURE', payload: err.message });
        }
    };

    return (
        <section>
            <Row>
                <Col
                    lg='8'
                    className='m-auto'
                >
                    <div className='login__container d-flex justify-content-between'>
                        {/* Start: Login Image */}
                        <div className='login__img'>
                            <img
                                src={loginImg}
                                alt='Icon'
                            />
                        </div>

                        {/* Start: Login form */}
                        <div className='login__form'>
                            {/* Login Icon */}
                            <div className='user'>
                                <img
                                    src={userIcon}
                                    alt='User Icon'
                                />
                            </div>

                            {/* Title */}
                            <h2>Login</h2>

                            <Form onSubmit={handleSubmit}>
                                <FormGroup>
                                    <Input
                                        required
                                        id='email'
                                        type='email'
                                        placeholder='Email'
                                        invalid={errors.email !== ''}
                                        value={credentials.email}
                                        onChange={handleChange}
                                        onBlur={() => handleValidation('email')}
                                        onFocus={() => resetValidation('email')}
                                    />

                                    {errors.email && (
                                        <FormFeedback>
                                            {errors.email}
                                        </FormFeedback>
                                    )}
                                </FormGroup>
                                <FormGroup>
                                    <Input
                                        required
                                        type='password'
                                        placeholder='Password'
                                        id='password'
                                        invalid={
                                            errors.hasOwnProperty('password') &&
                                            errors.password !== ''
                                        }
                                        value={credentials.password}
                                        onChange={handleChange}
                                        onBlur={() =>
                                            handleValidation('password')
                                        }
                                        onFocus={() =>
                                            resetValidation('password')
                                        }
                                    />

                                    {errors.password && (
                                        <FormFeedback>
                                            {errors.password}
                                        </FormFeedback>
                                    )}
                                </FormGroup>

                                <Button
                                    className='btn secondary__btn auth__btn'
                                    type='submit'
                                    disabled={!!hasValidationError()}
                                >
                                    Login
                                </Button>
                            </Form>
                            <p>
                                Don't have an account?
                                <Link to='/register'>Create account.</Link>
                            </p>

                            {/* Start: Toast */}
                            <ToastContainer />
                        </div>
                    </div>
                </Col>
            </Row>
        </section>
    );
};
export default Login;
