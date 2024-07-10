const { produceMessage } = require('../producer.js')

exports.sendRabbitMqMsg = async function(req,res) {
    try {
        let msg = {data:'Today new msgs!...'}

        let isMsgSent = await produceMessage(msg)
        if(isMsgSent) {
          res.status(200).json({ message: 'Message sent to RabbitMQ',status: 200 });
        }
        else {
          res.status(400).json({ message: 'Failed to send message to RabbitMQ',status: 400 });
        }    
      } 
      catch (error) {
        console.error('Error sending message to RabbitMQ:', error.message);
        res.status(500).json({ error: 'Error sending message to RabbitMQ' });        
      }
}