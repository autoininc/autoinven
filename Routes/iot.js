module.exports = function(app,db){

	const express = require('express');
	const router = express.Router();

	const iot_mypage = require('./iot_mypage');
	const iot_warehousing = require('./iot_warehousing');

	var check = (req, res, next) => {
		var id = req.session['memberID'];
		var wid = req.session['warehouseID'];
		var hostIndex = (req.protocol + '://' + req.get('host')).length;
		var ref = req.headers.referer ? req.headers.referer.toLowerCase().substring(hostIndex) : '';
		const refererPaths = ['/provider/mywarehouse', '/buyer/mywarehouse', '/iot', '/iot/monitoring', '/iot/warehousing', '/iot/help'];

		if (!id) res.render('Alert/needLogin');
		else if (req.path === '/' && req.method === 'POST') return next();
		else if (!wid) res.render('Alert/cannotAccess');
		else if (!refererPaths.some((e) => (ref === e || ref === e + '/'))) res.render('Alert/cannotAccess');
		else next();
	};
	router.use(check);

	router.get('/', (req, res, next) => { iot_mypage.init(req, res, db) });
	router.post('/', (req, res, next) => { iot_mypage.sessionCheck(req, res, db) });

	router.get('/monitoring', (req, res, next) => { res.render('Iot/monitoring') });

	router.get('/warehousing', (req, res, next) => { iot_warehousing.init(req, res, db) });

	router.get('/randomTest', (req, res, next) => { iot_warehousing.randomTest(req, res, db) });

	router.get('/registerItem', (req, res, next) => { res.render('Iot/registerItem') });
	router.post('/registerItem', (req, res, next) => { iot_warehousing.registerItem(req, res, db) });

	return router;
};
