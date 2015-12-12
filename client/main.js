/**
 * @param {String} route Route Name
 * @param {Object} data Data params.
 * @param {Object} options It can have {query: Object, hash:'String'}
 * */
Template.registerHelper('getPath', function (route) {
  var data = {},
    options = {},
    routeName;
  if (_.isString(route)) {
    routeName = route;
  } else {
    routeName = route.hash.route;
    data = route.hash.data || {};
    options = route.hash.options || {};
  }
  if (!routeName) {
    console.log('There is no path name, check your code');
  }

  var path = JSRouter.getPath(routeName, data, options);
  return path;
});

