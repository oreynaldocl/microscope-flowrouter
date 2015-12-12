const increment = 5;
Template.postsList.onCreated(() => {
  let self = Template.instance();

  self.postsLimit = () => {
    let params = JSRouter.getParams('postsLimit');
    return parseInt(params.postsLimit) || increment;
  };

  self.getNameNextPath = () => {
    let routeName = JSRouter.getName();
    return (routeName === 'home')? 'newPosts' : routeName;
  };

  self.nextPath = () => {
    let postsLimit = self.postsLimit() + increment;
    return JSRouter.getPath( self.getNameNextPath(), {postsLimit});
  };

  self.findOptions = () => {
    let routeName = JSRouter.getName(),
      sort = {submitted: -1, _id: -1};
    if (routeName === 'bestPosts') {
      sort = {votes: -1, submitted: -1, _id: -1};
    }
    return {sort: sort, limit: self.postsLimit()};
  };

  self.autorun(() => {
    self.postSubscribe = self.subscribe('posts', self.findOptions());
  });
});

Template.postsList.helpers({
  posts () {
    let tpl = Template.instance();
    return Posts.find({}, tpl.findOptions());
  },

  ready () {
    let tpl = Template.instance();
    return tpl.postSubscribe.ready();
  },

  nextPath () {
    let tpl = Template.instance();
    return tpl.nextPath();
  }
});
