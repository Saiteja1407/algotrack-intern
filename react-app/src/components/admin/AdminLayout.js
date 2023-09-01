import React from 'react'
import AdminNavbar from './AdminNavbar'
import AdminFooter from './AdminFooter'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <>
     <AdminNavbar/>
     <main>
      <Outlet/>
     </main>
     <AdminFooter/>
        
    </>
  )
}

export default AdminLayout