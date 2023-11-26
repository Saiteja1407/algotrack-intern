import React from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
const Unauthorized=()=>{
    const navigate=useNavigate();
    const handleClick=()=>{
        navigate(`/login/customer/mobile`)
    }
    return(
        <div className="flex" style={{marginTop:'28%'}}>
            <h1 className="text-center" style={{fontSize:'4rem'}}>Unauthorized Login</h1>
            <a className="" style={{marginLeft:'45%'}} onClick={()=>handleClick()} href="">Click Here to Login</a>
        </div>
    )
}

export default Unauthorized;