//GENERIC FUNCTIONS:
JSRouter = {};
/**
 * Generates a route path
 * */
JSRouter.getPath = (name, params, options) => {
  return FlowRouter.path(name, params, options);
};

/**
 * Goes to specific route
 * */
JSRouter.go = (name, params, options) => {
  FlowRouter.go(name, params, options);
};

JSRouter.getName = () => {
  return FlowRouter.getRouteName();
};

JSRouter.getParams = (...params) => {
  let result = {};
  _.each(params, (paramName) => {
    let param = FlowRouter.getParam(paramName);
    if (param) {
      result[paramName] = param;
    }
  });
  return result;
};

FlowRouter.route('/', {
  name: 'home',
  action: function() {
    BlazeLayout.render('layout', {content: 'postsList'});
  }
});

FlowRouter.route('/new/:postsLimit?', {
  name: 'newPosts',
  action: function() {
    BlazeLayout.render('layout', {content: 'postsList'});
  }
});

FlowRouter.route('/best/:postsLimit?', {
  name: 'bestPosts',
  action: function() {
    BlazeLayout.render('layout', {content: 'postsList'});
  }
});

FlowRouter.route('/posts/:_id', {
  name: 'postPage',
  action: function() {
    BlazeLayout.render('layout', {content: 'postPage'});
  }
});

FlowRouter.route('/posts/:_id/edit', {
  name: 'postEdit',
  action: function() {
    BlazeLayout.render('layout', {content: 'postEdit'});
  }
});

FlowRouter.route('/submit', {
  name: 'postSubmit',
  action: function() {
    BlazeLayout.render('layout', {content: 'postSubmit'});
  }
});
