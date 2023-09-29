import React,{useState,useEffect} from "react";
import "./AdminOrderDetails.css";
import {Link,useParams} from 'react-router-dom'
import axios from "axios";



function AdminOrderDetails(){
   const {id}=useParams();
   const [orderDetails,setOrderDetails]=useState([]);
   const [orderStatus, setOrderStatus] = useState("");

   
   useEffect(() => {
      const fetchOrderDetails = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API}/admin/order/details/${id}`);
          setOrderDetails(response.data.data);
          setOrderStatus(response.data.data[0].order_status);
          console.log(response.data.data)
        } catch (error) {
          console.error('Error fetching order details:', error);
        }
      };
  
      fetchOrderDetails();
    }, [id]); 
    
    const handleStatusUpdate = async (selectedStatus) => {
      try {
        // Make an API request to update the status in the database
        console.log(id)
        const response = await axios.patch(`${process.env.REACT_APP_API}/update/order/status/${id}`, {
          status: selectedStatus,
        });
        
      setOrderStatus(selectedStatus);

        // Handle the response or perform any necessary actions
        console.log(`Status updated to: ${selectedStatus}`);
      } catch (error) {
        console.error('Error updating status:', error);
      }
    };
    


     return(
        <div >
              <h2 className="orderdetails">
                  Order Details
              </h2>
             <div className="orderdetailsbox mb-5">
               <div><b>order id:</b>{orderDetails.length > 0 && orderDetails[0].order_id}</div>
              <div className="status"><b>Status:</b>{orderStatus}</div>
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
                     <b>Quantity:</b> {orderDetails.length > 0 && orderDetails[0].product_units}
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
               <div className="inventoryview dropdown">
               <button  className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
               Update Status
               </button>
               <ul className="dropdown-menu me-4">
        <li><Link className="dropdown-item" onClick={()=>handleStatusUpdate('confirmed')}>Confirm</Link></li>
        <li><Link className="dropdown-item" onClick={()=>handleStatusUpdate('pending')}>Pending</Link></li>
        <li><Link className="dropdown-item" onClick={()=>handleStatusUpdate('cancelled')}>Cancel</Link></li>
        
      </ul>
               </div>
               
             </div>
      
        </div>
     )
}
export default AdminOrderDetails;