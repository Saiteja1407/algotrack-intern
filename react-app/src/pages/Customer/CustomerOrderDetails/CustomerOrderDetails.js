import React, { useState,useEffect } from "react";
import {useNavigate, useParams} from 'react-router-dom';
import "./CustomerOrderDetails.css";
import axios from "axios";

function CustomerOrderDetails(){
     const [orderDetails,setOrderDetails]=useState([]);
     const {id}=useParams();
     const navigate=useNavigate();
   useEffect(() => {
      const fetchOrderDetails = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API}/customer/order/details/${id}`);
          setOrderDetails(response.data.data);
          console.log(response.data.data);
        } catch (error) {
          console.error('Error fetching order details:', error);
        }
      };
  
      fetchOrderDetails();
    }, [id]); 
    
    const handleClick=(id)=>{
          navigate(`/customer/inventory/dashboard/${id}`)
    }

    return(
      <div className='bg-light flex align-items-center justify-content-center'>
          <div className=' container customeroderdetailsnewcontainer'>
              <h3 className='mb-3'>Order Id: {orderDetails.length > 0 && orderDetails[0].order_id}  <span><button className='btn btn-primary ms-4' disabled>{orderDetails.length > 0 && orderDetails[0].order_status}</button></span></h3>
              <div className='row'>
                  <div className='col-md-5 customerborder me-5 p-2 ps-3 mb-2'>
                      <h4 className='mb-3'>Order details:</h4>
                      <p>Ordered Time:  {orderDetails.length > 0 && orderDetails[0].order_placed_date}</p>
                      <p>Executed Time:</p>
                      <p>Completed Time</p>
                  </div>
                  <div className='col-md-6 customerborder p-2 ps-3 mb-2'>
                      <h4 className='mb-3'>Product Details:</h4>
                      <p>Name of the Product: {orderDetails.length > 0 && orderDetails[0].product_details}</p>
                      <p>Quantity:</p>
                      <p>Type of storage:</p>
                  </div>
              </div>
              <div className='row col-md-12 mt-2 customerborder p-2 ps-2'>
                  <h4 className='mb-3'>Warehouse details:</h4>
                  <p>Warehouse Id:</p>
              </div>
              <div className='d-flex justify-content-center me-5'>
                  <button className='btn btn-success mt-3' onClick={()=>handleClick(orderDetails[0].order_id)}>View Inventory</button>
              </div>
          </div>    
      </div>
     )
}
export default CustomerOrderDetails;