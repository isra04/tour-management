import { useState } from 'react';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { Link } from 'react-router-dom';
import './profiledropdown.css';

const ProfileDropdown = ({ userName, logout }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <Dropdown
            isOpen={isOpen}
            toggle={toggleDropdown}
        >
            <DropdownToggle caret>{userName}</DropdownToggle>
            <DropdownMenu dark>
                <Link to='/profile'>
                    <DropdownItem className='dropdown__item'>
                        Profile
                    </DropdownItem>
                </Link>
                <DropdownItem
                    className='dropdown__item'
                    onClick={logout}
                >
                    Logout
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

export default ProfileDropdown;
