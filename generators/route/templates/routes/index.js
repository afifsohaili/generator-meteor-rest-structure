import { Layout } from '/imports/lib/services/layout-manager.js'

if (Meteor.isClient) {
  import '../pages/index.html'
  import '../pages/index.js'
}

FlowRouter.route('/<%= resourcePath %>', {
  name: '<%= resource %>.index',
  action: function () {
    Layout.Public.render({ body: '<%= resource %>Index' })
  }
})
