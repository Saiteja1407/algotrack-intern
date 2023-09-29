import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";

function MobileForm(){
    const [isClicked,set] = useState(false)
    const [inputs,setInputs]=useState({
        phoneNumber:"",
        otp:""
    })
    const navigate=useNavigate();
    function handleChange(e){
        const {name,value}=e.target;
        setInputs(values => ({ ...values, [name] : value}))
    }
    function handleSubmit(e){
        //axios post request
        const number=inputs.phoneNumber;
        navigate('/signup/email');
        e.preventDefault();
    }


    function handleGetOtp(event){
        set(true)
        console.log(isClicked);
        event.preventDefault();
    }
    
    return <form className='needs-validation' onSubmit={handleSubmit}>
        <div className="form-floating was-validated mb-3">
            <input onChange={handleChange} type="number" name="phoneNumber" className="form-control"  placeholder="XXXXXXXXXX" value={inputs.phoneNumber} required/>
            <label for="floatingInput">Phone Number</label>
            <div className='invalid-feedback'>Enter your Phone Number</div>
        </div>
        {isClicked ? <div>
                        <div className="form-floating was-validated mb-3">
                            <input onChange={handleChange} type="number" name="otp" className="form-control"  placeholder="OTP" value={inputs.otp} required/>
                            <label for="floatingInput">OTP</label>
                            <div className='invalid-feedback'>Enter the OTP</div>
                        </div>
                    </div>  : null}            
        {isClicked ? <button type ='submit'  className='btn btn-success w-100 mt-2'>Verify OTP</button> : <button type ='submit' onClick={handleGetOtp} className='btn btn-success w-100 mt-2'>Get OTP</button> }
        <div className="mb-2">
            <p className='resend-otp-description'>Didn't Receive an OTP?<a href='www.google.com'>Resend OTP</a></p>
        </div>
         
    </form>
}
export default MobileForm;