import React,{useState} from 'react'
import './PartnerOnboarding.css'
import {useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'

const PartnerOnboarding = () => {
    const {id}=useParams();
    const navigate=useNavigate();
    const [inputs,setInputs]=useState({
        companyName:"",
        spocName:"",
        spocPhoneNumber:"",
        spocEmail:"",
        spocDesignation:"",
        escalationName:"",
        escalationPhoneNumber:"",
        escalationEmail:"",
        escalationDesignation:"",
        partnerID:"",
        password:""
    })
    function handleChange(e){
        const {name,value}=e.target;
        setInputs(values => ({ ...values, [name] : value}))
    }
    async function handleSubmit(e){
       e.preventDefault();
        console.log(inputs)

        
            try {
              const response = await axios.post(`${process.env.REACT_APP_API}/admin/${id}/partneronboarding`, inputs,{withCredentials:true});
              console.log(response.data.data)
              navigate(`/admin/${id}/facilityonboarding/${response.data.data}`);
              return response.data
            } catch (error) {
              throw error;
            }
            
          
    }

    
    return <>
        <div className='partner-onboarding-wrapper bg-light d-flex align-items-center justify-content-center w-100'>
            <div className='partner-onboarding-login shadow'>
            <h2 className='mb-3 pb-2'>Partner Onboarding</h2>
            <form className='needs validation' noValidate onSubmit={handleSubmit}>
                <div className="form-floating was-validated mb-3">
                    <input onChange={handleChange} name='companyName' type="text" className="form-control"  placeholder="Name of the Company" value={inputs.companyName} required/>
                    <label for="floatingInput">Name of the Company</label>
                    <div className='invalid-feedback'>Name of the Company</div>
                </div>
                <div className="form-floating was-validated mb-3">
                    <input onChange={handleChange} name='spocName' type="text" className="form-control"  placeholder="SPOC Name" value={inputs.spocName} required/>
                    <label for="floatingInput">SPOC Name</label>
                    <div className='invalid-feedback'>Enter the SPOC Name</div>
                </div>
                <div className="form-floating was-validated mb-3">
                    <input onChange={handleChange} name='spocPhoneNumber' type="number" className="form-control"  placeholder="XXXXXXXXXX" value={inputs.spocPhoneNumber} required/>
                    <label for="floatingInput">SPOC Phone Number</label>
                    <div className='invalid-feedback'>Enter the SPOC Phone Number</div>
                </div>
                <div className="form-floating was-validated mb-3">
                    <input onChange={handleChange} name='spocEmail' type="email" className="form-control"  placeholder="abc@example.com" value={inputs.spocEmail} required/>
                    <label for="floatingInput">SPOC Email</label>
                    <div className='invalid-feedback'>Enter the SPOC Email</div>
                </div>
                <div className="form-floating was-validated mb-3">
                    <input onChange={handleChange} name='spocDesignation' type="text" className="form-control"  placeholder="SPOC Designation" value={inputs.spocDesignation} required/>
                    <label for="floatingInput">SPOC Designation</label>
                    <div className='invalid-feedback'>Enter the SPOC Designation</div>
                </div>                
                <div className="form-floating was-validated mb-3">
                    <input onChange={handleChange} name='escalationName' type="text" className="form-control"  placeholder="Escalation Name" value={inputs.escalationName} required/>
                    <label for="floatingInput">Escalation Name</label>
                    <div className='invalid-feedback'>Enter the Escalation Name</div>
                </div>
                <div className="form-floating was-validated mb-3">
                    <input onChange={handleChange} name='escalationPhoneNumber' type="number" className="form-control"  placeholder="XXXXXXXXXX" value={inputs.escalationPhoneNumber} required/>
                    <label for="floatingInput">Escalation Phone Number</label>
                    <div className='invalid-feedback'>Enter the Escalation Phone Number</div>
                </div>
                <div className="form-floating was-validated mb-3">
                    <input onChange={handleChange} name='escalationEmail' type="email" className="form-control"  placeholder="abc@example.com" value={inputs.escalationEmail} required/>
                    <label for="floatingInput">Escalation Email</label>
                    <div className='invalid-feedback'>Enter the Escalation Email</div>
                </div>
                <div className="form-floating was-validated mb-3">
                    <input onChange={handleChange} name='escalationDesignation' type="text" className="form-control"  placeholder="Escalation Designation" value={inputs.escalationDesignation} required/>
                    <label for="floatingInput">Escalation Designation</label>
                    <div className='invalid-feedback'>Enter the Escalation Designation</div>
                </div>
                <div className="form-floating was-validated mb-3">
                    <input onChange={handleChange} name='partnerID' type="text" className="form-control"  placeholder="Partner ID" value={inputs.partnerID} required/>
                    <label for="floatingInput">Partner ID</label>
                    <div className='invalid-feedback'>Enter the Partner ID</div>
                </div>
                <div className="form-floating was-validated mb-3">
                    <input onChange={handleChange} name='password' type="password" className="form-control" placeholder="Password" value={inputs.password} required/>
                    <label for="floatingPassword">Password</label>
                    <div className='invalid-feedback'>Enter the Password</div>
                </div>
                <button type ='submit'  className='btn btn-success w-100 mt-2'>Submit</button>
            </form>
            </div>
        </div>
    </>
}

export default PartnerOnboarding;