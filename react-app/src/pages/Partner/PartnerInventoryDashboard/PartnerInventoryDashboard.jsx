import React from "react";
import { Row,Col,Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import './PartnerInventoryDashboard.css';
import Table from 'react-bootstrap/Table';
import { inventorydetails } from "../../Customer/CustomerMainScreen/orderdummydata";
import { useNavigate } from 'react-router-dom';



let PartnerInventoryDashboard = () =>{
            const Navigate=useNavigate();
     function handleInventoryHistory(){
             Navigate('/partner/inventory/history');
     }

     function handleEditInventory(){
           Navigate('/partner/inventory/edit');
     }
    
    return(
        <>
          <Container className="mb-3">
          
              <Row>
                 <Row  className="mt-3">
                    <Col xs={12} md={6} className="inventorydetailscoloumn m-2 mb-5">Inventory DashBoard</Col>
                    
                    <Col className="ms-auto" xs={12} md={3}><Button variant="warning" size="lg" className="addinventorybutton m-auto"> Add Inventory</Button></Col>
                 </Row>
                 <div className="orderdetails">
                 <Row className="mt-3">
                    <Col xs={12} md={6}> Order Id : 1</Col>
                    
                 </Row>
                 <Row className="mt-3">
                    <Col xs={12} md={6}> Total Order Units : 250</Col>
                    <Col xs={12} md={6}> Space Remaining for no.of Units: 70</Col>
                 </Row>
                 </div>

                 <Row className="mt-4">
                 
                 <Table striped="columns" bordered hover size="lg" variant="Secondary" className="shadow-lg" responsive>
      
                    <thead size="lg" className="fs-4" >
                      <tr>
                         <th >Inventory Id</th>
                         <th >Total no.of Units Belonging To Inventory</th>
                         <th >Balance Units In the Inventory</th>
                         <th >Batch Number</th>
                         <th > Arrived Date and Time</th>
                         <th> Ageing</th>
                         <th>Temperature Data</th>
                         <th >   </th>
                         <th>    </th>
                       </tr>
                    </thead>
                     <tbody className="center" size="lg">
                     { inventorydetails.map((val) =>(
                           <tr>
                            <><td>{val.inventoryid}</td>
                            <td>{val.totalunitsthatbelongtoinventory}</td>
                            <td>{val.balanceunitsintheinventory}</td>  
                            <td>{val.batchnumber}</td> 
                            <td>{val.ariveddatetime}</td> 
                            <td>{val.noofdaysfromarriveddate} days</td>
                            <td>{val.temperaturedata}</td>
                            <td> <Button onClick={handleInventoryHistory} variant="danger">Inventory History</Button> </td>
                            <td> <Button onClick={handleEditInventory} variant="danger"> Edit Inventory</Button> </td>
                             </>  
                            </tr>  ))} 
                        
                     </tbody>
                   </Table>
                   
                 </Row>
              </Row>
             
          </Container>   
         
        </>
    );
}
export default PartnerInventoryDashboard;