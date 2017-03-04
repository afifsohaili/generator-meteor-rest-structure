import <%= resource %>Schema from '../<%= resource %>-schema.js'
import <%= resource %>Collection from '../<%= resource %>-collection.js'
import { ValidatedMethod } from 'meteor/mdg:validated-method'

new ValidatedMethod({
  name: '<%= resource %>.create',
  validate: <%= resource %>Schema.validator(),
  run: function (doc) {
    const <%= resourceSingular %> = <%= resource %>Collection.insert(doc)
    return <%= resourceSingular %>._id
  }
})
