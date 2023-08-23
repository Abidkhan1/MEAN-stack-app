const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser  = require('body-parser');
const app = express();
require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

app.use("/todos", require("./routes/todos"));
app.use("/user",require('./routes/user'));

mongoose
.connect('mongodb+srv://abideutech:Password123@testcluster0.nowbshw.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    console.log('connected to MongoDB');
})
.catch((error) => {
    console.log('error:',error);
})

const port = process.env.PORT;
app.listen(3000, () => {
    console.log('server is running on port 3000');
})