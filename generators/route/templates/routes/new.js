import { Layout } from '/imports/lib/services/layout-manager.js'

if (Meteor.isClient) {
  import '../pages/_form.html'
  import '../pages/_form.js'
  import '../pages/new.html'
  import '../pages/new.js'
}

FlowRouter.route('/<%= resourcePath %>/new', {
  name: '<%= resource %>.new',
  action: function () {
    Layout.Public.render({ body: '<%= resource %>New' })
  }
})
