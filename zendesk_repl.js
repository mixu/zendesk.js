var Zendesk = require('./zendesk.js');

var repl = require('repl');

console.log('What\'s here:');
console.log('users, groups, organizations, tickets, forums');


repl.start().context.Zendesk = Zendesk;
