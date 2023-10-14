import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "./AdminWarehouses.css";
import { Link, useNavigate, useParams } from 'react-router-dom';
import SearchBar from '../../../components/SearchBar';
import axios from 'axios';

const AdminWarehouses = () => {
  const {id,partnerId}=useParams();
  const [warehouses,setWarehouses]=useState([]);
  const navigate=useNavigate();

  const fetchPartnerWarehouses=async()=>{
    try {
      const response= await axios.get(`${process.env.REACT_APP_API}/admin/${id}/${partnerId}/warehouses`);
      setWarehouses(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
       fetchPartnerWarehouses();
  },[]);
    const AdminWarehousesData=[
        {
          img:'https://www.shutterstock.com/shutterstock/photos/1929800966/display_1500/stock-photo-interior-of-a-modern-warehouse-storage-of-retail-shop-with-pallet-truck-near-shelves-1929800966.jpg',
          warehouseName:'uncle warehouse',
          warehouseLocation:"Delhi",
          warehousePrice:'dho sav',
        },
        {
          img:'https://www.shutterstock.com/shutterstock/photos/1929800966/display_1500/stock-photo-interior-of-a-modern-warehouse-storage-of-retail-shop-with-pallet-truck-near-shelves-1929800966.jpg',
          warehouseName:'uncle warehouse',
          warehouseLocation:"Delhi",
          warehousePrice:'dho sav',
        },
        {
          img:'https://www.shutterstock.com/shutterstock/photos/1929800966/display_1500/stock-photo-interior-of-a-modern-warehouse-storage-of-retail-shop-with-pallet-truck-near-shelves-1929800966.jpg',
          warehouseName:'uncle warehouse',
          warehouseLocation:"Delhi",
          warehousePrice:'dho sav',
        },
        {
          img:'https://www.shutterstock.com/shutterstock/photos/1929800966/display_1500/stock-photo-interior-of-a-modern-warehouse-storage-of-retail-shop-with-pallet-truck-near-shelves-1929800966.jpg',
          warehouseName:'uncle warehouse',
          warehouseLocation:"Delhi",
          warehousePrice:'dho sav',
        }
      ]
     

      const handleWarehouseDetails=(warehouseId)=>{
          navigate(`/admin/${id}/${partnerId}/warehouse/${warehouseId}/details`);
      }

  return (
    <>

       <div className="container">
       <SearchBar/>
       
        <div className="row g-2 bg-secondary rounded">

          
        { warehouses.map(item => {
          return(
          <div className="col-sm-12 col-lg-6 ">
            <Card style={{ width: '26rem' }} className="admin-warehouses-card shadow">
        <Card.Img variant="top" src={item.img} />
        <Card.Body>
          <Card.Text>
            Warehouse Name :{item.warehouse_name}
          </Card.Text>
          <Card.Text>
            Warehouse Location :
          </Card.Text>
          <Card.Text>
            Warehouse Price :
          </Card.Text>
          <div className="m-1">
          <Button onClick={()=>{handleWarehouseDetails(item.warehouse_id)}} variant="secondary">Moredetails</Button>
          </div>
          <div className="m-1"><Button variant="secondary">Submit</Button></div>
        </Card.Body>
      </Card>
          </div>
          )
        })}

    
        </div>
       </div>

     
       

    </>
  )
}

export default AdminWarehouses;