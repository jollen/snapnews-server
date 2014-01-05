
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

	for(i = 0; i < clients.length; i++) {
		var client = clients[i];

		client.sendUTF(JSON.stringify(history));
	}
};

var clients = [];

var onWsConnClose = function(reasonCode, description) {
	console.log('Pexer disconnected with reason: ' + reasonCode);
};

exports.onWsRequest = function(request) {
	console.log('WebSocket connect requested');

	var connection = request.accept('echo-protocol', request.origin);

	connection.on('close', onWsConnClose);

	clients.push(connection);
};

exports.websocket = function(req, res, next) {
	var wsServer = req.app.ws;

	if (wsServer === 'undefined') return;

	next();
}