import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const SearchBar = () => {
  return (
    <>
        

       <div className='city-search'>
            <Form className="d-flex ms-auto  search col-md-8 col-lg-6 col-xl-5">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-4 ms-5"
              aria-label="Search"
            />
            <Button variant="dark">Search</Button>
          </Form>
       </div>
    </>
  )
}

export default SearchBar