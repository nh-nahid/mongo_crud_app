const express = require('express');
const mongoose = require('mongoose');
const todoHandler = require('./routeHandler/todoHandler');
const userHandler = require('./routeHandler/userHandler');
const dotenv = require('dotenv');

const app = express();
app.use(express.json());
dotenv.config();

// database connection with mongoose
mongoose.connect('mongodb://localhost:27017')
    .then(() => console.log('connection successfull'))
    .catch(err => console.log(err))

// Application routes
app.use('/todo', todoHandler);
app.use('/user', userHandler);



// default error handler
const errorHandler = (err, req, res, next) => {
    if(res.headersSent) {
        return next(err);
    }
    res.status(500).json({error: err});
}

app.use(errorHandler);

app.listen(3000, () => {
    console.log('app is listening at port 3000')
})