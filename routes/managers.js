const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const {
    createItem,
    getItem,
    updateItem,
    deleteItem,
    scanTable
} = require('../dynamoDBOperations');

// Route to get all managers
router.get('/', async (req, res) => {
    try {
        const managers = await scanTable('Managers_Table'); // Scan the Managers_Table
        res.json(managers); // Send the list of managers as a JSON response
    } catch (error) {
        console.error('Error fetching managers:', error);
        res.status(500).send('Failed to list managers.');
    }
});

// Route to create a new manager
router.post('/', async (req, res) => {
    const managerData = req.body; // Assuming the new manager data is in the request body
    const managerId = uuidv4();

    const newManager = {
        id: { S: managerId },
        firstName: { S: managerData.firstName },
        lastName: { S: managerData.lastName },
        phoneNumber: { S: managerData.phoneNumber },
        // Add any other fields necessary, adjust types accordingly (e.g., N for numbers)
    };

    try {
        const response = await createItem('Managers_Table', newManager);
        res.json({ message: 'Manager created successfully', response });
    } catch (error) {
        console.error('Error creating manager:', error);
        res.status(500).send('Failed to create manager.');
    }
});

// Route to get a specific manager by ID
router.get('/:id', async (req, res) => {
    const managerId = req.params.id;
    try {
        const manager = await getItem('Managers_Table', { id: { 'S': managerId } });
        if (manager) {
            res.json(manager);
        } else {
            res.status(404).send('Manager not found.');
        }
    } catch (error) {
        console.error('Error fetching manager:', error);
        res.status(500).send('Failed to fetch manager.');
    }
});

// Route to edit a manager by ID
router.put('/:id/edit', async (req, res) => {
    const managerId = req.params.id;
    const updatedAttributes = req.body; // Assuming the body contains the updated fields

    try {
        const response = await updateItem('Managers_Table', { id: { 'S': managerId } }, updatedAttributes);
        res.json({ message: 'Manager updated successfully', response });
    } catch (error) {
        console.error('Error updating manager:', error);
        res.status(500).send('Failed to update manager.');
    }
});


// Route to delete a manager by ID
router.delete('/:id', async (req, res) => {
    const managerId = req.params.id;

    try {
        const response = await deleteItem('Managers_Table', { id: { 'S': managerId } });
        res.json({ message: 'Manager deleted successfully', response });
    } catch (error) {
        console.error('Error deleting manager:', error);
        res.status(500).send('Failed to delete manager.');
    }
});

module.exports = router;

