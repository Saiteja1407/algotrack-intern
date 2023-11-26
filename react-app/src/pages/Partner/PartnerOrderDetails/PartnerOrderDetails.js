import React,{useState,useEffect} from "react";
import "./PartnerOrderDetails.css";
import {useNavigate,useParams} from 'react-router-dom'
import axios from "axios";

function PartnerOrderDetails(){
   const {id,orderId}=useParams();
   const navigate=useNavigate();
   const [orderDetails,setOrderDetails]=useState([]);
   const [ErrorState,setErrorState]=useState(0);
   
   useEffect(() => {
      const fetchOrderDetails = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API}/partner/${id}/order/details/${orderId}`,{withCredentials:true});
          setOrderDetails(response.data.data);
          console.log(response.data.data)
        } catch (error) {
          console.error('Error fetching order details:', error);
          if (error.request.status===401){
            setErrorState(1)
           }
          else{
            alert("error occured")
          }
        }
      };
  
      fetchOrderDetails();
    }, [orderId]); 
    const handleClick=()=>{
          navigate(`/partner/${id}/inventory/dashboard/${orderId}`)
    }
    if(ErrorState===1){
      navigate('/unauthorizedpage');
    }
return(
      <div className='bg-light flex align-items-center justify-content-center'>
          <div className=' container partneroderdetailsnewcontainer'>
              <h3 className='mb-3'>Order Id #{orderDetails.length > 0 && orderDetails[0].order_id}  <span><button className='btn btn-primary ms-4' disabled>{orderDetails.length > 0 && orderDetails[0].order_status}</button></span></h3>
              <div className='row'>
                  <div className='col-md-5 partnerborder me-5 p-2 ps-3 mb-2'>
                      <h4 className='mb-3'>Order details:</h4>
                      <p>Ordered Time  : {orderDetails.length > 0 && orderDetails[0].order_placed_date}</p>
                      <p>Executed Time : {orderDetails.length > 0 && orderDetails[0].order_execution_startdate}</p>
                      <p>Completed Time: {orderDetails.length > 0 && orderDetails[0].order_completed_date}</p>
                  </div>
                  <div className='col-md-6 partnerborder p-2 ps-3 mb-2'>
                      <h4 className='mb-3'>Product Details:</h4>
                      <p>Name of the Product: {orderDetails.length > 0 && orderDetails[0].product_details}</p>
                      <p>Quantity: {orderDetails.length > 0 && orderDetails[0].product_units}</p>
                      <p>Type of storage: {orderDetails.length > 0 && orderDetails[0].storage_type}</p>
                  </div>
              </div>
              <div className='row col-md-12 mt-2 partnerborder p-2 ps-2'>
                  <h4 className='mb-3'>Warehouse details:</h4>
                  <p>Warehouse Id: {orderDetails.length > 0 && orderDetails[0].warehouse_id}</p>
                  <p>Warehouse Name:{orderDetails.length > 0 && orderDetails[0].warehouse_name}</p>
              </div>
              <div className='d-flex justify-content-center me-5'>
                  <button className='btn btn-success mt-3' onClick={()=>handleClick()}>Manage Inventory</button>
              </div>
          </div>    
      </div>
     )
}
export default PartnerOrderDetails;