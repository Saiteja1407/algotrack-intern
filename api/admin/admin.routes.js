import express from 'express';
import { adminLoginController, adminOrderDetailsController,
     adminOrdersDashboardController, customerManagementController, 
     updateOrderDetailsController,deleteCustomerController, customerVerificationController, verifyCustomerController,
      partnerOnboardingController, facilityOnboardingController,partnerManagementController
     ,adminWarehousesController,adminWarehouseDetailsController,adminUpdateWarehouseDetailsController, deletePartnerController } from './admin.controller.js';

import { permitadmin } from '../../middlewares/authMiddlewares.js';
import multer from 'multer';
import path from "path";
const storage = multer.memoryStorage(); // Store files in memory as buffers
const upload = multer({ storage: storage });
const adminRouter=express.Router();


adminRouter.post('/login/admin',adminLoginController);
adminRouter.get('/admin/:id/orders/dashboard',permitadmin,adminOrdersDashboardController);
adminRouter.get('/admin/:id/order/details/:orderId',permitadmin,adminOrderDetailsController);
adminRouter.patch('/update/order/status/:id/:orderId',permitadmin,updateOrderDetailsController);
adminRouter.get('/admin/:id/customer/management',permitadmin,customerManagementController);
adminRouter.get('/admin/:id/customer/verification',permitadmin,customerVerificationController);
adminRouter.patch('/admin/:id/customer/verification/:customerId',permitadmin,deleteCustomerController);
adminRouter.post('/admin/:id/customer/verification',permitadmin,verifyCustomerController);
adminRouter.post('/admin/:id/partneronboarding',permitadmin,partnerOnboardingController);
adminRouter.post('/admin/:id/facilityonboarding/:partnerId',permitadmin, upload.fields([
     { name: 'facilityImages1', maxCount: 1 },
     { name: 'facilityImages2', maxCount: 1 },
     { name: 'facilityImages3', maxCount: 1 },
     { name: 'complianceDocuments', maxCount: 1 },
   ]),facilityOnboardingController);
adminRouter.patch('/admin/:id/customer/management/:customerId',permitadmin,deleteCustomerController);
adminRouter.patch('/admin/:id/partner/management/:partnerId',permitadmin,deletePartnerController);
adminRouter.get('/admin/:id/partner/management',permitadmin,partnerManagementController);
adminRouter.get('/admin/:id/:partnerId/warehouses',permitadmin,adminWarehousesController);
adminRouter.get('/admin/:id/:partnerId/warehouse/:warehouseId/details',permitadmin,adminWarehouseDetailsController);
adminRouter.post('/admin/:id/updatewarehouse/:warehouseId',permitadmin, upload.fields([
     { name: 'facilityImages1', maxCount: 1 },
     { name: 'facilityImages2', maxCount: 1 },
     { name: 'facilityImages3', maxCount: 1 },
     { name: 'complianceDocuments', maxCount: 1 },
   ]),adminUpdateWarehouseDetailsController);

export default adminRouter;