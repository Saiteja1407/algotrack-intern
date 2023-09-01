import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "./PartnerWarehouses.css";
import { Link } from 'react-router-dom';
import SearchBar from '../../../components/SearchBar';

const PartnerWarehouses = () => {
    const partnerWarehousesData=[
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


  return (
    <>

       <div className="container">
       <SearchBar/>
        <div className="row g-2 bg-secondary rounded">

          
        { partnerWarehousesData.map(item => {
          return(
          <div className="col-sm-12 col-lg-6 ">
            <Card style={{ width: '26rem' }} className="partner-warehouses-card shadow">
        <Card.Img variant="top" src={item.img} />
        <Card.Body>
          <Card.Text>
            Warehouse Name :{item.warehouseName}
          </Card.Text>
          <Card.Text>
            Warehouse Location :
          </Card.Text>
          <Card.Text>
            Warehouse Price :
          </Card.Text>
          <div className="m-1"><Link to="/moredetails">
          <Button variant="secondary">Moredetails</Button>
          </Link></div>
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

export default PartnerWarehouses