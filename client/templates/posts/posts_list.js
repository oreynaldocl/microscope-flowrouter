const increment = 5;
Template.postsList.onCreated(function(){
  let self = this;

  self.postsLimit = function() {
    let params = JSRouter.getParams('postsLimit');
    return parseInt(params.postsLimit) || increment;
  };

  self.getNameNextPath = function() {
    let routeName = JSRouter.getName();
    return (routeName === 'home')? 'newPosts' : routeName;
  };

  self.nextPath = function() {
    let postsLimit = self.postsLimit() + increment;
    return JSRouter.getPath( self.getNameNextPath(), {postsLimit});
  };

  self.findOptions = function() {
    let routeName = JSRouter.getName(),
      sort = {submitted: -1, _id: -1};
    if (routeName === 'bestPosts') {
      sort = {votes: -1, submitted: -1, _id: -1};
    }
    return {sort: sort, limit: self.postsLimit()};
  };

  self.getPostsCursor = function() {
    return Posts.find({}, self.findOptions());
  };

  self.autorun(function() {
    self.postSubscribe = self.subscribe('posts', self.findOptions());
  });
});

Template.postsList.helpers({
  posts () {
    let tpl = Template.instance();
    return tpl.getPostsCursor();
  },

  ready () {
    let tpl = Template.instance();
    return tpl.postSubscribe.ready();
  },

  hasNext() {
    let tpl = Template.instance();
    return tpl.getPostsCursor().count() === tpl.postsLimit();
  },

  nextPath () {
    let tpl = Template.instance();
    return tpl.nextPath();
  }
});
