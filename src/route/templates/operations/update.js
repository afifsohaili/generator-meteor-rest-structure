import <%= Resource %>Schema from '../<%= resourcePath %>-schema.js'
import <%= Resource %>Collection from '../<%= resourcePath %>-collection.js'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import moment from 'moment'

new ValidatedMethod({
  name: '<%= resource %>.update',
  validate (doc) {
    <%= Resource %>Schema.validate(doc.modifier, { modifier: true })
  },
  run: function (doc) {
    doc.modifier.$set.updatedAt = moment().toDate()
    <%= Resource %>Collection.update(doc._id, doc.modifier)
    return doc._id
  }
})
