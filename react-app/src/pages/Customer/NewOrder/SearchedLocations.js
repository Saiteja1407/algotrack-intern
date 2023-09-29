import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "./SearchedLocations.css";
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import SearchBar from "../../../components/SearchBar";

const SearchedLocations = (props) => {
       const location=useLocation();
       const {id}=useParams();
       const navigate=useNavigate();
      const { responseData } = location.state;
      console.log(responseData);
      const searchedLocationsData=[
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
      function moreDetails(warehouseId){
          navigate(`/customer/${id}/${warehouseId}`);
      }

  return (
    <>

       <div className="container mb-4">
       <SearchBar PlaceHolder='search by Inventory Id'/>
        <div className="row g-2 bg-secondary rounded">

          
        { responseData.map(item => {
          return(
          <div className="col-sm-12 col-lg-6 ">
            <Card style={{ width: '26rem' }} className="card shadow">
        <Card.Img variant="top" src={item.warehouse_images} />
        <Card.Body>
          <Card.Text>
            Warehouse Id :{item.warehouse_id}
          </Card.Text>
          <Card.Text>
            Warehouse Name :{item.warehouse_name}
          </Card.Text>
          <Card.Text>
            Warehouse Price :{item.warehouse_price}
          </Card.Text>
          <div className="m-1">
          <Button onClick={()=>{moreDetails(item.warehouse_id)}} variant="secondary">Moredetails</Button>
          </div>
          <div className="m-1"><Button variant="secondary">Place order</Button></div>
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

export default SearchedLocations