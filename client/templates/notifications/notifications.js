Template.notifications.onCreated(() =>{
  let self = Template.instance();
  self.autorun(() => {
    self.subscribe('notifications');
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