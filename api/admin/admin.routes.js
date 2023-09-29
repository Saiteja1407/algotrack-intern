import express from 'express'
import { adminLoginController, adminOrderDetailsController,
     adminOrdersDashboardController, customerManagementController, 
     updateOrderDetailsController,deleteCustomerController, customerVerificationController, verifyCustomerController } from './admin.controller.js';


const adminRouter=express.Router();

adminRouter.post('/login/admin',adminLoginController);
adminRouter.get('/admin/orders/dashboard/:id',adminOrdersDashboardController);
adminRouter.get('/admin/order/details/:id',adminOrderDetailsController);
adminRouter.patch('/update/order/status/:id',updateOrderDetailsController);
adminRouter.get('/admin/customer/management/:id',customerManagementController);
adminRouter.get('/admin/customer/verification',customerVerificationController);
adminRouter.post('/admin/customer/verification',verifyCustomerController);
adminRouter.delete('/admin/customer/management/:id',deleteCustomerController);

export default adminRouter;