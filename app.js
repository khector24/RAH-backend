require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const authRoute = require('./routes/auth')
const deliveriesRoutes = require('./routes/deliveries');
const managersRoutes = require('./routes/managers');
const driversRoutes = require('./routes/drivers');

app.use(bodyParser.json());
app.use('/auth', authRoute);
app.use('/deliveries', deliveriesRoutes);
app.use('/managers', managersRoutes);
app.use('/drivers', driversRoutes);

const { listTables } = require('./dynamoDBOperations');

// Route to list all DynamoDB tables
app.get('/', async (req, res) => {
    try {
        const tables = await listTables();
        res.send(`Tables in DynamoDB: ${tables.join(', ')}`);
    } catch (error) {
        console.error('Error listing tables:', error);
        res.status(500).send('Failed to list tables.');
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});


// require('dotenv').config();

// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');

// const port = 3000;

// const deliveriesRoutes = require('./routes/deliveries');
// const managersRoutes = require('./routes/managers')
// const driversRoutes = require('./routes/drivers');

// app.use(bodyParser.json());
// app.use('/deliveries', deliveriesRoutes);
// app.use('/managers', managersRoutes);
// app.use('/drivers', driversRoutes);

// const {
//     listTables,
//     createItem,
//     getItem,
//     updateItem,
//     deleteItem,
//     scanTable
// } = require('./dynamoDBOperations');

// // Route to list all DynamoDB tables
// app.get('/', async (req, res) => {
//     try {
//         const tables = await listTables();  // Call the listTables function
//         res.send(`Tables in DynamoDB: ${tables.join(', ')}`);
//     } catch (error) {
//         console.error('Error listing tables:', error);
//         res.status(500).send('Failed to list tables.');
//     }
// });



// // Other routes
// app.get('/sign-up', (req, res) => (
//     res.send('Sign-up to be a manager')
// ));

// app.get('/login', (req, res) => (
//     res.send('Please login to use the site')
// ));

// // Example of CRUD functionality
// async function main() {
//     try {
//         // List all tables
//         const tables = await listTables();
//         console.log('Tables:', tables);

//         // Create an item in 'Managers_Table'
//         const newItem = {
//             id: { 'S': '1002' },
//             name: { 'S': 'John Doe' }
//         };
//         await createItem('Managers_Table', newItem);
//         console.log('Item created successfully.');

//         // Read the item from 'Managers_Table'
//         const key = { id: { 'S': '1002' } };
//         const item = await getItem('Managers_Table', key);
//         console.log('Fetched item:', item);

//         // Update the item in 'Managers_Table'
//         const updatedAttributes = { name: 'John Doe Updated' };
//         await updateItem('Managers_Table', key, updatedAttributes);
//         console.log('Item updated successfully.');

//         // Delete the item from 'Managers_Table'
//         await deleteItem('Managers_Table', key);
//         console.log('Item deleted successfully.');

//         // Scan the 'Managers_Table' to see all items
//         const allItems = await scanTable('Managers_Table');
//         console.log('All items:', allItems);
//     } catch (error) {
//         console.error('Error in main application:', error);
//     }
// }

// // main(); // Call the main function

// app.listen(port, () => {
//     console.log(`Listening on port ${port}`);
// });
