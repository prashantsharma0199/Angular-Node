const express = require('express');
var cors = require('cors');
const connection = require('./connection');
const studentRoute = require('./routes/student');
const teacherRoute = require('./routes/teacher');
const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/student',studentRoute);
app.use('/teacher',teacherRoute);


module.exports = app;