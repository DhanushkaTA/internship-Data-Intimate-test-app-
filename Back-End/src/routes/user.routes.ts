import express from "express";
import * as UserController from '../controllers/user.controller'
import * as VerifyToken from '../middlewares/verifyToken'

let router = express.Router();


router.get('/get/:id',UserController.getUser);

router.get('/all', VerifyToken.verifyToken, UserController.getAll);

router.post('/save',UserController.saveUser);

router.put('/update', VerifyToken.verifyToken, UserController.updateUser);

router.put('/update/password', VerifyToken.verifyToken, UserController.updatePassword);

// router.delete('/delete', VerifyToken.verifyToken, UserController.deleteUser);// query string -> ?id=
router.delete('/delete', UserController.deleteUser);// query string -> ?id=

router.post('/auth',UserController.authUser)

router.get('/get/address/:id',UserController.getUserAddress)

router.get('/get/order/:id',UserController.getUserOrders)

export default router;