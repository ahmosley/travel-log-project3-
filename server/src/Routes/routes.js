const express = require('express');
const router = express.Router()


const Hobby = require('../models/Hobby')
const User = require('../models/User')
const LogEntry = require('../Models/LogEntry')


router.get(`/`, (req, res) => {
    res.json({
        backend: '🔥'
    })
})












module.exports = router
