import React, { useRef, useEffect, useContext } from 'react';
import { Container, Row, Button } from 'reactstrap';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import Gravatar from 'react-gravatar';
import logo from '../../assets/images/logo.png';
import './header.css';
import { AuthContext } from './../../context/AuthContext';
import ProfileDropdown from './ProfileDropdown';

const nav__links = [
    {
        path: '/home',
        display: 'Home'
    },
    {
        path: '/about',
        display: 'About'
    },
    {
        path: '/tours',
        display: 'Tours'
    }
];

const Header = () => {
    const headerRef = useRef(null);
    const menuRef = useRef(null);
    const navigate = useNavigate();
    const { user, dispatch } = useContext(AuthContext);

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/');
    };

    const stickyHeaderFunc = () => {
        window.addEventListener('scroll', () => {
            if (document.body.scrollTop > 80) {
                headerRef.current.classList.add('sticky_header');
            } else {
                headerRef.current.classList.remove('sticky__header');
            }
        });
    };

    useEffect(() => {
        stickyHeaderFunc();

        return window.removeEventListener('scroll', stickyHeaderFunc);
    });

    const toggleMenu = () => menuRef.current.classlist.toggle('show__menu');

    return (
        <header
            className='header'
            ref={headerRef}
        >
            <Container>
                <Row>
                    <div className='nav__wrapper  d-flex align-items-center justify-content-between'>
                        {/* =============logo=============== */}
                        <div className='logo'>
                            <img
                                src={logo}
                                alt=''
                            />
                        </div>
                        {/* =============menu=============== */}
                        <div
                            className='navigation'
                            ref={menuRef}
                            onClick={toggleMenu}
                        >
                            <ul className='menu d-flex align-items-center gap-5'>
                                {nav__links.map((item, index) => (
                                    <li
                                        className='nav__item'
                                        key={index}
                                    >
                                        <NavLink
                                            to={item.path}
                                            className={(navClass) =>
                                                navClass.isActive
                                                    ? 'active__link'
                                                    : ''
                                            }
                                        >
                                            {item.display}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className='nav__right d-flex align-items-center gap-4'>
                            <div className='nav__btns d-flex align-items-center gap-4'>
                                {user ? (
                                    <>
                                        <div className='profile'>
                                            <div className='profile-image'>
                                                <Gravatar email={user.email} />
                                            </div>
                                            <div className='dropdown'>
                                                <ProfileDropdown
                                                    userName={user.username}
                                                    logout={logout}
                                                />
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <Button className='btn primary__btn'>
                                            <Link to='/login'>Login</Link>
                                        </Button>
                                    </>
                                )}
                            </div>

                            <span
                                className='mobile__menu'
                                onClick={toggleMenu}
                            >
                                <i className='ri-menu-line'></i>
                            </span>
                        </div>
                    </div>
                </Row>
            </Container>
        </header>
    );
};

export default Header;
