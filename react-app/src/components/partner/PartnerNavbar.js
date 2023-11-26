import React from 'react'
import { NavLink,Link, useParams } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

const PartnerNavbar = () => {
  const {id}=useParams();
  
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary mx-5 mt-2 mb-4 rounded">
      <div className="container-fluid">
        <NavLink className='navbar-brand mx-3' to={`/partner/mainscreen/${id}`}>Home</NavLink>
    
    
        <div className='d-flex'>
        <h5 className='mt-1 mx-3'></h5>  {/* name to be dynamic from data base */}
        <div className='dropdown'>
    
        <div className='profile-icon-partner text-secondary text-center ms-auto'>
          <AccountCircleIcon className='dropdown-toggle' data-bs-toggle="dropdown" aria-expanded="false" fontSize='large'/> 
          <ul className="dropdown-menu dropdown-menu-end me-4">
        <li><Link className="dropdown-item" to={`/partner/${id}`}>profile</Link></li>
        <li><Link className="dropdown-item" to="/logout"><LogoutIcon fontSize='small'/> Log out</Link></li>
      </ul>    
        </div>
        </div>
            
        </div>  
          
        </div>
      
    </nav>
        </>
      )
}

export default PartnerNavbar;