const express = require('express');
const axios = require('axios');
const sanitizer = require('./sanitize.js');

function serveStatic(app){
	app.use(express.static('public'))
}

function setUpStockRoutes(app){
	app.get('/ticker/:ticker', (req, res) => {
		let raw_ticker = req.params['ticker'];
		let sanitized_ticker = raw_ticker.replace(/\^[a-zA-Z]+$/) //sanitize ticker
		let ticker = sanitized_ticker.toLowerCase();
		
		if (ticker.length > 0){
			axios
				.get(`https://query1.finance.yahoo.com/v8/finance/chart/${ticker}`)
				.then(r => {
					console.log(`Retrieved quote for ${ticker}`);
					res.send(r.data);
				})
		} else {
			res.sendStatus(500);
		}
	})
	
	app.get('/ticker/:ticker/detail/:detail', (req, res) => {
		let ticker = sanitizer.sanitizeText(req, res, 'ticker');
		let detail = sanitizer.sanitizeText(req, res, 'detail');
		
		axios
			.get(`https://query2.finance.yahoo.com/v10/finance/quoteSummary/${ticker}?modules=${detail}`)
			.then(r => {
				console.log(`Retrieved ${detail} for ${ticker.toUpperCase()}`);
				res.send(r.data);
			})
			.catch(e => {
				console.log(e);
				res.sendStatus(500);
			})
	})
}

function setupRoutes(app){
	serveStatic(app);
	setUpStockRoutes(app);
}

module.exports = {setupRoutes};