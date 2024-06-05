import express from "express";
import * as OrderController from "../controllers/order.controller";

let router = express.Router();

router.post('/save',OrderController.saveOrder)

router.get('/find',OrderController.getOrders)

export default router;