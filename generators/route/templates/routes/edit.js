import { Layout } from '/imports/lib/services/layout-manager.js'

if (Meteor.isClient) {
  import '../pages/edit.html'
  import '../pages/edit.js'
  import '../pages/_form.html'
  import '../pages/_form.js'
}

FlowRouter.route('/<%= resource %>/:_id/edit', {
  name: '<%= resource %>.edit',
  action: function () {
    Layout.Public.render({ body: '<%= resource %>Edit' })
  }
})
