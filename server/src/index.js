//INTERVIEW TIP: sessions store user data server-side unlike JWTs
//Interview Idea: Express is my HTTP server framework. I split routes into separate files (auth.js, metrics.js) and plug them into the main app, which keeps the code organized

//main server entry
//here, I will initialize express app and middleware

//configures express.json() for JSON parsing, cors with credentials (cookie-based sessions)
//express-session for user sessions -> middleware for Express.js that facilitates server-side session management. Addresses stateless nature of HTTP by allowing web applications to maintain user-specific data across multipple requests

//Mounts Routes:
// -> /api/auth handles registration/login/logout
// -> /api/metrics handles exercise metrics (requires authentication)
//starts server on PORT (default 4000)

import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import metricsRoutes from "./routes/metrics.js";
import cors from "cors";
//I used express framework to create server, define endpoints, and add middleware (little functions that run for each request)
//express-session is session management for Express -> this is how I remember "who is this user?" between requests.
//dotenv lets me keep secrets and config out of my code
//cors controls which frontend is allowed to talk to thie API and whether coookies are allowed

dotenv.config(); // get env vars into my code
//environment variables are just variables that have environment-specific values (ex. development vs deployed)
//dotenv is a way to load environment variables
//.env file at root of project contains all environment variables
//I use dotenv to load environment variables so I can keep secrets (like database URLs and session secrets) out of the code and configure dev vs production with different values.”

const app = express(); //makes express application object, app is "server brain"
//const app = express() initializes HTTP server, everything else below configures how this server behaves.

//app.use() registers middleware: a function that runs for every incoming request
app.use(express.json()); //look at HTTP request body -> if JSON -> parse and put result in req.body
//I use express.json() so the server can automatically parse JSON request bodies and expose them as req.body instead of manually reading raw bytes.

app.use(
  //"Which frontends are allowed to talk to me?" -> register CORS middlware
  //register CORS middleware, which controls which front end origins are allowed to talk to my api
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173", //only accept cross-origin requests from 5173 (dev env vite frontend)
    credentials: true, //“Allow cookies (small piece of data that server tells browser to store), authorization headers, etc. to be sent with cross-origin requests.”
  }), //credentials: true is crucial for session-based authentication, since browser must send session cookie to my api
);
//by default, browsers block cross-origin requests
//"cors -> hey browser, its okay for this specific website to call my API and send cookies "

//cookie -> small piece of data that the server tells the broswer to store.
//cookies are used here to remember which user is logged in, store session ID for logged in user, allos backend to recognize the same user across multiple rquests
//cookies are how session-based authentication works

//session based authentication -> a stateful authentication technique where we use sessions to keep track of the authenticated user.
//A session is a small file, most likely in JSON format, that stores information about the user, such as a unique ID, time of login and expirations, and so on. It is generated and stored on the server so that the server can keep track of the user requests. The user receives some of these details, especially the ID, as cookies that will be sent with every new request, so that the server can recognize the ID and authorize the user's requests.

//Interview Idea:“Because my frontend and backend run on different ports, the browser treats them as different origins. I use cors({ origin, credentials: true }) so my React app can send the session cookie along with requests to the Express API.”
///use() is used to mount middleware functions or routers to the application's request-processing pipeline

//How do we remember who is logged in?
//session middleware -> HTTP is stateless; the server doesn't naturally remember anything between requests
//sessions add state on top of that
//“I use session-based authentication: when the user logs in, i store their user data on the server in req.session, and the browser only keeps a signed session ID cookie. This is different from JWTs, where all the user data is encoded into a token stored client-side.
app.use(
  session({
    //store user object server-side
    secret: process.env.SESSION_SECRET || "devsecret", //sends a cookie to browser with a session ID, browser automatically sends cookie back
    resave: false, //express session looks up the session by ID, restores req.session.user so you know who this is
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    },
  }),
);

// Route modules
//mounting -> For any request starting with /api/auth, hand it off to authRoutes.
//For any request starting with /api/metrics, hand it off to metricsRoutes.

app.use("/api/auth", authRoutes);
app.use("/api/metrics", metricsRoutes);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`)); //tell express to start an HTTP server and listen for incoming requests on that port

//I chose session-based authentication for this project because it stores user data on the server, which means the backend fully controls the session lifecycle. In contrast, JWT authentication stores all the user information on the client and trusts the frontend to keep the token safe.
//For a small app where the backend and frontend run on trusted origins, sessions are simpler, more secure by default, and work naturally with cookies. The server just stores a session object like { id, email }, and the browser sends a session ID cookie automatically with each request.”

//“My index.js file is the main entry point for the backend. It initializes an Express app, sets up middleware like express.json() for parsing JSON bodies, CORS so my React frontend can talk to the API with cookies, and express-session for server-side session-based authentication. Then it mounts feature-specific route modules under /api/auth and /api/metrics. Finally, it reads configuration like PORT, CLIENT_ORIGIN, and SESSION_SECRET from environment variables via dotenv and starts the server with app.listen.”
