import express from 'express'
import { adminLoginController, adminOrderDetailsController,
     adminOrdersDashboardController, customerManagementController, 
     updateOrderDetailsController,deleteCustomerController, customerVerificationController, verifyCustomerController,
      partnerOnboardingController, facilityOnboardingController,partnerManagementController
     ,adminWarehousesController,adminWarehouseDetailsController,adminUpdateWarehouseDetailsController } from './admin.controller.js';


const adminRouter=express.Router();

adminRouter.post('/login/admin',adminLoginController);
adminRouter.get('/admin/:id/orders/dashboard',adminOrdersDashboardController);
adminRouter.get('/admin/:id/order/details/:orderId',adminOrderDetailsController);
adminRouter.patch('/update/order/status/:id/:orderId',updateOrderDetailsController);
adminRouter.get('/admin/:id/customer/management',customerManagementController);
adminRouter.get('/admin/:id/customer/verification',customerVerificationController);
adminRouter.patch('/admin/:id/customer/verification/:customerId',deleteCustomerController);
adminRouter.post('/admin/:id/customer/verification',verifyCustomerController);
adminRouter.post('/admin/:id/partneronboarding',partnerOnboardingController);
adminRouter.post('/admin/:id/facilityonboarding/:partnerId',facilityOnboardingController);
adminRouter.patch('/admin/:id/customer/management/:customerId',deleteCustomerController);
adminRouter.get('/admin/:id/partner/management',partnerManagementController);
adminRouter.get('/admin/:id/:partnerId/warehouses',adminWarehousesController);
adminRouter.get('/admin/:id/:partnerId/warehouse/:warehouseId/details',adminWarehouseDetailsController);
adminRouter.post('/admin/:id/updatewarehouse/:warehouseId',adminUpdateWarehouseDetailsController);

export default adminRouter;