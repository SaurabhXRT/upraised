const express = require('express');
const router = express.Router();
const AuthController = require("../controllers/auth");
const GadgetController = require("../controllers/gadgets");
const authmiddleware = require("../middlewares/auth")
//user authentication
router.post("/register", AuthController.requestOtp);
router.post("/verify-email-otp", AuthController.verifyOtp);

//gadget routes
router.get('/gadgets', authmiddleware, GadgetController.getAllGadgets);
router.post('/gadgets', authmiddleware, GadgetController.addGadget);
router.patch('/gadgets/:id', authmiddleware, GadgetController.updateGadget);
router.delete('/gadgets/:id', authmiddleware, GadgetController.deleteGadget);
router.post('/gadgets/:id/self-destruct', authmiddleware, GadgetController.selfDestruct);

module.exports = router;