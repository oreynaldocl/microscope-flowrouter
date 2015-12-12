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

PostsListController = RouteController.extend({
  increment: 5,
  fastRender: true,
  subscriptions: function() {
    this.postsSub = Meteor.subscribe('posts', this.findOptions());
  },

  action: function() {
    var posts = this.posts(),
      hasMore = posts.count() === this.postsLimit();
    this.render('postsList', {
      data: {
        posts: posts,
        ready: this.postsSub.ready,
        nextPath: hasMore ? this.nextPath() : null
      }
    });
  },

  postsLimit: function() {
    return parseInt(this.params.postsLimit) || this.increment; 
  },

  findOptions: function() {
    return {sort: this.sort, limit: this.postsLimit()};
  },

  posts: function() {
    return Posts.find({}, this.findOptions());
  }
});

NewPostsController = PostsListController.extend({
  sort: {submitted: -1, _id: -1},
  nextPath: function() {
    return JSRouter.getPath('newPosts', {postsLimit: this.postsLimit() + this.increment});
  }
});

BestPostsController = PostsListController.extend({
  sort: {votes: -1, submitted: -1, _id: -1},
  nextPath: function() {
    return JSRouter.getPath('bestPosts', {postsLimit: this.postsLimit() + this.increment});
  }
});

Router.route('/', {
  name: 'home',
  controller: NewPostsController
});

Router.route('/new/:postsLimit?', {name: 'newPosts'});

Router.route('/best/:postsLimit?', {name: 'bestPosts'});

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
