import React,{useEffect,useState} from "react";
import { Row,Col,Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import './CustomerInventoryDashboard.css';
import Table from 'react-bootstrap/Table';
import { useNavigate,useParams,useLocation } from "react-router-dom";
import axios from "axios";
import SearchBar from "../../../components/SearchBar";


let CustomerInventoryDashboard = () =>{
     // searchbar
  const [orders, setOrders] = useState([]);             // Holds all orders
  const [filteredOrders, setFilteredOrders] = useState([]);// Holds filtered orders
  const [searchQuery, setSearchQuery] = useState(''); 
  const location =useLocation();     // Holds the search query
  const {productUnits}=location.state;
      
            const Navigate=useNavigate();
            const {id,orderId}=useParams();
            const [inventoryTable,setInventoryTable]=useState([]);
            const [ErrorState,setErrorState]=useState(0)
            
          useEffect(() => {
             const fetchOrderDetails = async () => {
               try {
                 const response = await axios.get(`${process.env.REACT_APP_API}/customer/${id}/inventory/dashboard/${orderId}`,{withCredentials:true});
                 setInventoryTable(response.data.data);
                 setOrders(response.data.data);
                 setFilteredOrders(response.data.data);
                 //console.log(response.data.data[0])
               } catch (error) {
                 console.error('Error fetching order details:', error.request.status);
                 if (error.request && error.request.status===401){
                  setErrorState(1)
                 }
               }
             };
         
             fetchOrderDetails();
           }, [orderId]);
      
            // Handle changes in the search bar input
  const handleSearchChange = (e) => {
    const searchQuery = e.target.value;
    setSearchQuery(searchQuery);
    filterOrders(searchQuery);
  };

    // Filter orders based on the search query
    const filterOrders = (searchQuery) => {
      const filteredOrders = orders.filter((inventory) =>
        inventory.inventory_id.toString().includes(searchQuery)
      );
      setFilteredOrders(filteredOrders);
    };

      function handleClick(inventoryId){
         Navigate(`/customer/${id}/inventory/history/${inventoryId}`,{state:{balanceInvUnits:inventoryTable&&inventoryTable[0].balance_inventory_units}});
      }
      if(ErrorState===1){
        Navigate('/unauthorizedpage');
      }
    return(
        <>
          <Container className="mb-4">
          <Row className="mb-0">
             <SearchBar PlaceHolder="serach by order ID" value={searchQuery} onChange={handleSearchChange}/>
          </Row>
              <Row>
                 <Row>
                    <Col xs={10} md={6} className="inventorydetailscoloumn mx-auto">Inventory DashBoard</Col>
                 </Row>
                 <div className="customerorderdetails bg-body-secondary rounded px-4">
                 <Row className="mt-3 ms-2">
                    <Col xs={12} md={6}> Order Id :{id} </Col>     {/* data from database */}
                 </Row>
                 <Row className="mt-3 ms-2">
                    <Col xs={12} md={6}> Total Order Units : {productUnits}</Col>  {/* data from database */}
                    <Col xs={12} md={6}> Space Remaining for no.of Units:{inventoryTable.length > 0 && inventoryTable[0].space_remaining_order}</Col>   {/* data from database */}
                 </Row>
                 

                 <Row className="mt-4">
                 
                 <Table  bordered hover size="lg" variant="white" className="shadow-lg" responsive>
      
                    <thead size="lg" className="h5" >
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
                     { filteredOrders&&filteredOrders.map((val) =>(
                           <tr>
                            <><td>{val.inventory_id}</td>
                            <td>{val.total_inventory_units}</td>
                            <td>{val.balance_inventory_units}</td>  
                            <td>{val.batch_number}</td> 
                            <td>{val.inventory_arrived_date_time}</td> 
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