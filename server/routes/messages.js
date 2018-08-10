const express = require('express');
const router = express.Router({ mergeParams: true }); //to obtain params from url
const { createMessage } = require("../handlers/messages");


router.route('/').post(createMessage);


module.exports = router;