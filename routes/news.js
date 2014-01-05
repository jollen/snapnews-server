
/*
 * GET home page.
 */
var fs = require('fs');

var history;

fs.readFile('./routes/db.json', function(err, data) {
        history = JSON.parse(data);
});

exports.index = function(req, res) {
 	res.send(history);
};

exports.create = function(req, res) {
	var photo = req.query.photo;
	var title = req.query.title;

	history.push({
		"photo": photo,
		"title": title
	});

	res.send({
		"status": "success"
	});

	res.end();

	fs.writeFile('./routes/db.json', JSON.stringify(history), function(err) {
		console.log('Saved!');
	});
};