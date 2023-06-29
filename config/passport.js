const passport = require('passport');
const User = require('./database');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('express-session');


passport.use(new GoogleStrategy({
    clientID: "347205516259-06o1ka8fi5rmo5emm0o0nu221pl3msdg.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/auth/callback"
  },

  async function(accessToken, refreshToken, profile, cb) {

    try {
        const user = await User.findOne({googleId: profile.id}).exec()

        if (!user){
            const newUser = new User({
                username: profile.displayName,
                googleId: profile.id
            })
            await newUser.save()
            return cb(null, newUser)
        }
        return cb(null, user)
    } catch(err){
        return cb(err)
    }
  }
));




// Persists user data inside the session
passport.serializeUser(function(user, cb) {
    cb(null, user._id);
});
  
// fetches session details using session id 
passport.deserializeUser(async function(id, cb) {
  const user =await User.findById(id).exec();
  if (user) {
    cb(null, user);
  }
});
