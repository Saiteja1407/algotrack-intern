import React,{useState} from 'react';
import {useLocation, useNavigate, useParams } from "react-router-dom";
import './InventoryCreation.css';
import axios from 'axios';

function InventoryCreation(){
    const {id,orderId}=useParams();
    const Navigate=useNavigate();
    const location=useLocation();
    const {remainingSpace}=location.state;
    console.log(remainingspace);
    const [inputs,setInputs]=useState({
        // warehouseID:"",
        arrivedDateTime:"",
        // orderID:"",
        batchNumber:"",
        productUnits:""
    })
    function handleChange(e){
        const {name,value}=e.target;
        setInputs(values => ({ ...values, [name] : value}))
    }
    function handleSubmit(e){
        console.log(inputs)
        e.preventDefault();
    }
    const orderData={
        orderId:orderId
    }
    function handleclick(){
        if (inputs.productUnits<=remainingspace){
            const requestData = { ...inputs, ...orderData };
            console.log(requestData);
            const postData = async () => {
                try {
                  const response = await axios.post(`${process.env.REACT_APP_API}/partner/${id}/inventory/creation/${orderId}`,requestData,{withCredentials:true});
                  Navigate(`/partner/${id}/inventory/dashboard/${orderId}`)
                  return response.data
                } catch (error) {
                    throw(error);
                }
              };
              postData();
        }
       else{
        alert(`your dont have enough space to create an inventory`)
       }
    }
    return <div>
        <div className='inventory-creation-wrapper bg-dark d-flex align-items-center justify-content-center w-100'>
            <div className='inventory-creation-login shadow'>
            <h2 className='p-2 mb-3'>Inventory Creation</h2>
            <form className='needs validation' noValidate onSubmit={handleSubmit}>

                {/* <div className="form-floating was-validated mb-3">
                    <input onChange={handleChange} name='warehouseID' type="text" className="form-control" placeholder="Warehouse ID" value={inputs.warehouseID} required/>
                    <label for="floatingInput">Warehouse ID</label>
                    <div className='invalid-feedback'>Enter the Warehouse ID</div>
                </div> */}
                <div className="form-floating was-validated mb-3">
                    <input onChange={handleChange} name='orderID' type="text" className="form-control" placeholder="Order ID" value={orderId} required disabled readOnly/>
                    <label for="floatingInput">Order ID</label>
                    {/* <div className='invalid-feedback'>Enter the Order ID</div> */}
                </div>

                <div className="form-floating was-validated mb-3">
                    <input onChange={handleChange} name='arrivedDateTime' type="datetime-local" className="form-control" value={inputs.arrivedDateTime} required />
                    <label for="floatingInput">Arrived Date and Time</label>
                    <div className='invalid-feedback'>Enter a Valid Date and Time</div>
                </div>

                <div className="form-floating was-validated mb-3">
                    <input onChange={handleChange} name='batchNumber' type="number" className="form-control" placeholder="Batch Number" value={inputs.batchNumber} required/>
                    <label for="floatingInput">Batch Number</label>
                    <div className='invalid-feedback'>Enter the Batch Number</div>
                </div>
                
                <div className="form-floating was-validated mb-3">
                    <input onChange={handleChange} name='productUnits' type="number" className="form-control" placeholder="Product Units" value={inputs.productUnits} required/>
                    <label for="floatingInput">Product Units</label>
                    <div className='invalid-feedback'>Enter the Product Units</div>
                </div>
                
                <button type ='submit' onClick={handleclick} className='btn btn-success w-100 mt-2'>Submit</button>
            </form>
            </div>
        </div>
    </div>
}
export default InventoryCreation;