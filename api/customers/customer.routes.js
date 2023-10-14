import  express  from "express";
import { signUpMobileController, createUser, signUpEmailController,
    loginCustomerEmailController,loginCustomerMobileController, 
    CustomerOrdersDashboardController,CustomerOrderDetailsController 
    ,CustomerInventoryDashboardController,CustomerInventoryHistoryController
    ,CustomerMainscreen1Controller,CustomerMainscreen2Controller, CustomerWarehouseDetailsController
,CustomerWarehouseSelectionController} from "./customer.controller.js";
import { requireSignIn } from "../../middlewares/authMiddlewares.js";
const mysqlRouter=express.Router();
import cookieParser from "cookie-parser";

mysqlRouter.use(cookieParser());
mysqlRouter.post('/customer/registration',createUser);
mysqlRouter.post('/signup/mobile',signUpMobileController);
mysqlRouter.post('/signup/email',signUpEmailController);
mysqlRouter.post('/login/customer/email', loginCustomerEmailController);
mysqlRouter.post('/login/customer/mobile',loginCustomerMobileController);
mysqlRouter.get('/customer/mainscreen/:id',CustomerOrdersDashboardController);
mysqlRouter.get('/customer/mainscreen1',CustomerMainscreen1Controller);
mysqlRouter.post('/customer/:id/mainscreen2',CustomerMainscreen2Controller);
mysqlRouter.get('/customer/order/details/:id',CustomerOrderDetailsController);
mysqlRouter.get('/customer/inventory/dashboard/:id',CustomerInventoryDashboardController);
mysqlRouter.get('/customer/inventory/history/:id',CustomerInventoryHistoryController);
mysqlRouter.get('/customer/:id/:warehouseId',CustomerWarehouseDetailsController);
mysqlRouter.post('/customer/:id/:warehouseId',CustomerWarehouseSelectionController);
export default mysqlRouter;