import React,{useEffect,useState} from "react";
import { Row,Col,Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import './CustomerInventoryDashboard.css';
import Table from 'react-bootstrap/Table';
import { inventorydetails } from "../CustomerMainScreen/orderdummydata";
import { useNavigate,useParams } from "react-router-dom";
import axios from "axios";


let CustomerInventoryDashboard = () =>{
            const Navigate=useNavigate();
            const {id}=useParams();
            const [inventoryTable,setInventoryTable]=useState([]);
          useEffect(() => {
             const fetchOrderDetails = async () => {
               try {
                 const response = await axios.get(`${process.env.REACT_APP_API}/customer/inventory/dashboard/${id}`);
                 setInventoryTable(response.data.data);
                 console.log(response.data.data[0])
               } catch (error) {
                 console.error('Error fetching order details:', error);
               }
             };
         
             fetchOrderDetails();
           }, [id]);
      

      function handleClick(id){
         Navigate(`/customer/inventory/history/${id}`);
      }

    return(
        <>
          <Container className="mb-4">
          
              <Row>
                 <Row>
                    <Col xs={10} md={6} className="inventorydetailscoloumn mx-auto">Inventory DashBoard</Col>
                 </Row>
                 <div className="orderdetails bg-body-secondary rounded px-4">
                 <Row className="mt-3 ms-2">
                    <Col xs={12} md={6}> Order Id :{id} </Col>     {/* data from database */}
                 </Row>
                 <Row className="mt-3 ms-2">
                    <Col xs={12} md={6}> Total Order Units : {inventoryTable.length > 0 && inventoryTable[0].total_inventory_units}</Col>  {/* data from database */}
                    <Col xs={12} md={6}> Space Remaining for no.of Units:{inventoryTable.length > 0 && inventoryTable[0].balance_inventory_units}</Col>   {/* data from database */}
                 </Row>
                 

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
                       </tr>
                    </thead>
                     <tbody className="center" size="lg">
                     { inventoryTable.map((val) =>(
                           <tr>
                            <><td>{val.inventory_id}</td>
                            <td>{val.total_inventory_units}</td>
                            <td>{val.balance_inventory_units}</td>  
                            <td>{val.batch_number}</td> 
                            <td>{val.ariveddatetime}</td> 
                            <td>{val.ageing} days</td>
                            <td>{val.inventory_temp_data}</td>
                            <td> <Button onClick={()=>handleClick(val.inventory_id)} variant="danger">Inventory History</Button> </td> </>  
                            </tr>  ))} 
                        
                     </tbody>
                   </Table>
                   
                 </Row>
                 </div>
              </Row>
             
          </Container>   
         
        </>
    );
}
export default CustomerInventoryDashboard;