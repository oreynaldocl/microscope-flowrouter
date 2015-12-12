Template.postPage.onCreated(()=>{
  let self = Template.instance();
  self.autorun(()=>{
    let params = JSRouter.getParams('_id');
    self.singlePostSubs = self.subscribe('singlePost', params._id);
    self.commentsSubs = self.subscribe('comments', params._id);
  });
});

Template.postPage.helpers({
  isReady() {
    let tpl = Template.instance(),
      params = JSRouter.getParams('_id');
    return tpl.singlePostSubs.ready() && tpl.commentsSubs.ready() && Posts.findOne(params._id);
  },

  isLoading() {
    let tpl = Template.instance();
    return !tpl.singlePostSubs.ready() || !tpl.commentsSubs.ready();
  },

  currentPost() {
    let params = JSRouter.getParams('_id');
    return Posts.findOne(params._id);
  },

  comments() {
    return Comments.find({postId: this._id});
  }
});