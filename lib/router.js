//GENERIC FUNCTIONS:
JSRouter = {};
/**
 * Generates a route path
 * */
JSRouter.getPath = (name, params, options) => {
  return Router.path(name, params, options);
};

/**
 * Goes to specific route
 * */
JSRouter.go = (name, params, options) => {
  Router.go(name, params, options);
};

JSRouter.getName = () => {
  return Router.current() && Router.current().route.getName();
};

JSRouter.getParams = (...params) => {
  return _.pick(Router.current().params, params);
};

Router.configure({
  layoutTemplate: 'layout',
  //loadingTemplate: 'loading',
  //notFoundTemplate: 'notFound',
  fastRender: true,
  waitOn: function() {
    return [Meteor.subscribe('notifications')]
  }
});

Router.route('/', {
  name: 'home',
  template: 'postsList'
});

Router.route('/new/:postsLimit?', {
  name: 'newPosts',
  template: 'postsList'
});

Router.route('/best/:postsLimit?', {
  name: 'bestPosts',
  template: 'postsList'
});

Router.route('/posts/:_id', {
  name: 'postPage',
  fastRender: true,
  waitOn: function() {
    return [
      Meteor.subscribe('singlePost', this.params._id),
      Meteor.subscribe('comments', this.params._id)
    ];
  },
  action: function() {
    this.render('postPage', {
      data: Posts.findOne(this.params._id)
    });
  }
});

Router.route('/posts/:_id/edit', {
  name: 'postEdit',
  waitOn: function() { 
    return Meteor.subscribe('singlePost', this.params._id);
  },
  action: function() {
    this.render('postEdit', {
      data: Posts.findOne(this.params._id)
    });
  }
});

Router.route('/submit', {name: 'postSubmit'});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
};

Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});
