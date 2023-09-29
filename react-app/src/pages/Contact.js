import React from 'react'
import 'font-awesome/css/font-awesome.min.css'
import './Contact.css'


const Contact = () => {
  return (
    <footer id="contact" className="anchors">

      <div>
        <div className="colored-opacity">
          <div className="container bg-dark rounded">
            <div className="row">
              <div className="col-md-6 mt-4">
                <h3 className="color ms-2 mb-2">Contact Us</h3>
                  <p className='ms-2'><span className="fa fa-map-marker me-1" ></span> 
                          Algomatix Technology Pvt. Ltd. <br/>
                          518-519, Commodity Exchange Building,<br/> 
                          Sector – 19, Vashi Navi Mumbai – 400705<br/> 
                          Maharashtra, India.
                  </p>
                  <p className='ms-2'><span className="fa fa-envelope me-1" ></span> info@algotrack.in</p>
              </div>
            <div className='col-md-6' id='rightHalf'>
                <p className='ms-2'><span className="fa fa-phone me-1" ></span> +91 8080090394</p>
                <p className='ms-2'><span className="fa fa-phone me-1" ></span> +91 8291867943</p>
                
                
                
                <a className="footer-link link-light" href="https://www.facebook.com/algomatix" ><p className='ms-2'><span className="fa fa-facebook me-1" ></span> @algomatix</p></a>
                <a className="footer-link link-light" href="https://www.linkedin.com/company/algomatix" ><p className='ms-2'><span className="fa fa-linkedin me-1" ></span> @algomatix</p></a>
            </div>
            </div>
          </div>
        </div>
      </div></footer>
  )
}

export default Contact