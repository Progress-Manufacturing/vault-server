const express = require('express');
const request = require('request-promise-native');
const authUtility = require('../utils/auth')

const router = express.Router();

/* GET graphql playground page. */
router.post('/graphql', authUtility.ensureAuthenticated, async (req, res, next) => {
  // Create options object configuring the HTTP call
  console.info('testing');
  const options = {
    url: 'https://graph.microsoft.com/v1.0/me',
    method: 'GET',
    json: true,
    headers: {
      authorization: `Bearer ${req.user.token}`,
    },
  };

  // Query the Graph using async/await syntax
  const attributes = await request(options);

  // Render page with attributes
  // res.render('profile', {
  //   title: 'Profile',
  //   user: req.user,
  //   attributes,
  // });
  return await next();
})(req, res);

module.exports = router;
