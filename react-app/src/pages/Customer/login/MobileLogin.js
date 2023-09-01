import React,{useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { Button, ButtonGroup } from 'react-bootstrap';

const MobileLogin = () => {

  const [isClicked,set] = useState(false)
  const navigate=useNavigate();

  function handleGetOtp(event){
      set(true)
      event.preventDefault();
  }
  function handleVerifyOtp(e){
      e.preventDefault();
      //Navigate
      navigate('/customer/mainscreen');
  }

  return (
    <>
      <div className='wrapper d-flex align-items-center justify-content-center'>
      <div className='login shadow'>
        <ButtonGroup className='mb-3' >
          <Link to="/login/customer/mobile">
            <Button variant="dark" className="mx-1 p-1">Login with mobile number</Button>
          </Link>
          <Link to="/login/customer/email">
            <Button variant="secondary" className="mx-1 p-1">Login with Email id</Button>
          </Link>
        </ButtonGroup>

        <form className='needs-validation'>
        <div class="form-floating was-validated mb-3">
            <input type="number" class="form-control" id="floatingInput" placeholder="XXXXXXXXXX" required/>
            <label for="floatingInput">Phone Number</label>
            <div className='invalid-feedback'>Enter your Phone Number</div>
        </div>
        {isClicked ? <div>
                        <div class="form-floating was-validated mb-3">
                            <input type="number" class="form-control" id="floatingInput" placeholder="OTP" required/>
                            <label for="floatingInput">OTP</label>
                        </div>
                        <div className='invalid-feedback'>Enter the OTP</div>
                    </div>  : null}            
        {isClicked ? <button type ='submit' onClick={handleVerifyOtp} className='btn btn-success w-100 mt-2'>Verify OTP</button> : <button type ='submit' onClick={handleGetOtp} className='btn btn-success w-100 mt-2'>Get OTP</button> }
        <div class="mb-2">
            <p className='resend-otp-description'>Didn't Receive an OTP?<a href='www.google.com'>Resend OTP</a></p>
        </div>
        {/*<button type ='submit' onClick={change} className='btn btn-success w-100 mt-2'>{isClicked ? "Submit" : "Get OTP"}</button>*/} 
    </form>
    </div>
    </div>
    </>
  )
}

export default MobileLogin