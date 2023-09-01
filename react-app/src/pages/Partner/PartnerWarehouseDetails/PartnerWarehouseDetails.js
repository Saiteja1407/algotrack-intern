import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import {Carousel} from 'react-bootstrap';
import "./PartnerWarehouseDetails.css";

function PartnerWarehouseDetails()
{
  const carouselImages=[
    {
      id:1,
      src:"https://www.shutterstock.com/shutterstock/photos/1929800966/display_1500/stock-photo-interior-of-a-modern-warehouse-storage-of-retail-shop-with-pallet-truck-near-shelves-1929800966.jpg",
      alt:"First slide"
    },
    {
      id:2,
      src:"https://www.shutterstock.com/shutterstock/photos/1929800966/display_1500/stock-photo-interior-of-a-modern-warehouse-storage-of-retail-shop-with-pallet-truck-near-shelves-1929800966.jpg",
      alt:"Second slide"
    },
    {
      id:3,
      src:"https://www.shutterstock.com/shutterstock/photos/1929800966/display_1500/stock-photo-interior-of-a-modern-warehouse-storage-of-retail-shop-with-pallet-truck-near-shelves-1929800966.jpg",
      alt:"Third slide"
    },
    
  ]

  return (
    <Container>
        <Card className="moredetails">
        <Card.Body>
      <Row>
          <Col xs={12} lg={5}>
          <Carousel className="carousel" data-bs-theme="dark">
          {
      carouselImages.map((item)=>
          (
      <Carousel.Item>
      <img
        className="d-block w-100 carousel-warehouse-imgs"
        src={item.src}
        alt={item.alt}
      />
     
    </Carousel.Item>
          ) 
      )
     }
  </Carousel>
  <br></br>
  <br></br>
  
  
  </Col>
  <Col xs={12} lg={7}>
  
  <Card className="detailsinfo">
    <ListGroup variant="flush">
      <ListGroup.Item>Warehouse ID :</ListGroup.Item>
      <ListGroup.Item>Warehouse name :</ListGroup.Item>
      <ListGroup.Item>Warehouse price :</ListGroup.Item>
      <ListGroup.Item>Total Capacity :
     <ul>
      <li>Frozen :</li>
      <li>Chiller :</li>
      <li>Dry :</li>
     </ul></ListGroup.Item>
      <ListGroup.Item>Avaliable Capacity :
     <ul>
      <li>Frozen :</li>
      <li>Chiller :</li>
      <li>Dry :</li>
     </ul></ListGroup.Item>
     <ListGroup.Item>Storage Units :</ListGroup.Item>
      <ListGroup.Item>Warehouse temperature data :</ListGroup.Item>
      <ListGroup.Item>Allowed products :</ListGroup.Item>
      <ListGroup.Item>License document :</ListGroup.Item>
      <ListGroup.Item>Contract document :</ListGroup.Item>
    </ListGroup>
    <Button className='contact-now col-5 col-sm-4 col-md-3 m-2' variant="secondary">View Sensor Devices</Button>
    </Card>
  </Col>
  </Row>
  </Card.Body>

        </Card>
        </Container>
      );
    }


export default PartnerWarehouseDetails;