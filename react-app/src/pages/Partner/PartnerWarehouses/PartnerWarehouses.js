import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './PartnerWarehouses.css';
import { useParams,useNavigate} from 'react-router-dom';
import SearchBar from '../../../components/SearchBar';
import axios from 'axios';

const PartnerWarehouses = () => {
      const {id}=useParams();
       const navigate=useNavigate();
       const [warehouseDetails,setWarehouseDetails]=useState([]);
       const [ErrorState,setErrorState]=useState(0);
       
       

       useEffect(()=>{
        const fetchWarehouseDetails=async()=>{
        try{
            const response= await axios.get(`${process.env.REACT_APP_API}/partner/${id}/warehouses`,{withCredentials:true});
          setWarehouseDetails(response.data.data);
          console.log(response.data.data);
        }
        catch(error){
          if (error.request.status===401){
            setErrorState(1)
           }
          else{
            alert("error occured")
          }
        }
 
        }
          fetchWarehouseDetails();
       },[id])

  // const WarehousesData = [
  //   {
  //     images: [
  //       'https://www.shutterstock.com/shutterstock/photos/1929800966/display_1500/stock-photo-interior-of-a-modern-warehouse-storage-of-retail-shop-with-pallet-truck-near-shelves-1929800966.jpg',
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNsAVdYMq7cyBor4lgiY8m6PE5SrlJHdBR4g&usqp=CAU',
  //       'https://thumbs.dreamstime.com/b/warehouse-industrial-logistics-companies-commercial-huge-distribution-high-shelves-bottom-view-191288522.jpg'],
  //     warehouseName: 'uncle warehouse',
  //     warehouseLocation: 'Delhi',
  //     warehouseId: '211210054',
  //   },
    
  //   // Add more data objects as needed
  // ]

  function moreDetails(warehouseId)
  {
    navigate(`/partner/${id}/${warehouseId}`);
  }
  if(ErrorState===1){
    alert("please login to continue");
    navigate('/login/partner');
  }
  return (
    <>
    <div className="searchingwarehouse">
      <SearchBar PlaceHolder="serach by warehouse ID"/>
      </div>  
      <div className="container mb-4 mt-4 ">
        <div className="row g-2 " >
          {warehouseDetails.map((item) => {
            return (
              <div className="col-sm-12 col-lg-6" >
                <Card style={{ width: '25rem', borderRadius:'2rem' }} className="card shadow">
                  <div className="carousel-container">
                    {/* <Carousel controls={true} interval={100}>
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
                    </Carousel> */}
                  </div>
                  <Card.Body>
                    <Card.Text>Warehouse Id: {item.warehouse_id}</Card.Text>
                    <Card.Text>Warehouse Name: {item.warehouse_name}</Card.Text>
                    <Card.Text>Warehouse Location: {item.street}, {item.city}</Card.Text>
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