import { FlowRouter } from 'meteor/kadira:flow-router'

AutoForm.hooks({
  new<%= Resource %>Form: {
    onSuccess() {
      FlowRouter.go('<%= resource %>.index')
    }
  }
})
