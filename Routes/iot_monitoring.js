exports.init = function(req, res, db) {
	if(!req.session['memberID']) res.status(401).render('unauthorized');
	else res.render('Iot/monitoring');
}
