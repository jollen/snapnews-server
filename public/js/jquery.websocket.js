(function($) {
  var ws;
  
  $.fn.createWebSocket = function () {
    var self = this;

    // Let us open a web socket
    ws = new WebSocket("ws://192.168.1.26:3000/", ['echo-protocol']);
    ws.onopen = function() {
    	self.html("<h2>server ready</h2>");
    };

    ws.onclose = function() { 
      self.html("<h2>server closed</h2>");
    }; 

    ws.onerror = function() { 
      self.html("<h2>server error</h2>");
    };

    ws.onmessage = function (message) {
      var json = JSON.parse(message.data);

      self.html(json);
    };
  }
})($);
