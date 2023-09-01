import React,{useState,useEffect} from "react";
import { Row,Col,Container } from "react-bootstrap";
import {useNavigate, useParams} from 'react-router-dom';
import Button from "react-bootstrap/Button";
import './CustomerMainScreen.css';
import Table from 'react-bootstrap/Table';


import axios from "axios";



let CustomerMainScreen = () =>{
  const [data,setData]= useState([]);
  const navigate = useNavigate();
  const {id}=useParams();
  
  
 const handleClick=(id)=>{
    
    try {
      navigate(`/customer/order/details/${id}`);
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  
 }
  

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/customer/mainscreen/${id}`);
            setData(response.data.data);
            console.log(response.data.data)
        } catch (error) {
            console.log(error);
        }
    };

    fetchData();
}, [id]);

   const placeNewOrder=()=>{
       navigate(`/customer/mainscreen1`)
   }

    return(
        <>
          <Container className="mb-5">
              <Row className="mt-3 mb-3">
               
                <Col xs={12} md={3} className="ms-auto">
                  <Button onClick={placeNewOrder} variant="warning" size="lg" className="placeaneworderbutton m-3 shadow-lg">Place a New Order</Button>
                </Col>
              </Row>

              <Row>
                 <Row >
                    <Col xs={12} md={6} className="yourorderscoloumn">Your Orders</Col>
                 </Row>
                 <Row className="mt-4">
                 
                 <Table striped="columns" bordered hover size="lg" variant="Secondary" className="shadow-lg" responsive>
      
                    <thead size="lg" className="h5" >
                      <tr>
                         <th className="text-center">Order Id</th>
                         <th className="text-center">Product Name</th>
                         <th className="text-center">Product Units</th>
                         <th className="text-center">Ordered Date</th>
                         <th className="text-center"> Order Status</th>
                         <th ></th>
                       </tr>
                    </thead>
                     <tbody className="center" size="lg">
                     { data.map((val) =>(
                           <tr>
                            <>
                            <td className="text-center">{val.order_id}</td>
                            <td className="text-center">{val.product_details}</td>
                            <td className="text-center">{val.product_units}</td>  
                            <td className="text-center">{val.order_placed_date}</td> 
                            <td className="text-center">{val.order_status}</td> 
                            <td className="text-center"> <Button  onClick={()=>handleClick(val.order_id)} variant="danger">More Details</Button> </td>
                            </>  
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
export default CustomerMainScreen;

