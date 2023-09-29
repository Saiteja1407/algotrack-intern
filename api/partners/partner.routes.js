
import  express  from 'express';
import { partnerLoginController,partnerMainscreenController ,partnerOrderDetailsController,
    partnerInventoryDashboardController,partnerInventoryHistoryController, partnerInventoryDetailsController,partnerInventoryHistoryCreationController
} from './partner.controller.js';

const partnerRouter=express.Router();

partnerRouter.post('/login/partner',partnerLoginController);
partnerRouter.get('/partner/mainscreen/:id',partnerMainscreenController);
partnerRouter.get('/partner/order/details/:id',partnerOrderDetailsController);
partnerRouter.get('/partner/inventory/dashboard/:id',partnerInventoryDashboardController);
partnerRouter.get('/partner/inventory/history/:id',partnerInventoryHistoryController);
partnerRouter.get('/partner/inventory/history/creation/:id',partnerInventoryDetailsController);
partnerRouter.post('/partner/inventory/history/creation/:id',partnerInventoryHistoryCreationController);

export default partnerRouter;