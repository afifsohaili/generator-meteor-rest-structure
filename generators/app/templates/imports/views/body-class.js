import { BlazeLayout } from 'meteor/kadira:blaze-layout'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { Meteor } from 'meteor/meteor'

BlazeLayout.setRoot('body')

Meteor.startup(function () {
  const bodyClass = _bodyClass(FlowRouter.getRouteName())

  Blaze.addBodyClass(bodyClass)

  FlowRouter.triggers.enter([function (context) {
    Blaze.addBodyClass(_bodyClass(context.route.name))
  }])
})

function _bodyClass (routeName) {
  return routeName.replace(/\./gi, '-')
}
