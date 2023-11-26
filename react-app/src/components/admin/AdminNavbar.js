

// // import Button from 'react-bootstrap/Button';
// // import Container from 'react-bootstrap/Container';
// // import Form from 'react-bootstrap/Form';
// // import Nav from 'react-bootstrap/Nav';
// // import Navbar from 'react-bootstrap/Navbar';
// // import NavDropdown from 'react-bootstrap/NavDropdown';
// // import Offcanvas from 'react-bootstrap/Offcanvas';

// // function AdminNavbar() {
// //   return (
// //     <>
// //       {[ 'md'].map((expand) => (
// //         <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3 mx-5 rounded mt-1">
// //           <Container>
// //             <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand>
// //             <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
// //             <Navbar.Offcanvas
// //               id={`offcanvasNavbar-expand-${expand}`}
// //               aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
// //               placement="end"
// //             >
// //               <Offcanvas.Header closeButton>
// //                 <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
// //                   Offcanvas
// //                 </Offcanvas.Title>
// //               </Offcanvas.Header>
// //               <Offcanvas.Body>
// //                 <Nav className="justify-content-end flex-grow-1 pe-3">
// //                   <Nav.Link href="#action1">Home</Nav.Link>
// //                   <Nav.Link href="#action2">Link</Nav.Link>
// //                   <NavDropdown
// //                     title="Dropdown"
// //                     id={`offcanvasNavbarDropdown-expand-${expand}`}
// //                   >
// //                     <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
// //                     <NavDropdown.Item href="#action4">
// //                       Another action
// //                     </NavDropdown.Item>
// //                     <NavDropdown.Divider />
// //                     <NavDropdown.Item href="#action5">
// //                       Something else here
// //                     </NavDropdown.Item>
// //                   </NavDropdown>
// //                 </Nav>
// //                 <Form className="d-flex">
// //                   <Form.Control
// //                     type="search"
// //                     placeholder="Search"
// //                     className="me-2"
// //                     aria-label="Search"
// //                   />
// //                   <Button variant="outline-success">Search</Button>
// //                 </Form>
// //               </Offcanvas.Body>
// //             </Navbar.Offcanvas>
// //           </Container>
// //         </Navbar>
// //       ))}
// //     </>
// //   );
// // }

// // export default AdminNavbar;










// function AdminNavbar(){
//   const [showSidebar,setShowSidebar]=useState(true)
  
//   return(
//     <>
   
//     <div className='containeradmin'>
//       <div className={showSidebar ? 'sidebar':'sidebar active'}>
//         <img src='https://zenprospect-production.s3.amazonaws.com/uploads/pictures/648076c8d776490001bbac7a/picture'  alt='logo'/>
        
//         <p>Admin Account</p>
//         <hr />
//         <ul className='sidebarcontent'>
//           <li>
//           <Link to='' className="link">Manage orders</Link>
//           </li>
//           <li>
//           <Link to='' className="link">Verify New Customers</Link>
//           </li>
//           <li>
//           <Link to='' className="link">Manage Customer</Link> 
//           </li>
//           <li>
//           <Link to='' className="link">Add New Partners</Link> 
//           </li>
//           <li>
//           <Link to='' className="link">Manage Partners</Link>
//           </li>
//         </ul>
//       </div>
//       <div className={showSidebar?"adminrender":"adminrender active"}>
//           <div className="adminheader">
//           <GiHamburgerMenu onClick={()=>setShowSidebar(!showSidebar)}/>
//           </div>
//           <div className="admincontent">
//             <Outlet/>
//           </div>
//       </div>
//     </div> 
//     </>
//   )
// }
// export default AdminNavbar;

// function AdminNavbar(){
//   const [showSidebar,setShowSidebar]=useState(true)
  
//   return(
//     <>
//     <header className="adminheader">
//      <GiHamburgerMenu onClick={()=>setShowSidebar(!showSidebar)}/>
//     </header>
//     <div className='containeradmin'>
//       <div className={showSidebar ? 'sidebar':'sidebar active'}>
//         <img src='https://zenprospect-production.s3.amazonaws.com/uploads/pictures/648076c8d776490001bbac7a/picture'  alt='logo'/>
        
//         <p>Admin Account</p>
//         <hr />
//         <ul className='sidebarcontent'>
//           <li>
//           <Link to='' className="link">Manage orders</Link>
//           </li>
//           <li>
//           <Link to='' className="link">Verify New Customers</Link>
          // </li>
          // <li>
          // <Link to='' className="link">Manage Customer</Link> 
          // </li>
          // <li>
//           <Link to='' className="link">Add New Partners</Link> 
//           </li>
//           <li>
//           <Link to='' className="link">Manage Partners</Link>
//           </li>
//         </ul>
//       </div>
//       <div className={showSidebar?"adminrender":"adminrender active"}>
//          <Outlet/>
//       </div>
//     </div> 
//     </>
//   )
// }
// export default AdminNavbar;

import React, { useState ,useEffect} from "react";
import "./AdminNavbar.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link,Outlet,useParams } from "react-router-dom";




function AdminNavbar(){
  const [showSidebar,setShowSidebar]=useState(true)
  const {id}=useParams();
  useEffect(() => {
    // Check the screen width and set showSidebar accordingly
    const screenWidth = window.innerWidth;
    if (screenWidth <= 768) {
      setShowSidebar(false); // Close the sidebar for mobile devices
    }
  }, []);
  return( 
    <>
   
    <div className='containeradmin'>
      <div className={showSidebar ? 'sidebar':'sidebar active'}>
        <img src='/companyLogo.jpg'  alt='logo'/>
        
        <p>Admin Account</p>
        <hr />
        <ul className='sidebarcontent'>
          <li>
          <Link to={`/admin/${id}/orders/dashboard`} className="link">Manage orders</Link>
          </li>
          <li>
          <Link to={`/admin/${id}/customer/verification`} className="link">Verify New Customers</Link>
          </li>
          <li>
          <Link to={`/admin/${id}/customer/management`} className="link">Manage Customers</Link> 
          </li>
          <li>
          <Link to={`/admin/${id}/partneronboarding`} className="link">Add New Partners</Link> 
          </li>
          <li>
          <Link to={`/admin/${id}/partner/management`} className="link">Manage Partners</Link>
          </li>
          <li>
          <Link to={`/logout`} className="link">Logout</Link>
          </li>
        </ul>
      </div>
      <div className={showSidebar?"adminrender":"adminrender active"}>
          <div className="adminheader">
          <GiHamburgerMenu onClick={()=>setShowSidebar(!showSidebar)}/>
          </div>
          <div className="admincontent">
            <Outlet/>
          </div>
      </div>
    </div> 
    </>
  )
}
export default AdminNavbar;










