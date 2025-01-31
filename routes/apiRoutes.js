const express = require('express');
const router = express.Router();
const AuthController = require("../controllers/auth");
const GadgetController = require("../controllers/gadgets");
const authmiddleware = require("../middlewares/auth")
//user authentication
router.post("/register", AuthController.requestOtp);
router.post("/verify-email-otp", AuthController.verifyOtp);

//gadget routes
router.get('/gadgets', GadgetController.getAllGadgets);
router.post('/gadgets', GadgetController.addGadget);
router.patch('/gadgets/:id', GadgetController.updateGadget);
router.delete('/gadgets/:id', GadgetController.deleteGadget);
router.post('/gadgets/:id/self-destruct', GadgetController.selfDestruct);

module.exports = router;