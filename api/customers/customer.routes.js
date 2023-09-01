import  express  from "express";
import { signUpMobileController, createUser, signUpEmailController,
    loginCustomerEmailController,loginCustomerMobileController, 
    CustomerOrdersDashboardController,CustomerOrderDetailsController 
    ,CustomerInventoryDashboardController,CustomerInventoryHistoryController
    ,CustomerMainscreen1Controller,CustomerMainscreen2Controller} from "./customer.controller.js";

const mysqlRouter=express.Router();
mysqlRouter.post('/',createUser);
mysqlRouter.post('/signup/mobile',signUpMobileController);
mysqlRouter.post('/signup/email',signUpEmailController);
mysqlRouter.post('/login/customer/email', loginCustomerEmailController);
mysqlRouter.post('/login/customer/mobile',loginCustomerMobileController);
mysqlRouter.get('/customer/mainscreen/:id',CustomerOrdersDashboardController);
mysqlRouter.get('/customer/mainscreen1',CustomerMainscreen1Controller);
mysqlRouter.get('/customer/mainscreen2',CustomerMainscreen2Controller);
mysqlRouter.get('/customer/order/details/:id',CustomerOrderDetailsController);
mysqlRouter.get('/customer/inventory/dashboard/:id',CustomerInventoryDashboardController);
mysqlRouter.get('/customer/inventory/history/:id',CustomerInventoryHistoryController);
export default mysqlRouter;