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
    check('customerName').notEmpty().withMessage('Customer name is required.'),
    check('customerPhoneNumber')
        .isMobilePhone('en-US')
        .withMessage('Please provide a valid mobile phone number.'),
    check('deliveryAddress').notEmpty().withMessage('Delivery address is required.'),
    check('deliveryDate').notEmpty().withMessage('Delivery date is required.'),
    check('timeRange').isIn(['7 AM to 12 PM', '12 PM to 5 PM']).withMessage('Invalid time range.')
    // check('driverId').notEmpty().withMessage('Driver ID is required.')
], authenticateJWT, async (req, res) => {
    console.log('Request Body:', req.body);

    const deliveryData = req.body;

    // Validate incoming data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('Validation errors:', errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    const deliveryId = uuidv4();
    const createdAt = new Date().toISOString();

    const newDelivery = {
        id: { S: deliveryId },
        customerName: { S: deliveryData.customerName },
        customerPhoneNumber: { S: deliveryData.customerPhoneNumber },
        customerAddress: { S: deliveryData.deliveryAddress },
        deliveryDate: { S: deliveryData.deliveryDate },
        timeRange: { S: deliveryData.timeRange },
        deliveryNotes: { S: deliveryData.deliveryNotes },
        outForDelivery: { BOOL: false },
        markedCompleted: { BOOL: false },
        markedForReview: { BOOL: false },
        markedForDeletion: { BOOL: false },
        createdAt: { S: createdAt },
        deliveryHistory: {
            L: [
                {
                    M: {
                        action: { S: "created" },
                        status: { S: "pending" },
                        manager: { S: req.user.username }, // Assuming req.user has the manager's username
                        timestamp: { S: createdAt }
                    }
                }
            ]
        },
        driverId: { S: '' },
        managerId: { S: req.user.id }
    };

    console.log(newDelivery);

    try {
        console.log("This is the try cathc and the delivery as a test, ", newDelivery)
        const response = await createItem('Deliveries_Table', newDelivery);
        console.log("This is the try cathc and the delivery as a test, ", newDelivery)
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
        const updatedAttributes = req.body;

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


