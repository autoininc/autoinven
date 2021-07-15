exports.init = function(req, res, db) {
    var id = req.session['memberID'];
	if(!id) res.status(401).render('unauthorized');
	else {
		var row = db.query("SELECT * FROM Member WHERE memberID = ?;", [id]);
		if (!row) console.log('err: mypage');
		else res.render('Iot/mypage', {uname: row[0].name});
    }
}
