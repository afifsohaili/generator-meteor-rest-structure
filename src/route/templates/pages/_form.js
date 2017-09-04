import <%= Resource %>Schema from '/imports/<%= resourcePath %>/<%= resourcePath %>-schema.js'

Template.<%= resource %>Form.helpers({
  schema () {
    return <%= Resource %>Schema
  },
  singleMethodArgument () {
    if (Template.instance().data.formType === 'method-update') {
      return true
    } else {
      return false
    }
  }
})
