
import  express  from 'express';
import { partnerLoginController,partnerMainscreenController ,partnerOrderDetailsController,
    partnerInventoryDashboardController,partnerInventoryHistoryController, partnerInventoryDetailsController,partnerInventoryHistoryCreationController, partnerWarehousesController, PartnerWarehouseDetailsController, partnerInventoryCreationController, updateSpaceWarehouse, PartnerProfileDetailsController

} from './partner.controller.js';
import { permitPartner } from "../../middlewares/authMiddlewares.js";
const partnerRouter=express.Router();

partnerRouter.post('/login/partner',partnerLoginController);
partnerRouter.get('/partner/mainscreen/:id',permitPartner,partnerMainscreenController);
partnerRouter.get('/partner/:id/order/details/:orderId',permitPartner,partnerOrderDetailsController);
partnerRouter.get('/partner/:id/inventory/dashboard/:orderId',permitPartner,partnerInventoryDashboardController);
partnerRouter.get('/partner/:id/inventory/history/:inventoryId',permitPartner,partnerInventoryHistoryController);
partnerRouter.get('/partner/:id/inventory/history/creation/:inventoryId',permitPartner,partnerInventoryDetailsController);
partnerRouter.post('/partner/:id/inventory/history/creation/:inventoryId',permitPartner,partnerInventoryHistoryCreationController);
partnerRouter.get('/partner/:id/warehouses',permitPartner,partnerWarehousesController);
partnerRouter.get('/partner/:id/:warehouseId',permitPartner,PartnerWarehouseDetailsController);
partnerRouter.post('/partner/:id/inventory/creation/:orderId',permitPartner,partnerInventoryCreationController);
partnerRouter.post('/partner/:id/:warehouseId',permitPartner,updateSpaceWarehouse);
partnerRouter.get('/partner/:id',permitPartner,PartnerProfileDetailsController);
export default partnerRouter;