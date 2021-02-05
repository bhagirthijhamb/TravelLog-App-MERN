const express = require('express');
const router = express.Router();
const LogEntry = require('./models');
const { API_KEY } = process.env;

router.get('/', async(req, res, next) => {
  try {
    // res.json({ message: 'Hello 🌎'})
    const entries = await LogEntry.find();
    res.json(entries);
  } catch(error){
    next(error);
  }
})

router.post('/', async(req, res, next) => {
  try {
    if(req.get('X-API-KEY') !== process.env.API_KEY){
      res.status(401);
      throw new Error('UnAuthorized');
    }
    const logEntry = new LogEntry(req.body);
    const createdEntry = await logEntry.save();
    res.json(createdEntry);
  } catch(error){
    if(error.name === 'ValidationError'){
      res.status(422);
    }
    next(error);
  }
})

module.exports = router