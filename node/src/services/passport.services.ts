import { Request } from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import { IUser } from "../interfaces/user.interfaces";

import config from "../config";

passport.use(
	"google",
	new GoogleStrategy(
		{
			clientID: config.GOOGLE.CLIENT_ID!,
			clientSecret: config.GOOGLE.CLIENT_SECRET!,
			callbackURL: config.GOOGLE.CALLBACK,
			passReqToCallback: true,
		},
		function verify(
			req: Request,
			accessToken: string,
			rf: string,
			tokens: any,
			profile: any,
			cb: Function
		) {
			const user: IUser = {
				id: profile.id,
				username: profile.displayName,
			};

			return cb(null, user);
		}
	)
);
