module.exports = function(app,db){

	const express = require('express');
	const router = express.Router();

	const iot_monitoring = require('./iot_monitoring');
	const iot_warehousing = require('./iot_warehousing');
	const iot_statistics = require('./iot_statistics');
	const iot_help = require('./iot_help');

	router.get('/', (req, res, next) => { iot_monitoring.init(req, res, db) });

	router.get('/monitoring', (req, res, next) => { iot_monitoring.init(req, res, db) });

	router.get('/warehousing', (req, res, next) => { iot_warehousing.init(req, res, db) });

	router.get('/statistics', (req, res, next) => { iot_statistics.init(req, res, db) });
	
	router.get('/help', (req, res, next) => { iot_help.init(req, res, db) });

	router.get('/randomTest', (req, res, next) => { iot_warehousing.randomTest(req, res, db) });

	router.get('/registerItem', (req, res, next) => { res.render('Iot/registerItem') });
	router.post('/registerItem', (req, res, next) => { iot_warehousing.registerItem(req, res, db) });

	return router;
};
