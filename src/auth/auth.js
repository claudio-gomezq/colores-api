const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const {User} = require('../models')

const config = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'top_secret', //TODO: Cambiar en produccion
};

passport.use('jwt', new JWTStrategy(config, async (jwtpayload, done) => {
    const user = await User.findByPk(jwtpayload.sub);
    if (user) {
        return done(null, user)
    }
    return done(null, false);
}));

module.exports = passport;