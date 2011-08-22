var url = require('url');

var Zendesk = require('../zendesk.js');

var zd = new Zendesk({
	account: 'support.localhost',
	port: 3000,
	secure: false,
	oauth: {
		token: '',
		token_secret: ''
	}
});

Zendesk.get('/oauth/authorize.json', function(data){
	console.log(data);
	Zendesk.get('/oauth/allow', function(data, headers){
		if(headers.location) {
			var uri = url.parse(headers.location, true);
			if(uri.query.access_token) {
				console.log('access_token:', uri.query.access_token);
			}
		} else {
			console.log(data);
		}
	});
});