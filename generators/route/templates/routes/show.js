import { Layout } from '/imports/lib/services/layout-manager.js'

if (Meteor.isClient) {
  import '../pages/show.html'
  import '../pages/show.js'
}

FlowRouter.route('/<%= resource %>/:_id', {
  name: '<%= resource %>.show',
  action: function () {
    Layout.Public.render({ body: '<%= resource %>Show' })
  }
})
