import React from "react";
import { Row,Col,Container } from "react-bootstrap";
import './PartnerInventoryHistory.css';
import Table from 'react-bootstrap/Table';
import { inventoryhistory } from "../../Customer/CustomerMainScreen/orderdummydata";


let PartnerInventoryHistory = () =>{
    return(
        <>
          <Container className="mb-3">
             
              <Row>
                 <Row  className="mt-3">
                    <Col xs={12} md={6} className="inventoryhistorycoloumn">Inventory History</Col>
                 </Row>
                 <Row className="mt-3">
                     <Col xs={12} md={6} > <h4>Inventory Id :1 </h4></Col>  {/* from data base */}
                     <Col xs={12} md={6} > <h4>No Of Units Remaining In The Inventory: 30 </h4></Col> {/* from data base */}
                 </Row>
                 <Row className="mt-4">
                 
                 <Table striped="columns" bordered hover size="lg" variant="Secondary" className="shadow-lg" responsive>
      
                    <thead size="lg" className="fs-4" >
                      <tr>
                        <th>Inventoruy History Id</th>
                         <th >Units Before Dispatch</th>
                         <th >Units After Dispatch</th>
                         <th >Dispatch Date</th>
                         <th > Dispatch Time</th>
                         
                       </tr>
                    </thead>
                     <tbody className="center" size="lg">
                        { inventoryhistory.map((val) =>(
                           <tr>
                            <>
                            <td>{val.inventoryhistoryid}</td>
                            
                            <td>{val.unitsbeforedispatch}</td>
                            
                            <td>{val.unitsafterdispatch}</td>  
                            <td>{val.dispatcheddate}</td> 
                            <td>{val.dispatchedtime}</td>  </>
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