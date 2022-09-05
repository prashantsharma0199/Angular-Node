const express = require('express');
const connection = require('../connection');
const router = express.Router();

const jwt = require('jsonwebtoken');
require('dotenv').config();
var auth = require('../services/authentication');

router.post('/getMarks', (req, res) => {
    const student = req.body;
    query = "select studname, rollnum, dob, score from student where rollnum=?";
    connection.query(query, [student.rollnum], (err, results) => {
        if (!err) {
            if (results.length <= 0 || results[0].rollnum != student.rollnum) {
                return res.status(401).json({ message: "Incorrect roll number or name" })
            }
            else if (results[0].rollnum == student.rollnum) {
                const response = {StudentName: results[0].studname, RollNum: results[0].rollnum, DateOfBirth: results[0].dob, Marks: results[0].score}
                const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN)
                res.status(200).json({ accessToken });
            }
            else {
                return res.status(400).json({ message: "Something went wrong please try again later." })
            }
        }
        else {
            return res.status(500).json(err);
        }
    })
})

module.exports = router;
