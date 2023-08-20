import { useContext } from 'react';
import Gravatar from 'react-gravatar';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { BASE_URL } from '../utils/config';
import { AuthContext } from '../context/AuthContext';
import ReviewListTable from '../components/Profile/ReviewListTable';
import BookingListTable from '../components/Profile/BookingListTable';

import '../styles/profile.css';

const UserProfile = () => {
    const { user } = useContext(AuthContext);

    const { data: bookingList, loading: isBookingLoading } = useFetch(
        `${BASE_URL}/booking/getBookingByUser/${user._id}`
    );

    const { data: reviewList, loading: isReviewLoading } = useFetch(
        `${BASE_URL}/review/getReviewsByUser/${user._id}`
    );

    return (
        <section>
            <Row>
                <Col
                    lg='9'
                    className='m-auto'
                >
                    {/* ================ Start: User Information =========== */}
                    <div className='tourmaster-user-content'>
                        <div className='tourmaster-user-content-block tourmaster-dashboard-profile-wrapper'>
                            {/* Start: Title */}
                            <div className='tourmaster-user-content-title-wrap'>
                                <h3 className='tourmaster-user-content-title'>
                                    My Profile
                                </h3>

                                {/* <Link
                                    to='/change-password'
                                    className='tourmaster-user-content-title-link'
                                >
                                    Change Password
                                </Link> */}

                                <Link
                                    to='/edit-profile'
                                    className='tourmaster-user-content-title-link'
                                >
                                    Edit Profile
                                </Link>
                            </div>
                            {/* End: Title */}

                            <div className='tourmaster-user-content-block-content'>
                                <div className='tourmaster-my-profile-wrapper'>
                                    {/* Start: User Image */}
                                    <div className='tourmaster-my-profile-avatar'>
                                        {user.email && (
                                            <Gravatar
                                                email={user.email}
                                                size={85}
                                            />
                                        )}
                                    </div>
                                    {/* End: User Image */}

                                    {/* Start: User Information */}
                                    <div className='tourmaster-my-profile-info-wrap clearfix'>
                                        {/* User Name */}
                                        <div className='tourmaster-my-profile-info tourmaster-my-profile-info-full_name tourmaster-even clearfix'>
                                            <span className='tourmaster-head'>
                                                Name
                                            </span>
                                            <span className='tourmaster-tail'>
                                                {user?.username
                                                    ? user?.username
                                                    : '-'}
                                            </span>
                                        </div>
                                        {/* Gender */}
                                        <div className='tourmaster-my-profile-info tourmaster-my-profile-info-gender tourmaster-odd clearfix'>
                                            <span className='tourmaster-head'>
                                                Gender
                                            </span>
                                            <span className='tourmaster-tail'>
                                                {user?.gender
                                                    ? user?.gender
                                                    : '-'}
                                            </span>
                                        </div>
                                        <div className='tourmaster-my-profile-info tourmaster-my-profile-info-birth_date tourmaster-even clearfix'>
                                            <span className='tourmaster-head'>
                                                Birth Date
                                            </span>
                                            <span className='tourmaster-tail'>
                                                {user?.birthDate
                                                    ? new Date(
                                                          user.birthDate
                                                      ).toLocaleDateString(
                                                          'en-US',
                                                          {
                                                              year: 'numeric',
                                                              month: 'long',
                                                              day: 'numeric'
                                                          }
                                                      )
                                                    : '-'}
                                            </span>
                                        </div>

                                        <div className='tourmaster-my-profile-info tourmaster-my-profile-info-country tourmaster-odd clearfix'>
                                            <span className='tourmaster-head'>
                                                Country
                                            </span>
                                            <span className='tourmaster-tail'>
                                                {user?.country
                                                    ? user?.country
                                                    : '-'}
                                            </span>
                                        </div>
                                        <div className='tourmaster-my-profile-info tourmaster-my-profile-info-email tourmaster-even clearfix'>
                                            <span className='tourmaster-head'>
                                                Email
                                            </span>
                                            <span className='tourmaster-tail'>
                                                {user?.email
                                                    ? user?.email
                                                    : '-'}
                                            </span>
                                        </div>
                                        <div className='tourmaster-my-profile-info tourmaster-my-profile-info-phone tourmaster-odd clearfix'>
                                            <span className='tourmaster-head'>
                                                Phone
                                            </span>
                                            <span className='tourmaster-tail'>
                                                {user?.number
                                                    ? user?.number
                                                    : '-'}
                                            </span>
                                        </div>
                                        <div className='tourmaster-my-profile-info tourmaster-my-profile-info-contact_address tourmaster-even clearfix'>
                                            <span className='tourmaster-head'>
                                                Contact Address
                                            </span>
                                            <span className='tourmaster-tail'>
                                                {user?.address
                                                    ? user?.address
                                                    : '-'}
                                            </span>
                                        </div>
                                    </div>
                                    {/* End: User Information */}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ================ Start: User Booking List =========== */}
                    <div className='tourmaster-user-content'>
                        <div className='tourmaster-user-content-block tourmaster-dashboard-profile-wrapper'>
                            {/* Start: Title */}
                            <div className='tourmaster-user-content-title-wrap'>
                                <h3 className='tourmaster-user-content-title'>
                                    Booking History
                                </h3>
                            </div>
                            {/* End: Title */}

                            <section>
                                {!isBookingLoading ? (
                                    bookingList.length ? (
                                        <BookingListTable data={bookingList} />
                                    ) : (
                                        'No data found'
                                    )
                                ) : (
                                    <h2>Loading...</h2>
                                )}
                            </section>
                        </div>
                    </div>

                    {/* ================ Start: User Review List =========== */}

                    <div className='tourmaster-user-content'>
                        <div className='tourmaster-user-content-block tourmaster-dashboard-profile-wrapper'>
                            {/* Start: Title */}
                            <div className='tourmaster-user-content-title-wrap'>
                                <h3 className='tourmaster-user-content-title'>
                                    Review History
                                </h3>
                            </div>
                            {/* End: Title */}
                            <section>
                                {!isReviewLoading ? (
                                    reviewList.length ? (
                                        <ReviewListTable data={reviewList} />
                                    ) : (
                                        'No data found'
                                    )
                                ) : (
                                    <h2>Loading...</h2>
                                )}
                            </section>
                        </div>
                    </div>
                </Col>
            </Row>
        </section>
    );
};

export default UserProfile;
