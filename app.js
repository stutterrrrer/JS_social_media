const express = require("express");
const {router} = require("./controller/requestHandler");

// Session store is a method of storing information about user as a session with unique identifier.
// It could be stored in memory or in database.
// Socket.io can utilize the same session (id) being used in express app by socket-express-session package


const path = require("path");
const session = require("express-session");
const PORT = 8000;
var app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));
app.use(express.static(path.join(__dirname, "./assets")));


// this line must be placed before app.use(router)
// so that the router can access session() created here.
app.use(session({
    secret: "session_secret",
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}))

// all endpoints handled by router from controller/requestHandler.js
app.use(router);


app.listen(PORT, () => {
    console.log("App running on http://localhost:" + PORT);
});

