import <%= Resource %>Schema from '../<%= resource %>-schema.js'
import <%= Resource %>Collection from '../<%= resource %>-collection.js'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import moment from 'moment'

new ValidatedMethod({
  name: '<%= resource %>.create',
  validate: <%= Resource %>Schema.validator(),
  run: function (doc) {
    doc.createdAt = moment().toDate()
    const <%= resourceSingular %>Id = <%= Resource %>Collection.insert(doc)
    return <%= resourceSingular %>Id
  }
})
