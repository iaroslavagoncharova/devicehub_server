import express from 'express';
import {
  addDevice,
  deleteDeviceByName,
  getDeviceByName,
  getDevices,
  getDevicesByLocation,
  getDevicesByType,
  updateDeviceByName,
} from '../controllers/devicesController';

const router = express.Router();

// Route to get all devices
router.get('/', getDevices);

// Route to get a device by name
router.get('/name/:name', getDeviceByName);

// Route to get devices by type
router.get('/type/:type', getDevicesByType);

// Route to get devices by location
router.get('/location/:location', getDevicesByLocation);

// Route to add a new device
router.post('/', addDevice);

// Route to delete a device by name
router.delete('/name/:name', deleteDeviceByName);

// Route to update a device by name
router.put('/name/:name', updateDeviceByName);

export default router;
