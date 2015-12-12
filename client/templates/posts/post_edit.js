Template.postEdit.onCreated(function() {
  Session.set('postEditErrors', {});
  let self = Template.instance();
  self.autorun(()=>{
    let params = JSRouter.getParams('_id');
    self.singlePostSubs = self.subscribe('singlePost', params._id);
  });
});

Template.postEdit.helpers({
  isReady() {
    let tpl = Template.instance(),
      params = JSRouter.getParams('_id'),
      post = Posts.findOne(params._id);
    return tpl.singlePostSubs.ready() && post && post.userId === Meteor.userId();
  },

  isLoading() {
    let tpl = Template.instance();
    return !tpl.singlePostSubs.ready();
  },

  currentPost() {
    let params = JSRouter.getParams('_id');
    return Posts.findOne(params._id);
  },

  errorMessage: function(field) {
    return Session.get('postEditErrors')[field];
  },

  errorClass: function (field) {
    return !!Session.get('postEditErrors')[field] ? 'has-error' : '';
  }
});

Template.postEdit.events({
  'submit form': function(e) {
    e.preventDefault();
    
    var currentPostId = this._id;
    
    var postProperties = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    }
    
    var errors = validatePost(postProperties);
    if (errors.title || errors.url)
      return Session.set('postEditErrors', errors);
    
    Posts.update(currentPostId, {$set: postProperties}, function(error) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
      } else {
        JSRouter.go('postPage', {_id: currentPostId});
      }
    });
  },
  
  'click .delete': function(e) {
    e.preventDefault();
    
    if (confirm("Delete this post?")) {
      var currentPostId = this._id;
      Posts.remove(currentPostId);
      JSRouter.go('home');
    }
  }
});
