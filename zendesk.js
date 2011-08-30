if(typeof exports != 'undefined') {
  var Collection = require('pixiedust').Collection;
  var Client = require('pixiedust').Client;
  var OAuth = require('pixiedust').Oauth2;
  var BasicAuth = require('pixiedust').BasicAuth;
  var Cache = require('pixiedust').Cache;
}

Collection.client = Client({ 
  host: 'support.localhost',
  secure: true,
//  auth: new BasicAuth({
//    email: 'agent@zendesk.com',
//    password: '123456'
//  })
  // new OAuth({access_token: ''})
});

if(typeof Zendesk == 'undefined') {
  Zendesk = {};
  Collection.client = Client({ 
    host: 'support.localhost',
    port: 443,
    secure: true,
    auth: new BasicAuth({
      email: 'agent@zendesk.com',
      password: '123456'
    })
    // new OAuth({access_token: ''})
  });
}

Zendesk.API = {};
Zendesk.API.cache = new Cache();

Zendesk.API.users = Collection.initialize('user', {
    me: {
      url: '/users/current.json'
    },
    create: {   
      url: '/users.json',
      format: 'json',
      wrap: 'user'  // wrap the data into { user: ... }
    },
    read: {   
      url: '/users/{id}.json',
      cache: {
        has: function(params) {
          console.log('Zendesk.API.cache.has', params.id, Zendesk.API.cache.has('user', params.id));
          return Zendesk.API.cache.has('user', params.id);
        },
        get: function(params) {
          console.log('Zendesk.API.cache.get', params.id);
          return Zendesk.API.cache.get('user', params.id);
        },
        set: function(params, data) {
          console.log('Zendesk.API.cache.set', params.id, data);
          return Zendesk.API.cache.set('user', params.id, data);
        }
      }
    },
    update: {
      url: '/users/{id}.json',
      wrap: 'user'  // wrap the data into { user: ... }
    },
    del: {
      url: '/users/{id}.json'      
    },
    list: {
      url: '/users.json',
      pagination: true,
      filter: { 
        by_name: {
          param: 'query',
        },
        by_role: {
          param: 'role',
        }
      },
    },
    find: {
      by_organization: {
        url: '/organizations/{organization}/users.json',
        pagination: true
      },
      by_group: {
        url: '/groups/{group}/users.json',
        pagination: true
      },
    },
    has_many: {
      identities: Collection.initialize('identity', {
        create: {
          url: '/users/{user}/user_identities.json'
        },
        read: {
          url: '/users/{user}/user_identities/{id}.json'
        },
        del: {
          url: '/users/{user}/user_identities/{id}.json'
        },
        list: {
          url: '/users/{user}/user_identities.json'
        }
      })
    }
  });

Zendesk.API.groups = Collection.initialize('group', {
    list: {
      'url': '/groups.json',
      pagination: true
    },
    create: { 
      url: '/groups.json'
    },
    read: {   
      url: '/groups/{id}.json'
      },
    update: {
      url: '/groups/{id}.json'
    },
    del: {
      url: '/groups/{id}.json'      
    }  
});

Zendesk.API.organizations = Collection.initialize('organization', {
    list: {
      'url': '/organizations.json',
      pagination: true
    },
    create: { 
      url: '/organizations.json'
    },
    read: {   
      url: '/organizations/{id}.json'
      },
    update: {
      url: '/organizations/{id}.json'
    },
    del: {
      url: '/organizations/{id}.json'      
    }    
});

Zendesk.API.tickets = Collection.initialize('ticket', {
    create: { 
      url: '/tickets.json',
      wrap: 'ticket'  // wrap the data 
    },
    read: {   
      url: '/tickets/{id}.json'
    },
    update: {
      url: '/tickets/{id}.json',
      wrap: 'ticket'  // wrap the data 
    },
    del: {
      url: '/tickets/{id}.json'      
    },
    list: {
      url: '/rules/{view}.json'
    },
    find: {
      by_tag: {
        url: '/tags/{tag}.json?for=ticket',
        pagination: true
      },
      by_assignee:{
        url: '/search.json?query=type:ticket assignee:"{assignee}"',
        pagination: true
      },
      by_requester:{
        url: '/search.json?query=type:ticket requester:"{requester}"',
        pagination: true
      },
      by_submitter:{
        url: '/search.json?query=type:ticket submitter:"{submitter}"',
        pagination: true
      },
      by_status: {
        url: '/search.json?query=type:ticket status:{status}',
        pagination: true        
      },
      by_priority: {
        url: '/search.json?query=type:ticket priority:{priority}',
        pagination: true        
      },
      by_ticket_type: {
        url: '/search.json?query=type:ticket ticket_type:{ticket_type}',
        pagination: true        
      },
      by_created: {
        url: '/search.json?query=type:ticket created:{created}',
        pagination: true        
      },
      by_updated: {
        url: '/search.json?query=type:ticket created:{created}',
        pagination: true        
      },
      by_solved: {
        url: '/search.json?query=type:ticket created:{created}',
        pagination: true        
      },
      by_due_date: {
        url: '/search.json?query=type:ticket created:{created}',
        pagination: true        
      },
      by_group: {
        url: '/search.json?query=type:ticket created:{created}',
        pagination: true        
      },
      by_orgaization: {
        url: '/search.json?query=type:ticket created:{created}',
        pagination: true        
      },
      by_tags: {
        url: '/search.json?query=type:ticket created:{created}',
        pagination: true        
      }
    }
});


Zendesk.API.forums = Collection.initialize('forum', {
    list: {
      'url': '/forums.json',
      pagination: true
    },
   create: { 
      url: '/forums.json'
    },
    read: {   
      url: '/forums/{id}.json'
      },
    update: {
      url: '/forums/{id}.json'
    },
    del: {
      url: '/forums/{id}.json'      
    },
    has_many: {
      entries: Collection.initialize('entry', {
        list: {
          'url': '/forums/{forum_id}/entries.json',
          pagination: true
        },
        create: { 
          url: '/entries.json'
        },
        read: {   
          url: '/entries/{id}.json'
          },
        update: {
          url: '/entries/{id}.json'
        },
        del: {
          url: '/entries/{id}.json'      
        },    
        find: {
          by_tag: {
            url: '/tags/{tag}.json?for=entry',
            pagination: true
          },
          
        },
        has_many: {
          posts: Collection.initialize('post', {
            create: { 
              url: '/posts.json'
            },
            list: {   
              url: '/entries/{entry_id}/posts.json',
              pagination: true
              },
            update: {
              url: '/posts/{id}.json'
            },
            del: {
              url: '/posts/{id}.json'      
            }    
          })
        }
      })
    }
  });

if(typeof exports != 'undefined') {
  module.exports = Zendesk.API;
}
