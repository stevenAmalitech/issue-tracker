import ses from "express-session";

export const session = ses({
  secret: "008293@#$)()",
  resave: false,
  cookie: { maxAge: 60 * 60 * 24 },
  saveUninitialized: true,
});
