import <%= Resource %>Collection from '../<%= resource %>-collection.js'

const template = Template.<%= resource %>Edit

template.onCreated(function () {
  this.autorun(() => {
    this.subscribe('<%= resource %>.show', FlowRouter.getParam('_id'))
  })
})

template.helpers({
  <%= resourceSingular %> () {
    return <%= Resource %>Collection.findOne({
      _id: FlowRouter.getParam('_id')
    })
  }
})

AutoForm.hooks({
  edit<%= Resource %>Form: {
    onSuccess: function (_method, docId) {
      FlowRouter.go('<%= resource %>.show', { _id: docId })
    }
  }
})
