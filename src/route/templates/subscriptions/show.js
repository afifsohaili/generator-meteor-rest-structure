import <%= Resource %>Collection from '../<%= resourcePath %>-collection.js'

Meteor.publish('<%= resource %>.show', function(<%= resource %>Id) {
  return <%= Resource %>Collection.find(
    { _id: <%= resource %>Id },
    { limit: 1 }
  )
})
