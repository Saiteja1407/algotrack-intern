import React from 'react'
import { Row,Col} from "react-bootstrap";
import Button from "react-bootstrap/Button";

const ButtonComponent = () => {
  return (
    <>
         <Col className="ms-auto" xs={12} md={3}><Button variant="warning" size="lg" className="addinventorybutton m-auto"> Add Inventory</Button></Col>
    </>
  )
}

export default ButtonComponent;