Template.postItem.helpers({
  ownPost() {
    return this.userId == Meteor.userId();
  },
  domain() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  },
  upvotedClass() {
    var userId = Meteor.userId();
    if (userId && !_.include(this.upvoters, userId)) {
      return 'btn-primary upvotable';
    } else {
      return 'disabled';
    }
  },
  postData() {
    return {_id: this._id};
  },
  pathPage() {
    let _id = this._id;
    return JSRouter.getPath('postPage', {_id});
  }
});

Template.postItem.events({
  'click .upvotable': function(e) {
    e.preventDefault();
    Meteor.call('upvote', this._id);
  }
});