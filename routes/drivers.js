const express = require('express');
const router = express.Router();

router.get('/', (req, res) => (
    res.send('All Drivers')
));

router.get('/:id/edit', (req, res) => (
    res.send('Edit a driver')
));

module.exports = router;