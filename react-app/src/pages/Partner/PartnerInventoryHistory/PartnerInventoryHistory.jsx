import React,{useState,useEffect} from "react";
import { Row,Col,Container } from "react-bootstrap";
import './PartnerInventoryHistory.css';
import Table from 'react-bootstrap/Table';
import axios from "axios";
import {useParams} from 'react-router-dom'

let PartnerInventoryHistory = () =>{
  const [inventoryHistory,setInventoryHistory]=useState([]);
  const {id}=useParams();
  useEffect(() => {
     const fetchOrderDetails = async () => {
       try {
         const response = await axios.get(`${process.env.REACT_APP_API}/partner/inventory/history/${id}`);
         setInventoryHistory(response.data.data);
         console.log(response.data.data)
       } catch (error) {
         console.error('Error fetching order details:', error);
       }
     };
 
     fetchOrderDetails();
   }, [id]); 

    return(
        <>
          <Container className="mb-3">
             
              <Row>
                 <Row  className="mt-3">
                    <Col xs={12} md={6} className="inventoryhistorycoloumn">Inventory History</Col>
                 </Row>
                 <Row className="mt-3">
                     <Col xs={12} md={6} > <h4>Inventory Id :{inventoryHistory.length > 0 && inventoryHistory[0].inventory_id} </h4></Col>  {/* from data base */}
                     <Col xs={12} md={6} > <h4>No Of Units Remaining In The Inventory: {inventoryHistory.length > 0 && inventoryHistory[0].space_remaining_inventory} </h4></Col> {/* from data base */}
                 </Row>
                 <Row className="mt-4">
                 
                 <Table striped="columns" bordered hover size="lg" variant="Secondary" className="shadow-lg" responsive>
      
                    <thead size="lg" className="fs-4" >
                      <tr>
                        <th>Inventoruy History Id</th>
                         <th >Units Before Dispatch</th>
                         <th >Units Dispatched</th>
                         <th >Units After Dispatch</th>
                         <th > Dispatch Date & Time</th>
                         
                       </tr>
                    </thead>
                     <tbody className="center" size="lg">
                        { inventoryHistory.map((val) =>(
                           <tr>
                            <>
                            <td>{val.inventory_history_id}</td>
                            
                            <td>{val.units_before_dispatch}</td>
                            
                            <td>{val.dispatched_units}</td>  
                            <td>{val.units_after_dispatch}</td> 
                            <td>{val.dispatched_date_time}</td>  </>
                            </tr> 
                      ))}    
                     </tbody>
                   </Table>
                   
                 </Row>
              </Row>

          </Container>   

        </>
    );
}
export default PartnerInventoryHistory;