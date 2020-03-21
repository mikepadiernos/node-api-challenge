// INITIATE EXPRESS
const express = require('express');
const router = express.Router();

// IMPORT DATABASES
const db = require('../data/helpers/actionModel');

// HANDLER FOR "/"
router
	.route('/')
	.get((req, res) => {})
	.post((req, res) => {});

router
	.route('/:id')
	.get((req, res) => {})
	.put((req, res) => {})
	.delete((req, res) => {});

module.exports = router;