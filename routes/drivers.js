const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { check, validationResult } = require('express-validator');

const {
    createItem,
    getItem,
    updateItem,
    deleteItem,
    scanTable
} = require('../dynamoDBOperations');

const authenticateJWT = require('../middleware/authenticateJWT'); // Importing the middleware

// Route to get all drivers
router.get('/', authenticateJWT, async (req, res) => {
    try {
        const drivers = await scanTable('Drivers_Table'); // Scan the Drivers_Table
        res.json(drivers); // Send the list of drivers as a JSON response
    } catch (error) {
        console.error('Error fetching drivers:', error);
        res.status(500).send('Failed to list drivers.');
    }
});

// Route to create a new driver
router.post('/', [
    check('phoneNumber')
        .isMobilePhone('en-US')
        .withMessage('Please provide a valid mobile phone number.')], authenticateJWT,
    async (req, res) => {
        const driverData = req.body;
        const driverId = uuidv4();

        const newDriver = {
            id: { S: driverId },
            firstName: { S: driverData.firstName },
            lastName: { S: driverData.lastName },
            phoneNumber: { S: driverData.phoneNumber },
        };

        try {
            const response = await createItem('Drivers_Table', newDriver);
            res.json({ message: 'Driver created successfully', response });
        } catch (error) {
            console.error('Error creating driver:', error);
            res.status(500).send('Failed to create driver.');
        }
    });

// Route to get a specific driver by ID
router.get('/:id', authenticateJWT, async (req, res) => {
    const driverId = req.params.id;
    try {
        const driver = await getItem('Drivers_Table', { id: { 'S': driverId } });
        if (driver) {
            res.json(driver);
        } else {
            res.status(404).send('Driver not found.');
        }
    } catch (error) {
        console.error('Error fetching driver:', error);
        res.status(500).send('Failed to fetch driver.');
    }
});

// Route to edit a driver by ID
router.put('/:id/edit', authenticateJWT, async (req, res) => {
    const driverId = req.params.id;
    const updatedAttributes = req.body; // Assuming the body contains the updated fields

    try {
        const response = await updateItem('Drivers_Table', { id: { 'S': driverId } }, updatedAttributes);
        res.json({ message: 'Driver updated successfully', response });
    } catch (error) {
        console.error('Error updating driver:', error);
        res.status(500).send('Failed to update driver.');
    }
});


// Route to delete a driver by ID
router.delete('/:id', authenticateJWT, async (req, res) => {
    const driverId = req.params.id;

    try {
        const response = await deleteItem('Drivers_Table', { id: { 'S': driverId } });
        res.json({ message: 'Driver deleted successfully', response });
    } catch (error) {
        console.error('Error deleting driver:', error);
        res.status(500).send('Failed to delete driver.');
    }
});

module.exports = router;
