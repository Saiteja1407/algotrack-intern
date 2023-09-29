import React, { useEffect ,useState} from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Carousel} from 'react-bootstrap';
import "./CustomerWarehouseDetails.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate, useParams ,useLocation} from 'react-router-dom';
import axios from 'axios';

const CustomerWarehouseDetails = () => {
      const {id,warehouseId}=useParams();
      const [warehouseDetails,setWarehouseDetails]=useState([]);
      const navigate=useNavigate();
      const location=useLocation();
      const formData=location.state;
      console.log(formData);
      useEffect(()=>{
        const fetchWarehouseDetails = async () => {
          try {
            const response = await axios.get(`${process.env.REACT_APP_API}/customer/${id}/${warehouseId}`);
            setWarehouseDetails(response.data.data);
            
          } catch (error) {
            console.error('Error fetching order details:', error);
          }
        };
    
        fetchWarehouseDetails();
      },
      [id,warehouseId]);

      function handleContact(){
        const postData = async () => {
          try {
            const response = await axios.post(`${process.env.REACT_APP_API}/customer/${id}/${warehouseId}`, formData);
            const responseData = response.data.data;
            navigate(`/customer/mainscreen/${id}`);
          } catch (error) {
            throw error;
          }
        };
         postData()
      }
      
  return (
    <>
        <Container>
          <Card className="moredetails">
          <Card.Body>
        <Row>
            <Col xs={12} lg={5}>
            <Carousel className="carousel" data-bs-theme="dark">
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-warehouse-imgs"
          src="https://www.shutterstock.com/shutterstock/photos/1929800966/display_1500/stock-photo-interior-of-a-modern-warehouse-storage-of-retail-shop-with-pallet-truck-near-shelves-1929800966.jpg"
          alt="First slide"
        />
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100 carousel-warehouse-imgs"
          src="https://www.shutterstock.com/shutterstock/photos/1929800966/display_1500/stock-photo-interior-of-a-modern-warehouse-storage-of-retail-shop-with-pallet-truck-near-shelves-1929800966.jpg"
          alt="Second slide"
        />
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100 carousel-warehouse-imgs"
          src="https://www.shutterstock.com/shutterstock/photos/1929800966/display_1500/stock-photo-interior-of-a-modern-warehouse-storage-of-retail-shop-with-pallet-truck-near-shelves-1929800966.jpg"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
    <br></br>
    <br></br>
    <div className="refeerOn-services">
    <h5>Refer On Services</h5>
    <div><input type="checkbox" />   Transportation</div>
    <div><input type="checkbox" />   Cold Chain IOT's</div>
    <div><input type="checkbox" />   Tradings</div>
    </div>
    </Col>
    <Col xs={12} lg={7}>
    
    <Card className="detailsinfo">
      <ListGroup variant="flush">
        <ListGroup.Item>Warehouse name :</ListGroup.Item>
        <ListGroup.Item>Warehouse location :</ListGroup.Item>
        <ListGroup.Item>Warehouse price :</ListGroup.Item>
        <ListGroup.Item>Avaliable space :
       <ul>
        <li>Frozen :</li>
        <li>Chiller :</li>
        <li>Dry :</li>
       </ul></ListGroup.Item>
        <ListGroup.Item>Warehouse temperature data :</ListGroup.Item>
        <ListGroup.Item>Allowed products :</ListGroup.Item>
        <ListGroup.Item>License document :</ListGroup.Item>
      </ListGroup>
      
      <Button onClick={handleContact} className='contact-now col-5 col-sm-4 col-md-3 m-2' variant="secondary">Contact Now</Button>
      
      </Card>
    </Col>
    </Row>
    </Card.Body>

          </Card>
          </Container>
    </>
  )
}

export default CustomerWarehouseDetails