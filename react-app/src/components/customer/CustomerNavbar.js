import React from 'react'
import { NavLink,Link } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

const CustomerNavbar = () => {

  return (
    <>
        <nav className="navbar navbar-expand-lg bg-body-secondary mx-5 mt-2 mb-4 rounded">
  <div className="container-fluid">
    <NavLink className='navbar-brand mx-3' to='/customer/mainscreen'>Home</NavLink>


    <div className='d-flex'>
    <h5 className='mt-1 mx-3'>Prudvi sai</h5>  {/* name to be dynamic from data base */}
    <div className='dropdown'>

    <Link className='text-secondary text-center ms-auto'>
      <AccountCircleIcon className='dropdown-toggle' data-bs-toggle="dropdown" aria-expanded="false" fontSize='large'/> 
      <ul className="dropdown-menu dropdown-menu-end me-4">
    <li><Link className="dropdown-item" to="/login/customer/mobile"><LogoutIcon fontSize='small'/> Log out</Link></li>
    <li><Link className="dropdown-item" to="#">Another action</Link></li>
    <li><Link className="dropdown-item" to="#">Something else here</Link></li>
  </ul>    
    </Link>
    </div>
        
    </div>  
      
    </div>
  
</nav>
   

   
    </>
  )
}

export default CustomerNavbar