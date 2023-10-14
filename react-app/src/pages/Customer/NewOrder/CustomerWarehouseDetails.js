import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Carousel } from 'react-bootstrap';
import './CustomerWarehouseDetails.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
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

  // using arrays
  const warehouseData = [
    {
      warehouseName: 'Uncle Warehouse',
      warehouseLocation: 'Delhi',
      warehousePrice: 'Dho Sav',
      availableSpaceFrozen: 10,
      availableSpaceChiller: 30,
      availableSpaceDry: 20,
      allowedProducts: 'Chocolate',
      warehouseTempdata: '20',
      licenseDocument: 'Okay',
      images: [
        'https://www.shutterstock.com/shutterstock/photos/1929800966/display_1500/stock-photo-interior-of-a-modern-warehouse-storage-of-retail-shop-with-pallet-truck-near-shelves-1929800966.jpg',
        'https://www.shutterstock.com/shutterstock/photos/1929800966/display_1500/stock-photo-interior-of-a-modern-warehouse-storage-of-retail-shop-with-pallet-truck-near-shelves-1929800966.jpg',
        'https://www.shutterstock.com/shutterstock/photos/1929800966/display_1500/stock-photo-interior-of-a-modern-warehouse-storage-of-retail-shop-with-pallet-truck-near-shelves-1929800966.jpg',
      ],
    },
  ];

  return (
    <>
      <Container>
        <Card className="moredetails">
          <Card.Body>
            <Row>
              <Col xs={12} lg={5}>
                <Carousel className="carousel" data-bs-theme="dark">
                  {warehouseData[0].images.map((image, imgIndex) => (
                    <Carousel.Item key={imgIndex}>
                      <img
                        className="d-block w-100 carousel-warehouse-imgs"
                        src={image}
                        alt={`Warehouse Image ${imgIndex}`}
                        key={imgIndex}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </Col>
              <Col xs={12} lg={7}>
                <Card className="detailsinfo">
                  <ListGroup variant="flush">
                    {warehouseData.map((warehouse, index) => (
                      <React.Fragment key={index}>
                        <ListGroup.Item>Warehouse name: {warehouse.warehouseName}</ListGroup.Item>
                        <ListGroup.Item>Warehouse location: {warehouse.warehouseLocation}</ListGroup.Item>
                        <ListGroup.Item>Warehouse price: {warehouse.warehousePrice}</ListGroup.Item>
                        <ListGroup.Item>
                          Avaliable space:
                          <ul>
                            <li>Frozen: {warehouse.availableSpaceFrozen}</li>
                            <li>Chiller: {warehouse.availableSpaceChiller}</li>
                            <li>Dry: {warehouse.availableSpaceDry}</li>
                          </ul>
                        </ListGroup.Item>
                        <ListGroup.Item>Warehouse temperature data: {warehouse.warehouseTempdata}</ListGroup.Item>
                        <ListGroup.Item>Allowed products: {warehouse.allowedProducts}</ListGroup.Item>
                        <ListGroup.Item>License document: <input type='checkbox'/></ListGroup.Item>
                      </React.Fragment>
                    ))}
                  </ListGroup>

                  <Button onClick={handleContact} className="contact-now col-5 col-sm-4 col-md-3 m-2" variant="secondary">
                    Contact Now
                  </Button>
                </Card>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default CustomerWarehouseDetails;