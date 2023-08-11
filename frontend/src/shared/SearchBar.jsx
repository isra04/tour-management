import React, { useState } from 'react';
import './search-bar.css';
import { Col, Form, FormGroup } from 'reactstrap';
import { BASE_URL } from '../utils/config';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [location, setLocation] = useState('');
    const [distance, setDistance] = useState(0);
    const [maxGroupSize, setMaxGroupSize] = useState(0);

    const navigate = useNavigate();

    const searchHandler = async () => {
        if (location === '' || distance === 0 || maxGroupSize === 0) {
            return alert('All fields are required');
        }

        try {
            const res = await fetch(
                `${BASE_URL}/tours/search/getTourBySearch?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`
            );

            if (!res.ok) {
                throw new Error('Something went wrong');
            }

            const result = await res.json();
            navigate(
                `/tours/search?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`,
                { state: result.data }
            );
        } catch (error) {
            console.error(error);
            alert('An error occurred while searching');
        }
    };

    return (
        <Col lg='12'>
            <div className='search__bar'>
                <Form
                    className='d-flex align-items-center gap-4'
                    onSubmit={(e) => {
                        e.preventDefault();
                        searchHandler();
                    }}
                >
                    <FormGroup className='mt-3 d-flex gap-3 form__group form__group-fast '>
                        <span>
                            <i className='ri-map-pin-line'></i>
                        </span>
                        <div>
                            <h6>Location</h6>
                            <input
                                type='text'
                                placeholder='Where are you going?'
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>
                    </FormGroup>
                    <FormGroup className='mt-3 d-flex gap-3 form__group form__group-fast '>
                        <span>
                            <i className='ri-map-pin-line'></i>
                        </span>
                        <div>
                            <h6>Distance</h6>
                            <input
                                type='text'
                                placeholder='Distance k/m'
                                value={distance}
                                onChange={(e) =>
                                    setDistance(Number(e.target.value))
                                }
                            />
                        </div>
                    </FormGroup>
                    <FormGroup className='mt-3 d-flex gap-3 form__group form__group-fast '>
                        <span>
                            <i className='ri-group-line'></i>
                        </span>
                        <div>
                            <h6>Max People</h6>
                            <input
                                type='text'
                                placeholder='0'
                                value={maxGroupSize}
                                onChange={(e) =>
                                    setMaxGroupSize(Number(e.target.value))
                                }
                            />
                        </div>
                    </FormGroup>
                    <button
                        type='submit'
                        className='search_icon'
                    >
                        <i className='ri-search-line'></i>
                    </button>
                </Form>
            </div>
        </Col>
    );
};

export default SearchBar;
