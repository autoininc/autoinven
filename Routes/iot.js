module.exports = function(app,db){

	const express = require('express');
	const router = express.Router();

	const iot_mypage = require('./iot_mypage');
	const iot_monitoring = require('./iot_monitoring');
	const iot_warehousing = require('./iot_warehousing');

	var check = (req, res, next) => {
		var id = req.session['memberID'];
		var wid = req.session['warehouseID'];
		var ref = req.headers.referer ? req.headers.referer.toLowerCase() : '';
		const refererPaths = ['/provider/mywarehouse', '/buyer/mywarehouse', '/iot', '/iot/monitoring', '/iot/warehousing', '/iot/help'];

		// /iot 하위 모든 경로에 대해 검사
		if (!id) res.redirect('/User/Login');  // 로그인 안한 상태: out
		else if (req.path === '/' && req.method === 'POST') return next();  // 세션에 wid 등록하는 요청은 pass
		else if (!wid) res.send('잘못된 접근입니다.');  // 세션에 wid 없음: out
		else if (refererPaths.every((e) => !ref.includes(e))) res.send('잘못된 접근입니다.');  // referer가 refererPaths에 포함되지 않음: out
		else next();  // 모두 통과: ok
	};
	router.use(check);

	router.get('/', (req, res, next) => { iot_mypage.init(req, res, db) });
	router.post('/', (req, res, next) => { iot_mypage.sessionCheck(req, res, db) });

	router.get('/monitoring', (req, res, next) => { iot_monitoring.init(req, res, db) });

	router.get('/warehousing', (req, res, next) => { iot_warehousing.init(req, res, db) });

	router.get('/randomTest', (req, res, next) => { iot_warehousing.randomTest(req, res, db) });

	router.get('/registerItem', (req, res, next) => { res.render('Iot/registerItem') });
	router.post('/registerItem', (req, res, next) => { iot_warehousing.registerItem(req, res, db) });

	return router;
};
