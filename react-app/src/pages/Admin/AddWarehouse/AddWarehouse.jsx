import React,{useEffect, useState} from 'react';
import { useNavigate, useParams } from "react-router-dom";
import './AddWarehouse.css'
import axios from 'axios';
function AddWarehouse(){
    const {id,partnerId}=useParams();
    const Navigate=useNavigate();
    const [ErrorState,setErrorState]=useState(0);
    const [inputs,setInputs]=useState({
        warehouseName:"",
        location1:"",
        landmark:"",
        area:"",
        pincode:"",
        city:"",
        state:"",
        UOM:"",
        totalFrozenCapacity:"",
        totalChillerCapacity:"",
        totalDryCapacity:"",
        availableFrozenCapacity:"",
        availableChillerCapacity:"",
        availableDryCapacity:"",
        chillerPrice:"",
        frozenPrice:"",
        dryPrice:"",
        facilityImages1:null,
        facilityImages2:null,
        facilityImages3:null,
        complianceDocuments:null,
        contractCopy:null
    })
    useEffect(()=>{
        const authorization=async()=>{
        try{
            const response= await axios.get(`${process.env.REACT_APP_API}/admin/${id}/customer/management`,{withCredentials:true});
        }
            catch(error){
             if (error.request.status===401){
               setErrorState(1)
              }
             throw error
            }
         }
         authorization();
    },[id])
    function handleChange(e){
        const {name,value}=e.target;
        setInputs({ ...inputs, [name] : value});
    }

    const handleFileChange = (e,fieldName) => {
        setInputs({ ...inputs, [fieldName]: e.target.files[0] });
    };
   
    async function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('warehouseName', inputs.warehouseName.toUpperCase());
        formData.append('location1', inputs.location1.to.toUpperCase());
        formData.append('landmark', inputs.landmark.toUpperCase());
        formData.append('area', inputs.area.toUpperCase());
        formData.append('pincode', inputs.pincode);
        formData.append('city', inputs.city.toUpperCase());
        formData.append('state', inputs.state.toUpperCase());
        formData.append('UOM', inputs.UOM.toUpperCase());
        formData.append('totalFrozenCapacity', inputs.totalFrozenCapacity);
        formData.append('totalChillerCapacity', inputs.totalChillerCapacity);
        formData.append('totalDryCapacity', inputs.totalDryCapacity);
        formData.append('availableFrozenCapacity', inputs.availableFrozenCapacity);
        formData.append('availableChillerCapacity', inputs.availableChillerCapacity);
        formData.append('availableDryCapacity', inputs.availableDryCapacity);
        formData.append('chillerPrice', inputs.chillerPrice);
        formData.append('frozenPrice', inputs.frozenPrice);
        formData.append('dryPrice', inputs.dryPrice);
        formData.append('complianceDocuments', inputs.complianceDocuments);
        formData.append('facilityimages1', inputs.facilityImages1);
        formData.append('facilityimages2', inputs.facilityImages2);
        formData.append('facilityimages3', inputs.facilityImages3);
    
        try {
        console.log(inputs);
        console.log(formData);
          const response = await axios.post(
            `${process.env.REACT_APP_API}/admin/${id}/facilityonboarding/${partnerId}`,
            inputs,
            {
              withCredentials: true,
              headers: {
                'custom-header':'value',
                'Content-Type': 'multipart/form-data',
              },
            }
          );
    
          console.log(response.data.data);
          // Handle success, e.g., redirect to another page
        } catch (error) {
            console.log('got error')
          console.error('Error:', error);
          // Handle error
        }
      }
    // async function handleSubmit(e) {
    //     e.preventDefault();
    //    console.log(inputs);
    //     try {
    //         const response = await axios.post(`${process.env.REACT_APP_API}/admin/${id}/facilityonboarding/${partnerId}`, inputs, 
    //         { 
    //             withCredentials: true ,
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //             },
    //         });
            
    //         console.log(response.data.data);
    //         // Navigate(`/admin/${id}/${partnerId}/warehouse`);
    //         return response.data;
    //     } catch (error) {
    //         console.error(error);
    //         throw error;
    //     }
    // }
    
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
    if(ErrorState===1){
        Navigate('/unauthorizedpage');
    }
    return <div>
        <div className='addwarehousewrapper bg-dark d-flex align-items-center justify-content-center w-100'>
            <div className='add-warehouse-login shadow'>
            <h2 className='addwarehouseheading mb-3'>Add Warehouse</h2>
            <form className='needs validation'  onSubmit={handleSubmit} encType="multipart/form-data">
            `   <div>
                    <label className='addwarehousefont-weight form-label'>Warehouse Name :</label>
                    <div className="form-floating was-validated mb-3">
                        <input onChange={handleChange} name='warehouseName' type="text" className="form-control" placeholder="Warehouse Name" value={inputs.warehouseName} required/>
                        <label for="floatingInput">Warehouse Name</label>
                        <div className='invalid-feedback'>Enter the Warehouse Name</div>
                    </div>
                </div>
                <div>
                    <label className='addwarehousefont-weight form-label'>Facility Location :</label>
                    <div className="form-floating mb-3">
                        <input onChange={handleChange} name='location1' type="text" className="form-control" placeholder="Building,Company" value={inputs.location1}/>
                        <label for="floatingInput">Building,Company</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleChange} name="landmark" type="text" className="form-control" placeholder="Landmark" value={inputs.landmark}/>
                        <label for="floatingInput">Landmark</label>
                    </div>
                    <div className="form-floating was-validated mb-3">
                        <input onChange={handleChange} name="area" type="text" className="form-control" placeholder="Area,Street,Sector,Village" value={inputs.area} required/>
                        <label for="floatingInput">Area,Street,Sector,Village</label>
                        <div className='invalid-feedback'>Enter the Area,Street,Sector,Village</div>
                    </div>
                    <div className="form-floating was-validated mb-3">
                        <input onChange={handleChange} name="pincode" type="number" className="form-control" placeholder="Pincode" value={inputs.pincode} required/>
                        <label for="floatingInput">Pincode</label>
                        <div className='invalid-feedback'>Enter the Pincode</div>
                    </div>
                    <div className="form-floating was-validated mb-3">
                        <input onChange={handleChange} name='city' type="text" className="form-control" placeholder="Town/City" value={inputs.city} required/>
                        <label for="floatingInput">Town/City</label>
                        <div className='invalid-feedback'>Enter the Town/City</div>
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
                    <select onChange={handleChange} name='UOM' className="form-select" value={inputs.UOM} required>
                        <option selected disabled value="">Select the UOM</option>
                        {UOMoptions.map(dropDown)}
                    </select>
                    <label for="floatingSelect">UOM</label>
                    <div className='invalid-feedback'>Select a valid UOM</div>
                </div>

                <div>
                    <label className='addwarehousefont-weight form-label'>Total Capacity :</label>
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
                    <label className='addwarehousefont-weight form-label'>Available Capacity :</label>
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
                    <label className='addwarehousefont-weight form-label'>Prices :</label>
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
                    <label className='addwarehousefont-weight form-label'>Facility Image 1 :</label>
                    <input onChange={(e)=>handleFileChange(e,'facilityImages1')} name='facilityImages1' type="file" className="form-control"   required/>
                </div>
                <div className="was-validated mb-3">
                    <label className='addwarehousefont-weight form-label'>Facility Image 2 :</label>
                    <input onChange={(e)=>handleFileChange(e,'facilityImages2')} name='facilityImages2' type="file" className="form-control"  required/>
                </div>
                <div className="was-validated mb-3">
                    <label className='addwarehousefont-weight form-label'>Facility Image 3 :</label>
                    <input onChange={(e)=>handleFileChange(e,'facilityImages3')} name='facilityImages3' type="file" className="form-control"  required/>
                </div>
                <div className="was-validated mb-3">
                    <label className='addwarehousefont-weight form-label'>Compliance Documents :</label>
                    <input onChange={(e)=>handleFileChange(e,'complianceDocuments')} name='complianceDocuments' type="file" className="form-control"  required/>
                </div>
                {/* <div className="was-validated mb-3">
                    <label className='addwarehousefont-weight form-label'>Contract copy with partner :</label>
                    <input onChange={handleChange} name='contractCopy' type="file" className="form-control" value={inputs.contractCopy} required/>
                </div> */}
                <button type ='submit' className='btn btn-success w-100 mt-2'>Submit</button>
            </form>
            </div>
        </div>
    </div>
}
export default AddWarehouse;