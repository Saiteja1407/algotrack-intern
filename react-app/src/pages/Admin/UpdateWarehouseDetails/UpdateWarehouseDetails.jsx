import React,{useState,useEffect} from 'react';
import { Navigate, useParams,useNavigate, useLocation } from "react-router-dom";
import './UpdateWarehouseDetails.css';
import axios from 'axios';

function UpdateWarehouseDetails(){
   const {id,warehouseId}=useParams();
   const location=useLocation();
   const {data}=location.state;
  const navigate=useNavigate();

  const fetchWarehouseDetails=async()=>{
    const response= await axios.get(`${process.env.REACT_APP_API}/admin/${id}/updatewarehouse/${warehouseId}`);
    
    console.log(response.data.data);
 }

 useEffect(()=>{
    console.log(data);
   //fetchWarehouseDetails();
 },[])


    const [inputs,setInputs]=useState({
        location1:"",
        landmark:"",
        area:data[0].street,
        pincode:data[0].pincode,
        city:data[0].city,
        state:data[0].state,
        UOM:data[0].warehouse_UOM       ,
        totalFrozenCapacity:data[0].total_frozen_capacity        ,
        totalChillerCapacity:data[0].total_chiller_capacity,
        totalDryCapacity:data[0].total_dry_capacity        ,
        availableFrozenCapacity:data[0].available_frozen_capacity        ,
        availableChillerCapacity:data[0].available_chiller_capacity        ,
        availableDryCapacity:data[0].available_dry_capacity        ,
        facilityImages:"",
        complianceDocuments:"",
        contractCopy:""
    })
    function handleChange(e){
        const {name,value}=e.target;
        setInputs(values => ({ ...values, [name] : value}))
    }
    async function handleSubmit(e){
        e.preventDefault();
        console.log(inputs)
        const response= await axios.post(`${process.env.REACT_APP_API}/admin/${id}/updateWarehouse/${warehouseId}`,inputs);
        console.log(response);

    }
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
            <form className='needs validation' noValidate onSubmit={handleSubmit}>
                <div>
                    <label className='update-warehouse-details-font-weight form-label'>Facility Location :</label>
                    <div className="form-floating mb-3">
                        <input onChange={handleChange} name='location1' type="text" className="form-control" id="floatingInput" placeholder="Building,Company" value={inputs.location1}/>
                        <label for="floatingInput">Building,Company</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleChange} name='landmark' type="text" className="form-control" id="floatingInput" placeholder="Landmark" value={inputs.landmark}/>
                        <label for="floatingInput">Landmark</label>
                    </div>
                    <div className="form-floating was-validated mb-3">
                        <input onChange={handleChange} name='area' type="text" className="form-control" id="floatingInput" placeholder="Area,Street,Sector,Village" value={inputs.area} required/>
                        <label for="floatingInput">Area,Street,Sector,Village</label>
                        <div className='invalid-feedback'>Enter the Area,Street,Sector,Village</div>
                    </div>
                    <div className="form-floating was-validated mb-3">
                        <input onChange={handleChange} name='pincode' type="number" className="form-control" id="floatingInput" placeholder="Pincode" value={inputs.pincode} required/>
                        <label for="floatingInput">Pincode</label>
                        <div className='invalid-feedback'>Enter the Pincode</div>
                    </div>
                    <div className="form-floating was-validated mb-3">
                        <input onChange={handleChange} name='city' type="number" className="form-control" id="floatingInput" placeholder="Town,City" value={inputs.city} required/>
                        <label for="floatingInput">Town,City</label>
                        <div className='invalid-feedback'>Enter the Town,City</div>
                    </div>
                    <div className="form-floating was-validated mb-3">
                        <select onChange={handleChange} name='state' className="form-select" id="validationCustom04" value={inputs.state} required>
                            <option selected disabled value="">Select the State</option>
                            {stateoptions.map(dropDown)}
                        </select>
                        <label for="floatingSelect">State</label>
                        <div className='invalid-feedback'>Select a valid State</div>
                    </div>
                </div>

                <div className="form-floating was-validated mb-3">
                    <select onChange={handleChange} name='UOM' className="form-select" id="validationCustom04" required>
                        <option selected disabled value="">Select the UOM</option>
                        {UOMoptions.map(dropDown)}
                    </select>
                    <label for="floatingSelect">UOM</label>
                    <div className='invalid-feedback'>Select a valid UOM</div>
                </div>

                <div>
                    <label className='updatewarehousedetailsfont-weight form-label'>Total Capacity :</label>
                    <div className="form-floating was-validated mb-3">
                        <input onChange={handleChange} name='totalFrozenCapacity' type="text" className="form-control" id="floatingInput" placeholder="Frozen Capacity" value={inputs.totalFrozenCapacity} required/>
                        <label for="floatingInput">Frozen Capacity</label>
                        <div className='invalid-feedback'>Enter the Frozen Capacity</div>
                    </div>
                    <div className="form-floating was-validated mb-3">
                        <input onChange={handleChange} name='totalChillerCapacity' type="text" className="form-control" id="floatingInput" placeholder="Chiller Capacity" value={inputs.totalChillerCapacity} required/>
                        <label for="floatingInput">Chiller Capacity</label>
                        <div className='invalid-feedback'>Enter the Chiller Capacity</div>
                    </div>
                    <div className="form-floating was-validated mb-3">
                        <input onChange={handleChange} name='totalDryCapacity' type="text" className="form-control" id="floatingInput" placeholder="Dry Capacity" value={inputs.totalDryCapacity} required/>
                        <label for="floatingInput">Dry Capacity</label>
                        <div className='invalid-feedback'>Enter the Dry Capacity</div>
                    </div>
                </div>

                <div>
                    <label className='updatewarehousedetailsfont-weight form-label'>Available Capacity :</label>
                    <div className="form-floating was-validated mb-3">
                        <input onChange={handleChange} name='availableFrozenCapacity' type="text" className="form-control" id="floatingInput" placeholder="Frozen Capacity" value={inputs.availableFrozenCapacity} required/>
                        <label for="floatingInput">Frozen Capacity</label>
                        <div className='invalid-feedback'>Enter the Frozen Capacity</div>
                    </div>
                    <div className="form-floating was-validated mb-3">
                        <input onChange={handleChange} name='availableChillerCapacity' type="text" className="form-control" id="floatingInput" placeholder="Chiller Capacity" value={inputs.availableChillerCapacity} required/>
                        <label for="floatingInput">Chiller Capacity</label>
                        <div className='invalid-feedback'>Enter the Chiller Capacity</div>
                    </div>
                    <div className="form-floating was-validated mb-3">
                        <input onChange={handleChange} name='availableDryCapacity' type="text" className="form-control" id="floatingInput" placeholder="Dry Capacity" value={inputs.availableDryCapacity} required/>
                        <label for="floatingInput">Dry Capacity</label>
                        <div className='invalid-feedback'>Enter the Dry Capacity</div>
                    </div>
                </div>
                <div className="was-validated mb-3">
                    <label className='updatewarehousedetailsfont-weight form-label'>Facility Images :</label>
                    <input onChange={handleChange} name='facilityImages' type="file" className="form-control" value={inputs.facilityImages} required/>
                </div>
                <div className="was-validated mb-3">
                    <label className='updatewarehousedetailsfont-weight form-label'>Compliance Documents :</label>
                    <input onChange={handleChange} name='complianceDocuments' type="file" className="form-control" value={inputs.complianceDocuments} required/>
                </div>
                <div className="was-validated mb-3">
                    <label className='updatewarehousedetailsfont-weight form-label'>Contract copy with partner :</label>
                    <input onChange={handleChange} name='contractCopy' type="file" className="form-control" value={inputs.contractCopy} required/>
                </div>
                <button type ='submit' onClick={handleclick} className='btn btn-success w-100 mt-2'>Submit</button>
            </form>
            </div>
        </div>
    </div>
}
export default UpdateWarehouseDetails;