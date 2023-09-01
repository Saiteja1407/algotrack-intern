import React from "react";
import "./AdminOrderDetails.css";
import {Link} from 'react-router-dom'


function AdminOrderDetails(prop){
   
     return(
        <div >
              <h2 className="orderdetails">
                  Order Details
              </h2>
             <div className="orderdetailsbox mb-5">
               <div><b>order id:</b>{prop.orderid}</div>
            {/* pending */}   <div className="status"><b>Status:</b>Ongoing</div>
               <hr/>
               <div className="dandt">
                  Dates and Times:
               </div>
               <div>
                  <b>Ordered</b>   :{prop.ordereddandt}
               </div>
               <div>
                  <b>Executed</b> :{prop.executeddandt}
               </div>
               <div>
                  <b>completed</b>:{prop.completeddandt}
               </div>
               <hr />
               <div className="detailsheading">Product Details:</div>
               <div className="productdetails">
                  <div>
                     <b>Name:</b> {prop.productname}
                  </div>
                  <div>
                     <b>Quantity:</b> {prop.productquantity} {prop.uom}
                  </div>
                  <div>
                     <b>Type of storage:</b> {prop.storagetype}
                  </div>
               </div>
             <hr />
               <div className="warehousedetails">Warehouse Details:</div>
                  <div>
                    <b>Id :</b> {prop.w_id}
                  </div>
                  <div>
                     <b>Name :</b> {prop.w_name}
                  </div>
               <div className="inventoryview dropdown">
               <button className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
               Update Status
               </button>
               <ul className="dropdown-menu me-4">
        <li><Link className="dropdown-item" to="/login/partner">Confirm</Link></li>
        <li><Link className="dropdown-item" to="#">Pending</Link></li>
        <li><Link className="dropdown-item" to="#">Cancel</Link></li>
        
      </ul>
               </div>
               
             </div>
      
        </div>
     )
}
export default AdminOrderDetails;