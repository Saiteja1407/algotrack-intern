import React,{useState,useEffect} from 'react';
import { useLocation, useNavigate,useParams } from "react-router-dom";
import './InventoryHistoryCreation.css'
import axios from 'axios';

function InventoryHistoryCreation(){
    const {id,inventoryId}=useParams();
    
    const [inputs,setInputs]=useState({
        unitsDispatched:"",
        dispatchedDateTime:""
    })
    const location=useLocation();
    const {orderId}=location.state;
    const [ErrorState,setErrorState]=useState(0);
    const [inventoryDetails,setInventoryDetails]=useState([]);
    const Navigate=useNavigate();

    useEffect(() => {
        const fetchInventoryDetails = async () => {
          try {
            const response = await axios.get(`${process.env.REACT_APP_API}/partner/${id}/inventory/history/creation/${inventoryId}`,{withCredentials:true});
            setInventoryDetails(response.data.data);
            console.log(response.data)
           
          } catch (error) {
            console.error('Error fetching order details:', error);
            if (error.request.status===401){
              setErrorState(1)
             }
          }
        };
    
        fetchInventoryDetails();
      }, [id,inventoryId]); 

    function handleChange(e){
        const {name,value}=e.target;
        setInputs(values => ({ ...values, [name] : value}))
    }
    
    const handleSubmit=(e)=>{
        const data={
          ...inputs,
          balanceUnits:inventoryDetails[0]?.balance_inventory_units
        }
        if(inventoryDetails[0]?.balance_inventory_units>=inputs.unitsDispatched && inputs.unitsDispatched >0){
          const postData = async () => {
            try {
              const response = await axios.post(`${process.env.REACT_APP_API}/partner/${id}/inventory/history/creation/${inventoryId}`, data,{withCredentials:true});
              Navigate(`/partner/${id}/inventory/dashboard/${orderId}`);
              console.log(response.data)
              alert('you have succesfully updated your inventory');
              return response.data
              
            } catch (error) {
             console.log(error)
             if (error.request.status===401){
               setErrorState(1)
              }
            }
          };
          postData();
        }
       else{
        alert('Please enter units correctly');
       }
       e.preventDefault();
    }
    if(ErrorState===1){
      Navigate('/unauthorizedpage');
    }
    return <div>
        
        <div className='partner-update-inventory-wrapper align-items-center justify-content-center w-100 col-12'>
            <div className='row'>
                <div className='col-md-5 text-center lefthalf'>
                    <div className="form-floating mb-3">
                        <input type="number" name='Total Inventory Units' className="form-control fi1" placeholder="Total Inventory Units"  readOnly/>
                        <label for="floatingInput">Total Inventory Units:{inventoryDetails&&inventoryDetails[0]?.total_inventory_units}</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type="number" name="Balance Inventory Units" className="form-control fi1" placeholder="Balance Inventory Units"   readOnly/>
                        <label for="floatingInput">Balance Inventory Units:{inventoryDetails&&inventoryDetails[0]?.balance_inventory_units}</label>
                    </div>
                </div>
                <div className='p-u-i-login shadow partner-update-inventory col-md-6'>
                    <h2 className='partner-update-inventory-heading mb-3'>Partner Update Inventory </h2>
                    <form className='needs validation' noValidate onSubmit={handleSubmit}>

                        <div className="form-floating was-validated mb-3">
                            <input onChange={handleChange} type="number" name="unitsDispatched" className="form-control" placeholder="Number of Units to be Dispatched" value={inputs.unitsDispatched} required/>
                            <label for="floatingInput">Number of Units to be Dispatched</label>
                            <div className='invalid-feedback'>Enter the Number of Units to be Dispatched</div>
                        </div>

                        <div className="form-floating was-validated mb-3">
                            <input onChange={handleChange} name='dispatchedDateTime' type="datetime-local" className="form-control" value={inputs.dispatchedDateTime} required/>
                            <label for="floatingInput">Dispatched Date and Time</label>
                            <div className='invalid-feedback'>Enter a Valid Date and Time</div>
                        </div>
                        
                        <button type ='submit'  className='btn btn-success w-100 mt-2'>Update Inventory</button>
                    </form>
                </div>
            </div>
        </div>
            
    </div>
}
export default InventoryHistoryCreation;