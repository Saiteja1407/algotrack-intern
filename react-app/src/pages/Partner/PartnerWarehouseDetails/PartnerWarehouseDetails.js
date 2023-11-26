import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Carousel,Modal } from 'react-bootstrap';
import './PartnerWarehouseDetails.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const PartnerWarehouseDetails = () => {
   const {id,warehouseId}=useParams();
   const navigate=useNavigate();
   const [frozenTempData,setFrozenData]=useState();
   const [dryTempData,setDryData]=useState();
   const [chillerTempData,setChillerData]=useState();
   const [warehouseDetails,setWarehouseDetails]=useState([]);
   const [imageData,setWarehouseImages]=useState([]);//images
   const [ErrorState,setErrorState]=useState(0);
   //carousel full size
   const [showModal, setShowModal] = useState(false); 
   const [modalCarouselIndex, setModalCarouselIndex] = useState(0);
   const [compilanceBuffer,setCompilanceBuffer]=useState([])

   useEffect(()=>{
    const fetchWarehouseDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/partner/${id}/${warehouseId}`,{withCredentials:true});
        setWarehouseDetails(response.data.data.results);
        setWarehouseImages(response.data.data.result);
        setCompilanceBuffer(response.data.data.results[0]?.warehouse_license.data);
        {response.data.data.sensorData.forEach(sensor=>{
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
        
      } catch (error) {
        console.error('Error fetching order details:', error);
        if (error.request.status===401){
          setErrorState(1);
         }
      }
    };

    fetchWarehouseDetails();
  },
  [id,warehouseId]);
  const bufferToBase64 = buffer => {
    return btoa(new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), ''));
  };
  // using arrays
  
  const [inputs,setInputs]=useState({
    frozenSpace:'',
    drySpace:'',
    chillerSpace:''
  })

  const handleSensor=()=>{
    navigate(`/partner/${id}/${warehouseId}/sensors`);
  }
  function handleChange(e){
    const {name,value}=e.target;
    setInputs(values => ({ ...values, [name] : value}))
  }
  const handleUpdateSpace=async(e)=>{
    e.preventDefault();
     const response=await axios.post(`${process.env.REACT_APP_API}/partner/${id}/${warehouseId}`,inputs,{withCredentials:true})
     console.log(response);
     navigate(`${process.env.REACT_APP_API}/partner/${id}/warehouses`);
  }
    // const openPdfInNewTab = (compilanceBuffer) => {
    //   // Convert the PDF buffer to a data URL
    //   const pdfDataUrl = `data:application/pdf;base64,${Buffer.from(compilanceBuffer).toString('base64')}`;
  
    //   // Open the PDF in a new tab
    //   const newTab = window.open();
    //   newTab.document.write(`<iframe width='100%' height='100%' src='${pdfDataUrl}'></iframe>`);
    // };
    const openPdfInNewTab = () => {
      if (compilanceBuffer) {
        // Convert the PDF buffer to a data URL using Uint8Array
        const uint8Array = new Uint8Array(compilanceBuffer);
        const blob = new Blob([uint8Array], { type: 'application/pdf' });
        const dataUrl = URL.createObjectURL(blob);
  
        // Open the PDF in a new tab
        const newTab = window.open();
        newTab.document.write(`<iframe width='100%' height='100%' src='${dataUrl}'></iframe>`);
      }
    };
  if(ErrorState===1){
    navigate('/unauthorizedpage');
  }

  return (
    <>
      <Container>
        <Card className="moredetails">
          <Card.Body>
            <Row>
              <Col xs={12} lg={5}>
              <Carousel className="carousel" data-bs-theme="dark">
                {imageData.length>0 && imageData.map((item, index) => {
                  //console.log(imageUrl);
                  return (
                    <Carousel.Item key={index} 
                    onClick={() => {
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
                  alt={`Full-size Image ${index + 1}`}
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
              </Col>
              <Col xs={12} lg={7}>
                <Card className="detailsinfo">
                  <ListGroup variant="flush">
                    {warehouseDetails[0] && (
                      <React.Fragment>
                        <ListGroup.Item>Warehouse name: {warehouseDetails[0].warehouse_name}</ListGroup.Item>
                        <ListGroup.Item>Warehouse location: {warehouseDetails[0].street},{warehouseDetails[0].city},{warehouseDetails[0].state}</ListGroup.Item>
                        <ListGroup.Item>Storage Type: {warehouseDetails[0].warehouse_UOM}</ListGroup.Item>
                        <ListGroup.Item>
                          Total space:
                          <ul>
                            <li>Frozen: {warehouseDetails[0].total_frozen_capacity}</li>
                            <li>Chiller: {warehouseDetails[0].total_chiller_capacity}</li>
                            <li>Dry: {warehouseDetails[0].total_dry_capacity}</li>
                          </ul>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          Avaliable space:
                          <ul>
                            <li>Frozen: {warehouseDetails[0].available_frozen_capacity}</li>
                            <li>Chiller: {warehouseDetails[0].available_chiller_capacity}</li>
                            <li>Dry: {warehouseDetails[0].available_dry_capacity}</li>
                          </ul>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          Prices:
                          <ul>
                            <li>Frozen: ₹{warehouseDetails[0].warehouse_price_frozen}</li>
                            <li>Chiller: ₹{warehouseDetails[0].warehouse_price_chiller}</li>
                            <li>Dry: ₹{warehouseDetails[0].warehouse_price_dry}</li>
                          </ul>
                        </ListGroup.Item>
                        <ListGroup.Item>Frozen Space Temperature: {frozenTempData&& frozenTempData}
                        </ListGroup.Item>
                        <ListGroup.Item>Dry Space Temperature: {dryTempData&& dryTempData}
                        </ListGroup.Item>
                        <ListGroup.Item>Chiller Space Temperature: {chillerTempData&& chillerTempData}
                        </ListGroup.Item>
                        <ListGroup.Item>License document: {/* Render other components or UI */}
                                {compilanceBuffer ?
                                (
                                  <a className='pdf-view' onClick={openPdfInNewTab}>View PDF</a>
                                ) 
                                : 
                                (
                                  <p>No PDF available</p>
                                )}
                        </ListGroup.Item>
                        <ListGroup.Item>
                        <form onSubmit={handleUpdateSpace}>Available Space: 
                          <li className='mb-2'>Frozen Space:  <input type='number' onChange={handleChange} name="frozenSpace" value={inputs.frozenSpace} required/></li>
                          <li className='mb-2'>Dry Space: <input type='number' onChange={handleChange} name="drySpace" value={inputs.drySpace} required/></li>
                          <li>Chiller Space: <input type='number' onChange={handleChange} name="chillerSpace" value={inputs.chillerSpace} required/></li>
                          <Button type='submit' className='ms-3 mt-2' variant='primary'>Update Space</Button>
                        </form>
                        </ListGroup.Item>
                      </React.Fragment>
                    )}
                  </ListGroup>
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