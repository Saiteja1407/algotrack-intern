
import  express  from 'express';
import { partnerLoginController,partnerMainscreenController } from './partner.controller.js';

const partnerRouter=express.Router();

partnerRouter.post('/login/partner',partnerLoginController);
partnerRouter.get('/partner/mainscreen',partnerMainscreenController);

export default partnerRouter;