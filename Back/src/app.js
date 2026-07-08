const express = require('express');
const app = express();


app.use(express.json());


const userRoutes = require('./routes/user-routes');
const bookRoutes = require('./routes/book-routes');

app.use('/api/users', userRoutes);
app.use('/api/books',bookRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const errorHandler = require('./ middlewares/errorHandler');
app.use(errorHandler);

module.exports = app;