import React,{useState,useEffect} from "react";
import { Row,Col,Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import './AdminOrdersDashboard.css';
import Table from 'react-bootstrap/Table';
import { useNavigate,useParams } from "react-router-dom";
import axios from "axios";

let AdminOrdersDashboard = () =>{
   const [OrderData,setOrderData]=useState([])
    const Navigate=useNavigate();
    const {id}=useParams();
    useEffect(() => {
      const fetchOrderDetails = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API}/admin/${id}/orders/dashboard`);
          setOrderData(response.data.data);
          console.log(response.data.data)
        } catch (error) {
          console.error(error);
        }
      };

      fetchOrderDetails();
    }, [id]);
       
       function handleClick(orderId){
           Navigate(`/admin/${id}/order/details/${orderId}`);
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
                     { OrderData.map((val) =>(
                           <tr>
                            <><td>{val.order_id}</td>
                            <td>{val.product_details}</td>
                            <td>{val.product_units}</td>  
                            <td>{val.order_placed_date}</td> 
                            <td>{val.order_status}</td> 
                            <td> <Button onClick={()=>handleClick(val.order_id)} variant="danger">More Details</Button> </td> </>  
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