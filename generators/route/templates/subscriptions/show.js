import <%= Resource %>Collection from '../<%= resourcePath %>-collection.js'

Meteor.publish('<%= resource %>.show', function(postId) {
  return <%= Resource %>Collection.find({
    _id: postId
  }, {
    limit: 1
  })
})
