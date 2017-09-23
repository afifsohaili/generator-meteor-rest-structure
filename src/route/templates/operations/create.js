import <%= Resource %>Schema from '../<%= resourcePath %>-schema.js'
import <%= Resource %>Collection from '../<%= resourcePath %>-collection.js'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import moment from 'moment'

new ValidatedMethod({
  name: '<%= resource %>.create',
  validate: function(doc) {
    return <%= Resource %>Schema.validate(
      <%= Resource %>Schema.clean(doc, {
        extendAutoValueContext: { isInsert: true }
      })
    )
  },
  run: function (doc) {
    const cleanedDoc = <%= Resource %>Schema.clean(doc, {
      extendAutoValueContext: { isInsert: true }
    })
    const <%= resourceSingular %>Id = <%= Resource %>Collection.insert(cleanedDoc)
    return <%= resourceSingular %>Id
  }
})
