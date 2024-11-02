const { createItem } = require('../dynamoDBOperations');
const deliveryHistory = require('/Users/kennyhector/Desktop/Web-Dev/RAH-DeliveryScheduler/back-end/delivery-assets/batchDeliveryHistory2.json');

async function addDeliveryHistory() {
    console.log(deliveryHistory);

    try {
        for (const historyItem of deliveryHistory) {
            await createItem('Delivery_History', historyItem);
            // console.log(`Delivery with ID ${history.id} added successfully.`);
            console.log("Added succesfuffly.");
        }
    } catch (error) {
        console.error('Error adding deliveries:', error);
    }
}

addDeliveryHistory();