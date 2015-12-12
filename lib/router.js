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
  fastRender: true
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
  fastRender: true
});

Router.route('/posts/:_id/edit', {
  name: 'postEdit'
});

Router.route('/submit', {name: 'postSubmit'});
