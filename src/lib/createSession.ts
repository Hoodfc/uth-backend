import * as connectRedis from 'connect-redis';
import * as session from 'express-session';


export const RedisStore = connectRedis(session);

export default (client): any => session({
  name: 'sid',
  store: new RedisStore({ client }),
  secret: 'a6bMVNvwKjhpRuL0z7BxEezt28bGJ5vJ',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 1000 * 60 * 60 * 7, // 7 days
  },
});
