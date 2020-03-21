// INITIATE EXPRESS
const express = require('express');
const router = express.Router();

// IMPORT DATABASES
const db = require('../data/helpers/projectModel');

// HANDLER FOR "/"
router
	.route('/')
	.get((req, res) => {
		const { id } = req.params;
		db.get(id)
			.then(projects => {
				res.status(200).json(projects)
			})
			.catch(error => {
				res.status(500).json({success: false, message: "No projects found", error})
			})
	})
	.post((req, res) => {
		const info = req.body;
		console.log("Info: ", info);
		db.insert(info)
			.then(project => {
				console.log("Project: ", project);
				!info.name && !info.description
					? res.status(400).json({success: false, message: "Provide a name & description"})
					: res.status(201).json({success: true, message: "Project added", Project: project})
			})
			.catch(error => {
				res.status(500).json({success: false, message: "Project not added", error})
			})
	});

router
	.route('/:id')
	.get((req, res) => {
		const { id } = req.params;
		db.get(id)
			.then(project => {
				res.status(200).json(project)
			})
			.catch(error => {
				res.status(500).json({success: false, message: "No project found", error})
			})
	})
	.put((req, res) => {
		const { id } = req.params;
		const info = req.body;
		db.update(id, info)
			.then(project => {
				!info.name && !info.description && project
					? res.status(404).json({success: false, message: "Project not found"})
					: res.status(200).json({success: true, message: "Project updated", Project: info})
			})
			.catch(error => {
				res.status(500).json({success: false, message: "Project not updated", error})
			})
	})
	.delete((req, res) => {
		const { id } = req.params;
		db.get(id)
			.then(project => {
				!project
					? res.status(404).json({success: false, message: "User found"})
					: db.remove(id)
						.then(del => {
							if (del) {res.status(200).json({success: true, project})}
						})
						.catch(error => {
							res.status(500).json({success: false, message: "Project not removed", error})
						})
			})
			.catch(error => {
				res.status(500).json({success: false, message: "Project not removed", error})
			})
	});

router
	.route('/:id/actions')
	.get((req, res) => {
		const { id } = req.params;
		db.getProjectActions(id)
			.then(actions => {
				res.status(200).json(actions)
			})
			.catch(error => {
				res.status(500).json({success: false, message: "No actions found", error})
			})
	});

module.exports = router;