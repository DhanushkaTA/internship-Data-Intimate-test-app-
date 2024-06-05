import express from "express";
import * as ItemController from '../controllers/item.controller'

let router = express.Router();

router.post('/save',ItemController.saveItem)

router.get('/get/item',ItemController.getItem)

export default router;