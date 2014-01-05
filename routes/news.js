
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

var clients = [];

exports.RequestWebSocket = function(req, res) {
	var onWsConnClose = function(reasonCode, description) {
		console.log('Peer disconnected with reason: ' + reasonCode);
	};

	var onWsRequest = function(request) {
		console.log('WebSocket connect requested');

		var connection = request.accept('echo-protocol', request.origin);

		connection.on('close', onWsConnClose);

		clients.push(connection);
	};

	wsServer.on('request', onWsRequest);
}