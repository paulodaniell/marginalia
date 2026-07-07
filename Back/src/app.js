const express = require('express');
const app = express();


app.use(express.json());


const userRoutes = require('./routes/user-routes');

app.use('/api', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = app;