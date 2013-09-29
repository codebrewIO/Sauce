// based on http://clintberry.com/2013/angular-js-websocket-service/
app.factory('insight', ['$q', '$rootScope', function($q, $rootScope) {
	var socket = new WebSocket("ws://localhost:9000/eval");
	var callbacks = {};
	var currentCallbackId = 0;

	function getCallbackId() {
		currentCallbackId += 1;
		/* max: http://ecma262-5.com/ELS5_HTML.htm#Section_8.5*/
		if(currentCallbackId >= 9007199254740992 - 1) {
			currentCallbackId = 0;
		}
		return currentCallbackId;
	}

	function listener(data) {
		if(callbacks.hasOwnProperty(data.callback_id)) {
			var insight = data.response.join('\n');
			$rootScope.$apply(callbacks[data.callback_id].resolve(insight));
			delete callbacks[data.callback_id];
		}
    }

	socket.onmessage = function(message){
		listener(JSON.parse(message.data));
	};

	return function(code){
		var request = {};
		var defer = $q.defer();
		var callbackId = getCallbackId();
		callbacks[callbackId] = defer;
		request.callback_id = callbackId;
		request.code = code;
		socket.send(JSON.stringify(request));
		return defer.promise;		  
	}
}]);