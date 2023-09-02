import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";

function EmailForm(){
    const [isClicked,set] = useState(false)
    const [inputs,setInputs]=useState({
        email:"",
        otp:""
    })
    function handleChange(e){
        const {name,value}=e.target;
        setInputs(values => ({ ...values, [name] : value}))
    }
    function handleSubmit(e){
        console.log(inputs)
        e.preventDefault();
    }
    const navigate=useNavigate();

    function handleGetOtp(event){
        set(true)
        event.preventDefault();
    }
    function handleVerifyOtp(e){
        e.preventDefault();
        //Navigate
        navigate('/customer/registration');
    }
    return <form className='needs-validation'onSubmit={handleSubmit}>
        <div className="form-floating was-validated mb-3">
            <input onChange={handleChange} type="email" name='email' className="form-control" id="floatingInput" placeholder="abc@example.com" value={inputs.email} required/>
            <label for="floatingInput">Email</label>
            <div className='invalid-feedback'>Enter your Email</div>
        </div>
        {isClicked ? <div><div className="form-floating was-validated mb-3">
                                <input onChange={handleChange} type="number" name='otp' className="form-control" id="floatingInput" placeholder="OTP" value={inputs.otp} required/>
                                <label for="floatingInput">OTP</label>
                                <div className='invalid-feedback'>Enter the OTP</div>
                    </div></div>  : null}
        {isClicked ? <button type ='submit' onClick={handleVerifyOtp} className='btn btn-success w-100 mt-2'>Verify OTP</button> : <button type ='submit' onClick={handleGetOtp} className='btn btn-success w-100 mt-2'>Get OTP</button> }
        <div><p>Didn't Receive a OTP?<a href='www.google.com'>Resend OTP</a></p></div>
        
    </form>
}
export default EmailForm;