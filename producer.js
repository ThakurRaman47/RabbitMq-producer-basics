const amqp = require('amqplib');
let channel,connection;
async function produceMessage(message) {
  const queueName = 'NewQueue';
  try {
    let correlationId = '232323232'
    await connectRabbitMQ()
    await channel.assertQueue(queueName, { durable: false });
    const responseQueue = await channel.assertQueue('', { exclusive: true });

    // Send data to consumer(one way)
    // let msgSent = await channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
    // console.log(msgSent,"sdssdsdsd===>")


    // To send and receive data from consumer
    let msgSent = await channel.sendToQueue('NewQueue', Buffer.from(JSON.stringify(message)), {
        correlationId: '232323232',
        replyTo: responseQueue.queue
      });

    // Wait for response from consumer
    await channel.consume(responseQueue.queue, (msg) => {
      if (msg.properties.correlationId === correlationId) {
        console.log(`Received response: ${JSON.parse(msg.content)}`);
      }
    }, { noAck: true });

    // await closeConnection();
    return msgSent
  } catch (error) {
    console.log('Error sending message to RabbitMQ:', error);
    throw error
  }
}

async function connectRabbitMQ() {
  try {
    connection = await amqp.connect('amqp://localhost');
    channel = await connection.createChannel();
    console.log('Connected to RabbitMQ');
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error.message);
    throw error;
  }
}

function getChannel() {
  return channel;
}

async function closeConnection() {
  if (channel) {
    channel.close();
  }
  if (connection) {
    connection.close();
  }
}

module.exports = {produceMessage, connectRabbitMQ, getChannel, closeConnection }
