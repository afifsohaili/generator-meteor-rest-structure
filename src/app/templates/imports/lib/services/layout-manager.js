import { BlazeLayout } from 'meteor/kadira:blaze-layout'
import { _ } from 'meteor/underscore'

import '../layouts/app-footer.html'
import '../layouts/app-footer.js'
import '../layouts/app-header.html'
import '../layouts/app-header.js'
import '../layouts/app-layout.html'
import '../layouts/app-layout.js'
import '../layouts/preloader.html'

const render = (configDefaults, configOverrides, layout = 'appLayout') => {
  return BlazeLayout.render(
    'appLayout',
    _.extend(configDefaults, configOverrides)
  )
}

export const Layout = {
  'Public': {
    render: (configOverrides) => {
      const configDefaults = {
        header: 'appHeader',
        footer: 'appFooter'
      }
      return render(configDefaults, configOverrides)
    }
  }
}
