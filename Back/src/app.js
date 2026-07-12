const express = require('express');
const app = express();


app.use(express.json());


const userRoutes = require('./routes/user-routes');
const bookRoutes = require('./routes/book-routes');
const excerptsRoutes = require('./routes/excerpts-routes');
const annotationsRoutes = require('./routes/annotations-routes');


app.use('/api/users',userRoutes);
app.use('/api/books',bookRoutes);

app.use('/api/excerpts',excerptsRoutes);
app.use('/api/annotations', annotationsRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

module.exports = app;