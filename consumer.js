const amqp = require('amqplib');

connect();

async function connect() {
    try {
        const connection = await amqp.connect('amqp://localhost:5672');
        const channel = await connection.createChannel();
        const result = await channel.assertQueue('messages');

        console.log(result); // { queue: 'messages', messageCount: 0, consumerCount: 0 }

        channel.consume('jobs', message => {
            console.log(message.content.toString());

            channel.ack(message); // delete message from queue
        });

        console.log('Waiting for messages');
    } catch (err) {
        console.log(err);
    }
}
