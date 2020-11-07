import React from 'react';
import { Navbar } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const Header = () => {
  const selectedCountyFips = useSelector((state) => state.mapSlice.selectedCountyFips);
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">{`5C Hacks! Selected FIPS: ${selectedCountyFips}`}</Navbar.Brand>
    </Navbar>
  );
};

export default Header;
