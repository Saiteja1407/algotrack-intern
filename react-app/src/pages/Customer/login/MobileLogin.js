import React,{useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { Button, ButtonGroup } from 'react-bootstrap';

const MobileLogin = () => {

  const [isClicked,set] = useState(false)
  const navigate=useNavigate();
  const [inputs,setInputs]=useState({
      phoneNumber:"",
      otp:""
  })
  function handleChange(e){
      const {name,value}=e.target;
      setInputs(values => ({ ...values, [name] : value}))
    }
  function handleSubmit(e){
      
      e.preventDefault();
      //axios post request 
      console.log(inputs);
      console.log(isClicked);
  }


  function handleGetOtp(event){
      set(true)
      console.log(isClicked)
      event.preventDefault();
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

        <form className='needs-validation' onSubmit={handleSubmit}>
        <div className="form-floating was-validated mb-3">
            <input onChange={handleChange} name='phoneNumber' type="number" className="form-control" id="floatingInput" placeholder="XXXXXXXXXX" value={inputs.phoneNumber} required/>
            <label for="floatingInput">Phone Number</label>
            <div className='invalid-feedback'>Enter your Phone Number</div>
        </div>
        {isClicked ? <div>
                        <div className="form-floating was-validated mb-3">
                            <input onChange={handleChange} name='otp' type="number" className="form-control" id="floatingInput" placeholder="OTP" value={inputs.otp} required/>
                            <label for="floatingInput">OTP</label>
                            <div className='invalid-feedback'>Enter the OTP</div>
                        </div>
                    </div>  : null}            
        {isClicked ? <button type ='submit'  className='btn btn-success w-100 mt-2'>Verify OTP</button> : <button type ='submit' onClick={handleGetOtp} className='btn btn-success w-100 mt-2'>Get OTP</button> }
        <div className="mb-2">
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