const express = require('express');
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());


const userRoutes = require('./routes/user-routes');
const bookRoutes = require('./routes/book-routes');
const excerptsRoutes = require('./routes/excerpts-routes');
const annotationsRoutes = require('./routes/annotations-routes');
const likesRoutes = require('./routes/likes-routes');


app.use('/api/users',userRoutes);
app.use('/api/books',bookRoutes);

app.use('/api/excerpts',excerptsRoutes);
app.use('/api/annotations', annotationsRoutes);
app.use('/api/likes', likesRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});
console.log("app.js carregado");
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

module.exports = app;