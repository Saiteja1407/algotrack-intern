import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Header.css';



const Header = () => {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/signup/mobile');
  };

  return (
    <>
    <Navbar expand="lg" className="bg-secondary mx-5 my-2 rounded">
      <Container fluid>
        <Navbar.Brand className='text-white' href="/">Navbar scroll</Navbar.Brand>
        <Navbar.Toggle className='bg-white' aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <NavLink className='mx-3 navlink' activeClassName='active' to="/">Home</NavLink>
            <NavLink className='mx-3 navlink' activeClassName='active' to="/about">About Us</NavLink>
            <NavLink className='mx-3 navlink' activeClassName='active' to="/contact">Contact Us</NavLink>
          </Nav>
            
            <Dropdown className='mx-3 my-1'>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        Log In
      </Dropdown.Toggle>

      <Dropdown.Menu className='rounded'>
      {/* <LinkContainer></LinkContainer> */}
       
        <Dropdown.Item><Link className='navbar-login-link' to='/login/customer/mobile'>Customer</Link></Dropdown.Item>
        <Dropdown.Item><Link className='navbar-login-link' to='/login/partner'>Partner</Link></Dropdown.Item>
        <Dropdown.Item><Link className='navbar-login-link' to='/login/admin'>Admin</Link></Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    <Button onClick={handleSignUpClick} className='ms-3 me-4 my-1' variant="secondary">Sign Up</Button>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

export default Header