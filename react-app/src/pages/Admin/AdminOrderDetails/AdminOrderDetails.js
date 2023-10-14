import React,{useState,useEffect} from "react";
import "./AdminOrderDetails.css";
import {Link,useParams} from 'react-router-dom'
import axios from "axios";



function AdminOrderDetails(){
  const {id,orderId}=useParams();
   const [orderDetails,setOrderDetails]=useState([]);
   const [orderStatus, setOrderStatus] = useState("");

   
   useEffect(() => {
      const fetchOrderDetails = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API}/admin/${id}/order/details/${orderId}`);
          setOrderDetails(response.data.data);
          setOrderStatus(response.data.data[0].order_status);
          console.log(response.data.data)
        } catch (error) {
          console.error('Error fetching order details:', error);
        }
      };
  
      fetchOrderDetails();
    }, [id,orderId]); 
    
    const handleStatusUpdate = async (selectedStatus) => {
      try {
        // Make an API request to update the status in the database
        console.log(id,orderId);
        const response = await axios.patch(`${process.env.REACT_APP_API}/update/order/status/${id}/${orderId}`, {
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
      <div className='bg-light flex align-items-center justify-content-center'>
          <div className=' container adminoderdetailsnewcontainer'>
              <h3 className='mb-3'>Order Id #{orderDetails.length > 0 && orderDetails[0].order_id}  <span><button className='btn btn-primary ms-4' disabled>{orderStatus}</button></span></h3>
              <div className='row'>
                  <div className='col-md-5 adminborder me-5 p-2 ps-3 mb-2'>
                      <h4 className='mb-3'>Order details:</h4>
                      <p>Ordered Time:{orderDetails.length > 0 && orderDetails[0].order_placed_date}</p>
                      <p>Executed Time:{orderDetails.length > 0 && orderDetails[0].order_execution_startdate}</p>
                      <p>Completed Time:{orderDetails.length > 0 && orderDetails[0].order_completed_date}</p>
                  </div>
                  <div className='col-md-6 adminborder p-2 ps-3 mb-2'>
                      <h4 className='mb-3'>Product Details:</h4>
                      <p>Name of the Product:{orderDetails.length > 0 && orderDetails[0].product_details}</p>
                      <p>Quantity:{orderDetails.length > 0 && orderDetails[0].product_units}</p>
                      <p>Type of storage:{orderDetails.length > 0 && orderDetails[0].storage_type}</p>
                  </div>
              </div>
              <div className='row col-md-12 mt-2 adminborder p-2 ps-2'>
                  <h4 className='mb-3'>Warehouse details:</h4>
                  <p>Warehouse Id:{orderDetails.length > 0 && orderDetails[0].warehouse_id}</p>
                  <p>Warehouse Name:{orderDetails.length > 0 && orderDetails[0].warehouse_name}</p>
              </div>
              <div className='d-flex justify-content-center btn-group col-4 mx-auto'>
                  <button className='btn btn-success dropdown-toggle mt-3' data-bs-toggle="dropdown">update Inventory </button>
                  <ul class="dropdown-menu">
                    <li><Link class="dropdown-item" onClick={()=>handleStatusUpdate('confirmed')}>Pending</Link></li>
                    <li><Link class="dropdown-item" onClick={()=>handleStatusUpdate('pending')}>Confirmed</Link></li>
                    <li><Link class="dropdown-item" onClick={()=>handleStatusUpdate('cancelled')}>Cancelled</Link></li>
                  </ul>
              </div>
          </div>    
      </div>
     )
}
export default AdminOrderDetails;