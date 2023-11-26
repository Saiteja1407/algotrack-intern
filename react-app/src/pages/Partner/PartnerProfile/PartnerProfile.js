import React, { useEffect, useState } from "react";
import "./PartnerProfile.css"
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const PartnerProfile=()=>{
    const [partnerData,setPartnerData]=useState([])
    const {id}=useParams();
    const Navigate=useNavigate();
    const [ErrorState,setErrorState]=useState(0);
  
    
    useEffect(()=>{
        const fetchCustomerData=async()=>{
            try {
                const response=await axios.get(`${process.env.REACT_APP_API}/partner/${id}`,{withCredentials:true});
                setPartnerData(response.data.data);
            } catch (error) {
                console.log(error)
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
    return(<div className="main1 ps-5">
        {/* <img className="background" src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/profile-layout-header.jpg" alt="image"/> */}
        <div className="profile1-1">
            <div className="background1"></div>
            <div className="profile2-1">
                <h3>User Profile</h3>
                <div className="profile3-1"></div>
            </div>
            <div className="profile4-1">
                <h5>{(partnerData[0]?.esc_name)?.toUpperCase()}</h5><span>{`${partnerData[0]?.spoc_designation} ,${partnerData[0]?.patner_company_name}`}</span>
            </div>
            <div className="profile5-1">
                <p>Partner Id   :{partnerData[0]?.partner_id}</p>
                <p>Company Name :{partnerData[0]?.partner_company_name}</p>
                <p>Escalation Name :{partnerData[0]?.esc_name}</p>
                <p>Escalation Phone Number :{partnerData[0]?.esc_mobile}</p>
                <p>Escalation Email :{partnerData[0]?.esc_emailid}</p>
                <p>Escalation Designation :{partnerData[0]?.esc_designation}</p>
                <p>SPOC Name  :{partnerData[0]?.spoc_name}</p>
                <p>SPOC Phone Number :{partnerData[0]?.spoc_mobile}</p>
                <p>SPOC Email :{partnerData[0]?.spoc_emailid}</p>
                <p>SPOC Designation :{partnerData[0]?.spoc_designation}</p>
            </div>
        </div>
    </div>
    );
};

export default PartnerProfile;