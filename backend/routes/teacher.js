const express = require('express');
const { changeUser } = require('../connection');
const connection = require('../connection');
const router = express.Router();

const jwt = require('jsonwebtoken');
require('dotenv').config();
var auth = require('../services/authentication');

router.post('/signup', (req, res) => {
    let teacher = req.body;
    query = "select tname,emailId,passkey from teacher where emailId=?"
    connection.query(query, [teacher.emailId], (err, results) => {
        if (!err) {
            if (results.length <= 0) {
                query = "insert into teacher(tname,emailId,passkey) values(?,?,?)";
                connection.query(query, [teacher.tname, teacher.emailId, teacher.passkey], (err, results) => {
                    if (!err) {
                        return res.status(200).json({ message: "Successfully Registered." });
                    }
                    else {
                        return res.status(500).json(err);
                    }
                })
            }
            else {
                return res.status(400).json({ message: "User already exists." });
            }
        }
        else {
            return res.status(500).json(err);
        }
    })
})

router.post('/login', (req, res) => {
    const teacher = req.body;
    query = "select tname,emailId, passkey from teacher where emailId=?";
    connection.query(query, [teacher.emailId], (err, results) => {
        if (!err) {
            if (results.length <= 0 || results[0].passkey != teacher.passkey) {
                return res.status(401).json({ message: "Incorrect username or password" })
            }
            else if (results[0].passkey == teacher.passkey) {
                const response = { TeacherName: results[0].tname, EmailID: results[0].emailId}
                const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN)
                return res.status(200).json({ token: accessToken });
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

router.get('/getStudentDetails', auth.authenticateToken, (req, res) => {
    const teacher = req.body;
    query = "select * from student order by studname";
    connection.query(query, (err, results) => {
        if (!err) {
          return res.status(200).json({ results });
        }
        else {
            return res.status(500).json(err);
        }
    })
})

router.post('/addStudentDetails', auth.authenticateToken, (req, res) => {
    const teacher = req.body;
    query = "Insert into student (studname, rollnum, dob, score) values (?,?,STR_TO_DATE(?,'%m/%d/%Y'),?) ";
    connection.query(query, [teacher.studname, teacher.rollnum, teacher.dob, teacher.score ], (err, results) => {
        if (!err) {
          return res.status(200).json({ message: "Values Inserted" });
        }
        else {
            return res.status(500).json(err);
        }
    })
})

module.exports = router;
