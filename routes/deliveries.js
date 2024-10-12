// deliveries.js

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

const authenticateJWT = require('../middleware/authenticateJWT');

// Route to get all deliveries
router.get('/', authenticateJWT, async (req, res) => {
    try {
        const deliveries = await scanTable('Deliveries_Table'); // Scan the Deliveries_Table
        res.json(deliveries); // Send the list of deliveries as a JSON response
    } catch (error) {
        console.error('Error fetching deliveries:', error);
        res.status(500).send('Failed to list deliveries.');
    }
});

// Route to create a new delivery
router.post('/', [
    check('phoneNumber')
        .isMobilePhone('en-US')
        .withMessage('Please provide a valid mobile phone number.')],
    authenticateJWT, async (req, res) => {
        const deliveryData = req.body;
        const deliveryId = uuidv4();

        const newDelivery = {
            id: { S: deliveryId },
            customerName: { S: deliveryData.customerName },
            deliveryAddress: { S: deliveryData.deliveryAddress },
            deliveryDate: { S: deliveryData.deliveryDate },
            driverId: { S: deliveryData.driverId }
        };

        try {
            const response = await createItem('Deliveries_Table', newDelivery);
            res.json({ message: 'Delivery created successfully', response });
        } catch (error) {
            console.error('Error creating delivery:', error);
            res.status(500).send('Failed to create delivery.');
        }
    });

// Route to get a specific delivery by ID
router.get('/:id', authenticateJWT, async (req, res) => {
    const deliveryId = req.params.id;
    try {
        const delivery = await getItem('Deliveries_Table', { id: { 'S': deliveryId } });
        if (delivery) {
            res.json(delivery);
        } else {
            res.status(404).send('Delivery not found.');
        }
    } catch (error) {
        console.error('Error fetching delivery:', error);
        res.status(500).send('Failed to fetch delivery.');
    }
});

// Route to edit a delivery by ID
router.put('/:id/edit', [
    check('phoneNumber')
        .isMobilePhone('en-US')
        .withMessage('Please provide a valid mobile phone number.')],
    authenticateJWT,
    async (req, res) => {
        const deliveryId = req.params.id;
        const updatedAttributes = req.body; // Assuming the body contains the updated fields

        try {
            const response = await updateItem('Deliveries_Table', { id: { 'S': deliveryId } }, updatedAttributes);
            res.json({ message: 'Delivery updated successfully', response });
        } catch (error) {
            console.error('Error updating delivery:', error);
            res.status(500).send('Failed to update delivery.');
        }
    });

// Route to delete a delivery by ID
router.delete('/:id', authenticateJWT, async (req, res) => {
    const deliveryId = req.params.id;

    try {
        const response = await deleteItem('Deliveries_Table', { id: { 'S': deliveryId } });
        res.json({ message: 'Delivery deleted successfully', response });
    } catch (error) {
        console.error('Error deleting delivery:', error);
        res.status(500).send('Failed to delete delivery.');
    }
});

module.exports = router;
