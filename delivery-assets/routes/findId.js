const { scanTable, getItem } = require('../../dynamoDBOperations');

async function findId() {
    try {
        const items = await scanTable('Deliveries_Table');
        console.log(items);

        if (items.length === 0) {
            console.log('No IDs found!');
            return;
        }

        for (const item of items) {
            const key = { id: { S: item.id.S } };

            await getItem('Deliveries_Table', key);

            console.log(`The delivery id: ${key.id.S}`);
        }

    } catch (error) {
        console.error('Error getting history id:', error);
    }
};

findId();