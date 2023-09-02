import React,{useState} from 'react'
import './AdminLogin.css'
import {useNavigate} from 'react-router-dom'
import { FaEye, FaEyeSlash } from "react-icons/fa";

const AdminLogin = () => {
    const [inputs,setInputs]=useState({
        userID:"",
        password:""
    })
    function handleChange(e){
        const {name,value}=e.target;
        setInputs(values => ({ ...values, [name] : value}))
    }
    function handleSubmit(e){
        console.log(inputs)
        e.preventDefault();
    }
    const Navigate=useNavigate();
    const [visible, setVisibility]=useState(false)
    function handleclick(){
        //Navigate
        Navigate('/admin/mainscreen');
    }
    return <div className='wrapper bg-dark d-flex align-items-center justify-content-center w-100'>
        <div className='admin-login shadow'>
        <h2 className='mb-3'>Admin Login</h2>
            <form className='needs-validation'>
                <div className="form-floating was-validated mb-3">
                    <input onChange={handleChange} name='userID' type="text" className="form-control" id="floatingInput" placeholder="User ID" value={inputs.userID} required/>
                    <label for="floatingInput">User ID</label>
                    <div className='invalid-feedback'>Enter your User ID</div>
                </div>
                <div className='input-group mb-3 was-validated'>
                    <div className="form-floating">
                            <input onChange={handleChange} name='password' type={visible ? "text" : "password"} className="form-control" id="floatingPassword" placeholder="Password" value={inputs.password} required/>
                            <label for="floatingPassword">Password</label>
                            <div className='invalid-feedback'>Enter the Password</div>
                    </div>
                    <span className="input-group-text" style={{height:58+"px"}} onClick={()=> setVisibility(visible => !visible)}>{visible ? <FaEyeSlash/> : <FaEye/>}</span>
                </div>
                <button type ='submit' onClick={handleclick} className='btn btn-success w-100 mt-2'>Submit</button>
                <p className='admin-login-p'><a href='www.google.com'>Forgot Password?</a></p>
            </form>
        </div>
    </div>
}

export default AdminLogin