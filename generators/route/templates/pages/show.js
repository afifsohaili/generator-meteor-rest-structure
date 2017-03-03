import <%= Resource %>Collection from '../<%= resource %>-collection.js'

const template = Template.<%= resource %>Show

template.onCreated(function() {
  this.autorun(() => {
    this.subscribe('<%= resource %>.show', FlowRouter.getParam('_id'))
  })
})

template.helpers({
  <%= resource %>() {
    return <%= Resource %>Collection.findOne({
      _id: FlowRouter.getParam('_id')
    })
  }
})
