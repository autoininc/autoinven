const crypto = require('crypto');

    var password = crypto.createHash('sha512').update(req.body.password).digest('base64');
    var SQL = `UPDATE Member SET password=? WHERE memberID='${req.session.memberID}'`
    var check = db.query(SQL,[password]);
    if (!check) {
        console.log("error ocurred", error);
        res.redirect('/User/Edit');
    } else {
            req.session['password'] = password;
            res.redirect('/');    
    }
}