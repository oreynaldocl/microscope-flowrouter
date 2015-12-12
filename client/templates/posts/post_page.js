Template.postPage.onCreated(function(){
  this.autorun(()=>{
    let params = JSRouter.getParams('_id');
    this.singlePostSubs = this.subscribe('singlePost', params._id);
    this.commentsSubs = this.subscribe('comments', params._id);
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