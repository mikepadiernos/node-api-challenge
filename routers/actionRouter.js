// INITIATE EXPRESS
const express = require('express');
const router = express.Router();

// IMPORT DATABASES
const db = require('../data/helpers/actionModel');

// HANDLERS FOR "/"
router
	.route('/')
	.get((req, res) => {
		const { id } = req.params;
		db.get(id)
			.then(actions => {
				res.status(200).json(actions)
			})
			.catch(error => {
				res.status(500).json({success: false, message: "No actions found", error})
			})
	})
	.post((req, res) => {
		const info = req.body;
		db.insert(info)
			.then(action => {
				!info.project_id && !info.description && !info.notes
					? res.status(400).json({success: false, message: "Provide a description, notes, & Project ID"})
					: res.status(201).json({success: true, message: "Action added", ...action})
			})
			.catch(error => {
				res.status(500).json({success: false, message: "Project not added", error})
			})
	});

// HANDLERS FOR "/:id"
router
	.route('/:id')
	.get((req, res) => {
		const { id } = req.params;
		// console.log("Action: ", id);
		db.get(id)
			.then(action => {
				res.status(200).json(action)
			})
			.catch(error => {
				res.status(500).json({success: false, message: "No action found", error})
			})
	})
	.put((req, res) => {
		const { id } = req.params;
		const info = req.body;
		db.update(id, info)
			.then(action => {
				!info.project_id && !info.description && !info.notes && action
					? res.status(404).json({success: false, message: "Action not found"})
					: res.status(200).json({success: true, message: "Action updated", Action: info})
			})
			.catch(error => {
				res.status(500).json({success: false, message: "Action not updated", error})
			})
	})
	.delete((req, res) => {
		const { id } = req.params;
		db.get(id)
			.then(action => {
				!action
					? res.status(404).json({success: false, message: "Action found"})
					: db.remove(id)
						.then(del => {
							if (del) {res.status(200).json({success: true, action})}
						})
						.catch(error => {
							res.status(500).json({success: false, message: "Action not removed", error})
						})
			})
			.catch(error => {
				res.status(500).json({success: false, message: "Action not removed", error})
			})
	});

module.exports = router;