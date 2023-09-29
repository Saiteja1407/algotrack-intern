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
          console.log(orderDetails[0].order_status)
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
      
        <div >
              <h2 className="orderdetails">
                  Order Details
              </h2>
             <div className="orderdetailsbox mb-5">
               <div><b>order id:</b>{orderDetails.length > 0 && orderDetails[0].order_id}</div>
               
            {/* pending */}   <div className="status"><b>Status:</b>{orderDetails.length > 0 && orderDetails[0].order_status}</div>
               <hr/>
               <div className="dandt">
                  Dates and Times:
               </div>
               <div>
                  <b>Ordered</b>   : {orderDetails.length > 0 && orderDetails[0].order_placed_date}
               </div>
               <div>
                  <b>Executed</b> :
               </div>
               <div>
                  <b>completed</b>:
               </div>
               <hr />
               <div className="detailsheading">Product Details:</div>
               <div className="productdetails">
                  <div>
                     <b>Name:</b>{orderDetails.length > 0 && orderDetails[0].product_details}
                  </div>
                  <div>
                     <b>Quantity:</b> 
                  </div>
                  <div>
                     <b>Type of storage:</b>
                  </div>
               </div>
             <hr />
               <div className="warehousedetails">Warehouse Details:</div>
                  <div>
                    <b>Id :</b> product_details
                  </div>
                  <div>
                     <b>Name :</b> 
                  </div>
               <div className="inventoryview">
               <button onClick={()=>handleClick(orderDetails[0].order_id)}>
               View Inventory
               </button>
               </div>
               
             </div>
      
        </div>
     )
}
export default CustomerOrderDetails;