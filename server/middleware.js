const express = require('express');
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');

/// Sets up generic server features
function setupGeneral(app){
	app.use(express.json()); // Allows JSONs to be used easier in routes.
	app.use(compression());  // Decreases bandwidth
	app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
}

function setupSecurity(app){
	app.use(helmet()); 		 // Packed with a number of security bells and whistles
	app.use(rateLimit({ // Limits responses.
		windowMs: 60 * 1000, //1 Minute
		max: 150
	}))
}

function setupMiddleware(app){
	setupGeneral(app);
	setupSecurity(app);
}

module.exports = {setupMiddleware}