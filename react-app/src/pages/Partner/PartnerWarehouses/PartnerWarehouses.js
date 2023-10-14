import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './PartnerWarehouses.css';
import { useParams,useNavigate,useLocation } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import SearchBar from '../../../components/SearchBar';

const PartnerWarehouses = () => {
      const {id}=useParams();
       const navigate=useNavigate();
       const location=useLocation();
       const {formData,responseData}=location.state;
      console.log(formData,responseData);

  const WarehousesData = [
    {
      images: [
        'https://www.shutterstock.com/shutterstock/photos/1929800966/display_1500/stock-photo-interior-of-a-modern-warehouse-storage-of-retail-shop-with-pallet-truck-near-shelves-1929800966.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNsAVdYMq7cyBor4lgiY8m6PE5SrlJHdBR4g&usqp=CAU',
        'https://thumbs.dreamstime.com/b/warehouse-industrial-logistics-companies-commercial-huge-distribution-high-shelves-bottom-view-191288522.jpg'],
      warehouseName: 'uncle warehouse',
      warehouseLocation: 'Delhi',
      warehouseId: '211210054',
    },
    
    // Add more data objects as needed
  ]

  function moreDetails(warehouseId)
  {
    navigate(`/customer/${id}/${warehouseId}`,{state:{formData:formData}});
  }
  
  return (
    <>
    <div className="searchingwarehouse">
      <SearchBar PlaceHolder="serach by warehouse ID"/>
      </div>  
      <div className="container mb-4 mt-4 ">
        <div className="row g-2 " >
          {WarehousesData.map((item, index) => {
            return (
              <div className="col-sm-12 col-lg-6" key={index}>
                <Card style={{ width: '25rem', borderRadius:'2rem' }} className="card shadow">
                  <div className="carousel-container">
                    <Carousel controls={true} interval={100}>
                      {item.images.map((image, imgIndex) => (
                        <Carousel.Item key={imgIndex}>
                          <div className="image-container">
                            <img
                              className="d-block w-100 rounded-top"
                              src={image}
                              alt={`Warehouse  ${imgIndex}`}
                            />
                          </div>
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  </div>
                  <Card.Body>
                    <Card.Text>Warehouse Id: {item.warehouseId}</Card.Text>
                    <Card.Text>Warehouse Name: {item.warehouseName}</Card.Text>
                    <Card.Text>Warehouse Location: {item.warehouseLocation}</Card.Text>
                    <div className="m-1">
                      <Button onClick={()=>{moreDetails(item.warehouse_id)}} variant="secondary">More details</Button>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PartnerWarehouses;