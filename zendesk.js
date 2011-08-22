var Collection = require('pixiedust').Collection;
var Client = require('pixiedust').Client;
var Oauth = require('pixiedust').Oauth2;

Collection.client = Client({ 
  host: 'support.localhost',
  port: 3000,
  secure: false,
  auth: new Oauth({access_token: ''})
});

Zendesk = {};

Zendesk.users = Collection.initialize('user', {
    me: {
      url: '/users/current.json'
    },
    create: {   
      url: '/users.json',
      format: 'json',
      wrap: 'user'  // wrap the data into { user: ... }
    },
    read: {   
      url: '/users/{id}.json'
    },
    update: {
      url: '/users/{id}.json'
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
    }
  });

Zendesk.groups = Collection.initialize('group', {
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
    "delete": {
      url: '/groups/{id}.json'      
    }  
});

Zendesk.organizations = Collection.initialize('organization', {
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
    "delete": {
      url: '/organizations/{id}.json'      
    }    
});

Zendesk.tickets = Collection.initialize('ticket', {
    create: { 
      url: '/tickets.json'
    },
    read: {   
      url: '/tickets/{id}.json'
    },
    update: {
      url: '/tickets/{id}.json'
    },
    "delete": {
      url: '/tickets/{id}.json'      
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


Zendesk.forums = Collection.initialize('forum', {
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
    "delete": {
      url: '/forums/{id}.json'      
    },
    has_many: {
      entries: {
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
        "delete": {
          url: '/entries/{id}.json'      
        },    
        find: {
          by_tag: {
            url: '/tags/{tag}.json?for=entry',
            pagination: true
          },
          
        },
        has_many: {
          posts: {
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
            "delete": {
              url: '/posts/{id}.json'      
            }    
          }
        }
      }      
    }
  });
module.exports = Zendesk;