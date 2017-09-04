import <%= Resource %>Collection from '../<%= resourcePath %>-collection.js'

const perPage = 10

Meteor.publish('<%= resource %>.index', function (page) {
  return <%= Resource %>Collection.find({}, {
    skip: page * perPage,
    limit: perPage
  })
})
