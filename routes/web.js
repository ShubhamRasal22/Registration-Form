import express  from "express";
const router = express.Router()
import UserController from "../controllers/userController.js";

router.get('/',UserController.home)
router.get('/registration',UserController.registration)
router.post('/registration',UserController.createUserDoc)
router.get('/login',UserController.login)
router.post('/login',UserController.verifylogin)

export default router