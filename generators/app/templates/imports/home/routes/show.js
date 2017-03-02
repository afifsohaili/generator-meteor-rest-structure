import { Layout } from '../../lib/services/layout-manager.js'
import { FlowRouter } from 'meteor/kadira:flow-router'

import '../pages/show.html'
import '../pages/show.js'

FlowRouter.route('/', {
  name: 'home.show',
  action: function () {
    Layout.Public.render({ body: 'homeShow' })
  }
})
