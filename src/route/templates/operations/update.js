import <%= Resource %>Schema from '../<%= resourcePath %>-schema.js'
import <%= Resource %>Collection from '../<%= resourcePath %>-collection.js'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import moment from 'moment'

new ValidatedMethod({
  name: '<%= resource %>.update',
  validate (doc) {
    return <%= Resource %>Schema.validate(
      doc.modifier, {
        modifier: true,
        extendAutoValueContext: { isUpdate: true }
      }
    )
  },
  run: function (doc) {
    const modifier = <%= Resource %>Schema.clean(
      doc.modifier, {
        modifier: true,
        extendAutoValueContext: { isUpdate: true }
      }
    )
    <%= Resource %>Collection.update(doc._id, modifier)

    return doc._id
  }
})
