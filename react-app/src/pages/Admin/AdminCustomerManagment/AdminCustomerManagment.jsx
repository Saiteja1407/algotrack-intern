import React from "react";
import { Row,Col,Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import './AdminCustomerManagment.css';
import Table from 'react-bootstrap/Table';
import { verifiedcustomers } from "../../Customer/CustomerMainScreen/orderdummydata";

let AdminCustomerManagment = () =>{

     function handleDelete(){
      // delete customer entry from data base
     }


    return(
        <>
          <Container>
             
              <Row>
                 <Row >
                    <Col xs={12} md={6} className="customermanagmentcoloumn mt-3">Customers Managment</Col>
                 </Row>
                 <Row className="mt-4">
                 
                 <Table striped="columns" bordered hover size="lg" variant="Secondary" className="shadow-lg" responsive>
      
                    <thead size="lg" className="fs-4" >
                      <tr>
                         <th >Customer Id</th>
                         <th >Name    </th>
                         <th >Company Name</th>
                         <th >Designation</th>
                         <th > Mobile Number</th>
                         <th > Email ID</th>    
                         <th>    </th>
                       </tr>
                    </thead>
                     <tbody className="center" size="lg">
                     { verifiedcustomers.map((val) =>(
                           <tr>
                            <><td>{val.customerid}</td>
                            <td>{val.customername}</td>
                            <td>{val.customercompanyname}</td>  
                            <td>{val.customerdesignation}</td> 
                            <td>{val.customermobilenumber}</td> 
                            <td>{val.customeremailid}</td>
                            <td> <Button onClick={handleDelete} variant="danger">Delete</Button> </td> </>  
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
export default AdminCustomerManagment;