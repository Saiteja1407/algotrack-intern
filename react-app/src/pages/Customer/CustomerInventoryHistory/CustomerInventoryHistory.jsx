import React, { useState ,useEffect} from "react";
import { Row,Col,Container } from "react-bootstrap";
import './CustomerInventoryHistory.css';
import Table from 'react-bootstrap/Table';
import axios from "axios";
import {useParams} from 'react-router-dom'
let CustomerInventoryHistory = () =>{
   const [inventoryHistory,setInventoryHistory]=useState([]);
   const {id}=useParams();
   useEffect(() => {
      const fetchOrderDetails = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API}/customer/inventory/history/${id}`);
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
          <Container className="mb-4">
             
              <Row>
                 <Row>
                    <Col xs={10} md={6} xl={5} className="inventoryhistorycoloumn mx-auto">Inventory History</Col>
                 </Row>
                 <div className="bg-body-secondary mt-3">
                 <Row className="mt-3">
                     <Col xs={12} md={6} > <h4>Inventory Id :{inventoryHistory.length > 0 && inventoryHistory[0].inventory_id}</h4></Col>    {/* from data base */}
                     <Col xs={12} md={6} > <h4>No Of Units Remaining In The Inventory:{inventoryHistory.length > 0 && inventoryHistory[0].space_remaining_inventory} </h4></Col>  {/* from data base */}
                 </Row>
                 <Row className="mt-4">
                 
                 <Table striped="columns" bordered hover size="lg" variant="Secondary" className="shadow-lg" responsive>
      
                    <thead size="lg" className="h5" >
                      <tr>
                         <th className="text-center">Inventoruy History Id</th>
                         <th className="text-center" >Units Before Dispatch</th>
                         <th className="text-center" >Units Dispatched</th>
                         <th className="text-center" >Units After Dispatch</th>
                         <th className="text-center" > Dispatched Date And Time</th>
                         
                       </tr>
                    </thead>
                     <tbody className="center" size="lg">
                        { inventoryHistory.map((val) =>(
                           <tr>
                            <>
                            <td className="text-center">{val.inventory_history_id}</td>
                            <td className="text-center">{val.units_before_dispatch}</td>                         
                            <td className="text-center">{val.dispatched_units}</td> 
                            <td className="text-center">{val.units_after_dispatch}</td>  
                            <td className="text-center">{val.dispatched_date_time}</td>  </>
                            </tr> 
                      ))}    
                     </tbody>
                   </Table>
                   
                 </Row>
                 </div>
              </Row>

          </Container>   

        </>
    );
}
export default CustomerInventoryHistory;