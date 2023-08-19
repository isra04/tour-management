import React, { useState, useRef, useEffect } from 'react';
import { Input, Dropdown, DropdownMenu, DropdownItem } from 'reactstrap';
import './search-input.css';

function SearchInputWithAutoOpenDropdown({
    cities = [],
    location,
    setLocation
}) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState([]);
    const inputRef = useRef(null);

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setLocation(value);

        // Filter options based on search value
        const filtered = cities.filter((option) =>
            option.toLowerCase().includes(value.toLowerCase())
        );

        setFilteredOptions(filtered);

        if (value) {
            setDropdownOpen(true); // Open the dropdown when there's a search value
        } else {
            setDropdownOpen(false); // Close the dropdown when the search value is empty
        }
    };

    const handleOptionSelect = (option) => {
        setLocation(option);
        setDropdownOpen(false);
    };

    useEffect(() => {
        if (cities.length) {
            setFilteredOptions(cities);
        }
    }, [cities]);

    return (
        <div>
            <Input
                type='text'
                placeholder='Where are you going?'
                className='custom-form__control'
                value={location}
                onChange={handleSearchChange}
                onFocus={() => setDropdownOpen(true)}
                innerRef={inputRef}
            />
            <Dropdown isOpen={dropdownOpen}>
                <DropdownMenu>
                    {filteredOptions.map((option) => (
                        <DropdownItem
                            key={option}
                            onClick={() => handleOptionSelect(option)}
                        >
                            {option}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}

export default SearchInputWithAutoOpenDropdown;
