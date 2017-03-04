import <%= Resource %>Collection from '../<%= resource %>-collection.js'

Meteor.publish('<%= resource %>.show', function(postId) {
  return <%= Resource %>Collection.find({
    _id: postId
  }, {
    limit: 1
  })
})
