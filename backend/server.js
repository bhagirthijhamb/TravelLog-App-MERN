const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./db');
const middlewares = require('./middlewares');
const logs = require('./routes');

console.log('__dirname', __dirname);
const dirname = __dirname + '/../';
console.log('dirname', dirname)

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}

app.use('/api/logs', logs);

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(dirname, '/frontend/build')));
  app.get('*', (req, res) => res.sendFile(path.resolve(dirname, 'frontend', 'build', 'index.html' )))
} else {
  app.get('/', (req, res) => {
    res.json({ message: 'Hello World' })
    // res.send('API is running')
  })
}

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.cyan.inverse));