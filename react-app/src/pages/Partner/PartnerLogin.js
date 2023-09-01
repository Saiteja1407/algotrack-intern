import React,{useState} from 'react'
import './PartnerLogin.css'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'


const PartnerLogin = () => {
    const Navigate=useNavigate();
    const [inputs,setInputs]=useState({
        partnerId:"",
        password:""
      });

    const handleChange=(e)=>{
        const {name,value}=e.target; 
        setInputs(values => ({...values, [name]: value}))
      
    }
    const handleSubmit=(e)=>{
        const postData = async () => {
         try {
           const response = await axios.post(`${process.env.REACT_APP_API}/login/partner`, inputs);
           Navigate(`/customer/mainscreen/${response.data.data}`);
           
           return response.data
         } catch (error) {
           throw error;
         }
       };
       postData();
       e.preventDefault();
    }
 
    
    return <div className='wrapper bg-dark d-flex align-items-center justify-content-center w-100'>
        <div className='partner-login shadow'>
        <h2 className='mb-3'>Partner Login</h2>
            <form className='needs-validation' onSubmit={handleSubmit}>
                <div className="form-floating was-validated mb-3">
                    <input type="text" className="form-control" name='partnerId' onChange={handleChange} value={inputs.partnerId} id="floatingInput" placeholder="User ID" required/>
                    <label for="floatingInput">User ID</label>
                    <div className='invalid-feedback'>Enter your User ID</div>
                </div>
                <div className="form-floating was-validated mb-3">
                        <input type="password" name='password' onChange={handleChange} value={inputs.email} className="form-control" id="floatingPassword" placeholder="Password" required/>
                        <label for="floatingPassword">Password</label>
                        <div className='invalid-feedback'>Enter the Password</div>
                </div>
                <button type ='submit'  className='btn btn-success w-100 mt-2'>Submit</button>
                <p className='partner-login-p'><a href='www.google.com'>Forgot Password?</a></p>
            </form>
        </div>
    </div>
}

export default PartnerLogin