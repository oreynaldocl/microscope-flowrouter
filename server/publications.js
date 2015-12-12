Meteor.publish('posts', (options = {}) => {
  check(options, {
    sort: Object,
    limit: Number
  });
  return Posts.find({}, options);
});

Meteor.publish('singlePost', (id) => {
  check(id, String);
  return Posts.find(id);
});


Meteor.publish('comments', (postId) => {
  check(postId, String);
  return Comments.find({postId: postId});
});

Meteor.publish('notifications', function(){
  console.log((this.userId), Notifications.find({userId: this.userId, read: false}).count());
  return Notifications.find({userId: this.userId, read: false});
});
