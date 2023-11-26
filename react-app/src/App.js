import {BrowserRouter,Routes,Route} from "react-router-dom";
import './App.css';
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import EmailVerification from "./pages/Customer/signUp/Email/EmailVerification";
import MobileVerification from "./pages/Customer/signUp/Mobile/MobileVerification";
import 'bootstrap/dist/css/bootstrap.min.css';
import MobileLogin from "./pages/Customer/login/MobileLogin";
import EmailLogin from "./pages/Customer/login/EmailLogin";
import CustomerWarehouseDetails from "./pages/Customer/NewOrder/CustomerWarehouseDetails";
import SearchedLocations from "./pages/Customer/NewOrder/SearchedLocations";
import PartnerWarehouses from "./pages/Partner/PartnerWarehouses/PartnerWarehouses";
import PartnerLogin from "./pages/Partner/PartnerLogin";
import PartnerOnboarding from "./pages/Admin/PartnerOnboarding/PartnerOnboarding";
import AdminLogin from "./pages/Admin/AdminLogin/AdminLogin";
import CustomerRegistration from "./pages/Customer/signUp/CustomerRegistration";
import MainScreen2 from "./pages/Customer/NewOrder/MainScreen2";
import CustomerMainScreen from "./pages/Customer/CustomerMainScreen/CustomerMainScreen";
import CustomerInventoryDashboard from "./pages/Customer/CustomerInventoryDashboard/CustomerInventoryDashboard";
import CustomerInventoryHistory from "./pages/Customer/CustomerInventoryHistory/CustomerInventoryHistory";
import PartnerMainScreen from "./pages/Partner/PartnerMainScreen/PartnerMainScreen";
import PartnerInventoryDashboard from "./pages/Partner/PartnerInventoryDashboard/PartnerInventoryDashboard";
import PartnerInventoryHistory from "./pages/Partner/PartnerInventoryHistory/PartnerInventoryHistory";
import AdminCustomerManagment from "./pages/Admin/AdminCustomerManagment/AdminCustomerManagment";
import AdminCustomerVerification from "./pages/Admin/AdminCustomerVerification/AdminCustomerVerification";
import AdminOrdersDashboard from "./pages/Admin/AdminOrdersDashboard/AdminOrdersDashboard";
import CustomerLayout from "./components/customer/CustomerLayout";
import PartnerLayout from './components/partner/PartnerLayout';
import MainScreen1 from "./components/MainScreen1";
import AddSensor from "./pages/Admin/AddSensor/AddSensor";
import UpdateSensor from "./pages/Admin/UpdateSensor/UpdateSensor";
import InventoryCreation from "./pages/Partner/InvetoryCreation/InventoryCreation";
import InventoryHistoryCreation from "./pages/Partner/InventoryHistoryCreation/InventoryHistoryCreation";
import AdminWarehouses from "./pages/Admin/AdminWarehouses/AdminWarehouses";

