// import React from 'react'
// import { NavLink,Link } from 'react-router-dom'
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import LogoutIcon from '@mui/icons-material/Logout';

// const AdminNavbar = () => {

//   return (
//     <>
//         {/* <nav className="navbar navbar-expand-lg bg-body-secondary mx-5 mt-2 mb-4 rounded">
//   <div className="container-fluid">
//     <NavLink className='navbar-brand mx-3' to='/admin/mainscreen'>Home</NavLink>


//     <div className='d-flex'>
//     <h5 className='mt-1 mx-3'>Prudvi sai</h5>  {/* name to be dynamic from data base */}
//     {/* <div className='dropdown'>

//     <Link className='text-secondary text-center ms-auto'>
//       <AccountCircleIcon className='dropdown-toggle' data-bs-toggle="dropdown" aria-expanded="false" fontSize='large'/> 
//       <ul className="dropdown-menu dropdown-menu-end me-4">
//     <li><Link className="dropdown-item" to="/login/admin"><LogoutIcon fontSize='small'/> Log out</Link></li>
//     <li><Link className="dropdown-item" to="#">Another action</Link></li>
//     <li><Link className="dropdown-item" to="#">Something else here</Link></li>
//   </ul>    
//     </Link>
//     </div>
        
//     </div>  
      
//     </div>
  
// </nav> */} 

//     </>
//   )
// }

// export default AdminNavbar

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

function AdminNavbar() {
  return (
    <>
      {[ 'md'].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3 mx-5 rounded mt-1">
          <Container>
            <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="#action1">Home</Nav.Link>
                  <Nav.Link href="#action2">Link</Nav.Link>
                  <NavDropdown
                    title="Dropdown"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default AdminNavbar;