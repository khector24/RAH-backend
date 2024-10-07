const express = require('express');
const router = express.Router();

router.get('/', (req, res) => (
    res.send('All Deliveries')
));

router.get('/:id', (req, res) => (
    res.send('Viewing specific delivery')
));

router.get('/:id/edit', (req, res) => (
    res.send('Editing a delivery')
));

module.exports = router;