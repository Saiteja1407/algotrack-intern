import React, { useState,useEffect } from "react";
import {useNavigate, useParams,useLocation} from 'react-router-dom';
import "./placeOrder.css";
import axios from "axios";
// import Cookies from "js-cookie";

function PlaceOrderDetails(){
     const [orderDetails,setOrderDetails]=useState([]);
     const {id,warehouseId}=useParams();
     const location=useLocation();
     const {formData,warehousePrice}=location.state;
     const navigate=useNavigate();  
    const handleClick=()=>{
        const postData = async () => {
            try {
              const response = await axios.post(`${process.env.REACT_APP_API}/customer/${id}/${warehouseId}/placeOrder`,formData,{withCredentials:true});
              const responseData = response.data.data;
              navigate(`/customer/mainscreen/${id}`);
            } catch (error) {
              throw error;
            }
          };
           postData()
        alert('Your order has been succesfully placed.You will receive a call from our side wait until then.')
        //   navigate(`/customer/mainscreen/${id}`)
    }
    // if(ErrorState===1){
    //   alert("please login to continue");
    //   navigate('/login/customer/email');
    // }

    return(
      <div className='bg-light flex align-items-center justify-content-center'>
          <div className=' container placeoderdetailsnewcontainer'>
              <div className='row'>
                  <div className='col-md-5 placeborder me-5 p-2 ps-3 mb-2'>
                      <h4 className='mb-3'>Product Details:</h4>
                      <p>Name of the Product:{formData.productType}</p>
                      <p>Quantity: {formData.numberOfUnits}</p>
                      <p>Type of storage:{formData.temperatureRange} </p>
                  </div>
                  <div className='col-md-6 placeborder p-2 ps-3 mb-2'>
                      <h4 className='mb-3'>Price Details:</h4>
                      <p>Price per Unit:{warehousePrice}</p>
                      <p>Quantity:{formData.numberOfUnits}</p>
                      <p>Total Price:{formData.numberOfUnits*warehousePrice} </p>
                  </div>
              </div>
              <div className='row col-md-12 mt-2 placeborder p-2 ps-2'>
                  <h4 className='mb-3'>Warehouse details:</h4>
                  <p>Warehouse Id: {warehouseId}</p>
              </div>
              <div className='d-flex justify-content-center me-5'>
                  <button className='btn btn-success mt-3' onClick={()=>handleClick()}>Confirm Order</button>
              </div>
          </div>    
      </div>
     )
}
export default PlaceOrderDetails;