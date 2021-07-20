const express = require('express');
const axios = require('axios');
const sanitizer = require('./sanitize.js');

function serveStatic(app){
	app.use(express.static('public'))
}

function setUpStockRoutes(app){
	app.get('/quote/:quote', (req, res) => {
		let raw_quote = req.params['quote'];
		let sanitized_quote = raw_quote.replace(/\^[a-zA-Z]+$/) //sanitize quote
		let quote = sanitized_quote.toLowerCase();
		
		if (quote.length > 0){
			axios
				.get(`https://query1.finance.yahoo.com/v8/finance/chart/${quote}`)
				.then(r => {
					console.log(`Retrieved quote for ${quote}`);
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