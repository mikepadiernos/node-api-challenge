// IMPORT MODULES
const express         = require('express');
const cors            = require('cors');
const helmet          = require('helmet');

// IMPORT MIDDLEWARES
const middle          = require('./middleware/middleware');

// MIDDLEWARES
const logger          = middle.logger;

// IMPORT ROUTERS
const projects        = require('./routers/projectRouter');
const actions         = require('./routers/actionRouter');

// INITIATE EXPRESS AS SERVER
const server          = express();

server.use(helmet(), logger, express.json(), cors());

server
	.route('/')
	.get( (req, res) => {
		res.send(`<h2>Let's write some middleware!</h2>`);
	});

// ROUTER - "./api/projects"
server.use('/api/projects', projects);
server.use('/projects', projects);

// ROUTER - "./api/actions"
server.use('/api/actions', actions);
server.use('/actions', actions);

module.exports = server;
