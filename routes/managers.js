// managers.js

const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {
    createItem,
    getItem,
    updateItem,
    deleteItem,
    scanTable,
    getItemByName
} = require('../dynamoDBOperations');

const authenticateJWT = require('../middleware/authenticateJWT'); // Importing the middleware

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'; // Use an env variable for the secret


// Route to get all managers
router.get('/', authenticateJWT, async (req, res) => {
    try {
        const managers = await scanTable('Managers_Table'); // Scan the Managers_Table
        res.json(managers); // Send the list of managers as a JSON response
    } catch (error) {
        console.error('Error fetching managers:', error);
        res.status(500).send('Failed to list managers.');
    }
});

// Route to create a new manager
router.post('/', [
    check('phoneNumber')
        .isMobilePhone('en-US')
        .withMessage('Please provide a valid mobile phone number.'),
    check("password")
        .isStrongPassword([
            {
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
                returnScore: false
            }
        ]).withMessage("A strong password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one number, and one special symbol.")
], async (req, res) => {
    const managerData = req.body; // Assuming the new manager data is in the request body
    const managerId = uuidv4();

    // Hash the password
    const hashedPassword = await bcrypt.hash(managerData.password, 10);

    // Create the username
    const firstName = managerData.firstName.toLowerCase(); // Convert to lowercase
    const lastName = managerData.lastName.charAt(0).toLowerCase(); // First initial of last name
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Month (01-12)
    const year = now.getFullYear(); // Year (YYYY)

    const username = `${firstName}${lastName}${month}-${year}`; // Format username

    const newManager = {
        id: { S: managerId },
        firstName: { S: managerData.firstName },
        lastName: { S: managerData.lastName },
        phoneNumber: { S: managerData.phoneNumber },
        username: { S: username }, // Store the username
        password: { S: hashedPassword }
    };

    try {
        const response = await createItem('Managers_Table', newManager);
        res.json({ message: 'Manager created successfully', response });
    } catch (error) {
        console.error('Error creating manager:', error);
        res.status(500).send('Failed to create manager.');
    }
});

// Route for manager login
// router.post('/login', async (req, res) => {
//     const { username, password } = req.body; // Use username instead of name

//     try {
//         // Fetch the manager by username
//         const manager = await getItemByName('Managers_Table', username); // Update this method accordingly

//         if (manager && manager.password) {
//             // Compare hashed password
//             const match = await bcrypt.compare(password, manager.password.S);
//             if (match) {
//                 // Create JWT token
//                 const token = jwt.sign({ id: manager.id.S, username: manager.username.S }, JWT_SECRET, {
//                     expiresIn: '1h'
//                 });
//                 return res.json({ token });
//             }
//         }
//         res.status(401).send('Invalid credentials');
//     } catch (error) {
//         console.error('Error during login:', error);
//         res.status(500).send('Failed to log in.');
//     }
// });

// router.post('/login', async (req, res) => {
//     const { username, password } = req.body;

//     try {
//         const manager = await getItemByName('Managers_Table', username);

//         if (manager && manager.password) {
//             const match = await bcrypt.compare(password, manager.password.S);
//             if (match) {
//                 const token = jwt.sign({ id: manager.id.S, username: manager.username.S }, JWT_SECRET, { expiresIn: '1h' });
//                 return res.json({ token });
//             }
//         }
//         res.status(401).send('Invalid credentials');
//     } catch (error) {
//         console.error('Error during login:', error);
//         res.status(500).send('Failed to log in.');
//     }
// });

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    console.log('Password from body:', req.body.password)

    try {
        const manager = await getItemByName('Managers_Table', username); // Use the modified getItemByName function

        if (manager && manager.password) {
            console.log('Manager:', manager);
            console.log('Password:', manager?.password?.S);

            const match = await bcrypt.compare(password, manager.password);
            if (match) {
                console.log("Yay Matched!")
                const token = jwt.sign({ id: manager.id.S, username: manager.username.S }, JWT_SECRET, { expiresIn: '1h' });
                return res.json({ token });
            }
        }
        res.status(401).send('Invalid credentials');
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Failed to log in.');
    }
});




// Route to get a specific manager by ID
router.get('/:id', authenticateJWT, async (req, res) => {
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
router.put('/:id/edit', authenticateJWT, async (req, res) => {
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
router.delete('/:id', authenticateJWT, async (req, res) => {
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


// // managers.js

// const express = require('express');
// const router = express.Router();
// const { v4: uuidv4 } = require('uuid');

// const {
//     createItem,
//     getItem,
//     updateItem,
//     deleteItem,
//     scanTable
// } = require('../dynamoDBOperations');

// // Route to get all managers
// router.get('/', async (req, res) => {
//     try {
//         const managers = await scanTable('Managers_Table'); // Scan the Managers_Table
//         res.json(managers); // Send the list of managers as a JSON response
//     } catch (error) {
//         console.error('Error fetching managers:', error);
//         res.status(500).send('Failed to list managers.');
//     }
// });

// // Route to create a new manager
// router.post('/', async (req, res) => {
//     const managerData = req.body; // Assuming the new manager data is in the request body
//     const managerId = uuidv4();

//     const newManager = {
//         id: { S: managerId },
//         firstName: { S: managerData.firstName },
//         lastName: { S: managerData.lastName },
//         phoneNumber: { S: managerData.phoneNumber },
//         // Add any other fields necessary, adjust types accordingly (e.g., N for numbers)
//     };

//     try {
//         const response = await createItem('Managers_Table', newManager);
//         res.json({ message: 'Manager created successfully', response });
//     } catch (error) {
//         console.error('Error creating manager:', error);
//         res.status(500).send('Failed to create manager.');
//     }
// });

// // Route to get a specific manager by ID
// router.get('/:id', async (req, res) => {
//     const managerId = req.params.id;
//     try {
//         const manager = await getItem('Managers_Table', { id: { 'S': managerId } });
//         if (manager) {
//             res.json(manager);
//         } else {
//             res.status(404).send('Manager not found.');
//         }
//     } catch (error) {
//         console.error('Error fetching manager:', error);
//         res.status(500).send('Failed to fetch manager.');
//     }
// });

// // Route to edit a manager by ID
// router.put('/:id/edit', async (req, res) => {
//     const managerId = req.params.id;
//     const updatedAttributes = req.body; // Assuming the body contains the updated fields

//     try {
//         const response = await updateItem('Managers_Table', { id: { 'S': managerId } }, updatedAttributes);
//         res.json({ message: 'Manager updated successfully', response });
//     } catch (error) {
//         console.error('Error updating manager:', error);
//         res.status(500).send('Failed to update manager.');
//     }
// });


// // Route to delete a manager by ID
// router.delete('/:id', async (req, res) => {
//     const managerId = req.params.id;

//     try {
//         const response = await deleteItem('Managers_Table', { id: { 'S': managerId } });
//         res.json({ message: 'Manager deleted successfully', response });
//     } catch (error) {
//         console.error('Error deleting manager:', error);
//         res.status(500).send('Failed to delete manager.');
//     }
// });

// module.exports = router;

