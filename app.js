
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var hello = require('./routes/hello');
var news = require('./routes/news');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// ==============================
//        WebSocket
// ==============================
var WebSocketServer = require('websocket').server;

var wsServer = new WebSocketServer({
	httpServer: httpServer,
	autoAcceptConnection: false
});

// ==============================
//        URL Routing
// ==============================
app.get('/', routes.index);
app.get('/users', user.list);
app.get('/hello', hello.index);

// CRUD
app.get('/news', news.index);
app.post('/news', news.create);


var httpServer = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

