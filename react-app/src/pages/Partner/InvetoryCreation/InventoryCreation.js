import React from 'react';
import { Navigate } from "react-router-dom";
import './InventoryCreation.css'

function InventoryCreation(){
    function handleclick(){
        //Navigate
    }
    return <div>
        <div className='inventory-creation-wrapper bg-dark d-flex align-items-center justify-content-center w-100'>
            <div className='inventory-creation-login shadow'>
            <h2 className='p-2 mb-3'>Inventory Creation</h2>
            <form className='needs validation' noValidate>

                <div className="form-floating was-validated mb-3">
                    <input type="text" className="form-control" id="floatingInput" placeholder="Warehouse ID" required/>
                    <label for="floatingInput">Warehouse ID</label>
                    <div className='invalid-feedback'>Enter the Warehouse ID</div>
                </div>

                <div className="form-floating was-validated mb-3">
                    <input type="datetime-local" className="form-control" id="floatingInput" required/>
                    <label for="floatingInput">Arrived Date and Time</label>
                    <div className='invalid-feedback'>Enter a Valid Date and Time</div>
                </div>

                <div className="form-floating was-validated mb-3">
                    <input type="text" className="form-control" id="floatingInput" placeholder="Order ID" required/>
                    <label for="floatingInput">Order ID</label>
                    <div className='invalid-feedback'>Enter the Order ID</div>
                </div>

                <div className="form-floating was-validated mb-3">
                    <input type="number" className="form-control" id="floatingInput" placeholder="Batch Number" required/>
                    <label for="floatingInput">Batch Number</label>
                    <div className='invalid-feedback'>Enter the Batch Number</div>
                </div>
                
                <div className="form-floating was-validated mb-3">
                    <input type="number" className="form-control" id="floatingInput" placeholder="Product Units" required/>
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