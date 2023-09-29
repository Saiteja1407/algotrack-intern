import React,{useState,useEffect} from "react";
import { Row,Col,Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import './PartnerInventoryDashboard.css';
import Table from 'react-bootstrap/Table';
import { inventorydetails } from "../../Customer/CustomerMainScreen/orderdummydata";
import { useNavigate,useParams } from 'react-router-dom';
import axios from "axios";
import SearchBar from "../../../components/SearchBar";

let PartnerInventoryDashboard = () =>{

       // searchbar
  const [orders, setOrders] = useState([]);             // Holds all orders
  const [filteredOrders, setFilteredOrders] = useState([]);// Holds filtered orders
  const [searchQuery, setSearchQuery] = useState('');      // Holds the search query

            const Navigate=useNavigate();
            const {id}=useParams();
            const [inventoryTable,setInventoryTable]=useState([]);
     function handleInventoryHistory(id){
             Navigate(`/partner/inventory/history/${id}`);
     }

     function handleEditInventory(id){
           Navigate(`/partner/inventory/history/creation/${id}`);
     }
    
    
     
   useEffect(() => {
      const fetchOrderDetails = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API}/partner/inventory/dashboard/${id}`);
          setInventoryTable(response.data.data);
          setOrders(response.data.data);
          setFilteredOrders(response.data.data);
          console.log(response.data.data[0])
        } catch (error) {
          console.error('Error fetching order details:', error);
        }
      };
  
      fetchOrderDetails();
    }, [id]);

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
    


    return(
        <>
          <Container className="mb-3">
          
              <Row>
                 <Row  className="mt-3">
                    <Col xs={12} md={6} className="inventorydetailscoloumn m-2 mb-5">Inventory DashBoard</Col>
                    </Row>	
                 <Row className="mb-0">	
                    <Col>	
                    <SearchBar PlaceHolder="search by inventory ID" value={searchQuery} onChange={handleSearchChange} />	
                     </Col>
                    <Col className="ms-auto" xs={12} md={3}><Button variant="warning" size="lg" className="addinventorybutton m-auto"> Add Inventory</Button></Col>
                 </Row>
                 <div className="partnerorderdetails">
                 <Row className="mt-3">
                    <Col xs={12} md={6}> Order Id : {id}</Col>
                    
                 </Row>
                 <Row className="mt-3">
                    <Col xs={12} md={6}> Total Order Units : {inventoryTable.length > 0 && inventoryTable[0].total_inventory_units}</Col>
                    <Col xs={12} md={6}> Space Remaining for no.of Units:{inventoryTable.length > 0 && inventoryTable[0].balance_inventory_units}</Col>
                 </Row>
                 </div>

                 <Row className="mt-4">
                 
                 <Table striped="columns" bordered hover size="lg" variant="Secondary" className="shadow-lg" responsive>
      
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
                         <th>    </th>
                       </tr>
                    </thead>
                     <tbody className="center" size="lg">
                     { filteredOrders.map((val) =>(
                           <tr key={val.inventoryid}>
                            <><td>{val.inventory_id}</td>
                            <td>{val.total_inventory_units}</td>
                            <td>{val.balance_inventory_units}</td>  
                            <td>{val.batch_number}</td> 
                            <td>{val.inventory_arrived_date_time}</td> 
                            <td>{val.ageing} days</td>
                            <td>{val.temperaturedata}</td>
                            <td> <Button onClick={()=>handleInventoryHistory(val.inventory_id)} variant="danger">Inventory History</Button> </td>
                            <td> <Button onClick={()=>handleEditInventory(val.inventory_id)} variant="danger"> Edit Inventory</Button> </td>
                             </>  
                            </tr>  ))} 
                        
                     </tbody>
                   </Table>
                   
                 </Row>
              </Row>
             
          </Container>   
         
        </>
    );
}
export default PartnerInventoryDashboard;