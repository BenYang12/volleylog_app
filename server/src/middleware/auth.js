//Authorization Middleware -> protects private routes like /api/metrics
export function requireAuth(req, res, next) {
  if (req.session?.user) return next(); //req.session is created by express-session. If there is a user stored in this session, allow request to continue
  res.status(401).json({ error: "Unauthorized" }); //don't call next, set http status to 401 unauthorized
}

//bouncer for protected routes

//middleware is function that runs before actual route handler
//three args -> req (incoming request), res (response), next ("okay, move on to the next middleware or route handler")

//“I wrote a simple requireAuth middleware that checks for req.session.user. If the user is logged in, it calls next() so the request can proceed; otherwise, it returns a 401 Unauthorized response. I attach this middleware to protected routes like /api/metrics, so only authenticated users can access their metrics.”
