import { Router } from "express";
import userController from "../controllers/UserController.js";
import channelController from "../controllers/ChannelController.js";
import { body } from "express-validator";
import authMiddleware from "../middleware/authMiddleware.js";

const router = new Router();

router.post('/registration', 
	body('email').isEmail(),
	body('password').isLength({min: 3, max: 32}),
	userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.users);
router.get('/channels', authMiddleware, channelController.channels);
router.post('/channels/add',
	authMiddleware,
	body('title').isLength({min: 3, max: 32}),
	channelController.addChannel);

export default router;