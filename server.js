"use strict";
const schema = require("./data/schema");
const express = require("express");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const passport = require("passport");
const util = require("util");
const bunyan = require("bunyan");
const morgan = require("morgan")
const azureConfig = require("./config/azure-config");

const OIDCStrategy = require("passport-azure-ad").OIDCStrategy;

const log = bunyan.createLogger({
    name: "Microsoft OIDC Progress Mfg. Vault"
});

/******************************************************************************
 * Set up passport in the app 
 ******************************************************************************/

//-----------------------------------------------------------------------------
// To support persistent login sessions, Passport needs to be able to
// serialize users into and deserialize users out of the session.  Typically,
// this will be as simple as storing the user ID when serializing, and finding
// the user by ID when deserializing.
//-----------------------------------------------------------------------------
passport.serializeUser(function(user, done) {
    done(null, user.oid);
  });
  
passport.deserializeUser(function(oid, done) {
    findByOid(oid, function (err, user) {
        done(err, user);
    });
});

// array to hold logged in users
let users = [];

let findByOid = function(oid, fn) {
  for (let i = 0, len = users.length; i < len; i++) {
    const user = users[i];
    log.info("we are using user: ", user);
    if (user.oid === oid) {
      return fn(null, user);
    }
  }
  return fn(null, null);
};


//-----------------------------------------------------------------------------
// Use the OIDCStrategy within Passport.
// 
// Strategies in passport require a `verify` function, which accepts credentials
// (in this case, the `oid` claim in id_token), and invoke a callback to find
// the corresponding user object.
// 
// The following are the accepted prototypes for the `verify` function
// (1) function(iss, sub, done)
// (2) function(iss, sub, profile, done)
// (3) function(iss, sub, profile, access_token, refresh_token, done)
// (4) function(iss, sub, profile, access_token, refresh_token, params, done)
// (5) function(iss, sub, profile, jwtClaims, access_token, refresh_token, params, done)
// (6) prototype (1)-(5) with an additional `req` parameter as the first parameter
//
// To do prototype (6), passReqToCallback must be set to true in the config.
//-----------------------------------------------------------------------------
passport.use(new OIDCStrategy({
    identityMetadata: azureConfig.creds.identityMetadata,
    clientID: azureConfig.creds.clientID,
    responseType: azureConfig.creds.responseType,
    responseMode: azureConfig.creds.responseMode,
    redirectUrl: azureConfig.creds.redirectUrl,
    allowHttpForRedirectUrl: azureConfig.creds.allowHttpForRedirectUrl,
    clientSecret: azureConfig.creds.clientSecret,
    validateIssuer: azureConfig.creds.validateIssuer,
    isB2C: azureConfig.creds.isB2C,
    issuer: azureConfig.creds.issuer,
    passReqToCallback: azureConfig.creds.passReqToCallback,
    scope: azureConfig.creds.scope,
    loggingLevel: azureConfig.creds.loggingLevel,
    nonceLifetime: azureConfig.creds.nonceLifetime,
    nonceMaxAmount: azureConfig.creds.nonceMaxAmount,
    useCookieInsteadOfSession: azureConfig.creds.useCookieInsteadOfSession,
    cookieEncryptionKeys: azureConfig.creds.cookieEncryptionKeys,
    clockSkew: azureConfig.creds.clockSkew,
  },
  function(iss, sub, profile, accessToken, refreshToken, done) {
    if (!profile.oid) {
      return done(new Error("No oid found"), null);
    }
    // asynchronous verification, for effect...
    process.nextTick(function () {
      findByOid(profile.oid, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          // "Auto-registration"
          users.push(profile);
          return done(null, profile);
        }
        return done(null, user);
      });
    });
  }
));

require("dotenv").config();
const PORT = 8000;
const app = express();

app.use(morgan());
app.use(methodOverride());
app.use(cookieParser());

// set up session middleware
if (azureConfig.useMongoDBSessionStore) {
    mongoose.connect(azureConfig.databaseUri);
    app.use(express.session({
      secret: "secret",
      cookie: {maxAge: azureConfig.mongoDBSessionMaxAge * 1000},
      store: new MongoStore({
        mongooseConnection: mongoose.connection,
        clear_interval: azureConfig.mongoDBSessionMaxAge
      })
    }));
} else {
    app.use(expressSession({ secret: "keyboard cat", resave: true, saveUninitialized: false }));
}

app.use(bodyParser.urlencoded({ extended : true }));

// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + "/../../public"));

//-----------------------------------------------------------------------------
// Set up the route controller
//
// 1. For "login" route and "returnURL" route, use `passport.authenticate`. 
// This way the passport middleware can redirect the user to login page, receive
// id_token etc from returnURL.
//
// 2. For the routes you want to check if user is already logged in, use 
// `ensureAuthenticated`. It checks if there is an user stored in session, if not
// it will call `passport.authenticate` to ask for user to log in.
//-----------------------------------------------------------------------------
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect("/login");
};
  
app.get("/", function(req, res) {
    res.render("index", { user: req.user });
});

// '/account' is only available to logged in user
app.get('/account', ensureAuthenticated, function(req, res) {
    res.render('account', { user: req.user });
});
  
app.get('/login',
    function(req, res, next) {
        passport.authenticate('azuread-openidconnect', 
        { 
            response: res,                      // required
            resourceURL: config.resourceURL,    // optional. Provide a value if you want to specify the resource.
            customState: 'my_state',            // optional. Provide a value if you want to provide custom state value.
            failureRedirect: '/' 
        }
        )(req, res, next);
    },
    function(req, res) {
        log.info('Login was called in the Sample');
        res.redirect('/');
    }
);

// 'GET returnURL'
// `passport.authenticate` will try to authenticate the content returned in
// query (such as authorization code). If authentication fails, user will be
// redirected to '/' (home page); otherwise, it passes to the next middleware.
app.get('/auth/openid/return',
    function(req, res, next) {
        passport.authenticate('azuread-openidconnect', 
            { 
                response: res,                      // required
                failureRedirect: '/'  
            }
        )(req, res, next);
    },
    function(req, res) {
        log.info('We received a return from AzureAD.');
        res.redirect('/');
    }
);

// 'POST returnURL'
// `passport.authenticate` will try to authenticate the content returned in
// body (such as authorization code). If authentication fails, user will be
// redirected to '/' (home page); otherwise, it passes to the next middleware.
app.post('/auth/openid/return',
    function(req, res, next) {
        passport.authenticate('azuread-openidconnect', 
        { 
            response: res,                      // required
            failureRedirect: '/'  
        }
        )(req, res, next);
    },
    function(req, res) {
        log.info('We received a return from AzureAD.');
        res.redirect('/');
    }
);

// 'logout' route, logout from passport, and destroy the session with AAD.
app.get('/logout', function(req, res){
  req.session.destroy(function(err) {
    req.logOut();
    res.redirect(config.destroySessionUrl);
  });
});

// Graphiql for testing the API out
schema.applyMiddleware({app});
schema.apply
app.listen(PORT, () => {
    console.log(`GraphiQL is running on http://localhost:${PORT}/graphql`);
});