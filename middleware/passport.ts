const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt
import {tokenSecret} from "../config";
import {User} from "../db/models";

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: tokenSecret
}

module.exports = (passport:any) => {
    passport.use(
        new JwtStrategy(options, (payload:any, done:any) => {
            User.findByPk(payload.id).then((user) => {
                if(user) {
                    done(null, user)
                } else {
                    done(null, false)
                }
            }).catch((err) => {
                console.log(err)
            })
        })
    )
}
