import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../utils/config';
import {
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Row,
    Container
} from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditProfile = () => {
    const navigate = useNavigate();
    const { user: userInfo, dispatch } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        username: '',
        gender: '',
        number: '',
        birthDate: '',
        country: '',
        address: ''
    });

    useEffect(() => {
        const existingData = {
            username: userInfo?.username,
            gender: userInfo?.gender,
            number: userInfo?.number,
            birthDate: userInfo.birthDate
                ? new Date(userInfo?.birthDate).toISOString().split('T')[0]
                : '',
            country: userInfo?.country,
            address: userInfo?.address
        };

        setFormData(existingData);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${BASE_URL}/users/${userInfo._id}`, {
                method: 'put',
                headers: {
                    'content-type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            });

            const result = await res.json();

            if (result.success) {
                dispatch({ type: 'UPDATE_USER', payload: result.data });
                toast.success(result.message);
                navigate('/profile');
            }

            if (!res.ok) {
                toast.error(result.message);
            }
        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <Container>
            <Row>
                <Col
                    lg='8'
                    className='m-auto'
                >
                    <div className='tourmaster-user-content'>
                        <div className='tourmaster-user-content-block tourmaster-dashboard-profile-wrapper'>
                            {/* Start: Title */}
                            <div className='tourmaster-user-content-title-wrap'>
                                <h3 className='tourmaster-user-content-title'>
                                    Edit Profile
                                </h3>
                            </div>
                            {/* End: Title */}
                            <section>
                                <Form onSubmit={handleSubmit}>
                                    <div className='row'>
                                        <Col lg='6'>
                                            <FormGroup>
                                                <Label for='username'>
                                                    Username
                                                </Label>
                                                <Input
                                                    type='text'
                                                    name='username'
                                                    id='username'
                                                    value={formData.username}
                                                    onChange={handleChange}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for='gender'>
                                                    Gender
                                                </Label>
                                                <Input
                                                    type='select'
                                                    name='gender'
                                                    id='gender'
                                                    value={formData.gender}
                                                    onChange={handleChange}
                                                >
                                                    <option value=''>
                                                        Select Gender
                                                    </option>
                                                    <option value='male'>
                                                        Male
                                                    </option>
                                                    <option value='female'>
                                                        Female
                                                    </option>
                                                    <option value='other'>
                                                        Other
                                                    </option>
                                                </Input>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for='birthDate'>
                                                    Birthdate
                                                </Label>
                                                <Input
                                                    type='date'
                                                    name='birthDate'
                                                    id='birthDate'
                                                    value={formData.birthDate}
                                                    onChange={handleChange}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col lg='6'>
                                            <FormGroup>
                                                <Label for='country'>
                                                    Phone Number
                                                </Label>
                                                <Input
                                                    type='text'
                                                    name='number'
                                                    id='number'
                                                    value={formData.number}
                                                    onChange={handleChange}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for='country'>
                                                    Country
                                                </Label>
                                                <Input
                                                    type='text'
                                                    name='country'
                                                    id='country'
                                                    value={formData.country}
                                                    onChange={handleChange}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for='address'>
                                                    Contract Address
                                                </Label>
                                                <Input
                                                    type='textarea'
                                                    name='address'
                                                    id='address'
                                                    value={formData.address}
                                                    onChange={handleChange}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </div>
                                    <Button
                                        color='primary'
                                        type='submit'
                                    >
                                        Save
                                    </Button>
                                </Form>
                            </section>
                            <ToastContainer />
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default EditProfile;
