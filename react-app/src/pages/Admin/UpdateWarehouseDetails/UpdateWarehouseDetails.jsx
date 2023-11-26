import React,{useState,useEffect} from 'react';
import { Navigate, useParams,useNavigate, useLocation } from "react-router-dom";
import './UpdateWarehouseDetails.css';
import axios from 'axios';

function UpdateWarehouseDetails(){
   const {id,warehouseId}=useParams();
   const location=useLocation();
   const {data,partnerId}=location.state;
  const navigate=useNavigate();

//   const fetchWarehouseDetails=async()=>{
//     const response= await axios.get(`${process.env.REACT_APP_API}/admin/${id}/updatewarehouse/${warehouseId}`);
    
//     console.log(response.data.data);
//  }

//  useEffect(()=>{
//     console.log(data);
//    //fetchWarehouseDetails();
//  },[])


    const [inputs,setInputs]=useState({
        warehouseName:data[0].warehouse_name,
        location1:"",
        landmark:"",
        area:data[0].street,
        pincode:data[0].pincode,
        city:data[0].city,
        state:data[0].state,
        UOM:data[0].warehouse_UOM ,
        totalFrozenCapacity:data[0].total_frozen_capacity        ,
        totalChillerCapacity:data[0].total_chiller_capacity,
        totalDryCapacity:data[0].total_dry_capacity        ,
        availableFrozenCapacity:data[0].available_frozen_capacity        ,
        availableChillerCapacity:data[0].available_chiller_capacity        ,
        availableDryCapacity:data[0].available_dry_capacity        ,
        chillerPrice:data[0].warehouse_price_chiller        ,
        frozenPrice:data[0].warehouse_price_frozen,
        dryPrice:data[0].warehouse_price_dry,
        facilityImages1:null,
        facilityImages2:null,
        facilityImages3:null,
        complianceDocuments:null
    })
        
    function handleChange(e){
        const {name,value}=e.target;
        setInputs(values => ({ ...values, [name] : value}))
    }
    async function handleSubmit(e){
        e.preventDefault();
        console.log(inputs)
        const response= await axios.post(`${process.env.REACT_APP_API}/admin/${id}/updateWarehouse/${warehouseId}`,inputs,{withCredentials:true,headers: {
            'Content-Type': 'multipart/form-data',
          },});
        console.log(response);
        navigate(`/admin/${id}/${partnerId}/warehouse/${warehouseId}/details`)

    }
    const stateoptions=[ "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttarakhand",
    "Uttar Pradesh",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Lakshadweep",
    "Puducherry"]
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
                    <label className='update-warehouse-details-font-weight form-label'>Warehouse Name :</label>
                    <div className="form-floating was-validated mb-3">
                        <input onChange={handleChange} name='warehouseName' type="text" className="form-control" placeholder="Warehouse Name" value={inputs.warehouseName} required/>
                        <label for="floatingInput">Warehouse Name</label>
                        <div className='invalid-feedback'>Enter the Warehouse Name</div>
                    </div>
                </div>
                <div>
                    <label className='update-warehouse-details-font-weight form-label'>Facility Location :</label>
                    <div className="form-floating mb-3">
                        <input onChange={handleChange} name='location1' type="text" className="form-control" placeholder="Building,Company" value={inputs.location1}/>
                        <label for="floatingInput">Building,Company</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleChange} name='landmark' type="text" className="form-control" placeholder="Landmark" value={inputs.landmark}/>
                        <label for="floatingInput">Landmark</label>
                    </div>
                    <div className="form-floating was-validated mb-3">
                        <input onChange={handleChange} name='area' type="text" className="form-control" placeholder="Area,Street,Sector,Village" value={inputs.area} required/>
                        <label for="floatingInput">Area,Street,Sector,Village</label>
                        <div className='invalid-feedback'>Enter the Area,Street,Sector,Village</div>
                    </div>
                    <div className="form-floating was-validated mb-3">
                        <input onChange={handleChange} name='pincode' type="number" className="form-control" placeholder="Pincode" value={inputs.pincode} required/>
                        <label for="floatingInput">Pincode</label>
                        <div className='invalid-feedback'>Enter the Pincode</div>
                    </div>
                    <div className="form-floating was-validated mb-3">
                        <input onChange={handleChange} name='city' type="text" className="form-control" placeholder="Town,City" value={inputs.city} required/>
                        <label for="floatingInput">Town,City</label>
                        <div className='invalid-feedback'>Enter the Town,City</div>
                    </div>
                    <div className="form-floating was-validated mb-3">
                        <select onChange={handleChange} name='state' className="form-select" value={inputs.state} required>
                            <option selected disabled value="">Select the State</option>
                            {stateoptions.map(dropDown)}
                        </select>
                        <label for="floatingSelect">State</label>
                        <div className='invalid-feedback'>Select a valid State</div>
                    </div>
                </div>

                <div className="form-floating was-validated mb-3">
                    <select onChange={handleChange} name='UOM' className="form-select" required>
                        <option selected disabled value="">Select the UOM</option>
                        {UOMoptions.map(dropDown)}
                    </select>
                    <label for="floatingSelect">UOM</label>
                    <div className='invalid-feedback'>Select a valid UOM</div>
                </div>

                <div>
                    <label className='update-warehouse-details-font-weight form-label'>Total Capacity :</label>
                    <div className="form-floating was-validated mb-3">
                        <input onChange={handleChange} name='totalFrozenCapacity' type="number" className="form-control" placeholder="Frozen Capacity" value={inputs.totalFrozenCapacity} required/>
                        <label for="floatingInput">Frozen Capacity</label>
                        <div className='invalid-feedback'>Enter the Frozen Capacity</div>
                    </div>
                    <div className="form-floating was-validated mb-3">
                        <input onChange={handleChange} name='totalChillerCapacity' type="number" className="form-control" placeholder="Chiller Capacity" value={inputs.totalChillerCapacity} required/>
                        <label for="floatingInput">Chiller Capacity</label>
                        <div className='invalid-feedback'>Enter the Chiller Capacity</div>
                    </div>
                    <div className="form-floating was-validated mb-3">
                        <input onChange={handleChange} name='totalDryCapacity' type="number" className="form-control" placeholder="Dry Capacity" value={inputs.totalDryCapacity} required/>
                        <label for="floatingInput">Dry Capacity</label>
                        <div className='invalid-feedback'>Enter the Dry Capacity</div>
                    </div>
                </div>

                <div>
                    <label className='update-warehouse-details-font-weight form-label'>Available Capacity :</label>
                    <div className="form-floating was-validated mb-3">
                        <input onChange={handleChange} name='availableFrozenCapacity' type="number" className="form-control" placeholder="Frozen Capacity" value={inputs.availableFrozenCapacity} required/>
                        <label for="floatingInput">Frozen Capacity</label>
                        <div className='invalid-feedback'>Enter the Frozen Capacity</div>
                    </div>
                    <div className="form-floating was-validated mb-3">
                        <input onChange={handleChange} name='availableChillerCapacity' type="number" className="form-control" placeholder="Chiller Capacity" value={inputs.availableChillerCapacity} required/>
                        <label for="floatingInput">Chiller Capacity</label>
                        <div className='invalid-feedback'>Enter the Chiller Capacity</div>
                    </div>
                    <div className="form-floating was-validated mb-3">
                        <input onChange={handleChange} name='availableDryCapacity' type="number" className="form-control" placeholder="Dry Capacity" value={inputs.availableDryCapacity} required/>
                        <label for="floatingInput">Dry Capacity</label>
                        <div className='invalid-feedback'>Enter the Dry Capacity</div>
                    </div>
                </div>
                <div>
                    <label className='update-warehouse-details-font-weight form-label'>Prices :</label>
                    <div className="form-floating was-validated mb-3">
                        <input onChange={handleChange} name='frozenPrice' type="number" className="form-control" placeholder="Frozen Price" value={inputs.frozenPrice} required/>
                        <label for="floatingInput">Frozen Price</label>
                        <div className='invalid-feedback'>Enter the Frozen Price</div>
                    </div>
                    <div className="form-floating was-validated mb-3">
                        <input onChange={handleChange} name='chillerPrice' type="number" className="form-control" placeholder="Chiller Price" value={inputs.chillerPrice} required/>
                        <label for="floatingInput">Chiller Price</label>
                        <div className='invalid-feedback'>Enter the Chiller Price</div>
                    </div>
                    <div className="form-floating was-validated mb-3">
                        <input onChange={handleChange} name='dryPrice' type="number" className="form-control" placeholder="Dry Price" value={inputs.dryPrice} required/>
                        <label for="floatingInput">Dry Price</label>
                        <div className='invalid-feedback'>Enter the Dry Price</div>
                    </div>
                </div>
                <div className="was-validated mb-3">
                    <label className='update-warehouse-details-font-weight form-label'>Facility Images :</label>
                    <input onChange={handleChange} name='facilityImages1' type="file" className="form-control" value={inputs.facilityImages1} required/>
                </div>
                <div className="was-validated mb-3">
                    <label className='update-warehouse-details-font-weight form-label'>Facility Images :</label>
                    <input onChange={handleChange} name='facilityImages2' type="file" className="form-control" value={inputs.facilityImages2} required/>
                </div>
                <div className="was-validated mb-3">
                    <label className='update-warehouse-details-font-weight form-label'>Facility Images :</label>
                    <input onChange={handleChange} name='facilityImages3' type="file" className="form-control" value={inputs.facilityImages3} required/>
                </div>
                <div className="was-validated mb-3">
                    <label className='update-warehouse-details-font-weight form-label'>Compliance Documents :</label>
                    <input onChange={handleChange} name='complianceDocuments' type="file" className="form-control" value={inputs.complianceDocuments} required />
                </div>
                <button type ='submit' onClick={handleclick} className='btn btn-success w-100 mt-2'>Submit</button>
            </form>
            </div>
        </div>
    </div>
}
export default UpdateWarehouseDetails;