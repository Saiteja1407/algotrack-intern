import React,{useEffect,useState} from "react";
import { Row,Col,Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import './AdminCustomerManagment.css';
import Table from 'react-bootstrap/Table';
import axios from "axios";
import {useParams} from 'react-router-dom'

let AdminCustomerManagment = () =>{
  const {id}=useParams();
  const [CustomersData,setCustomersData]=useState([])

  const fetchCustomerDetails = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/admin/${id}/customer/management`);
      setCustomersData(response.data.data);
      console.log(response.data.data)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCustomerDetails();
  }, []);


  
     async function handleDelete(customerId){
      // delete customer entry from data base
      const response= await axios.patch(`${process.env.REACT_APP_API}/admin/${id}/customer/management/${customerId}`);
      fetchCustomerDetails();
      console.log("Customer deleted successfully:", response.data);
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
                     { CustomersData.map((val) =>(
                           <tr>
                            <><td>{val.customer_id}</td>
                            <td>{val.customer_name}</td>
                            <td>{val.customer_company_name}</td>  
                            <td>{val.customer_designation}</td> 
                            <td>{val.customer_mobile}</td> 
                            <td>{val.customer_emailid}</td>
                            <td> <Button onClick={()=>handleDelete(val.customer_id)} variant="danger">Delete</Button> </td> </>  
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