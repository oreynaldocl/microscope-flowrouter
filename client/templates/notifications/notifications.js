Template.notifications.onCreated(function(){
  let self = this;
  self.autorun(function() {
    console.log(Meteor.userId());
    if (Meteor.userId()) {
      self.subscribe('notifications');
    }
  });
});

Template.notifications.helpers({
  notifications: function() {
    return Notifications.find({userId: Meteor.userId(), read: false});
  },
  notificationCount: function(){
    return Notifications.find({userId: Meteor.userId(), read: false}).count();
  }
});

Template.notificationItem.helpers({
  notificationPostPath: function() {
    return JSRouter.getPath('postPage', {_id: this.postId});
  }
});

Template.notificationItem.events({
  'click a': function() {
    Notifications.update(this._id, {$set: {read: true}});
  }
});