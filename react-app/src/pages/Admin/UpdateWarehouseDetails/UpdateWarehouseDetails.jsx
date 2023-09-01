import React from 'react';
import { Navigate } from "react-router-dom";
import './UpdateWarehouseDetails.css'

function UpdateWarehouseDetails(){
    const stateoptions=["Ap","TS"]
    const UOMoptions=["Pallets","Tons"];
    function dropDown(option){
        return <option>{option}</option>
    }
    function handleclick(){
        //Navigate
    }
    return <div>
        <div className='update-warehouse-details-wrapper bg-dark d-flex align-items-center justify-content-center w-100'>
            <div className='update-warehouse-details-login shadow'>
            <h2 className='update-warehouse-details-heading mb-3'>Update Warehouse Details</h2>
            <form className='needs validation' noValidate>
                <div>
                    <label className='update-warehouse-details-font-weight form-label'>Facility Location :</label>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" placeholder="Building,Company"/>
                        <label for="floatingInput">Building,Company</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" placeholder="Landmark"/>
                        <label for="floatingInput">Landmark</label>
                    </div>
                    <div className="form-floating was-validated mb-3">
                        <input type="text" className="form-control" id="floatingInput" placeholder="Area,Street,Sector,Village" required/>
                        <label for="floatingInput">Area,Street,Sector,Village</label>
                        <div className='invalid-feedback'>Enter the Area,Street,Sector,Village</div>
                    </div>
                    <div className="form-floating was-validated mb-3">
                        <input type="number" className="form-control" id="floatingInput" placeholder="Pincode" required/>
                        <label for="floatingInput">Pincode</label>
                        <div className='invalid-feedback'>Enter the Pincode</div>
                    </div>
                    <div className="form-floating was-validated mb-3">
                        <input type="number" className="form-control" id="floatingInput" placeholder="Town,City" required/>
                        <label for="floatingInput">Town,City</label>
                        <div className='invalid-feedback'>Enter the Town,City</div>
                    </div>
                    <div className="was-validated mb-3">
                        <select className="form-select form-select-lg" id="validationCustom04" required>
                            <option selected disabled value="">State</option>
                            {stateoptions.map(dropDown)}
                        </select>
                        <div className='invalid-feedback'>Select a valid State</div>
                    </div>
                </div>

                <div className="was-validated mb-3">
                    <select className="form-select form-select-lg" id="validationCustom04" required>
                        <option selected disabled value="">UOM</option>
                        {UOMoptions.map(dropDown)}
                    </select>
                    <div className='invalid-feedback'>Select a valid UOM</div>
                </div>

                <div>
                    <label className='updatewarehousedetailsfont-weight form-label'>Total Capacity :</label>
                    <div className="form-floating was-validated mb-3">
                        <input type="text" className="form-control" id="floatingInput" placeholder="Frozen Capacity" required/>
                        <label for="floatingInput">Frozen Capacity</label>
                        <div className='invalid-feedback'>Enter the Frozen Capacity</div>
                    </div>
                    <div className="form-floating was-validated mb-3">
                        <input type="text" className="form-control" id="floatingInput" placeholder="Chiller Capacity" required/>
                        <label for="floatingInput">Chiller Capacity</label>
                        <div className='invalid-feedback'>Enter the Chiller Capacity</div>
                    </div>
                    <div className="form-floating was-validated mb-3">
                        <input type="text" className="form-control" id="floatingInput" placeholder="Dry Capacity" required/>
                        <label for="floatingInput">Dry Capacity</label>
                        <div className='invalid-feedback'>Enter the Dry Capacity</div>
                    </div>
                </div>

                <div>
                    <label className='updatewarehousedetailsfont-weight form-label'>Available Capacity :</label>
                    <div className="form-floating was-validated mb-3">
                        <input type="text" className="form-control" id="floatingInput" placeholder="Frozen Capacity" required/>
                        <label for="floatingInput">Frozen Capacity</label>
                        <div className='invalid-feedback'>Enter the Frozen Capacity</div>
                    </div>
                    <div className="form-floating was-validated mb-3">
                        <input type="text" className="form-control" id="floatingInput" placeholder="Chiller Capacity" required/>
                        <label for="floatingInput">Chiller Capacity</label>
                        <div className='invalid-feedback'>Enter the Chiller Capacity</div>
                    </div>
                    <div className="form-floating was-validated mb-3">
                        <input type="text" className="form-control" id="floatingInput" placeholder="Dry Capacity" required/>
                        <label for="floatingInput">Dry Capacity</label>
                        <div className='invalid-feedback'>Enter the Dry Capacity</div>
                    </div>
                </div>
                <div className="was-validated mb-3">
                    <label className='updatewarehousedetailsfont-weight form-label'>Facility Images :</label>
                    <input type="file" className="form-control" required/>
                </div>
                <div className="was-validated mb-3">
                    <label className='updatewarehousedetailsfont-weight form-label'>Compliance Documents :</label>
                    <input type="file" className="form-control" required/>
                </div>
                <div className="was-validated mb-3">
                    <label className='updatewarehousedetailsfont-weight form-label'>Contract copy with partner :</label>
                    <input type="file" className="form-control" required/>
                </div>
                <button type ='submit' onClick={handleclick} className='btn btn-success w-100 mt-2'>Submit</button>
            </form>
            </div>
        </div>
    </div>
}
export default UpdateWarehouseDetails;