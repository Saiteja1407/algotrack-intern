import React, { useEffect, useState } from "react";
import "./CustomerProfile.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";


const CustomerProfile=()=>{
    const [customerData,setCustomerData]=useState([])
    const {id}=useParams();
    const Navigate=useNavigate();
    const [ErrorState,setErrorState]=useState(0);
    
    useEffect(()=>{
        const fetchCustomerData=async()=>{
            try {
                const response=await axios.get(`${process.env.REACT_APP_API}/customer/${id}`,{withCredentials:true});
                console.log(response.data.data);
                setCustomerData(response.data.data);
            } catch (error) {
                if (error.request.status===401){
                    setErrorState(1);
                }
            }
            
        }
       fetchCustomerData();
    },[id])
    if(ErrorState===1){
        Navigate('/unauthorizedpage');
      }
    return(<div className="main ps-5">
        {/* <img className="background" src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/profile-layout-header.jpg" alt="image"/> */}
        <div className="profile1">
            <div className="background"></div>
            <div className="profile2">
                <h3>User Profile</h3>
                <div className="profile3"></div>
            </div>
            <div className="profile4">
                <h5>{(customerData[0]?.customer_name)?.toUpperCase()}</h5><span>{`${customerData[0]?.customer_designation} ,${customerData[0]?.customer_company_name}`}</span>
            </div>
            <div className="profile5">
                <p>Customer Id  :{customerData[0]?.customer_id}</p>
                <p>Company Name :{(customerData[0]?.customer_company_name)}</p>
                <p>Email        :{customerData[0]?.customer_emailid}</p>
                <p>Phone Number :{customerData[0]?.customer_mobile}</p>
            </div>
        </div>
    </div>
    );
};

export default CustomerProfile;