import express from "express";
import signupMobileController,{signupEmailController,mobileLoginController,emailLoginController,registrationController,partnerLoginController,adminLoginController} from '../controllers/authController.js'
//router object
const router=express.Router();

//sign up
router.post('/signup/mobile',signupMobileController);
router.post('/signup/email',signupEmailController);

//customer login
router.post('login/customer/mobile',mobileLoginController);
router.post('login/customer/email',emailLoginController);
router.post('customer/registration',registrationController);

//partner login
router.post('login/partner',partnerLoginController);

//admin login
router.post('login/admin',adminLoginController);

export default router;