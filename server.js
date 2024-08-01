require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const MONGO_URI = process.env.MONGO_URI
const Car = require('./models/car')
const logger = require('morgan')

app.use(express.json())
app.use(logger('dev'))

mongoose.connect(MONGO_URI)

mongoose.connection.once('open', () => {
  console.log('Connection with mongo is established')
})

mongoose.connection.on('error', () => {
  console.error('Mongo is trippin')
})


// create

app.post('/cars', async (req, res) => {
  try {
    const createdCar = await Car.create(req.body);
    res.json(createdCar);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

// read

app.get('/cars', async (req, res) => {
  try {
    const foundCars = await Car.find({});
    res.json(foundCars);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

// index and show 

app.get('/cars/:id', async (req, res) => {
  try {
    const foundCar = await Car.findOne({ _id: req.params.id });
    res.json(foundCar);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

// update 

app.put('/cars/:id', async (req, res) => {
  try {
    const updatedCar = await Car.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    res.json(updatedCar);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

// delete

app.delete('/cars/:id', async (req, res) => {
  try {
    await Car.findOneAndDelete({ _id: req.params.id });
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

app.listen(3000, () => {
  console.log('Application accepting requests on port 3000')
})