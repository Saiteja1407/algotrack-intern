import React from 'react'
import PartnerNavbar from './PartnerNavbar'
import PartnerFooter from './PartnerFooter'
import { Outlet } from 'react-router-dom'

const PartnerLayout = () => {
  return (
    <>
        <PartnerNavbar/>
        <main>
            <Outlet/>
        </main>
        <PartnerFooter/>
    </>
  )
}

export default PartnerLayout