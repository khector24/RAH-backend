// dynamoDBOperations.js

require('dotenv').config();
const {
    DynamoDBClient,
    ListTablesCommand,
    PutItemCommand,
    DeleteItemCommand,
    GetItemCommand,
    UpdateItemCommand,
    ScanCommand,
    QueryCommand
} = require("@aws-sdk/client-dynamodb");

const { unmarshall } = require('@aws-sdk/util-dynamodb');

// Create a reusable DynamoDB client
const client = new DynamoDBClient({
    region: 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

console.log('AWS Region:', process.env.AWS_DEFAULT_REGION);

// Function to list all tables
async function listTables() {
    try {
        const command = new ListTablesCommand({});
        const response = await client.send(command);
        return response.TableNames;
    } catch (error) {
        console.error('Error listing tables:', error);
        throw error;
    }
}

// Function to add (Put) an item to a table
async function createItem(tableName, item) {
    try {
        const command = new PutItemCommand({
            TableName: tableName,
            Item: item
        });
        const response = await client.send(command);
        return response;
    } catch (error) {
        console.error('Error creating item:', error);
        throw error;
    }
}

// Function to get (Read) an item from a table
async function getItem(tableName, key) {
    try {
        const command = new GetItemCommand({
            TableName: tableName,
            Key: key
        });
        const response = await client.send(command);
        return response.Item;
    } catch (error) {
        console.error('Error fetching item:', error);
        throw error;
    }
}

// Function to get (Read) username from a table
//Third Version
const getItemByName = async (tableName, username) => {
    const params = {
        TableName: tableName,
        IndexName: 'username-id-index', // Specify the GSI name
        KeyConditionExpression: 'username = :username', // Use a key condition expression
        ExpressionAttributeValues: {
            ':username': { S: username } // Value to match for username
        }
    };

    try {
        const command = new QueryCommand(params);
        const data = await client.send(command);
        return data.Items.length > 0 ? unmarshall(data.Items[0]) : null; // Use the unmarshall method from @aws-sdk/util-dynamodb
    } catch (error) {
        console.error('Error fetching item by username:', error);
        throw new Error('Could not fetch item.');
    }
};

// Function to update an item in a table
async function updateItem(tableName, key, updatedAttributes) {
    let updateExpression = 'SET';
    const expressionAttributeNames = {};
    const expressionAttributeValues = {};

    // Loop through the attributes to build the update expression
    for (const [attr, value] of Object.entries(updatedAttributes)) {
        const attributeName = `#${attr}`;
        const attributeValue = `:${attr}`;

        updateExpression += ` ${attributeName} = ${attributeValue},`;
        expressionAttributeNames[attributeName] = attr;

        // Dynamically assign the type based on the value's type
        if (typeof value === 'string') {
            expressionAttributeValues[attributeValue] = { S: value };
        } else if (typeof value === 'number') {
            expressionAttributeValues[attributeValue] = { N: value.toString() }; // Numbers should be strings in DynamoDB
        } else if (typeof value === 'boolean') {
            expressionAttributeValues[attributeValue] = { BOOL: value };
        } else {
            console.error('Unsupported attribute value type:', typeof value);
            throw new Error('Unsupported attribute value type');
        }
    }

    // Remove the trailing comma from the update expression
    updateExpression = updateExpression.slice(0, -1);

    const params = {
        TableName: tableName,
        Key: key,
        UpdateExpression: updateExpression,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
    };

    const command = new UpdateItemCommand(params);
    try {
        await client.send(command);
    } catch (error) {
        console.error('Error updating item:', error);
        throw error;
    }
}


// Function to delete an item from a table
async function deleteItem(tableName, key) {
    try {
        const command = new DeleteItemCommand({
            TableName: tableName,
            Key: key
        });
        const response = await client.send(command);
        return response;
    } catch (error) {
        console.error('Error deleting item:', error);
        throw error;
    }
}

// Function to scan (list) all items in a table
async function scanTable(tableName) {
    try {
        const command = new ScanCommand({ TableName: tableName });
        const response = await client.send(command);
        return response.Items;
    } catch (error) {
        console.error('Error scanning table:', error);
        throw error;
    }
}

// Export the functions for use in other files
module.exports = {
    listTables,
    createItem,
    getItem,
    updateItem,
    deleteItem,
    scanTable,
    getItemByName
};


// require('dotenv').config();

// const {
//     DynamoDBClient,
//     ListTablesCommand,
//     PutItemCommand,
//     DeleteItemCommand,
//     GetItemCommand
// } = require("@aws-sdk/client-dynamodb");

// const client = new DynamoDBClient({
//     region: process.env.AWS_DEFAULT_REGION,
//     credentials: {
//         accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//         secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
//     }
// });

// async function main() {
//     try {
//         // ListTablesCommand
//         const listTablesCommand = new ListTablesCommand({});
//         const response = await client.send(listTablesCommand);
//         console.log({ tables: response.TableNames });

//         // PutItemCommand
//         const putItemCommand = new PutItemCommand({
//             TableName: 'Managers_Table',
//             Item: {
//                 id: { 'S': '1001' },
//                 name: { 'S': 'Michael Smith' }
//             }
//         });

//         // Sending PutItemCommand
//         const putResponse = await client.send(putItemCommand);
//         console.log('Item added:', putResponse);
//     } catch (err) {
//         console.error('Error:', err);
//     }
// }

// main(); // Call the async function




// const AWS = require('@aws-sdk/client-dynamodb');
// require('dotenv').config();
// AWS.config.update({
//     region: process.env.AWS_DEFAULT_REGION,
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// });

// const dynamoClient = new AWS.DynamoDB.DocumentClient();
// const TABLE_NAME = 'hpCharacters';
// const getCharacters = async () => {
//     const params = {
//         TableName: TABLE_NAME,
//     };
//     const characters = await dynamoClient.scan(params).promise();
//     return characters;
// };

// const getCharacterById = async (id) => {
//     const params = {
//         TableName: TABLE_NAME,
//         Key: {
//             id,
//         },
//     };
//     return await dynamoClient.get(params).promise();
// };

// const addOrUpdateCharacter = async (character) => {
//     const params = {
//         TableName: TABLE_NAME,
//         Item: character,
//     };
//     return await dynamoClient.put(params).promise();
// };

// const deleteCharacter = async (id) => {
//     const params = {
//         TableName: TABLE_NAME,
//         Key: {
//             id,
//         },
//     };
//     return await dynamoClient.delete(params).promise();
// };

// module.exports = {
//     dynamoClient,
//     getCharacters,
//     getCharacterById,
//     addOrUpdateCharacter,
//     deleteCharacter,
// };