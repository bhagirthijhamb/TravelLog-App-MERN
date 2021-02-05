const express = require('express');
const router = express.Router();
const LogEntry = require('./models');
const { API_KEY } = process.env;

router.get('/', async(req, res, next) => {
  try {
    console.log('hello');
    res.json({ message: 'Hello 🌎'})
  } catch(error){
    next(error);
  }
})

module.exports = router