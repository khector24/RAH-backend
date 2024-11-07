const { deleteItem, scanTable } = require('../../dynamoDBOperations');


async function deleteHistoryItems() {
    try {
        const items = await scanTable("Delivery_History");

        if (items.length === 0) {
            console.log('No items found to delete');
            return;
        }

        for (const item of items) {
            const key = {
                deliveryId: item.deliveryId, // Partition key
                timestamp: item.timestamp     // Sort key
            }

            await deleteItem("Delivery_History", key);
            console.log(`Deleted item with deliveryId: ${item.deliveryId}, timestamp: ${item.timestamp}`);
        }

    } catch (error) {
        console.error('Error deleting history items:', error);
    }
}

deleteHistoryItems();