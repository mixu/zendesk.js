
var OAuth2 = require('./lib/node-oauth').OAuth2;

var client = new OAuth2('2', 'ABCDEF', 'http://support.localhost:3000', '/oauth/authorize', '/oauth/token');
client.setAccessTokenName('oauth_token');

client.getOAuthAccessToken('', {grant_type: 'authorization_code'}, function(err, access_token, refresh_token) {
  if(err) {
    console.log(err);
    throw err;
  } 
  console.log('Access token: ', access_token);
  console.log('Refresh token:', refresh_token);
  client.get('http://support.localhost:3000/users/current.json', access_token, function(err, data) {
    if(err) {
      console.log(err);
      throw err;
    } 
    console.log(JSON.parse(data));
  });
});