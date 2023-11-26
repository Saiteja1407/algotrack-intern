import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";

function EmailForm(){
    const [isClicked,set] = useState(false)
    const [inputs,setInputs]=useState({
        email:"",
        otp:""
    })
    const navigate=useNavigate();
    function handleChange(e){
        const {name,value}=e.target;
        setInputs(values => ({ ...values, [name] : value}))
    }
    function handleSubmit(e){
        console.log(inputs)
        console.log(isClicked)
        //axios post request


        navigate('/customer/registration');
        e.preventDefault();
    }

    function handleGetOtp(event){
        set(true)
        event.preventDefault();
    }
    
    return <form className='needs-validation'onSubmit={handleSubmit}>
        <div className="form-floating was-validated mb-3">
            <input onChange={handleChange} type="email" name='email' className="form-control" placeholder="abc@example.com" value={inputs.email} required/>
            <label for="floatingInput">Email</label>
            <div className='invalid-feedback'>Enter your Email</div>
        </div>
        {isClicked ? <div><div className="form-floating was-validated mb-3">
                                <input onChange={handleChange} type="number" name='otp' className="form-control" placeholder="OTP" value={inputs.otp} required/>
                                <label for="floatingInput">OTP</label>
                                <div className='invalid-feedback'>Enter the OTP</div>
                    </div></div>  : null}
        {isClicked ? <button type ='submit'  className='btn btn-success w-100 mt-2'>Verify OTP</button> : <button type ='submit' onClick={handleGetOtp} className='btn btn-success w-100 mt-2'>Get OTP</button> }
        <div><p>Didn't Receive a OTP?<a href='www.google.com'>Resend OTP</a></p></div>
        
    </form>
}
export default EmailForm;