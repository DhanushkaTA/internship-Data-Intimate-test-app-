import express from "express";
import * as ItemController from '../controllers/address.controller'
import * as VerifyToken from '../middlewares/verifyToken'

let router = express.Router();


router.post('/save',ItemController.saveAddress);

router.get('/all',ItemController.getAll);

router.get('/get',ItemController.getAddress);



export default router;