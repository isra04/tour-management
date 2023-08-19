import React, { useState, useContext } from 'react';

import {
    Container,
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

import registerImg from '../assets/images/register.png';
import userIcon from '../assets/images/user.png';

import { AuthContext } from './../context/AuthContext';
import { BASE_URL } from '../utils/config';

const Register = () => {
    const [credentials, setCredentials] = useState({
        userName: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        userName: '',
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

        if (type === 'userName' && !credentials.userName) {
            newErrors.userName = 'User name is required';
        }
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

        try {
            const res = await fetch(`${BASE_URL}/auth/register`, {
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            const result = await res.json();

            if (!res.ok) {
                toast.error(result.message);
            } else {
                dispatch({ type: 'REGISTER_SUCCESS' });
                navigate('/login');
            }
        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <section>
            <Container>
                <Row>
                    <Col
                        lg='12'
                        className='m-auto'
                    >
                        <div className='login__container d-flex justify-content-between'>
                            <div className='login__img'>
                                <img
                                    src={registerImg}
                                    alt=''
                                />
                            </div>

                            <div className='login__form'>
                                {/* Start: Icon */}
                                <div className='user'>
                                    <img
                                        src={userIcon}
                                        alt=''
                                    />
                                </div>

                                {/* Start: Title */}
                                <h2>Register</h2>

                                {/* Start: Registration form */}
                                <Form onSubmit={handleSubmit}>
                                    <FormGroup>
                                        <Input
                                            required
                                            type='text'
                                            id='userName'
                                            placeholder='Username'
                                            value={credentials.userName}
                                            invalid={errors.userName !== ''}
                                            onBlur={() =>
                                                handleValidation('userName')
                                            }
                                            onFocus={() =>
                                                resetValidation('userName')
                                            }
                                            onChange={handleChange}
                                        />
                                        {errors.userName && (
                                            <FormFeedback>
                                                {errors.userName}
                                            </FormFeedback>
                                        )}
                                    </FormGroup>
                                    <FormGroup>
                                        <Input
                                            required
                                            id='email'
                                            type='email'
                                            placeholder='Email'
                                            invalid={errors.email !== ''}
                                            value={credentials.email}
                                            onBlur={() =>
                                                handleValidation('email')
                                            }
                                            onFocus={() =>
                                                resetValidation('email')
                                            }
                                            onChange={handleChange}
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
                                            id='password'
                                            type='password'
                                            placeholder='Password'
                                            value={credentials.password}
                                            invalid={errors.password !== ''}
                                            onBlur={() =>
                                                handleValidation('password')
                                            }
                                            onFocus={() =>
                                                resetValidation('password')
                                            }
                                            onChange={handleChange}
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
                                        Create Account
                                    </Button>
                                </Form>
                                <p>
                                    Already have an account?
                                    <Link to='/login'>Login</Link>
                                </p>

                                <ToastContainer />
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};
export default Register;
