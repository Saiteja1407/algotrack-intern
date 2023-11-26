import React,{useState} from 'react'
import './AdminLogin.css'
import {useNavigate} from 'react-router-dom'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from 'axios';

const AdminLogin = () => {
    const Navigate=useNavigate();
    const [visible, setVisibility]=useState(false)
    const [inputs,setInputs]=useState({
        adminId:"",
        password:""
    })
    function handleChange(e){
        const {name,value}=e.target;
        setInputs(values => ({ ...values, [name] : value}))
    }
    function handleSubmit(e){
        const postData = async () => {
            try {
              const response = await axios.post(`${process.env.REACT_APP_API}/login/admin`, inputs,{withCredentials:true});
    
              Navigate(`/admin/${response.data.data}/orders/dashboard`);
              return response.data
            } catch (error) {
                console.log(error);
              if(error.request && error.request.status===403){
                alert('you are not registered with us or invalid credentials')
              }
              else if(error.request && error.request.status===402){
                alert('Invalid password')
              }
            }
          };
          postData();
          e.preventDefault();
    }
   
   
    return <div className='wrapper bg-dark d-flex align-items-center justify-content-center w-100'>
        <div className='admin-login shadow'>
        <h2 className='mb-3'>Admin Login</h2>
            <form className='needs-validation' onSubmit={handleSubmit}>
                <div className="form-floating was-validated mb-3">
                    <input onChange={handleChange} name='adminId' type="text" className="form-control" placeholder="User ID" value={inputs.adminId} required/>
                    <label for="floatingInput">User ID</label>
                    <div className='invalid-feedback'>Enter your User ID</div>
                </div>
                <div className='input-group mb-3 was-validated'>
                    <div className="form-floating">
                            <input onChange={handleChange} name='password' type={visible ? "text" : "password"} className="form-control" placeholder="Password" value={inputs.password} required/>
                            <label for="floatingPassword">Password</label>
                            <div className='invalid-feedback'>Enter the Password</div>
                    </div>
                    <span className="input-group-text" style={{height:58+"px"}} onClick={()=> setVisibility(visible => !visible)}>{visible ? <FaEyeSlash/> : <FaEye/>}</span>
                </div>
                <button type ='submit'  className='btn btn-success w-100 mt-2'>Submit</button>
                <p className='admin-login-p'><a href='www.google.com'>Forgot Password?</a></p>
            </form>
        </div>
    </div>
}

export default AdminLogin