
QUnit.config.reorder = false; // do not reorder tests

// tests
module('zendesk-js');

// READ

asyncTest('get user by id', function(){
  expect(1);
  Zendesk.users(6).each(function(user){
    equal(6, user.data.id);
    start();
  });    
});

asyncTest('get user by name', function(){
  expect(1);
  Zendesk.users("End User").each(function(user){
    console.log(user);
    equal("End User", user.data.name);
    start();
  });
});

asyncTest('get user by id array', function(){
  expect(3);
  Zendesk.users([6, 41], function(users) {
    console.log(users);
    ok(users.some(function(user) { return user.data.id == 6; } ), 'contains id 6');
    ok(users.some(function(user) { return user.data.id == 41; } ), 'contains id 41');
    equal(2, users.length);
    start();
  });
});

asyncTest('get all agents', function(){
  expect(1);
  Zendesk.users({role: 2}, function(users) {  
    ok(users.every(function(user) { return user.data.roles == 2; } ), 'all users are agents');
    start();
  });
});

asyncTest('get all users in organization', function(){
  expect(1);
  Zendesk.users({organization: 6}, function(users){
    ok(users.every(function(user) { return user.data.organization_id == 6; } ), 'all users are in the organization');
    start();
  });
});

asyncTest('get all agents in organization 6', function(){
  expect(1);
  Zendesk.users({organization: 6, role: 2}, function(users){
    ok(users.every(function(user) { return user.data.organization_id == 6 && user.data.roles == 2; } ), 'all users are in the organization');
    start();
  });
});

// PAGINATE

// SORT

// FILTER

// FIND


// CREATE

asyncTest('create new user', function(){
  Zendesk.users().create({
    name: 'John Doe',
    // verified users have to have a password 
    password: 'password123'
  }, function(user) {
    console.log('User id is', user.id);
    ok(user.id);
    start();
  });
});

// UPDATE
// curl --user email:pwd -i -H "Accept: application/json" -X PUT -d '{"user":{"phone":"1234"}}' http://support.localhost/users/6.json

asyncTest('update John Does', function(){
  Zendesk.users({name: 'John Doe'}, function(users){
    var pending = users.length;
    users.forEach(function(user){
      user.update({phone: '555123567'}, function(user) {
        // verify by reading again
        Zendesk.users(user.data.id).each(function(user) {
          console.log('Updated user', user);
          equals(user.data.phone, '555123567');
          pending--;
          if(pending == 0){
            start();
          }
        })
      }); 
    });
  });
});
// DELETE
asyncTest('delete John Does', function(){
  Zendesk.users({name: 'John Doe'}, function(users){
    var pending = users.length;
    users.forEach(function(user){
      user.del( function() {
        pending--;
        if(pending == 0){
          // verify by reading again
          Zendesk.users({name: 'John Doe'}, function(users) {
            equals(users.length, 0);
            start();
          });
        }
      }); 
    });
  });
});

// SUB MODELS

Zendesk.users(6).each(function(user) { 
  user.identities(function(identity) { 
    console.log(identity); 
  });
});



// TICKETS

// Zendesk.tickets({ view: 106}, function(tickets) {console.log(tickets)});

