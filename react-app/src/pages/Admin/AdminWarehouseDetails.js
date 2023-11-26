import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import {Carousel,Modal} from 'react-bootstrap';
import "./AdminWarehouseDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function AdminWarehouseDetails(){
  const {id,partnerId,warehouseId}=useParams();
  const [warehouseDetails,setWarehouseDetails]=useState([]);
  const [ErrorState,setErrorState]=useState(0);
  const [frozenTempData,setFrozenData]=useState();
  const [dryTempData,setDryData]=useState();
  const [chillerTempData,setChillerData]=useState();
  const[document,setDocument]=useState();

  const [imageData,setWarehouseImages]=useState([]);//images
  //carousel full size
  const [showModal, setShowModal] = useState(false); 
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [modalCarouselIndex, setModalCarouselIndex] = useState(0);


  const navigate=useNavigate();
  useEffect(()=>{
    const fetchWarehouseDetails=async()=>{
       try{
       const response= await axios.get(`${process.env.REACT_APP_API}/admin/${id}/${partnerId}/warehouse/${warehouseId}/details`,{withCredentials:true});
       setWarehouseDetails(response.data.data.results);
       setWarehouseImages(response.data.data.result);
      //  console.log(response.data.data.results[0].warehouse_license.data)
       setDocument(response.data.data.results[0]?.warehouse_license?.data);
       {response.data.data&&response.data.data.sensorData.map(sensor=>{
        if(sensor.sensor_warehouse_location==="frozen"){
          setFrozenData(sensor.temp_data);
        }
        else if(sensor.sensor_warehouse_location==="dry"){
          setDryData(sensor.temp_data);
        }
        else if(sensor.sensor_warehouse_location==="chiller"){
          setChillerData(sensor.temp_data);
        }
      })} 
            console.log(response.data.data);
        }
       catch(error){
        console.error('Error fetching order details:', error);
        if (error.request&&error.request.status===401){
          setErrorState(1)
         }
          throw error
       }
    }
      fetchWarehouseDetails();
    },[id,partnerId,warehouseId]);
  
   
  const handleEdit=async()=>{
      navigate(`/admin/${id}/updatewarehouse/${warehouseId}`,{state:{data:warehouseDetails,partnerId:partnerId}});
  }

  const bufferToBase64 = buffer => {
    return btoa(new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), ''));
  };
  if(ErrorState===1){
    navigate('/unauthorizedpage');
   }

   const openPdfInNewTab = () => {
    if (document) {
      // Convert the PDF buffer to a data URL using Uint8Array
      const uint8Array = new Uint8Array(document);
      const blob = new Blob([uint8Array], { type: 'application/pdf' });
      const dataUrl = URL.createObjectURL(blob);

      // Open the PDF in a new tab
      const newTab = window.open();
      newTab.document.write(`<iframe width='100%' height='100%' src='${dataUrl}'></iframe>`);
    }
  };

  return (
    <Container>
        <Card className="moredetails">
        <Card.Body>
      <Row>
          <Col xs={12} lg={5}>
          <Carousel className="carousel" data-bs-theme="dark">
                {imageData.length>0 && imageData.map((item, index) => {
                  
                  console.log(item.warehouse_images.data);
                  //console.log(imageUrl);
                  return (
                    <Carousel.Item key={index} 
                    onClick={() => {
    setSelectedImageIndex(index);
    setModalCarouselIndex(index);
    setShowModal(true);
  }}
  style={{ cursor: 'pointer' }}>
                      <img
                        className="d-block w-200 carousel-warehouse-imgs"
                        src={`data:image/jpeg;base64,${bufferToBase64(item.warehouse_images.data)}`}
                        alt="warehouseImage"
                        style={{
              objectFit: 'cover',
              width: '100%',
              height: '100%',
              maxHeight: '500px', // Set the maximum height if needed
            }}
                      />
                    </Carousel.Item>
                  );
                })}
              </Carousel>

              <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Body>
          <Carousel
            activeIndex={modalCarouselIndex}
            onSelect={(index) => setModalCarouselIndex(index)}
            interval={null}
          >
            {imageData.map((item, index) => (
              <Carousel.Item key={index}>
                <img
                  className="w-100"
                  src={`data:image/jpeg;base64,${bufferToBase64(item.warehouse_images.data)}`}
                  alt={`warehouse ${index + 1}`}
                  style={{ maxHeight: '80vh', objectFit: 'contain' }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
          <Button variant="secondary" onClick={() => setShowModal(false)} className="mt-2">
            Close
          </Button>
        </Modal.Body>
      </Modal>
  <br></br>
  <br></br>
  <br></br>
 
  </Col>
  <Col xs={12} lg={7}>
  
  <Card className="detailsinfo">
    <ListGroup variant="flush">
      <ListGroup.Item>Warehouse ID :{warehouseDetails.length>0 &&warehouseDetails[0].warehouse_id}</ListGroup.Item>
      <ListGroup.Item>Warehouse name :{warehouseDetails.length>0 &&warehouseDetails[0].warehouse_name}</ListGroup.Item>
      <ListGroup.Item>Warehouse Chiller price :{warehouseDetails.length>0 &&warehouseDetails[0].warehouse_price_chiller}</ListGroup.Item>
      <ListGroup.Item>Warehouse Frozen price :{warehouseDetails.length>0 &&warehouseDetails[0].warehouse_price_frozen}</ListGroup.Item>
      <ListGroup.Item>Warehouse Dry price :{warehouseDetails.length>0 &&warehouseDetails[0].warehouse_price_dry}</ListGroup.Item>
      <ListGroup.Item>Total Capacity :
     <ul>
      <li>Frozen :{warehouseDetails.length>0 &&warehouseDetails[0].total_frozen_capacity}</li>
      <li>Chiller :{warehouseDetails.length>0 &&warehouseDetails[0].total_chiller_capacity}</li>
      <li>Dry :{warehouseDetails.length>0 &&warehouseDetails[0].total_dry_capacity}</li>
     </ul></ListGroup.Item>
      <ListGroup.Item>Avaliable Capacity :
     <ul>
      <li>Frozen :{warehouseDetails.length>0 &&warehouseDetails[0].available_frozen_capacity}</li>
      <li>Chiller :{warehouseDetails.length>0 &&warehouseDetails[0].available_chiller_capacity}</li>
      <li>Dry :{warehouseDetails.length>0 &&warehouseDetails[0].available_dry_capacity}</li>
     </ul></ListGroup.Item>
     <ListGroup.Item>Storage Units :{warehouseDetails.length>0 &&warehouseDetails[0].warehouse_UOM}</ListGroup.Item>
     <ListGroup.Item>Frozen Space Temperature: {frozenTempData&& frozenTempData}</ListGroup.Item>
      <ListGroup.Item>Dry Space Temperature: {dryTempData&& dryTempData} </ListGroup.Item>
      <ListGroup.Item>Chiller Space Temperature: {chillerTempData&& chillerTempData} </ListGroup.Item>
            <ListGroup.Item>License document :{document ?
                                (
                                  <a className='pdf-view' onClick={openPdfInNewTab}>View PDF</a>
                                ) 
                                : 
                                (
                                  <p>No PDF available</p>
                                )}</ListGroup.Item>
      {/* <ListGroup.Item>Contract document :</ListGroup.Item> */}
    </ListGroup>
    <div className="admin-warehouse-details-buttons">

    <Button onClick={()=>{handleEdit()}} className='contact-now col-5 col-sm-4 col-md-3 m-2' variant="secondary">Edit details</Button>
    <Button className='contact-now col-5 col-sm-4 col-md-3 m-2' variant="secondary">Add Sensor Device</Button>
    <Button className='contact-now col-5 col-sm-4 col-md-3 m-2' variant="secondary">View Sensor Devices</Button>
    </div>
    </Card>
  </Col>
  </Row>
  </Card.Body>

        </Card>
        </Container>
      );
    }


export default AdminWarehouseDetails;


