import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa"


const EmailLogin = () => {
  const [visible, setVisibility]=useState(false)
  const [inputs,setInputs]=useState({
    email:"",
    password:""
  });
  const navigate=useNavigate();
  

   const handleChange=(e)=>{
       const {name,value}=e.target;
       setInputs(values => ({...values, [name]: value}))
     
   }
   const handleSubmit=(e)=>{
       const postData = async () => {
        try {
          const response = await axios.post(`${process.env.REACT_APP_API}/login/customer/email`, inputs,{withCredentials:true});
          navigate(`/customer/mainscreen/${response.data.data.customerId}`);
          return response.data
        } catch (error) {
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

  return (
    <>
      <div className='wrapper bg-light d-flex align-items-center justify-content-center w-100'>
         
         <div className='login shadow' >
             <h2 className='mb-3' style={{paddingTop:10+'px', paddingBottom:10+'px'}}>Login With Email Id</h2>
             <form className='needs-validation' onSubmit={handleSubmit}> 
               <div className='form-floating was-validated mb-2'>
                      <input type='email' name='email' onChange={handleChange} value={inputs.email} className='form-control' required></input>
                      <label htmlFor='email' className='form-label'>Email Address</label>
                      <div className='invalid-feedback'>
                         Please Enter Your Email 
                      </div>
               </div>
               <div className='input-group mb-2 was-validated'>
                    <div className="form-floating">
                            <input type={visible ? "text" : "password"} name='password' value={inputs.password} onChange={handleChange} className="form-control" placeholder="Password" required/>
                            <label htmlFor="floatingPassword">Password</label>
                            <div className='invalid-feedback'>Enter the Password</div>
                    </div>
                    <span className="input-group-text" style={{height:58+"px"}} onClick={()=> setVisibility(visible => !visible)}>{visible ? <FaEyeSlash/> : <FaEye/>}</span>
               </div>
               <p style={{textAlign:"center"}}><a href='/'>Forgot your Password?</a></p>
               <button type='submit' className='btn btn-success w-100 mt-2'>Login</button>
             </form>
             
         </div>
        
     </div>
    </>
  )
}

export default EmailLogin;