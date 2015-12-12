Template.postSubmit.onCreated(function() {
  Session.set('postSubmitErrors', {});
});

Template.postSubmit.helpers({
  isAllowed() {
    return Meteor.userId();
  },
  isLogging() {
    return Meteor.loggingIn();
  },
  errorMessage(field) {
    return Session.get('postSubmitErrors')[field];
  },
  errorClass(field) {
    return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
  }
});

Template.postSubmit.events({
  'submit form'(e) {
    e.preventDefault();
    
    var post = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    };
    
    var errors = validatePost(post);
    if (errors.title || errors.url)
      return Session.set('postSubmitErrors', errors);
    
    Meteor.call('postInsert', post, function(error, result) {
      // display the error to the user and abort
      if (error)
        return throwError(error.reason);
      
      // show this result but route anyway
      if (result.postExists)
        throwError('This link has already been posted');

      JSRouter.go('postPage', {_id: result._id});
    });
  }
});