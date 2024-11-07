const { createItem } = require('../../dynamoDBOperations');
const deliveries = require('/Users/kennyhector/Desktop/Web-Dev/RAH-DeliveryScheduler/back-end/delivery-assets/batchDeliveries4.json');

async function addDeliveries() {
    try {
        for (const delivery of deliveries) {
            await createItem('Deliveries_Table', delivery);
            console.log(`Delivery with ID ${delivery.id} added successfully.`);
        }
    } catch (error) {
        console.error('Error adding deliveries:', error);
    }
}

addDeliveries();


// const { createItem } = require('../dynamoDBOperations');

// const deliveries = [
//     {
//         "id": {
//             "S": "d74534df-458b-40c4-90e5-91799372b07d"
//         },
//         "createdAt": {
//             "S": "2024-10-15T00:16:43.080Z"
//         },
//         "customerAddress": {
//             "S": "456 Oak Avenue, Lincoln, NE"
//         },
//         "customerName": {
//             "S": "Bob Smith"
//         },
//         "customerPhoneNumber": {
//             "S": "987-654-3210"
//         },
//         "deliveryDate": {
//             "S": "2024-12-26"
//         },
//         "deliveryHistory": {
//             "L": [
//                 {
//                     "M": {
//                         "action": {
//                             "S": "created"
//                         },
//                         "manager": {
//                             "S": "manager1"
//                         },
//                         "status": {
//                             "S": "pending"
//                         },
//                         "timestamp": {
//                             "S": "2024-10-15T00:16:43.080Z"
//                         }
//                     }
//                 }
//             ]
//         },
//         "driverId": {
//             "S": "driver2"
//         },
//         "managerId": {
//             "S": "manager1"
//         },
//         "markedCompleted": {
//             "BOOL": false
//         },
//         "markedForDeletion": {
//             "BOOL": false
//         },
//         "markedForReview": {
//             "BOOL": false
//         },
//         "outForDelivery": {
//             "BOOL": false
//         },
//         "timeRange": {
//             "S": "12 PM to 5 PM"
//         }
//     },
//     {
//         "id": {
//             "S": "a2f67be3-4f8b-4f20-b07e-6b1aa3c3cf58"
//         },
//         "createdAt": {
//             "S": "2024-10-16T09:25:30.120Z"
//         },
//         "customerAddress": {
//             "S": "789 Pine Road, Omaha, NE"
//         },
//         "customerName": {
//             "S": "Alice Johnson"
//         },
//         "customerPhoneNumber": {
//             "S": "123-456-7890"
//         },
//         "deliveryDate": {
//             "S": "2024-12-27"
//         },
//         "deliveryHistory": {
//             "L": [
//                 {
//                     "M": {
//                         "action": {
//                             "S": "created"
//                         },
//                         "manager": {
//                             "S": "manager2"
//                         },
//                         "status": {
//                             "S": "pending"
//                         },
//                         "timestamp": {
//                             "S": "2024-10-16T09:25:30.120Z"
//                         }
//                     }
//                 }
//             ]
//         },
//         "driverId": {
//             "S": "driver3"
//         },
//         "managerId": {
//             "S": "manager2"
//         },
//         "markedCompleted": {
//             "BOOL": false
//         },
//         "markedForDeletion": {
//             "BOOL": false
//         },
//         "markedForReview": {
//             "BOOL": true
//         },
//         "outForDelivery": {
//             "BOOL": false
//         },
//         "timeRange": {
//             "S": "1 PM to 6 PM"
//         }
//     },
//     {
//         "id": {
//             "S": "b56459fc-b005-4428-a233-7e4167fbaade"
//         },
//         "createdAt": {
//             "S": "2024-10-17T10:45:12.530Z"
//         },
//         "customerAddress": {
//             "S": "321 Maple Drive, Lincoln, NE"
//         },
//         "customerName": {
//             "S": "Charlie Brown"
//         },
//         "customerPhoneNumber": {
//             "S": "234-567-8901"
//         },
//         "deliveryDate": {
//             "S": "2024-12-28"
//         },
//         "deliveryHistory": {
//             "L": [
//                 {
//                     "M": {
//                         "action": {
//                             "S": "created"
//                         },
//                         "manager": {
//                             "S": "manager1"
//                         },
//                         "status": {
//                             "S": "pending"
//                         },
//                         "timestamp": {
//                             "S": "2024-10-17T10:45:12.530Z"
//                         }
//                     }
//                 }
//             ]
//         },
//         "driverId": {
//             "S": "driver4"
//         },
//         "managerId": {
//             "S": "manager1"
//         },
//         "markedCompleted": {
//             "BOOL": true
//         },
//         "markedForDeletion": {
//             "BOOL": false
//         },
//         "markedForReview": {
//             "BOOL": false
//         },
//         "outForDelivery": {
//             "BOOL": true
//         },
//         "timeRange": {
//             "S": "9 AM to 1 PM"
//         }
//     },
//     {
//         "id": {
//             "S": "c7ac60d1-0ab5-4d3a-a769-6e897a5b156b"
//         },
//         "createdAt": {
//             "S": "2024-10-18T12:00:00.000Z"
//         },
//         "customerAddress": {
//             "S": "654 Elm Street, Omaha, NE"
//         },
//         "customerName": {
//             "S": "David Wilson"
//         },
//         "customerPhoneNumber": {
//             "S": "345-678-9012"
//         },
//         "deliveryDate": {
//             "S": "2024-12-29"
//         },
//         "deliveryHistory": {
//             "L": [
//                 {
//                     "M": {
//                         "action": {
//                             "S": "created"
//                         },
//                         "manager": {
//                             "S": "manager3"
//                         },
//                         "status": {
//                             "S": "pending"
//                         },
//                         "timestamp": {
//                             "S": "2024-10-18T12:00:00.000Z"
//                         }
//                     }
//                 }
//             ]
//         },
//         "driverId": {
//             "S": "driver5"
//         },
//         "managerId": {
//             "S": "manager3"
//         },
//         "markedCompleted": {
//             "BOOL": false
//         },
//         "markedForDeletion": {
//             "BOOL": false
//         },
//         "markedForReview": {
//             "BOOL": false
//         },
//         "outForDelivery": {
//             "BOOL": false
//         },
//         "timeRange": {
//             "S": "10 AM to 3 PM"
//         }
//     },
//     {
//         "id": {
//             "S": "f1e2d3c4-e5f6-4b7a-8f1d-8e2b2e3e4f5g"
//         },
//         "createdAt": {
//             "S": "2024-10-19T08:30:45.210Z"
//         },
//         "customerAddress": {
//             "S": "135 Birch Lane, Lincoln, NE"
//         },
//         "customerName": {
//             "S": "Emma Green"
//         },
//         "customerPhoneNumber": {
//             "S": "456-789-0123"
//         },
//         "deliveryDate": {
//             "S": "2024-12-30"
//         },
//         "deliveryHistory": {
//             "L": [
//                 {
//                     "M": {
//                         "action": {
//                             "S": "created"
//                         },
//                         "manager": {
//                             "S": "manager2"
//                         },
//                         "status": {
//                             "S": "pending"
//                         },
//                         "timestamp": {
//                             "S": "2024-10-19T08:30:45.210Z"
//                         }
//                     }
//                 }
//             ]
//         },
//         "driverId": {
//             "S": "driver1"
//         },
//         "managerId": {
//             "S": "manager2"
//         },
//         "markedCompleted": {
//             "BOOL": true
//         },
//         "markedForDeletion": {
//             "BOOL": true
//         },
//         "markedForReview": {
//             "BOOL": false
//         },
//         "outForDelivery": {
//             "BOOL": false
//         },
//         "timeRange": {
//             "S": "3 PM to 7 PM"
//         }
//     },
//     {
//         "id": {
//             "S": "g7h8i9j0-k1l2-m3n4-o5p6-q7r8s9t0u1v2"
//         },
//         "createdAt": {
//             "S": "2024-10-20T11:15:20.910Z"
//         },
//         "customerAddress": {
//             "S": "987 Cedar Avenue, Omaha, NE"
//         },
//         "customerName": {
//             "S": "Fiona Blue"
//         },
//         "customerPhoneNumber": {
//             "S": "567-890-1234"
//         },
//         "deliveryDate": {
//             "S": "2024-12-31"
//         },
//         "deliveryHistory": {
//             "L": [
//                 {
//                     "M": {
//                         "action": {
//                             "S": "created"
//                         },
//                         "manager": {
//                             "S": "manager1"
//                         },
//                         "status": {
//                             "S": "pending"
//                         },
//                         "timestamp": {
//                             "S": "2024-10-20T11:15:20.910Z"
//                         }
//                     }
//                 }
//             ]
//         },
//         "driverId": {
//             "S": "driver2"
//         },
//         "managerId": {
//             "S": "manager1"
//         },
//         "markedCompleted": {
//             "BOOL": false
//         },
//         "markedForDeletion": {
//             "BOOL": false
//         },
//         "markedForReview": {
//             "BOOL": false
//         },
//         "outForDelivery": {
//             "BOOL": true
//         },
//         "timeRange": {
//             "S": "12 PM to 4 PM"
//         }
//     },
//     {
//         "id": {
//             "S": "k3l4m5n6-o7p8-q9r0-s1t2-u3v4w5x6y7z8"
//         },
//         "createdAt": {
//             "S": "2024-10-21T14:35:05.670Z"
//         },
//         "customerAddress": {
//             "S": "123 Cherry Lane, Lincoln, NE"
//         },
//         "customerName": {
//             "S": "George Black"
//         },
//         "customerPhoneNumber": {
//             "S": "678-901-2345"
//         },
//         "deliveryDate": {
//             "S": "2025-01-01"
//         },
//         "deliveryHistory": {
//             "L": [
//                 {
//                     "M": {
//                         "action": {
//                             "S": "created"
//                         },
//                         "manager": {
//                             "S": "manager3"
//                         },
//                         "status": {
//                             "S": "pending"
//                         },
//                         "timestamp": {
//                             "S": "2024-10-21T14:35:05.670Z"
//                         }
//                     }
//                 }
//             ]
//         },
//         "driverId": {
//             "S": "driver3"
//         },
//         "managerId": {
//             "S": "manager3"
//         },
//         "markedCompleted": {
//             "BOOL": false
//         },
//         "markedForDeletion": {
//             "BOOL": false
//         },
//         "markedForReview": {
//             "BOOL": true
//         },
//         "outForDelivery": {
//             "BOOL": false
//         },
//         "timeRange": {
//             "S": "11 AM to 5 PM"
//         }
//     },
//     {
//         "id": {
//             "S": "m8n9o0p1-q2r3-s4t5-u6v7-w8x9y0z1a2b3"
//         },
//         "createdAt": {
//             "S": "2024-10-22T15:10:25.450Z"
//         },
//         "customerAddress": {
//             "S": "246 Walnut Street, Omaha, NE"
//         },
//         "customerName": {
//             "S": "Hannah White"
//         },
//         "customerPhoneNumber": {
//             "S": "789-012-3456"
//         },
//         "deliveryDate": {
//             "S": "2025-01-02"
//         },
//         "deliveryHistory": {
//             "L": [
//                 {
//                     "M": {
//                         "action": {
//                             "S": "created"
//                         },
//                         "manager": {
//                             "S": "manager2"
//                         },
//                         "status": {
//                             "S": "pending"
//                         },
//                         "timestamp": {
//                             "S": "2024-10-22T15:10:25.450Z"
//                         }
//                     }
//                 }
//             ]
//         },
//         "driverId": {
//             "S": "driver1"
//         },
//         "managerId": {
//             "S": "manager2"
//         },
//         "markedCompleted": {
//             "BOOL": false
//         },
//         "markedForDeletion": {
//             "BOOL": false
//         },
//         "markedForReview": {
//             "BOOL": false
//         },
//         "outForDelivery": {
//             "BOOL": false
//         },
//         "timeRange": {
//             "S": "9 AM to 12 PM"
//         }
//     },
//     {
//         "id": {
//             "S": "n4o5p6q7-r8s9-t0u1-v2w3-x4y5z6a7b8c9"
//         },
//         "createdAt": {
//             "S": "2024-10-23T17:05:40.320Z"
//         },
//         "customerAddress": {
//             "S": "159 Spruce Street, Lincoln, NE"
//         },
//         "customerName": {
//             "S": "Ian Grey"
//         },
//         "customerPhoneNumber": {
//             "S": "890-123-4567"
//         },
//         "deliveryDate": {
//             "S": "2025-01-03"
//         },
//         "deliveryHistory": {
//             "L": [
//                 {
//                     "M": {
//                         "action": {
//                             "S": "created"
//                         },
//                         "manager": {
//                             "S": "manager1"
//                         },
//                         "status": {
//                             "S": "pending"
//                         },
//                         "timestamp": {
//                             "S": "2024-10-23T17:05:40.320Z"
//                         }
//                     }
//                 }
//             ]
//         },
//         "driverId": {
//             "S": "driver4"
//         },
//         "managerId": {
//             "S": "manager1"
//         },
//         "markedCompleted": {
//             "BOOL": false
//         },
//         "markedForDeletion": {
//             "BOOL": false
//         },
//         "markedForReview": {
//             "BOOL": true
//         },
//         "outForDelivery": {
//             "BOOL": false
//         },
//         "timeRange": {
//             "S": "8 AM to 11 AM"
//         }
//     },
//     {
//         "id": {
//             "S": "o7p8q9r0-s1t2-u3v4-w5x6-y7z8a9b0c1d2"
//         },
//         "createdAt": {
//             "S": "2024-10-24T19:30:12.990Z"
//         },
//         "customerAddress": {
//             "S": "246 Ash Lane, Omaha, NE"
//         },
//         "customerName": {
//             "S": "Julia Black"
//         },
//         "customerPhoneNumber": {
//             "S": "901-234-5678"
//         },
//         "deliveryDate": {
//             "S": "2025-01-04"
//         },
//         "deliveryHistory": {
//             "L": [
//                 {
//                     "M": {
//                         "action": {
//                             "S": "created"
//                         },
//                         "manager": {
//                             "S": "manager2"
//                         },
//                         "status": {
//                             "S": "pending"
//                         },
//                         "timestamp": {
//                             "S": "2024-10-24T19:30:12.990Z"
//                         }
//                     }
//                 }
//             ]
//         },
//         "driverId": {
//             "S": "driver5"
//         },
//         "managerId": {
//             "S": "manager2"
//         },
//         "markedCompleted": {
//             "BOOL": false
//         },
//         "markedForDeletion": {
//             "BOOL": false
//         },
//         "markedForReview": {
//             "BOOL": false
//         },
//         "outForDelivery": {
//             "BOOL": true
//         },
//         "timeRange": {
//             "S": "2 PM to 5 PM"
//         }
//     },
//     {
//         "id": {
//             "S": "p1q2r3s4-t5u6-v7w8-x9y0-z1a2b3c4d5e6"
//         },
//         "createdAt": {
//             "S": "2024-10-25T20:15:58.560Z"
//         },
//         "customerAddress": {
//             "S": "753 Lemon Street, Lincoln, NE"
//         },
//         "customerName": {
//             "S": "Liam Gold"
//         },
//         "customerPhoneNumber": {
//             "S": "012-345-6789"
//         },
//         "deliveryDate": {
//             "S": "2025-01-05"
//         },
//         "deliveryHistory": {
//             "L": [
//                 {
//                     "M": {
//                         "action": {
//                             "S": "created"
//                         },
//                         "manager": {
//                             "S": "manager3"
//                         },
//                         "status": {
//                             "S": "pending"
//                         },
//                         "timestamp": {
//                             "S": "2024-10-25T20:15:58.560Z"
//                         }
//                     }
//                 }
//             ]
//         },
//         "driverId": {
//             "S": "driver1"
//         },
//         "managerId": {
//             "S": "manager3"
//         },
//         "markedCompleted": {
//             "BOOL": false
//         },
//         "markedForDeletion": {
//             "BOOL": false
//         },
//         "markedForReview": {
//             "BOOL": true
//         },
//         "outForDelivery": {
//             "BOOL": false
//         },
//         "timeRange": {
//             "S": "11 AM to 4 PM"
//         }
//     },
//     {
//         "id": {
//             "S": "q2r3s4t5-u6v7-w8x9-y0z1-a2b3c4d5e6f7"
//         },
//         "createdAt": {
//             "S": "2024-10-26T21:00:22.710Z"
//         },
//         "customerAddress": {
//             "S": "321 Oak Street, Omaha, NE"
//         },
//         "customerName": {
//             "S": "Mia Silver"
//         },
//         "customerPhoneNumber": {
//             "S": "345-678-9012"
//         },
//         "deliveryDate": {
//             "S": "2025-01-06"
//         },
//         "deliveryHistory": {
//             "L": [
//                 {
//                     "M": {
//                         "action": {
//                             "S": "created"
//                         },
//                         "manager": {
//                             "S": "manager1"
//                         },
//                         "status": {
//                             "S": "pending"
//                         },
//                         "timestamp": {
//                             "S": "2024-10-26T21:00:22.710Z"
//                         }
//                     }
//                 }
//             ]
//         },
//         "driverId": {
//             "S": "driver2"
//         },
//         "managerId": {
//             "S": "manager1"
//         },
//         "markedCompleted": {
//             "BOOL": false
//         },
//         "markedForDeletion": {
//             "BOOL": false
//         },
//         "markedForReview": {
//             "BOOL": false
//         },
//         "outForDelivery": {
//             "BOOL": true
//         },
//         "timeRange": {
//             "S": "1 PM to 6 PM"
//         }
//     }
// ];


