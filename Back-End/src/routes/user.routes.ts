import express from "express";
import * as UserController from '../controllers/user.controller'

let router = express.Router();


router.get('/get/:id',UserController.getUser);

router.get('/get/all',UserController.getAll);

router.post('/save',UserController.saveUser);

router.put('/update',UserController.updateUser);

router.delete('/update',UserController.deleteUser);// query string -> ?id=

router.post('/auth',UserController.authUser)

export default router;