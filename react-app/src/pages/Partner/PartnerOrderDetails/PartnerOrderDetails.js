import React,{useState,useEffect} from "react";
import "./PartnerOrderDetails.css";
import {useNavigate,useParams} from 'react-router-dom'
import axios from "axios";

function PartnerOrderDetails(){
   const {id}=useParams();
   const navigate=useNavigate();
   const [orderDetails,setOrderDetails]=useState([]);

   
   useEffect(() => {
      const fetchOrderDetails = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API}/partner/order/details/${id}`);
          setOrderDetails(response.data.data);
          console.log(response.data.data)
        } catch (error) {
          console.error('Error fetching order details:', error);
        }
      };
  
      fetchOrderDetails();
    }, [id]); 
    
    const handleClick=(id)=>{
          navigate(`/partner/inventory/dashboard/${id}`)
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
                  <b>Ordered</b>   :{orderDetails.length > 0 && orderDetails[0].order_placed_date}
               </div>
               <div>
                  <b>Executed</b> :{orderDetails.length > 0 && orderDetails[0].order_execution_startdate}
               </div>
               <div>
                  <b>completed</b>:{orderDetails.length > 0 && orderDetails[0].order_completed_date}
               </div>
               <hr />
               <div className="detailsheading">Product Details:</div>
               <div className="productdetails">
                  <div>
                     <b>Name:</b> {orderDetails.length > 0 && orderDetails[0].product_details}
                  </div>
                  <div>
                     <b>Quantity:</b>{orderDetails.length > 0 && orderDetails[0].product_units}
                  </div>
                  <div>
                     <b>Type of storage:</b> {orderDetails.length > 0 && orderDetails[0].storage_type}
                  </div>
               </div>
             <hr />
               <div className="warehousedetails">Warehouse Details:</div>
                  <div>
                    <b>Id :</b> {orderDetails.length > 0 && orderDetails[0].warehouse_id}
                  </div>
                  <div>
                     <b>Name :</b> {orderDetails.length > 0 && orderDetails[0].warehouse_name}
                  </div>
               <div className="inventoryview">
               <button onClick={()=>handleClick(orderDetails[0].order_id)}>
               Manage Inventory
               </button>
               </div>
               
             </div>
      
        </div>
     )
}
export default PartnerOrderDetails;