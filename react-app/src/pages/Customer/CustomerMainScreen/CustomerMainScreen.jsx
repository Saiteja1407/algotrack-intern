import React,{useState,useEffect} from "react";
import { Row,Col,Container } from "react-bootstrap";
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import Button from "react-bootstrap/Button";
import './CustomerMainScreen.css';
import Table from 'react-bootstrap/Table';
import axios from "axios";
import SearchBar from "../../../components/SearchBar";




let CustomerMainScreen = () =>{
  const [errState, setErrState] = useState(0);
  

  // searchbar
  const [orders, setOrders] = useState([]);             // Holds all orders
  const [filteredOrders, setFilteredOrders] = useState([]);// Holds filtered orders
  const [searchQuery, setSearchQuery] = useState('');      // Holds the search query


  
  const navigate = useNavigate();
  const {id}=useParams();
  const [ErrorState,setErrorState]=useState(0)
  
  
 const handleClick=(orderId)=>{
    
    try {
      navigate(`/customer/${id}/order/details/${orderId}`);
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  
 }
  

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/customer/mainscreen/${id}`,{withCredentials:true});
            setOrders(response.data.data);
          setFilteredOrders(response.data.data);
        } catch (error) {
            console.log(error.response.data);
            setErrState(1);
            if (error.request.status===401){
              setErrorState(1)
             }
        }
    };

    fetchData();
}, [id]);

   const placeNewOrder=()=>{
       navigate(`/customer/${id}/mainscreen1`)
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
    if(ErrorState===1){
      navigate('/unauthorizedpage');
    }


    if(errState===0){
      return(
      <> 
      <Container className="mb-5">
            <Row className="mt-3 mb-3">
             
              <Col xs={12} md={3} className="ms-auto">
                <Button onClick={placeNewOrder} variant="warning" size="lg" className="placeaneworderbutton m-3 shadow-lg">Place Order</Button>
              </Col>
            </Row>

            <Row>
                {(orders.length>0)?
                <>

                <Col>
                  <SearchBar PlaceHolder="serach by order ID" value={searchQuery} onChange={handleSearchChange}/>
                </Col>
               <Row>
                  <Col xs={12} md={6} className="yourorderscoloumn">Your Orders</Col>
               </Row></>:null}
                
               <Row className="mt-4">
               {(orders.length>0)?<Table  bordered hover size="lg" variant="Secondary" className="shadow-lg" responsive>
    
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
     
     { filteredOrders.map((val) =>(
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
   </Table>:<h4 className="no-customer-orders">You haven't placed orders yet</h4>}
               
                 
               </Row>
            </Row>

        </Container>
           
      
      </>
  )}
  else{
    return(<h1>Unauthorized access</h1>)
  }


    
}
export default CustomerMainScreen;

