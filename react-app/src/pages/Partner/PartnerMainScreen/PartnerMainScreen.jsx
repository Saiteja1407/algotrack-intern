// import React from "react";
// import { Row,Col,Container } from "react-bootstrap";
// import Button from "react-bootstrap/Button";
// import './PartnerMainScreen.css';
// import Table from 'react-bootstrap/Table';
// import { conformedorders } from "../../Customer/CustomerMainScreen/orderdummydata";
// import { useNavigate } from "react-router-dom";


// let PartnerMainScreen = () =>{

//        const Navigate=useNavigate();
//        function handleClick(){
//            Navigate('/partner/order/details');
//        }

//        function handleViewWarehouses(){
//          Navigate('/partner/warehouses');
//        }

//     return(
//         <>
//           <Container>
//               <Row className="mt-3 mb-3">
                
//                 <Col xs={12} md={3} className="ms-auto">
//                   <Button onClick={handleViewWarehouses} variant="warning" size="lg" className="viewallwarehousesbutton m-3 shadow-lg">View All WareHouses</Button>
//                 </Col>
//               </Row>

//               <Row>
//                  <Row >
//                     <Col xs={12} md={6} className="ordersdashboardcoloumn">Orders Dash Board</Col>
//                     <Col xs={12} md={6} className="searchyourorderidcolouumn">{/* Search Bar Will Go Here */}</Col>
//                  </Row>
//                  <Row className="mt-4">
                 
//                  <Table striped="columns" bordered hover size="lg" variant="Secondary" className="shadow-lg" responsive>
      
//                     <thead size="lg" className="fs-4" >
//                       <tr>
//                          <th >Order Id</th>
//                          <th>Ware House ID</th>
//                          <th >U.O.M</th>
//                          <th >Product Name</th>
//                          <th >Product Units</th>
//                          <th ></th>
//                        </tr>
//                     </thead>
//                      <tbody className="center" size="lg">
//                      {conformedorders.map((val) =>(
//                            <tr>
//                             <><td>{val.orderid}</td>
//                             <td>{val.warehouseid}</td>
//                             <td>{val.uom}</td>
//                             <td>{val.productname}</td>  
//                             <td>{val.productunits}</td> 
//                             <td> <Button onClick={handleClick} variant="danger">View Details</Button> </td> </>  
//                             </tr> 
//                      ))} 
//                      </tbody>
//                    </Table>
                   
//                  </Row>
//               </Row>

//           </Container>   

//         </>
//     );
// }
// export default PartnerMainScreen;



import React, { useEffect, useState } from "react";
import { Row,Col,Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import './PartnerMainScreen.css';
import Table from 'react-bootstrap/Table';
import { useNavigate } from "react-router-dom";
import axios from "axios";

let PartnerMainScreen = () =>{
    const [confirmedOrderData,setConfirmedOrderData]=useState([])
    const Navigate=useNavigate();
    useEffect(() => {
      const fetchOrderDetails = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API}/partner/mainscreen`);
          setConfirmedOrderData(response.data.data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchOrderDetails();
    }, []);
       
       function handleClick(id){
           Navigate(`/partner/order/details/${id}`);
       }

       function handleViewWarehouses(){
         Navigate('/partner/warehouses');
       }

     
    return(
        <>
          <Container>
              <Row className="mt-3 mb-3">
                
                <Col xs={12} md={3} className="ms-auto">
                  <Button onClick={handleViewWarehouses} variant="warning" size="lg" className="viewallwarehousesbutton m-3 shadow-lg">View All WareHouses</Button>
                </Col>
              </Row>

              <Row>
                 <Row >
                    <Col xs={12} md={6} className="ordersdashboardcoloumn">Orders Dash Board</Col>
                    <Col xs={12} md={6} className="searchyourorderidcolouumn">{/* Search Bar Will Go Here */}</Col>
                 </Row>
                 <Row className="mt-4">
                 
                 <Table striped="columns" bordered hover size="lg" variant="Secondary" className="shadow-lg" responsive>
      
                    <thead size="lg" className="fs-4" >
                      <tr>
                         <th >Order Id</th>
                         <th>Ware House ID</th>
                         <th >U.O.M</th>
                         <th >Product Name</th>
                         <th >Product Units</th>
                         <th ></th>
                       </tr>
                    </thead>
                     <tbody className="center" size="lg">
                     {confirmedOrderData.map((val) =>(
                           <tr>
                            <><td>{val.orderid}</td>
                            <td>{val.warehouseid}</td>
                            <td>{val.uom}</td>
                            <td>{val.productname}</td>  
                            <td>{val.productunits}</td> 
                            <td> <Button onClick={()=>handleClick(confirmedOrderData.order_id)} variant="danger">View Details</Button> </td> </>  
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
export default PartnerMainScreen;