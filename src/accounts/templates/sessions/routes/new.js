import { Layout } from '/imports/lib/services/layout-manager.js'

if (Meteor.isClient) {
  import '../pages/new.html'
  import '../pages/new.js'
}

FlowRouter.route('/sessions/new', {
  name: 'sessions.new',
  action: function () {
    Layout.Public.render({ body: 'sessionsNew' })
  }
})
