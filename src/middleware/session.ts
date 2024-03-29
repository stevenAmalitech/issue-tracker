import ses from "express-session";

export const session = ses({
  secret: process.env.SESSION_SECRET!,
  resave: true,
  cookie: { maxAge: 100000000 },
  saveUninitialized: true,
  // rolling: true,
});
