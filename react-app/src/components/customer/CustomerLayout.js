import React from 'react'
import CustomerNavbar from './CustomerNavbar'
import CustomerFooter from './CustomerFooter'
import { Outlet } from 'react-router-dom'

const CustomerLayout = () => {
  return (
    <>
     <CustomerNavbar/>
     <main>
      <Outlet/>
     </main>
     <CustomerFooter/>
        
    </>
  )
}

export default CustomerLayout