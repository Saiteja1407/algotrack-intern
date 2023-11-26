import  express  from "express";
import { signUpMobileController, createUser, signUpEmailController,
    loginCustomerEmailController,loginCustomerMobileController, 
    CustomerOrdersDashboardController,CustomerOrderDetailsController 
    ,CustomerInventoryDashboardController,CustomerInventoryHistoryController
    ,CustomerMainscreen1Controller,CustomerMainscreen2Controller, CustomerWarehouseDetailsController
,CustomerWarehouseSelectionController,CustomerPlaceorderController,
CityDataController,
CustomerProfileDetailsController} from "./customer.controller.js";
import { permitcustomer } from "../../middlewares/authMiddlewares.js";
import cookieParser from "cookie-parser";

const mysqlRouter=express.Router();
mysqlRouter.use(cookieParser());
mysqlRouter.post('/customer/registration',createUser);
mysqlRouter.post('/signup/mobile',signUpMobileController);
mysqlRouter.post('/signup/email',signUpEmailController);
mysqlRouter.post('/login/customer/email', loginCustomerEmailController);
mysqlRouter.post('/login/customer/mobile',loginCustomerMobileController);
mysqlRouter.get('/customer/mainscreen/:id',permitcustomer,CustomerOrdersDashboardController);
mysqlRouter.get('/customer/:id/mainscreen1',CustomerMainscreen1Controller);
mysqlRouter.post('/customer/:id/mainscreen2',CustomerMainscreen2Controller);
mysqlRouter.get('/customer/:id/order/details/:orderId',permitcustomer,CustomerOrderDetailsController);
mysqlRouter.get('/customer/:id/inventory/dashboard/:orderId',permitcustomer,CustomerInventoryDashboardController);
mysqlRouter.get('/customer/:id/inventory/history/:inventoryId',permitcustomer,CustomerInventoryHistoryController);
mysqlRouter.get('/customer/:id/:warehouseId',CustomerWarehouseDetailsController);
mysqlRouter.post('/customer/:id/:warehouseId',permitcustomer,CustomerWarehouseSelectionController);
mysqlRouter.post('/customer/:id/:warehouseId/placeOrder',permitcustomer,CustomerPlaceorderController);
mysqlRouter.get('/citydata',CityDataController);
mysqlRouter.get('/customer/:id',permitcustomer,CustomerProfileDetailsController);


export default mysqlRouter;