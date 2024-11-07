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
const { getOneWeekFromNow } = require('../util/utilFunctions');

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
        driver: { S: '' },
        managerId: { S: req.user.username }
    };

    console.log(newDelivery);

    try {
        console.log("This is the try cathc and the delivery as a test, ", newDelivery)
        const response = await createItem('Deliveries_Table', newDelivery);
        console.log("This is the try cathc and the delivery as a test, ", newDelivery)
        console.log('Server response:', response.data);

        const managerId = req.user.username;

        res.json({
            deliveryId,
            managerId,
            message: 'Delivery created successfully',
            response
        });
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

// Route to get delivery history for a specific delivery by ID
router.get('/:id/history', authenticateJWT, async (req, res) => {
    const deliveryId = req.params.id;
    try {
        // Query the Delivery_History table for entries matching the deliveryId
        const deliveryHistory = await scanTable('Delivery_History'); // Replace this with your query function

        // Filter the delivery history for the specific deliveryId
        const filteredHistory = deliveryHistory.filter(item => item.deliveryId.S === deliveryId);

        if (filteredHistory.length > 0) {
            res.json(filteredHistory); // Return all filtered delivery history items
        } else {
            res.status(404).send('Delivery history not found for this delivery ID.');
        }
    } catch (error) {
        console.error('Error fetching delivery history:', error);
        res.status(500).send('Failed to fetch delivery history.');
    }
});


// Route to add a new entry to delivery history for a specific delivery
// Route to add a new entry to delivery history for a specific delivery
router.post('/history', authenticateJWT, async (req, res) => {
    const { deliveryId, action, manager } = req.body;

    if (!deliveryId || !action || !manager) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const timestamp = new Date().toISOString();
    const expirationDate = getOneWeekFromNow();

    console.log('Expiration Date (Unix Timestamp):', expirationDate); // Log the timestamp value to check

    // Ensure expirationDate is a number
    if (isNaN(expirationDate)) {
        return res.status(400).json({ message: 'Invalid expirationDate value' });
    }

    const newHistoryItem = {
        deliveryId: { S: deliveryId },
        action: { S: action },
        timestamp: { S: timestamp },
        manager: { S: manager },
        expirationDate: { N: expirationDate.toString() } // Convert it explicitly to string
    };

    try {
        const response = await createItem('Delivery_History', newHistoryItem);
        res.json({ message: 'Delivery history created successfully', response });
    } catch (error) {
        console.error('Error creating delivery history:', error);
        res.status(500).send('Failed to create delivery history.');
    }
});

module.exports = router;


