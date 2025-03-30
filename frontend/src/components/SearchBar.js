import React from 'react';
import PropTypes from 'prop-types';
import { Form, InputGroup } from 'react-bootstrap';

const SearchBar = ({ placeholder, onSearch }) => {
  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <InputGroup className="mb-3">
      <Form.Control
        type="text"
        placeholder={placeholder || 'Search...'}
        onChange={handleChange}
      />
    </InputGroup>
  );
};

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
