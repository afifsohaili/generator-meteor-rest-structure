BlazeLayout.setRoot("body");

Meteor.startup(function () {
  const bodyClass = _bodyClass(FlowRouter.getRouteName());

  Blaze.addBodyClass(bodyClass);

  FlowRouter.triggers.enter([function (context) {
    Blaze.addBodyClass(_bodyClass(context.route.name));
  }]);

  FlowRouter.triggers.exit([function (context) {
    $("body > header").css({
      top: 0
    });
  }]);
});

function _bodyClass(routeName) {
  return routeName.replace(/\./gi, "-");
}
