import express from 'express';
import { getDeviceByName, getDevices } from '../controllers/devicesController';

const router = express.Router();

router.route('/').get(getDevices);
router.use('/devices/:name', getDeviceByName);

export default router;