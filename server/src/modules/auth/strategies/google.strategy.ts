import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '@/config';
import { OAuth2Strategy } from 'passport-google-oauth';

const GoogleStrategy = new OAuth2Strategy(
  {
    callbackURL: ``,
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
  },
  async () => {},
);
