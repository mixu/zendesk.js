var Zendesk = require('../zendesk.js');

// READ

exports['get user by id'] = function(test) {
  test.numAssertions = 1;

  Zendesk.users(6).each(function(user){
    test.equal(6, user.data.id);
    test.finish();
  });
};   

exports['get user by name'] = function(test) {
  test.numAssertions = 1;
  Zendesk.users("End User").each(function(user){
    test.equal("End User", user.data.name);
    test.finish();
  });
};

exports['get user by id array'] = function(test) {
  test.numAssertions = 3;
  // print an array with 6 and 41
  Zendesk.users([6, 41], function(users) {
    console.log(users);
    test.ok(users.some(function(user) { return user.data.id == 6; } ), 'contains id 6');
    test.ok(users.some(function(user) { return user.data.id == 41; } ), 'contains id 41');
    test.equal(2, users.length);
    test.finish();
  });
};


// print all agents
exports['get all agents'] = function(test) {  
  Zendesk.users({role: 2}, function(users) {  
    test.ok(users.every(function(user) { return user.data.roles == 2; } ), 'all users are agents');
    test.finish();
  });
};

// print all users in organization
exports['get all users in organization'] = function(test) {  
  Zendesk.users({organization: 6}, function(users){
    test.ok(users.every(function(user) { return user.data.organization_id == 6; } ), 'all users are in the organization');
    test.finish();
  });
};


// print all users in group
exports['get all users in group'] = function(test) {  
  Zendesk.users({group: 6}, function(users){
    test.ok(users.every(function(user) { 
      return user.data.groups.some(function(group) {
        return group.id == 6;
      }); 
      }), 'all users are in the group');
    test.finish();
  });
};

// print all agents in org 123
exports['get all agents in organization 6'] = function(test) {  
  Zendesk.users({organization: 6, role: 2}, function(users){
    test.ok(users.every(function(user) { return user.data.organization_id == 6 && user.data.roles == 2; } ), 'all users are in the organization');
    test.finish();
  });
};

/* NOT SUPPORTED

exports['get user by name array'] = function(test) {
  test.numAssertions = 3;
  // print an array with 6 and 41
  Zendesk.users(["End User", "Agent Extraordinaire"], function(users) {
    console.log(users);
    test.ok(users.some(function(user) { return user.data.name == "End User"; } ), 'contains End User');
    test.ok(users.some(function(user) { return user.data.name == "Agent Extraordinaire"; } ), 'contains Agent Extraordinaire');
    test.equal(2, users.length);
    test.finish();
  });
};

// print all agents in org 123 or org 234
Zendesk.users({organization: [123, 234], role: 2}).each(function(user){
  console.log(user);    
});

*/

// PAGINATE

// print every user on page 1
exports['get every user on page 1'] = function(test) {  
  Zendesk.users().page(1, function(users) {
    test.equal(users.length, 15);
    test.finish();
  });
};

/* 

API v1 does not support per_page ?

// per page
exports['get 50 users on page 2'] = function(test) {  
  Zendesk.users().page(2).per_page(50, function(users) {
    test.equal(users.length, 50);
    test.finish();
  });
};

exports['get 100 users on page 1'] = function(test) {  
  test.numAssertions = 100;
  Zendesk.users().page(1).per_page(100, function(users) {
    test.equal(users.length, 100);
    test.finish();
  });
};
*/
// SORT

// FILTER

// CREATE
/*
Zendesk.users().create({
  name: 'John Doe',
}, function(user) {
  console.log('User id is', user.id);
});

// UPDATE

Zendesk.users({name: 'John Doe'}).each(function(user){
  user.update({phone: '555123567'}, function(user) {
    console.log(user);
  });
});

// DELETE

Zendesk.users({name: 'John Doe'}).each(function(user){
  user.del(function() {
    // do whatever
  });
});

// SUB MODELS

/*
Zendesk.users({role: "agent"}).each(function(user){
  user.update({remote_photo_url:"yo@dawg.com"});
  user.del();
//  user.identities().each(function(identity){
//    console.log(identity);
//  });
//  user.identities().create({});
});

*/
// if this module is the script being run, then run the tests:
if (module == require.main) {
  var async_testing = require('async_testing');
  process.nextTick(function() {
    async_testing.run(__filename, process.ARGV, function() { process.exit(); } );
  });
}