// async function addDeliveries() {
//     try {
//         for (const delivery of deliveries) {
//             await createItem('Deliveries_Table', delivery);
//             console.log(`Delivery with ID ${delivery.id.S} added successfully.`);
//         }
//     } catch (error) {
//         console.error('Error adding deliveries:', error);
//     }
// }

// addDeliveries();


// const fs = require('fs');
// const path = require('path');
// const { createItem } = require('../dynamoDBOperations');

// // Step 1: Read the JSON file
// const deliveriesPath = path.join(__dirname, 'batchDeliveries2.json'); // Adjust the path as needed

// fs.readFile(deliveriesPath, 'utf8', (err, data) => {
//     if (err) {
//         console.error('Error reading the JSON file:', err);
//         return;
//     }

//     try {
//         // Step 2: Parse the JSON data
//         const deliveries = JSON.parse(data);

//         // Step 3: Loop through and add each item to the database
//         deliveries.forEach(async (delivery) => {
//             try {
//                 await createItem(delivery);
//                 console.log(`Successfully added delivery with ID: ${delivery.id.S}`);
//             } catch (dbError) {
//                 console.error('Error adding delivery to the database:', dbError);
//             }
//         });
//     } catch (parseError) {
//         console.error('Error parsing JSON data:', parseError);
//     }
// });

