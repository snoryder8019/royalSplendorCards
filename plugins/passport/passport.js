const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const bcrypt = require('bcrypt');
const { connect, getDb } = require('../mongo/mongo');  // assuming you're using the db.js you mentioned before
const env = require('dotenv').config();
const { ObjectId } = require('mongodb');




passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    async (email, password, done) => {
      try {
        const db = getDb();
        const users = db.collection('users');
        const user = await users.findOne({ email });

        if (!user) {
          return done(null, false, { message: 'Invalid email or password.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: 'Invalid email or password.' });
        }

        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FBCID,
      clientSecret: process.env.FBSEC,
      callbackURL: '/auth/facebook/callback',
      profileFields: ['id', 'displayName', 'photos', 'email', 'name']
    },
    async (accessToken, refreshToken, profile, done) => {
      const newUser = {
        providerID: profile.id,
        provider: 'facebook',
        email: profile.emails[0].value,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        password: '',
        isAdmin: false,
      };

      try {
        const db = getDb();
        const users = db.collection('users');
        let user = await users.findOne({ email: profile.emails[0].value });
        if (user) {
          done(null, user);
        } else {
          await users.insertOne(newUser);
          done(null, newUser);
        }
      } catch (err) {
        console.error(err);
      }
    }
  )
);


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GGLCID,
      clientSecret: process.env.GGLSEC,
      callbackURL: '/auth/google/callback',
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const newUser = {
        providerID: profile.id,
        provider: 'google',
        email: profile.emails[0].value,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        password: '',
        isAdmin: false,
      };

      try {
        const db = getDb();
        const users = db.collection('users');
        let user = await users.findOne({ email: profile.emails[0].value });
        if (user) {
          done(null, user);
        } else {
          await users.insertOne(newUser);
          done(null, newUser);
        }
      } catch (err) {
        console.error(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const db = getDb();
    const users = db.collection('users');
    const user = await users.findOne({ _id: new ObjectId(id)});

    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
