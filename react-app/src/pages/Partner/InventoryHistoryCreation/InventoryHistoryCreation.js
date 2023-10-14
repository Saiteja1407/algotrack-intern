import React,{useState,useEffect} from 'react';
import { useNavigate,useParams } from "react-router-dom";
import './InventoryHistoryCreation.css'
import axios from 'axios';

function InventoryHistoryCreation(){
    const {id}=useParams();
    const [inputs,setInputs]=useState({
        unitsDispatched:"",
        dispatchedDateTime:""
    })
    const [inventoryDetails,setInventoryDetails]=useState([]);
    const Navigate=useNavigate();

    useEffect(() => {
        const fetchInventoryDetails = async () => {
          try {
            const response = await axios.get(`${process.env.REACT_APP_API}/partner/inventory/history/creation/${id}`);
            setInventoryDetails(response.data.data);
            console.log(response.data.data)
          } catch (error) {
            console.error('Error fetching order details:', error);
          }
        };
    
        fetchInventoryDetails();
      }, [id]); 

    function handleChange(e){
        const {name,value}=e.target;
        setInputs(values => ({ ...values, [name] : value}))
    }
    
    const handleSubmit=(e)=>{
        const data={
          ...inputs,
          balanceUnits:inventoryDetails[0].balance_inventory_units
        }
        const postData = async () => {
         try {
           const response = await axios.post(`${process.env.REACT_APP_API}/partner/inventory/history/creation/${id}`, data);
           Navigate(`/partner/inventory/history/${id}`);
           
           return response.data
         } catch (error) {
           throw error;
         }
       };
       postData();
       e.preventDefault();
    }
    

    function handleclick(){
        //Navigate
    }
    return <div>
        
        <div className='partner-update-inventory-wrapper align-items-center justify-content-center w-100 col-12'>
            <div className='row'>
                <div className='col-md-5 text-center lefthalf'>
                    <div className="form-floating mb-3">
                        <input type="number" name='Total Inventory Units' className="form-control fi1" id="floatingInput" placeholder="Total Inventory Units" value="1234"  readOnly/>
                        <label for="floatingInput">Total Inventory Units</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type="number" name="Balance Inventory Units" className="form-control fi1" id="floatingInput" placeholder="Balance Inventory Units" value="1234"  readOnly/>
                        <label for="floatingInput">Balance Inventory Units</label>
                    </div>
                </div>
                <div className='p-u-i-login shadow partner-update-inventory col-md-6'>
                    <h2 className='partner-update-inventory-heading mb-3'>Partner Update Inventory </h2>
                    <form className='needs validation' noValidate onSubmit={handleSubmit}>

                        <div className="form-floating was-validated mb-3">
                            <input onChange={handleChange} type="number" name="unitsDispatched" className="form-control" id="floatingInput" placeholder="Number of Units to be Dispatched" value={inputs.unitsDispatched} required/>
                            <label for="floatingInput">Number of Units to be Dispatched</label>
                            <div className='invalid-feedback'>Enter the Number of Units to be Dispatched</div>
                        </div>

                        <div className="form-floating was-validated mb-3">
                            <input onChange={handleChange} name='dispatchedDateTime' type="datetime-local" className="form-control" id="floatingInput" value={inputs.dispatchedDateTime} required/>
                            <label for="floatingInput">Dispatched Date and Time</label>
                            <div className='invalid-feedback'>Enter a Valid Date and Time</div>
                        </div>
                        
                        <button type ='submit' onClick={handleclick} className='btn btn-success w-100 mt-2'>Update Inventory</button>
                    </form>
                </div>
            </div>
        </div>
            
    </div>
}
export default InventoryHistoryCreation;