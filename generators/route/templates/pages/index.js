import <%= Resource %>Collection from '../<%= resource %>-collection.js'

const template = Template.<%= resource %>Index

template.onCreated(function () {
  this.autorun(() => {
    this.subscribe('<%= resource %>.index')
  })
})

template.helpers({
  <%= resource %>() {
    return <%= Resource %>Collection.find().fetch()
  }
})
