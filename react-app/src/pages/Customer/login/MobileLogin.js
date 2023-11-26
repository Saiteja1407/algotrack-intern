import React,{useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';

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

  const handleLoginEmail=()=>{
    navigate(`/login/customer/email`)
  }

  const handleSignup=()=>{
    navigate(`/signup/mobile`)
  }

  return (
    <>
      <div className='wrapper d-flex align-items-center justify-content-center'>
      <div className='login shadow'>

        <form className='needs-validation' onSubmit={handleSubmit}>
          <h3 className='mb-3' style={{paddingTop:10+'px', paddingBottom:10+'px'}}>Login With Phone Number</h3>
          <div className="form-floating was-validated mb-3">
              <input onChange={handleChange} name='phoneNumber' type="number" className="form-control" placeholder="XXXXXXXXXX" value={inputs.phoneNumber} required/>
              <label for="floatingInput">Phone Number</label>
              <div className='invalid-feedback'>Enter your Phone Number</div>
          </div>
          {isClicked ? <div>
                          <div className="form-floating was-validated mb-3">
                              <input onChange={handleChange} name='otp' type="number" className="form-control" placeholder="OTP" value={inputs.otp} required/>
                              <label for="floatingInput">OTP</label>
                              <div className='invalid-feedback'>Enter the OTP</div>
                          </div>
                      </div>  : null}            
          {isClicked ? <button type ='submit' className='btn btn-success w-100 mt-2'>Verify OTP</button> : <button type ='submit' onClick={handleGetOtp} className='btn btn-success w-100 mt-2'>Get OTP</button> }
          <div className="mb-2">
              <p className='resend-otp-description'>Didn't Receive an OTP?<a href='www.google.com'>Resend OTP</a></p>
          </div>
          {/*<button type ='submit' onClick={change} className='btn btn-success w-100 mt-2'>{isClicked ? "Submit" : "Get OTP"}</button>*/}
          <a href='' onClick={()=>{handleLoginEmail()}} className='text-center'><p>Login with Email Id</p></a>
          <a href='' onClick={()=>{handleSignup()}} className='text-center'><p>New Customer?,Signup</p></a>
        </form>
    </div>
    </div>
    </>
  )
}

export default MobileLogin