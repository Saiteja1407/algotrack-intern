import React,{useState} from 'react'
import './PartnerOnboarding.css'
import {useNavigate} from 'react-router-dom'

const PartnerOnboarding = () => {
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
    function handleSubmit(e){
        console.log(inputs)
        e.preventDefault();
    }
    const Navigate=useNavigate();
    function handleclick(){
        //Navigate
        Navigate('/admin/facilityonboarding');
    }
    return <>
        <div className='partner-onboarding-wrapper bg-dark d-flex align-items-center justify-content-center w-100'>
            <div className='partner-onboarding-login shadow'>
            <h2 className='mb-3 pb-2'>Partner Onboarding</h2>
            <form className='needs validation' noValidate onSubmit={handleSubmit}>
                <div className="form-floating was-validated mb-3">
                    <input name='companyName' type="text" className="form-control" id="floatingInput" placeholder="Name of the Company" value={inputs.companyName} required/>
                    <label for="floatingInput">Name of the Company</label>
                    <div className='invalid-feedback'>Name of the Company</div>
                </div>
                <div className="form-floating was-validated mb-3">
                    <input name='spocName' type="text" className="form-control" id="floatingInput" placeholder="SPOC Name" value={inputs.spocName} required/>
                    <label for="floatingInput">SPOC Name</label>
                    <div className='invalid-feedback'>Enter the SPOC Name</div>
                </div>
                <div className="form-floating was-validated mb-3">
                    <input name='spocPhoneNumber' type="number" className="form-control" id="floatingInput" placeholder="XXXXXXXXXX" value={inputs.spocName} required/>
                    <label for="floatingInput">SPOC Phone Number</label>
                    <div className='invalid-feedback'>Enter the SPOC Phone Number</div>
                </div>
                <div className="form-floating was-validated mb-3">
                    <input name='spocEmail' type="email" className="form-control" id="floatingInput" placeholder="abc@example.com" value={inputs.spocEmail} required/>
                    <label for="floatingInput">SPOC Email</label>
                    <div className='invalid-feedback'>Enter the SPOC Email</div>
                </div>
                <div className="form-floating was-validated mb-3">
                    <input name='spocDesignation' type="text" className="form-control" id="floatingInput" placeholder="SPOC Designation" value={inputs.spocDesignation} required/>
                    <label for="floatingInput">SPOC Designation</label>
                    <div className='invalid-feedback'>Enter the SPOC Designation</div>
                </div>                
                <div className="form-floating was-validated mb-3">
                    <input name='escalationName' type="text" className="form-control" id="floatingInput" placeholder="Escalation Name" value={inputs.escalationName} required/>
                    <label for="floatingInput">Escalation Name</label>
                    <div className='invalid-feedback'>Enter the Escalation Name</div>
                </div>
                <div className="form-floating was-validated mb-3">
                    <input name='escalationPhoneNumber' type="number" className="form-control" id="floatingInput" placeholder="XXXXXXXXXX" value={inputs.escalationPhoneNumber} required/>
                    <label for="floatingInput">Escalation Phone Number</label>
                    <div className='invalid-feedback'>Enter the Escalation Phone Number</div>
                </div>
                <div className="form-floating was-validated mb-3">
                    <input name='escalationEmail' type="email" className="form-control" id="floatingInput" placeholder="abc@example.com" value={inputs.escalationEmail} required/>
                    <label for="floatingInput">Escalation Email</label>
                    <div className='invalid-feedback'>Enter the Escalation Email</div>
                </div>
                <div className="form-floating was-validated mb-3">
                    <input name='escalationName' type="text" className="form-control" id="floatingInput" placeholder="Escalation Designation" value={inputs.escalationDesignation} required/>
                    <label for="floatingInput">Escalation Designation</label>
                    <div className='invalid-feedback'>Enter the Escalation Designation</div>
                </div>
                <div className="form-floating was-validated mb-3">
                    <input name='partnerID' type="text" className="form-control" id="floatingInput" placeholder="Partner ID" value={inputs.partnerID} required/>
                    <label for="floatingInput">Partner ID</label>
                    <div className='invalid-feedback'>Enter the Partner ID</div>
                </div>
                <div className="form-floating was-validated mb-3">
                    <input name='password' type="password" className="form-control" id="floatingPassword" placeholder="Password" value={inputs.password} required/>
                    <label for="floatingPassword">Password</label>
                    <div className='invalid-feedback'>Enter the Password</div>
                </div>
                <button type ='submit' onClick={handleclick} className='btn btn-success w-100 mt-2'>Submit</button>
            </form>
            </div>
        </div>
    </>
}

export default PartnerOnboarding;