import React from "react";
import { Row,Col,Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import './AdminOrdersDashboard.css';
import Table from 'react-bootstrap/Table';
import { orderdetails } from "../../Customer/CustomerMainScreen/orderdummydata";
import { useNavigate } from "react-router-dom";

let AdminOrdersDashboard = () =>{
      const Navigate=useNavigate();
     function handleMoreDetails(){
        Navigate('/admin/orders/details');
     }

    return(
        <>
          <Container>
              

              <Row>
                 <Row >
                    <Col xs={12} md={6} className="ordersdashboardcoloumn">Orders Dashboard</Col>
                    <Col xs={12} md={6}>{/* search by order id goes here */}</Col>
                 </Row>
                 <Row className="mt-4">
                 
                 <Table striped="columns" bordered hover size="lg" variant="Secondary" className="shadow-lg" responsive>
      
                    <thead size="lg" className="fs-4" >
                      <tr>
                         <th >Order Id</th>
                         <th >Product Name</th>
                         <th >Product Units</th>
                         <th >Ordered Date</th>
                         <th > Order Status</th>
                         <th ></th>
                       </tr>
                    </thead>
                     <tbody className="center" size="lg">
                     { orderdetails.map((val) =>(
                           <tr>
                            <><td>{val.orderid}</td>
                            <td>{val.productname}</td>
                            <td>{val.productunits}</td>  
                            <td>{val.orderdate}</td> 
                            <td>{val.ordersstatus}</td> 
                            <td> <Button onClick={handleMoreDetails} variant="danger">More Details</Button> </td> </>  
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
export default AdminOrdersDashboard;