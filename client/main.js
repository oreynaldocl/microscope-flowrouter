/**
 * @param {String} route Route Name
 * @param {Object} data Data params.
 * @param {Object} options It can have {query: Object, hash:'String'}
 * */
Template.registerHelper('getPath', function (routeName, params) {
  let data = {},
    query = {},
    path = '';

  check(routeName, String);
  data = params.hash.data || {};
  query = params.hash.query || {};
  if (!routeName) {
    console.log('There is no path name, check your code');
  }

  path = JSRouter.getPath(routeName, data, query);
  return path;
});

