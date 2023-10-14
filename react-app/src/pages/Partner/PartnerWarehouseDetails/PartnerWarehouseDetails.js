import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Carousel } from 'react-bootstrap';
import './PartnerWarehouseDetails.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
//import axios from 'axios';

const PartnerWarehouseDetails = () => {
  

  // using arrays
  const warehouseData = [
    {
      warehouseName: 'Uncle Warehouse',
      warehouseLocation: 'Delhi',
      storageType: 'pallets',
      totalSpaceFrozen: 10,
      totalSpaceChiller: 30,
      totalSpaceDry: 20,
      availableSpaceFrozen: 10,
      availableSpaceChiller: 30,
      availableSpaceDry: 20,
      allowedProducts: 'Chocolate',
      warehouseTempdata: '20',
      licenseDocument: 'Okay',
      contractDocument:'',
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
                <Carousel interval={100} className="carousel" style={{borderRadius:'0.25rem'}} data-bs-theme="dark">
                  {warehouseData[0].images.map((image, imgIndex) => (
                    <Carousel.Item key={imgIndex}>
                      <img
                        style={{borderRadius:'0.25rem'}}
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
                        <ListGroup.Item>Storage Type: {warehouse.storageType}</ListGroup.Item>
                        <ListGroup.Item>
                          Total space:
                          <ul>
                            <li>Frozen: {warehouse.totalSpaceFrozen}</li>
                            <li>Chiller: {warehouse.totalSpaceChiller}</li>
                            <li>Dry: {warehouse.totalSpaceDry}</li>
                          </ul>
                        </ListGroup.Item>
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
                        <ListGroup.Item>License document:{warehouse.licenseDocument} </ListGroup.Item>
                        <ListGroup.Item>Contract document: {warehouse.contractDocument}</ListGroup.Item>
                      </React.Fragment>
                    ))}
                  </ListGroup>

                  <Button className="contact-now col-5 col-sm-4 col-md-3 m-2" variant="secondary">
                    View Sensor Devices
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

export default PartnerWarehouseDetails;