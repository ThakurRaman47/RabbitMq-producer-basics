const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()

const { connectRabbitMQ } = require('./producer.js');

const app = express();
const port = 3000;

app.use(express.json({limit:'50mb'}));
app.use(cors());

// Connect to RabbitMQ
connectRabbitMQ().catch(err => {
  console.error('Failed to connect to RabbitMQ:', err.message);
  process.exit(1);
});

// Example route to send a message to RabbitMQ\
const testRoutes = require('./routes/index')
app.use('/', testRoutes)

app.get('/', (req,res) => {
  return res.status(200).json({message: "This is a test route"})
})

app.listen(port, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
