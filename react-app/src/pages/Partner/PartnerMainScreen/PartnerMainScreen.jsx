

import React, { useEffect, useState } from "react";
import { Row,Col,Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import './PartnerMainScreen.css';
import Table from 'react-bootstrap/Table';
import { useNavigate,useParams } from "react-router-dom";
import axios from "axios";
import SearchBar from "../../../components/SearchBar";

let PartnerMainScreen = () =>{
  const [orders, setOrders] = useState([]);             // Holds all orders
  const [filteredOrders, setFilteredOrders] = useState([]);// Holds filtered orders
  const [searchQuery, setSearchQuery] = useState('');      // Holds the search query


    const [confirmedOrderData,setConfirmedOrderData]=useState([])
    const Navigate=useNavigate();
    const {id}=useParams();
    const [ErrorState,setErrorState]=useState(0);

    
    useEffect(() => {
      const fetchOrderDetails = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API}/partner/mainscreen/${id}`,{withCredentials:true});
          setConfirmedOrderData(response.data.data);
          setOrders(response.data.data);
          setFilteredOrders(response.data.data);
          console.log(response.data.data)
        } catch (error) {
          if (error.request.status===401){
            setErrorState(1)
           }
          else{
            alert("error occured")
          }
        }
      };

      fetchOrderDetails();
    }, [id]);
       
       function handleClick(orderId){
           Navigate(`/partner/${id}/order/details/${orderId}`);
       }

       function handleViewWarehouses(){
         Navigate(`/partner/${id}/warehouses`);
       }

      // Handle changes in the search bar input
  const handleSearchChange = (e) => {
    const searchQuery = e.target.value;
    setSearchQuery(searchQuery);
    filterOrders(searchQuery);
  };

    // Filter orders based on the search query
    const filterOrders = (searchQuery) => {
      const filteredOrders = orders.filter((order) =>
        order.order_id.toString().includes(searchQuery)
      );
      setFilteredOrders(filteredOrders);
    };
    // if(ErrorState===1){
    //   alert("you are trying to access unauthorized route please login to continue");
    //   Navigate('/login/partner');
    // }
    if(ErrorState===1){
      Navigate('/unauthorizedpage');
    }
    return(
        <>
          <Container>
              <Row className="mt-3 mb-3">
              <Col className="mb-0" >{/*search bar */}
                    <SearchBar PlaceHolder="search by order ID" value={searchQuery} onChange={handleSearchChange} />
                     
                 </Col>
                <Col xs={12} md={3} className="ms-auto">
                  <Button onClick={handleViewWarehouses} variant="warning" size="lg" className="viewallwarehousesbutton m-3 shadow-lg">View All WareHouses</Button>
                </Col>
              </Row>

              <Row>
                 <Row >
                    <Col xs={12} md={6} className="ordersdashboardcoloumn">Orders Dashboard</Col>
                    <Col xs={12} md={6} className="searchyourorderidcolouumn">{/* Search Bar Will Go Here */}</Col>
                 </Row>
                 <Row className="mt-4">
                 
                 <Table striped="columns" bordered hover size="lg" variant="Secondary" className="shadow-lg" responsive>
      
                    <thead size="lg" className="fs-4" >
                      <tr>
                         <th>Order Id</th>
                         <th>Ware House ID</th>
                         <th>U.O.M</th>
                         <th>Product Name</th>
                         <th>Product Units</th>
                         <th></th>
                       </tr>
                    </thead>
                     <tbody className="center" size="lg">
                     {filteredOrders.map((val) =>(
                           <tr>
                            <td>{val.order_id}</td>
                            <td>{val.warehouse_id}</td>
                            <td>{val.product_UOM}</td>
                            <td>{val.product_details}</td>  
                            <td>{val.product_units}</td> 
                            <td> <Button onClick={()=>handleClick(val.order_id)} variant="danger">View Details</Button> </td>  
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