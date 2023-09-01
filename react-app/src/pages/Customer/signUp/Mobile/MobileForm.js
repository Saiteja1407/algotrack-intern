import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";

function MobileForm(){
    const [isClicked,set] = useState(false)
    const navigate=useNavigate();

    function handleGetOtp(event){
        set(true)
        event.preventDefault();
    }
    function handleVerifyOtp(e){
        e.preventDefault();
        //Navigate
        navigate('/signup/email');
    }
    return <form className='needs-validation'>
        <div className="form-floating was-validated mb-3">
            <input type="number" className="form-control" id="floatingInput" placeholder="XXXXXXXXXX" required/>
            <label for="floatingInput">Phone Number</label>
            <div className='invalid-feedback'>Enter your Phone Number</div>
        </div>
        {isClicked ? <div>
                        <div className="form-floating was-validated mb-3">
                            <input type="number" className="form-control" id="floatingInput" placeholder="OTP" required/>
                            <label for="floatingInput">OTP</label>
                        </div>
                        <div className='invalid-feedback'>Enter the OTP</div>
                    </div>  : null}            
        {isClicked ? <button type ='submit' onClick={handleVerifyOtp} className='btn btn-success w-100 mt-2'>Verify OTP</button> : <button type ='submit' onClick={handleGetOtp} className='btn btn-success w-100 mt-2'>Get OTP</button> }
        <div className="mb-2">
            <p className='resend-otp-description'>Didn't Receive an OTP?<a href='www.google.com'>Resend OTP</a></p>
        </div>
        {/*<button type ='submit' onClick={change} className='btn btn-success w-100 mt-2'>{isClicked ? "Submit" : "Get OTP"}</button>*/} 
    </form>
}
export default MobileForm;