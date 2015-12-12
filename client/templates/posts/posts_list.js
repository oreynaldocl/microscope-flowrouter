Template.postsList.onCreated(() => {
  let self = Template.instance();
  self.autorun(() => {
    self.postSubscribe = self.subscribe('posts');
  });
});

Template.postsList.helpers({
  posts () {
    return Posts.find({});
  },

  ready () {
    let tpl = Template.instance();
    return tpl.postSubscribe.ready();
  },

  nextPath () {
    return '';
  }
});
