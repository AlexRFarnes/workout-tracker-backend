require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');

// express app
const app = express();

// CORS options
var corsOptions = {
  origin: 'http://localhost:5173',
};

// middlewares
app.use(cors(corsOptions)); // overcome the CORS restriction during development

app.use(express.json()); // attach the data in the body to the request object [POST, PATCH]

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

// routes
app.use('/api/workouts', workoutRoutes);
// app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);

// DB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(`Connected to the DB successfully`);

    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log(`App listening on port ${process.env.PORT}`);
    });
  })
  .catch(error => {
    console.log(error);
  });
