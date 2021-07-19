exports.init = function(req, res, db) {
	var id = req.session['memberID'];
	var wid = req.session['warehouseID'];
	var row = db.query("SELECT * FROM iot WHERE id=? and warehouseID=?;", [id, wid]);
	if (!row) console.log('err: warehousing init');
	else {
		var items = '';
		for (var i = 0; i < row.length; i++) {
			row[i].received = row[i].received ? '입고완료' : '미입고';
			items += `
			<tr>
				<td>${row[i].rfid}</td>
				<td>${row[i].name}</td>
				<td>${row[i].num}</td>
				<td>${row[i].received}</td>
				<td><button class="checkBtn" onclick="location.href='${row[i].picture}'">확인</button></td>
			</tr>
		  `;
		}
		res.render('Iot/warehousing', {table_data: items});
	}
}


exports.registerItem = function(req, res, db) {
	var rfid = req.body.rfid.toUpperCase();
	var name = req.body.name;
	var num = req.body.num;
	var received = 0;
	var picture = `./${rfid}.jpg`;
	var id = req.session['memberID'];
	var wid = req.session['warehouseID'];

	var row = db.query(`INSERT INTO iot VALUES('${rfid}', '${id}', '${name}', ${num}, ${received}, '${picture}',${wid});`);
	if (!row) console.log('err: registerItem');
	else res.redirect('warehousing');
}


exports.randomTest = function(req, res, db) {
	var types = ['aaa', 'bbb', 'ccc', 'ddd', 'eee', 'fff', 'ggg'];
	var rfid = Math.random().toString(16).substr(2,8).toUpperCase();
	var name = types[Math.floor(Math.random() * types.length)];
	var num = Math.floor(Math.random() * 100) + 1;
	var received = Math.floor(Math.random() * 2);
	var picture = `./${rfid}.jpg`;
	var id = req.session['memberID'];
	var wid = req.session['warehouseID'];

	var row = db.query(`INSERT INTO iot VALUES('${rfid}', '${id}', '${name}', ${num}, ${received}, '${picture}', ${wid});`);
		if (!row) console.log('err: randomTest');
		else res.redirect('warehousing');
}
