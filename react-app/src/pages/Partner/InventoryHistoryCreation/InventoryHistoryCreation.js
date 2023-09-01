import React from 'react';
import { Navigate } from "react-router-dom";
import './InventoryHistoryCreation.css'

function InventoryHistoryCreation(){
    function handleclick(){
        //Navigate
    }
    return <div>
        
        <div className='partner-update-inventory-wrapper bg-dark align-items-center justify-content-center w-100'>
            <div className='row g-3 text-center' id="pui">
                <div className="form-floating mb-3 mx-auto col-6 col-sm-5 col-lg-3">
                    <input type="number" className="form-control" id="floatingInput" placeholder="Total Inventory Units" value="1234"  readOnly/>
                    <label for="floatingInput">Total Inventory Units</label>
                </div>

                <div className="form-floating mb-3 mx-auto col-6 col-sm-5 col-lg-3">
                    <input type="number" className="form-control" id="floatingInput" placeholder="Balance Inventory Units" value="1234"  readOnly/>
                    <label for="floatingInput">Balance Inventory Units</label>
                </div>
            </div>
            <div className='p-u-i-login mx-auto shadow partner-update-inventory'>
            <h2 className='partner-update-inventory-heading mb-3'>Partner Update Inventory </h2>
            <form className='needs validation' noValidate>

                <div className="form-floating was-validated mb-3">
                    <input type="number" className="form-control" id="floatingInput" placeholder="Number of Units to be Dispatched" required/>
                    <label for="floatingInput">Number of Units to be Dispatched</label>
                    <div className='invalid-feedback'>Enter the Number of Units to be Dispatched</div>
                </div>

                <div className="form-floating was-validated mb-3">
                    <input type="datetime-local" className="form-control" id="floatingInput" required/>
                    <label for="floatingInput">Dispatched Date and Time</label>
                    <div className='invalid-feedback'>Enter a Valid Date and Time</div>
                </div>
                
                <button type ='submit' onClick={handleclick} className='btn btn-success w-100 mt-2'>Update Inventory</button>
            </form>
            </div>
        </div>
    </div>
}
export default InventoryHistoryCreation;