import AddWarehouse from "./pages/Admin/AddWarehouse/AddWarehouse";
// import ButtonComponent from "./components/ButtonComponent";
// import PartnerWarehouseDetails from "./pages/Partner/PartnerWarehouseDetails/PartnerWarehouseDetails";
// import AdminWarehouseDetails from "./pages/Admin/AdminWarehouseDetails";
// import PartnerWarehouseDetails from "./pages/Partner/PartnerWarehouseDetails";
import UpdateWarehouseDetails from './pages/Admin/UpdateWarehouseDetails/UpdateWarehouseDetails';
import FacilityOnboarding from "./pages/Admin/FacillityOnboarding/FacilityOnboarding";
import AdminSensorDevices from "./pages/Admin/AdminSensorDevices/AdminSensorDevices";
import AdminWarehouseDetails from "./pages/Admin/AdminWarehouseDetails";
import PartnerWarehouseDetails from "./pages/Partner/PartnerWarehouseDetails/PartnerWarehouseDetails";
import CustomerOrderDetails from "./pages/Customer/CustomerOrderDetails/CustomerOrderDetails";
import PartnerOrderDetails from "./pages/Partner/PartnerOrderDetails/PartnerOrderDetails";
import AdminOrderDetails from "./pages/Admin/AdminOrderDetails/AdminOrderDetails";
import AdminNavbar from "./components/admin/AdminNavbar";
import CustomerMainScreen1 from "./pages/Customer/NewOrder/CustomerMainScreen1";
import AdminPartnerManagement from "./pages/Admin/AdminPartnerManagement/AdminPartnerManagement";
import Unauthorized from "./pages/unauthorized";
import Logout  from "./pages/logout/logout.js";
import PlaceOrderDetails from "./pages/Customer/NewOrder/placeOrder.js";
import UnauthorizedPage from "./pages/Admin/Alert/alert.jsx";
import CustomerProfile from "./pages/Customer/CustomerProfile/CustomerProfile.js";
import PartnerProfile from "./pages/Partner/PartnerProfile/PartnerProfile.js";
function App() {
  return (
    <>
    
    <BrowserRouter>
      <Routes>

      {/* home page routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
        </Route>
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/unauthorizedpage" element={<UnauthorizedPage/>}/>

         {/* sign up, login and REGISTRATION for customer */}
        <Route path="/signup/mobile" element={<MobileVerification/>}/>
        <Route path="/signup/email" element={<EmailVerification/>}/>
        <Route path="/login/customer/mobile" element={<MobileLogin/>}/>
        <Route path="/login/customer/email" element={<EmailLogin/>} />
        <Route path="/customer/registration" element={<CustomerRegistration/>}/>
        <Route path="/unauthorized" element={<Unauthorized/>}/>
        
        {/* ------customer routes----- */}
        <Route path="/customer/" element={<CustomerLayout/>}>
         {/* <Route path="mainscreen/:id" element={<CustomerMainScreen/>}/> */}
         <Route path="mainscreen/:id" element={<CustomerMainScreen/>}/>
          {/* <Route  element={<ProtectedRoute/>}> */}
          <Route exact path=":id/order/details/:orderId" element={<CustomerOrderDetails/>}/>
          <Route exact path=":id/:warehouseId/placeOrder" element={<PlaceOrderDetails/>}/>
          
          <Route path=":id/mainscreen1" element={<CustomerMainScreen1/>}/>
          {/* </Route> */}
          <Route path=":id/mainscreen2" element={<MainScreen2/>}/>
          <Route path=":id/searchedlocations" element={<SearchedLocations/>}/>
          <Route path=":id/:warehouseId" element={<CustomerWarehouseDetails/>}/>
          <Route path=":id/inventory/dashboard/:orderId" element={<CustomerInventoryDashboard/>}/>
          <Route path=":id/inventory/history/:inventoryId" element={<CustomerInventoryHistory/>}/>
          <Route path=":id" element={<CustomerProfile/>}/>
          <Route path="*" element={<NoPage />} />
        </Route>

        <Route path="/login/partner" element={<PartnerLogin/>}/>

        {/* ----------partner routes------ */}
        <Route path="/partner/" element={<PartnerLayout/>}>

        <Route path="mainscreen/:id" element={<PartnerMainScreen/>}/>
        <Route path=":id/warehouses" element={<PartnerWarehouses/>}/>
        <Route path=":id/:warehouseId" element={<PartnerWarehouseDetails/>}/>
  {/* pending      <Route path="sensordevices" element={<PartnerSensorDevices/>}/> */}
        <Route path=":id/order/details/:orderId" element={<PartnerOrderDetails/>}/>
        <Route path=":id/inventory/dashboard/:orderId" element={<PartnerInventoryDashboard/>}/>
        <Route path=":id/inventory/history/:inventoryId" element={<PartnerInventoryHistory/>}/>
        <Route path=":id/inventory/creation/:orderId" element={<InventoryCreation/>}/>
        <Route path=":id/inventory/history/creation/:inventoryId" element={<InventoryHistoryCreation/>}/>
        <Route path=":id" element={<PartnerProfile/>}/>
        </Route>



        <Route path="/login/admin" element={<AdminLogin/>}/>
        
        {/* ---- admin routes------ */}   
        {/* ADMIN LAYOUT PENDING */}
        <Route path="/admin/" element={<AdminNavbar/>}>

   {/* pending     <Route path="mainscreen" element={<AdminMainScreen/>}></Route> */}
        <Route path=":id/orders/dashboard" element={<AdminOrdersDashboard/>}/>
        <Route path=":id/order/details/:orderId" element={<AdminOrderDetails/>}/>
        <Route path=":id/:partnerId/warehouses" element={<AdminWarehouses/>}/>
        <Route path=":id/:partnerId/warehouse/:warehouseId/details" element={<AdminWarehouseDetails/>}/>
        <Route path="/admin/sensordevices" element={<AdminSensorDevices/>}/>
        <Route path=":id/:partnerId/addwarehouse" element={<AddWarehouse/>}/>
        <Route path=":id/updatewarehouse/:warehouseId" element={<UpdateWarehouseDetails/>}/>
        <Route path=":id/customer/management" element={<AdminCustomerManagment/>}/>
        <Route path=":id/partner/management/" element={<AdminPartnerManagement/>}/>
        <Route path=":id/customer/verification/" element={<AdminCustomerVerification/>}/>
        <Route path=":id/partneronboarding" element={<PartnerOnboarding/>}/>
        <Route path=":id/facilityonboarding/:partnerId" element={<FacilityOnboarding/>}/>
        <Route path="addsensor" element={<AddSensor/>}/>
        <Route path="updatesensor" element={<UpdateSensor/>}/>
        </Route>
        
        
        
        
        
        
        
        <Route path="/admin/:id/customer/management" element={<AdminCustomerManagment/>}/>
        <Route path="/admin/:id/customer/verification" element={<AdminCustomerVerification/>}/>
        <Route path="/admin/orders/dashboard" element={<AdminOrdersDashboard/>}/>
        
        
        {/* <Route path="/button" element={<ButtonComponent/>}/> */}
        
        
      




      </Routes>
      
    </BrowserRouter>
    </>
    
  );
}

export default App;