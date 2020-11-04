const amqp = require('amqplib');

const msg = { number: 3 };

connect();

async function connect() {
    try {
        const connection = await amqp.connect('amqp://localhost:5672');
        const channel = await connection.createChannel();
        const result = await channel.assertQueue('messages');

        console.log(result); // { queue: 'messages', messageCount: 0, consumerCount: 0 }

        channel.sendToQueue('jobs', Buffer.from(JSON.stringify(msg)));
        console.log(`Job send succesfully ${JSON.stringify(msg)}`);

    } catch (err) {
        console.log(err);
    }
}