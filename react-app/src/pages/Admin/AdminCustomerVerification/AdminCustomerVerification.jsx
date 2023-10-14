import React,{useEffect,useState} from "react";
import { Row,Col,Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import './AdminCustomerVerification.css';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { registeredcustomers } from "../../Customer/CustomerMainScreen/orderdummydata";
import axios from "axios";
import { useParams } from "react-router-dom";

let AdminCustomerVerification = () =>{
  const [data,setData]=useState([]);
  const {id}=useParams();
  const [isChecked, setIsChecked] = useState(false);
  
  const fetchData = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API}/admin/${id}/customer/verification`);
        setData(response.data.data);
        console.log(response.data.data)
    } catch (error) {
        console.log(error);
    }
};

  
  
  function handleDelete(customerId){
        // delete customer entry from data base
        const data={
          CustomerId:customerId,
          name:"delete"
        }
        const postData = async () => {
          try {
            const response = await axios.post(`${process.env.REACT_APP_API}/admin/${id}/customer/verification`, data);
            fetchData();
            return response.data
          } catch (error) {
            throw error;
          }
        };
        postData();
      }
      function handleVerification(customerId){
        const data={
          CustomerId:customerId,
          name:"verify"
        }
        const postData = async () => {
          try {
            const response = await axios.post(`${process.env.REACT_APP_API}/admin/${id}/customer/verification`, data);
            fetchData();
            return response.data
          } catch (error) {
            throw error;
          }
        };
        postData();
       }
      useEffect(() => {
        fetchData();
    }, [id]);

    return(
        <>
          <Container>
             
              <Row>
                 <Row >
                    <Col xs={12} md={6} className="customerstobeverifiedcoloumn mt-3">Customers to be Verified</Col>
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
                         <th>Verification Satus</th>
                         <th>    </th>
                       </tr>
                    </thead>
                     <tbody className="center" size="lg">
                     { data.map((val) =>(
                           <tr>
                            <><td>{val.customer_id}</td>
                            <td>{val.customer_name}</td>
                            <td>{val.customer_company_name}</td>  
                            <td>{val.customer_designation}</td> 
                            <td>{val.customer_mobile}</td> 
                            <td>{val.customer_emailid}</td>
                            <td><Button onClick={()=>handleVerification(val.customer_id)} variant="danger">Verify</Button> </td>
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
export default AdminCustomerVerification;