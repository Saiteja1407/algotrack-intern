import React from 'react'
import '../../App.css';
import { Link, useParams} from 'react-router-dom';

const CustomerFooter = () => {
    const year=new Date()
    const {id}=useParams();
  return (
    <><footer>
    <div className='footer-second'>
        <div className="subfooter">
          <h4 className="headingtype"> Company</h4>
          <Link className='custom-link' to={`/customer/mainscreen/${id}`}>Main Screen</Link>
          <Link className='custom-link' to='/about'>About Us</Link>
          <Link className='custom-link' to='/contact'>Contact Us</Link>
        </div>

        <div className="subfooter">
        <h4 className="headingtype"> Follow US</h4>
        <Link className='custom-link' to='/'>Instagram</Link>
        <Link className='custom-link' to='/contact'>Twitter</Link>
        <Link className='custom-link' to='/about'>Facebook</Link>
        <Link className='custom-link' to='/about'>Linked In</Link>
        </div>
        
        <div className="subfooter">
        <h4 className="headingtype">Legal</h4>
          <Link className='custom-link' to='/contact'>Privacy Policy</Link>
        <Link className='custom-link' to='/about'>Licensing</Link>
        <Link className='custom-link' to='/about'>Terms & Conditions</Link>
          
          
        </div>
  </div>
    <div className='footer-main'>
      <p>all rights reserved © {year.getFullYear()} Reefer_ON</p>
    </div>
   </footer>

</>
  )
}

export default CustomerFooter