import React from 'react'
import './AdminLogin.css'
import {useNavigate} from 'react-router-dom'

const AdminLogin = () => {
    const Navigate=useNavigate();
    function handleclick(){
        //Navigate
        Navigate('/admin/mainscreen');
    }
    return <div className='wrapper bg-dark d-flex align-items-center justify-content-center w-100'>
        <div className='admin-login shadow'>
        <h2 className='mb-3'>Admin Login</h2>
            <form className='needs-validation'>
                <div className="form-floating was-validated mb-3">
                    <input type="text" className="form-control" id="floatingInput" placeholder="User ID" required/>
                    <label for="floatingInput">User ID</label>
                    <div className='invalid-feedback'>Enter your User ID</div>
                </div>
                <div className="form-floating was-validated mb-3">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" required/>
                        <label for="floatingPassword">Password</label>
                        <div className='invalid-feedback'>Enter the Password</div>
                </div>
                <button type ='submit' onClick={handleclick} className='btn btn-success w-100 mt-2'>Submit</button>
                <p className='admin-login-p'><a href='www.google.com'>Forgot Password?</a></p>
            </form>
        </div>
    </div>
}

export default AdminLogin